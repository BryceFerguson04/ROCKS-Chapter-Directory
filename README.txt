ROCKS Multi-Page Prototype

Open index.html in a browser.

This package is a static front-end concept. It includes:
- real separate HTML pages
- responsive top navigation with dropdowns
- homepage
- mentorship overview
- become-a-mentor page
- find-a-mentor page
- how-it-works page
- programs and supporting pages
- chapters
- about/history/leadership/financials
- news/resources
- donate
- membership
- contact
- member-login handoff

The supplied ROCKS logo is displayed in the header and footer on every page from `assets/rocks-logo.png`.
All impact metrics, eligibility details, deadlines, names, and financial claims are illustrative placeholders and must be verified.

Volunteer page prototype
- The Volunteer page demonstrates a volunteer profile, sample opportunities, and a searchable coordinator roster.
- The new-member preview starts with an empty profile and application list. Returning demo accounts open their saved sample profile and activity. User-created details remain in this browser's local storage until updated; the profile form opens only when they choose a create/update action. Legacy synthetic seed profiles from earlier versions are cleared without removing user-created profiles.
- The member demo sign-in includes a first-time volunteer preview. It opens an empty profile/application view and uses separate preview-only storage so the walkthrough cannot alter the regular volunteer demo profile.
- Profiles include rank/service category, guest sponsor and waiver details, emergency contacts, certifications, screening status, conduct/release acknowledgments, and separate email/text notification consent.
- Guest volunteer applications identify their sponsoring member for coordinator hour attribution. Annual sample opportunities can be cloned from the coordinator view with the event and registration dates shifted one year, leader/duties retained, and capacity reset to the prior opportunity's full opening count.
- The coordinator view records profile access in a local demo log and omits sensitive fields from the roster table and CSV export. This is illustrative only: browser storage and simulated roles cannot enforce permissions or provide a trustworthy audit trail.
- Text opt-in and phone validation are demonstrated; the local `server.js` can send signup confirmations through Twilio when configured. Scheduled reminders, protected sensitive data, and access control require a production backend, an SMS provider integration, and server-side authorization/audit logging.
- The demo sign-in offers Member Volunteer, Non-member Volunteer, Chapter President, Chapter Leader/Admin, and President of The ROCKS views. Chapter roles are scoped to the sample chapter assigned to each account; the organization president view spans chapters. Role switching is a visual prototype only and is not authentication or access control.
- Six returning sample demo accounts have fixed credentials displayed on the demo login page, including chapter leaders for the Capital Region, Southeast, and West. Their sample profiles, opportunities, and applications are initialized into browser local storage without overwriting existing records. The first-time/new-member preview remains isolated and starts blank. This is not a real database or authentication system; credentials are visible in client-side source and must never be treated as secure.
- The ROCKS President demo can filter its organization-wide workspace to Capital Region, Southeast, West, or All Chapters. Chapter leaders see only their assigned sample chapter.
- Volunteer views show the signed-in demo profile's applications and service history. Authorized chapter administrators can review sign-ups and verify completed participation; verified event hours appear in the volunteer and impact views.
- Demo role selection is passed in the volunteer page URL so it works when this prototype is opened directly from local files; the volunteer page keeps the roster data in its own browser storage.
- Chapter administrators can approve an application or return an unverified application to Under Review; the current status is shown in the volunteer activity view.
- In an authorized chapter-admin view, each assigned opportunity shows volunteer names and application statuses, plus the number of unfilled slots. Completed service can only be verified for an approved signup after the event date.
- Profile and application changes are saved in the current browser's local storage. The roster can be exported as a CSV file that opens in spreadsheet applications such as Excel.
- Sample opportunities are synthetic. This static demo does not provide real sign-in or shared data; do not enter real, confidential, or sensitive member information.
- A production implementation requires an authenticated, permission-controlled backend integrated with ClubExpress member and chapter data. Local browser storage and CSV export are not a secure system of record.

Local Twilio signup-text preview
- Run `node .\server.js` from the project folder and open `http://127.0.0.1:4173/volunteer.html`; use this same URL for profile creation and signups.
- Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and either `TWILIO_MESSAGING_SERVICE_SID` or `TWILIO_FROM_NUMBER` in the server environment before starting it. Credentials stay on the server and must never be committed or added to browser code.
- A saved signup sends one text confirmation only when the volunteer explicitly opted in and provided an E.164 telephone number. If an opted-in volunteer changes their saved phone number, the updated number receives “Your volunteer profile has been updated.” The endpoint is bound to localhost by default, limits repeated sends to a number, and reports provider/configuration errors in the profile or signup view.
- This local endpoint does not schedule a later pre-event reminder. Public deployment requires authenticated member identity, server-verified consent, persistent rate limiting/idempotency, secure audit logging, and a scheduled messaging service; do not expose this prototype endpoint publicly.
