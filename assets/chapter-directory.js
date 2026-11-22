const chapters = [
  {id:1, name:'Alamo ROCKS', loc:'Ft. Sam Houston, TX', city:'Fort Sam Houston', state:'TX', country:'USA', mailingAddress:'P.O. Box 340378, Fort Sam Houston, TX 78234', contact:'Aaron Braxton, Chapter President', contactEmail:'aaron.braxtonii@gmail.com', chapterEmail:'ftsamhoustonrocks@gmail.com', email:'ftsamhoustonrocks@gmail.com', phone:'', num:'ROCKS12', website:'http://www.rocksinc.org', usacc:{label:'5th Brigade - Apache',url:'https://armyrotc.army.mil/5th-brigade/'}, usarec:{label:'5th Recruiting Brigade',url:'https://recruiting.army.mil/5thbde/'}, type:'chapter'},
  {id:12, name:'Hampton Roads ROCKS', loc:'Fort Eustis, VA', city:'Fort Eustis', state:'VA', country:'USA', mailingAddress:'P.O. Box 4499, Fort Eustis, VA 23604', contact:'Julius Coats, Chapter President', contactEmail:'coatsjulius@aol.com', chapterEmail:'', email:'', phone:'', num:'ROCKS11', website:'http://www.rocksinc.org', websiteExtra:{label:'Hampton Roads chapter website',url:'https://rocksinc.org/content.aspx?page_id=22&club_id=459944&module_id=68548'}, usacc:{label:'4th Brigade - Patriot',url:'https://armyrotc.army.mil/4th-brigade/'}, usarec:{label:'1st Recruiting Brigade',url:'https://recruiting.army.mil/1stbde/'}, type:'chapter'},
  {id:15, name:'Henry O. Flipper ROCKS', loc:'West Point, NY', city:'West Point', state:'NY', country:'USA', mailingAddress:'72nd Street, Cornwall-on-Hudson, NY 15220', contact:'Brian Holloway, Chapter President', contactEmail:'bfrombmore@gmail.com', chapterEmail:'john.baskerville@wespoint.edu', email:'john.baskerville@wespoint.edu', phone:'', num:'ROCKS15', website:'http://www.rocksinc.org', usacc:{label:'2nd Brigade - Freedom',url:'https://armyrotc.army.mil/2nd-brigade/'}, usarec:{label:'1st Recruiting Brigade',url:'https://recruiting.army.mil/1stbde/'}, type:'chapter'},
  {id:18, name:'JBLM Rainier ROCKS', loc:'Ft. Lewis-McChord, WA', city:'JBLM', state:'WA', country:'USA', mailingAddress:'1110 Swan Loop, DuPont, WA 98327', contact:'Mikhail J. Jackson, Chapter President', contactEmail:'Mjj8458@yahoo.com', chapterEmail:'Jblmrainerrocks2021@gmail.com', email:'Jblmrainerrocks2021@gmail.com', phone:'936-371-1804', num:'ROCKS25', website:'http://www.rocksinc.org', usacc:{label:'8th Brigade - Viking',url:'https://armyrotc.army.mil/8th-brigade/'}, usarec:{label:'6th Recruiting Brigade',url:'https://recruiting.army.mil/6thbde/'}, type:'chapter'},
  {id:21, name:'MG Charles Rogers ROCKS', loc:'Carlisle Barracks, PA', city:'Carlisle', state:'PA', country:'USA', mailingAddress:'215 Pine Creek Dr., Carlisle, PA 17013', contact:'Charles Allen, Chapter Advisor', contactEmail:'dexter17013@gmail.com', chapterEmail:'dexter17013@gmail.com', email:'dexter17013@gmail.com', phone:'224-628-6757', num:'ROCKS22', website:'http://www.rocksinc.org', usacc:{label:'2nd Brigade - Freedom',url:'https://armyrotc.army.mil/2nd-brigade/'}, usarec:{label:'1st Recruiting Brigade',url:'https://recruiting.army.mil/1stbde/'}, type:'chapter'},
  {id:23, name:'Phantom Warriors ROCKS', loc:'Fort Cavazos, TX', city:'Fort Hood', state:'TX', country:'USA', mailingAddress:'116 San Gabriel River Road, Georgetown, TX 78626', contact:'Barry Winnegan (COL), Chapter President', contactEmail:'barry.winnegan@gmail.com', chapterEmail:'Phantomwarriorrocks@gmail.com', email:'Phantomwarriorrocks@gmail.com', phone:'864-986-8693', num:'ROCKS6', website:'http://www.facebook.com/forthood', usacc:{label:'5th Brigade - Apache',url:'https://armyrotc.army.mil/5th-brigade/'}, usarec:{label:'5th Recruiting Brigade',url:'https://recruiting.army.mil/5thbde/'}, type:'chapter'},
  {id:25, name:'Washington D.C. Chapter', loc:'Washington, D.C.', city:'Forestville, MD', state:'DC', country:'USA', mailingAddress:'P. O. Box 47435, Forestville, MD, DC 20753', contact:'LTC (Ret) Kimberly Short, Chapter President', contactEmail:'president@therocksdc.org', chapterEmail:'Koja10@me.com', email:'Koja10@me.com', phone:'', num:'ROCKS14', website:'http://www.therocksdc.org', usacc:{label:'4th Brigade - Patriot',url:'https://armyrotc.army.mil/4th-brigade/'}, usarec:{label:'1st Recruiting Brigade',url:'https://recruiting.army.mil/1stbde/'}, type:'chapter'},
  {id:42, name:'Buffalo Soldiers ROCKS', loc:'Fort Leavenworth, KS', city:'Fort Leavenworth', state:'KS', country:'USA', mailingAddress:'P.O. Box 3122, Fort Leavenworth, KS 66027', contact:'Charles Darden, Chapter Advisor', contactEmail:'skibo1107@aol.com', chapterEmail:'', email:'skibo1107@aol.com', phone:'', num:'', website:'http://www.rocksinc.org', usacc:{label:'3rd Brigade - Blackhawk',url:'https://armyrotc.army.mil/3rd-brigade-blackhawk/'}, usarec:{label:'5th Recruiting Brigade',url:'https://recruiting.army.mil/5thbde/'}, type:'chapter'},
  {id:26, name:'Tampa Interest Group', loc:'Tampa, FL', city:'Tampa', state:'FL', country:'USA', email:'corey.a.givens.mil@mail.mil', phone:'', num:'', website:'', type:'interest'},
  {id:27, name:'California National Guard IG', loc:'California', city:'', state:'CA', country:'USA', email:'', phone:'', num:'', website:'', type:'interest'},
  {id:28, name:'Chesapeake Bay ROCKS', loc:'Maryland', city:'', state:'MD', country:'USA', email:'terry.hodges2@gmail.com', phone:'757-604-1727', num:'', website:'', type:'interest'},
  {id:29, name:'Coraopolis Interest Group', loc:'Coraopolis, PA', city:'Coraopolis', state:'PA', country:'USA', email:'', phone:'', num:'', website:'', type:'interest'},
  {id:30, name:'Fort Dix Ultimate Weapon ROCKS', loc:'Fort Dix, NJ', city:'Fort Dix', state:'NJ', country:'USA', email:'sabrina.l.gammage.mil@mail.mil', phone:'919-559-9705', num:'', website:'', type:'interest'},
  {id:31, name:'High Desert ROCKS', loc:'Fort Irwin, CA', city:'Fort Irwin', state:'CA', country:'USA', email:'', phone:'', num:'', website:'', type:'interest'},
  {id:32, name:'Fort Sill Interest Group', loc:'Fort Sill, OK', city:'Fort Sill', state:'OK', country:'USA', email:'kiasha.hamilton@gmail.com', phone:'504-388-2405', num:'', website:'', type:'interest'},
  {id:33, name:'Mississippi National Guard IG', loc:'Mississippi', city:'', state:'MS', country:'USA', email:'christian.patterson.mil@mail.mil', phone:'601-201-5463', num:'', website:'', type:'interest'},
  {id:34, name:'Rock Island Arsenal IG', loc:'Rock Island, IL', city:'Rock Island', state:'IL', country:'USA', email:'', phone:'', num:'', website:'', type:'interest'},
  {id:35, name:'Virginia Military Institute IG', loc:'Lexington, VA', city:'Lexington', state:'VA', country:'USA', email:'', phone:'', num:'', website:'', type:'interest'},
  {id:36, name:'Morning Calm Chapter', loc:'Seoul, South Korea', city:'Seoul', state:'', country:'KOR', email:'morningcalmrocks@gmail.com', phone:'', num:'ROCKS13', website:'', type:'intl'},
  {id:37, name:'Wiesbaden Europe Chapter', loc:'Wiesbaden, Germany', city:'Wiesbaden', state:'', country:'DEU', email:'', phone:'', num:'ROCKS1', website:'', type:'intl'},
  {id:38, name:'Kuwait Interest Group', loc:'Kuwait', city:'', state:'', country:'KWT', email:'', phone:'', num:'', website:'', type:'intl'},
  {id:39, name:'Saudi Arabia Interest Group', loc:'Saudi Arabia', city:'', state:'', country:'SAU', email:'', phone:'', num:'', website:'', type:'intl'},
  {id:40, name:'Rising Sun ROCKS', loc:'Honshu, Japan', city:'Honshu', state:'', country:'JPN', email:'vernon.l.jones.mil@mail.mil', phone:'', num:'', website:'', type:'intl'},
  {id:41, name:'Germany ROCKS', loc:'Germany', city:'', state:'', country:'DEU', email:'Bigwilly2002@yahoo.com', phone:'', num:'', website:'', type:'intl'},
];

