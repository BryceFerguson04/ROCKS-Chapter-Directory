const fs = require('node:fs');
const http = require('node:http');
const https = require('node:https');
const path = require('node:path');
const { URL } = require('node:url');

const root = __dirname;
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 4173);
const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const fromNumber = process.env.TWILIO_FROM_NUMBER || '';
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID || '';
const recentMessages = new Map();
const sentNotifications = new Set();
const phonePattern = /^\+[1-9]\d{7,14}$/;
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8'
};

const sendJson = (response, status, body) => {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(body));
};

const readJson = (request) => new Promise((resolve, reject) => {
  let body = '';
  request.setEncoding('utf8');
  request.on('data', (chunk) => {
    body += chunk;
    if (body.length > 8192) {
      reject(new Error('Request body is too large.'));
      request.destroy();
    }
  });
  request.on('end', () => {
    try {
      resolve(JSON.parse(body));
    } catch {
      reject(new Error('Request body must be valid JSON.'));
    }
  });
  request.on('error', reject);
});

const sendTwilioMessage = (phone, message) => new Promise((resolve, reject) => {
  const parameters = new URLSearchParams({ To: phone, Body: message });
  if (messagingServiceSid) {
    parameters.set('MessagingServiceSid', messagingServiceSid);
  } else {
    parameters.set('From', fromNumber);
  }
  const request = https.request({
    hostname: 'api.twilio.com',
    path: `/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`,
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(parameters.toString())
    }
  }, (response) => {
  response.resume();
  response.on('end', () => {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      reject(new Error(`Twilio returned HTTP ${response.statusCode}.`));
      return;
    }
    resolve();
  });
  });
  request.setTimeout(10000, () => request.destroy(new Error('Twilio request timed out.')));
  request.on('error', reject);
  request.end(parameters.toString());
});

const handleSms = async (request, response) => {
  let origin;
  try {
    origin = new URL(request.headers.origin);
  } catch {
    sendJson(response, 403, { error: 'Requests must come from this local site.' });
    return;
  }
  if (origin.host !== request.headers.host || origin.protocol !== 'http:') {
    sendJson(response, 403, { error: 'Requests must come from this local site.' });
    return;
  }
  if (!accountSid || !authToken || (!fromNumber && !messagingServiceSid)) {
    sendJson(response, 503, { error: 'SMS is not configured. Set the Twilio server environment variables and restart the site.' });
    return;
  }

  let payload;
  try {
    payload = await readJson(request);
  } catch (error) {
    sendJson(response, 400, { error: error.message });
    return;
  }
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const title = typeof payload.opportunityTitle === 'string' ? payload.opportunityTitle.trim() : '';
  const date = typeof payload.opportunityDate === 'string' ? payload.opportunityDate.trim() : '';
  const notificationType = payload.notificationType || 'signup-confirmation';
  const notificationId = typeof payload.notificationId === 'string'
    ? payload.notificationId
    : typeof payload.applicationId === 'string' ? payload.applicationId : '';
  const validSignup = notificationType === 'signup-confirmation' && title && title.length <= 120
    && /^\d{4}-\d{2}-\d{2}$/.test(date);
  const validProfileUpdate = notificationType === 'profile-updated';
  if (payload.smsOptIn !== true || !phonePattern.test(phone) || !/^[A-Za-z0-9_-]{1,160}$/.test(notificationId)
    || (!validSignup && !validProfileUpdate)) {
    sendJson(response, 400, { error: 'A valid phone, explicit text opt-in, and supported notification details are required.' });
    return;
  }
  if (sentNotifications.has(notificationId)) {
    sendJson(response, 409, { error: 'This text notification was already submitted.' });
    return;
  }

  const now = Date.now();
  for (const [number, sentAt] of recentMessages) {
    if (now - sentAt >= 30000) recentMessages.delete(number);
  }
  const lastSent = recentMessages.get(phone);
  if (lastSent && now - lastSent < 30000) {
    sendJson(response, 429, { error: 'A text was sent to this number recently. Please wait before trying again.' });
    return;
  }
  const message = notificationType === 'profile-updated'
    ? 'ROCKS: Your volunteer profile has been updated. Reply STOP to opt out.'
    : `ROCKS: Your signup for ${title} is confirmed for ${date}. Reply STOP to opt out.`;
  try {
    await sendTwilioMessage(phone, message);
    recentMessages.set(phone, now);
    sentNotifications.add(notificationId);
    sendJson(response, 202, { status: 'queued' });
  } catch (error) {
    console.error(`Unable to send volunteer SMS (${error.message})`);
    sendJson(response, 502, { error: 'Twilio could not accept the text. Your profile or signup was saved; please try again.' });
  }
};

const serveFile = (request, response, pathname) => {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    response.writeHead(400);
    response.end('Invalid path.');
    return;
  }
  const relativePath = decodedPath === '/' ? 'index.html' : decodedPath.slice(1);
  const pathParts = relativePath.split(/[\\/]+/);
  if (pathParts.some((part) => part.startsWith('.')) || relativePath.toLowerCase() === 'server.js') {
    response.writeHead(404);
    response.end('Not found.');
    return;
  }
  const filePath = path.resolve(root, relativePath);
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden.');
    return;
  }
  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      response.writeHead(404);
      response.end('Not found.');
      return;
    }
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff'
    });
    if (request.method === 'HEAD') {
      response.end();
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  });
};

const server = http.createServer((request, response) => {
  let url;
  try {
    url = new URL(request.url, `http://${request.headers.host}`);
  } catch {
    response.writeHead(400);
    response.end('Invalid request URL.');
    return;
  }
  if (url.pathname === '/api/volunteer-reminders') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { error: 'Use POST to submit a volunteer text confirmation.' });
      return;
    }
    handleSms(request, response).catch((error) => {
      console.error(`Unable to process volunteer SMS (${error.message})`);
      if (!response.headersSent) sendJson(response, 500, { error: 'The text confirmation could not be processed.' });
    });
    return;
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed.');
    return;
  }
  serveFile(request, response, url.pathname);
});

server.listen(port, host, () => {
  console.log(`ROCKS prototype available at http://${host}:${port}`);
});