let activeFilter = 'all';

function setFilter(button, filter) {
  document.querySelectorAll('.c2-filter').forEach((filterButton) => {
    const active = filterButton === button;
    filterButton.classList.toggle('active', active);
    filterButton.setAttribute('aria-pressed', String(active));
  });
  activeFilter = filter;
  renderDirectory();
}

function renderDirectory() {
  const query = document.getElementById('c2Search').value.toLowerCase();
  const body = document.getElementById('c2Body');
  const filtered = chapters.filter((chapter) => {
    const matchesFilter = activeFilter === 'all' || chapter.type === activeFilter;
    const matchesQuery = !query || [chapter.name, chapter.loc, chapter.city, chapter.state]
      .join(' ')
      .toLowerCase()
      .includes(query);
    return matchesFilter && matchesQuery;
  });
  const chapterList = filtered.filter((chapter) => chapter.type === 'chapter');
  const interestGroups = filtered.filter((chapter) => chapter.type === 'interest');
  const international = filtered.filter((chapter) => chapter.type === 'intl');
  let html = '';
  if (chapterList.length) html += sectionHTML('Active Chapters', chapterList.length, chapterList.map(cardHTML).join(''));
  if (interestGroups.length) html += sectionHTML('Interest Groups', interestGroups.length, interestGroups.map(cardHTML).join(''));
  if (international.length) html += sectionHTML('International Chapters', international.length, international.map(cardHTML).join(''));
  if (!filtered.length) html = '<div class="c2-empty">No chapters match your search.</div>';
  body.innerHTML = html;
}

function sectionHTML(title, count, cards) {
  return `<div class="c2-section">
    <div class="c2-section-hd"><h2>${title}</h2><span class="c2-section-cnt">${count}</span></div>
    <div class="c2-grid">${cards}</div>
  </div>`;
}

function cardHTML(chapter) {
  const typeLabel = chapter.type === 'chapter' ? 'Full Chapter' : chapter.type === 'interest' ? 'Interest Group' : 'International Chapter';
  const chapterEmail = chapter.type === 'chapter' ? chapter.chapterEmail : chapter.email;
  const location = `<div class="c2-loc"><strong>Location:</strong> ${chapter.loc || 'Not provided'}</div>`;
  const rocksWebsite = 'http://www.rocksinc.org';
  const recordedWebsite = chapter.website ? (chapter.website.startsWith('http') ? chapter.website : 'https://' + chapter.website) : '';
  const chapterWebsite = chapter.websiteExtra ? chapter.websiteExtra.url : recordedWebsite !== rocksWebsite ? recordedWebsite : '';
  const chapterWebsiteRow = chapterWebsite
    ? `<div class="c2-loc"><strong>Chapter website:</strong> <a href="${chapterWebsite}" target="_blank" rel="noopener noreferrer">Visit Chapter Website</a></div>`
    : '';
  const rocksWebsiteRow = `<div class="c2-loc"><strong>ROCKS website:</strong> <a href="${rocksWebsite}" target="_blank" rel="noopener noreferrer">Visit Rocks Website</a></div>`;
  const details = `
    ${chapter.type === 'chapter' ? `
      <div class="c2-loc"><strong>Mailing address:</strong> ${chapter.mailingAddress || 'Not provided'}</div>
      <div class="c2-loc"><strong>Contact:</strong> ${chapter.contact || 'Not provided'}</div>
      <div class="c2-loc"><strong>Chapter email:</strong> ${chapterEmail ? `<a href="mailto:${chapterEmail}">Email Chapter</a>` : 'Not provided'}</div>
      ${chapter.contactEmail && chapter.contactEmail !== chapterEmail ? `<div class="c2-loc"><strong>Contact email:</strong> <a href="mailto:${chapter.contactEmail}">${chapter.contactEmail}</a></div>` : ''}
      ${chapter.email && chapter.email !== chapterEmail && chapter.email !== chapter.contactEmail ? `<div class="c2-loc"><strong>Additional email:</strong> <a href="mailto:${chapter.email}">${chapter.email}</a></div>` : ''}
      <div class="c2-loc"><strong>USACC/ROTC:</strong> ${chapter.usacc ? `<a href="${chapter.usacc.url}" target="_blank" rel="noopener noreferrer">${chapter.usacc.label}</a>` : 'Not provided'}</div>
      <div class="c2-loc"><strong>USAREC/Recruiting:</strong> ${chapter.usarec ? `<a href="${chapter.usarec.url}" target="_blank" rel="noopener noreferrer">${chapter.usarec.label}</a>` : 'Not provided'}</div>
    ` : chapter.email ? `<a class="c2-email" href="mailto:${chapter.email}">${chapter.email}</a>` : '<span class="c2-no-contact">No email on file</span>'}
    ${chapterWebsiteRow}
    ${rocksWebsiteRow}
    <div class="c2-footer">
      <div class="c2-status-dot ${chapter.type}"></div>
      <div class="c2-status-text">${typeLabel} · Active</div>
    </div>`;
  return `
  <div class="c2-card ${chapter.type}">
    <h3>${chapter.name}</h3>
    ${location}
    <button class="c2-expand-toggle" type="button" aria-expanded="false" aria-controls="c2-card-details-${chapter.id}" onclick="toggleDirectoryCard(${chapter.id})">
      <span class="c2-toggle-label">Show details</span><span class="c2-toggle-icon" aria-hidden="true">▼</span>
    </button>
    <div class="c2-card-details" id="c2-card-details-${chapter.id}" hidden>${details}</div>
  </div>`;
}

function toggleDirectoryCard(id) {
  const details = document.getElementById(`c2-card-details-${id}`);
  const button = document.querySelector(`[aria-controls="c2-card-details-${id}"]`);
  if (!details || !button) return;
  const expanded = details.hidden;
  details.hidden = !expanded;
  button.setAttribute('aria-expanded', String(expanded));
  button.querySelector('.c2-toggle-label').textContent = expanded ? 'Hide details' : 'Show details';
  button.querySelector('.c2-toggle-icon').textContent = expanded ? '▲' : '▼';
}

renderDirectory();
