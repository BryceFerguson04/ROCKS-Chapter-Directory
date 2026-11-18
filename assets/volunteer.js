document.addEventListener('DOMContentLoaded', () => {
  const pageParams = new URLSearchParams(window.location.search);
  const firstTimePreview = pageParams.get('firstTime') === 'true';
  const storagePrefix = firstTimePreview ? 'rocks-first-time-preview-' : 'rocks-';
  const storageKeys = {
    profiles: `${storagePrefix}volunteer-profiles-v1`,
    opportunities: `${storagePrefix}volunteer-opportunities-v1`,
    applications: `${storagePrefix}volunteer-applications-v1`,
    currentProfile: `${storagePrefix}current-volunteer-profile-v1`,
    role: `${storagePrefix}volunteer-demo-role-v1`,
    accessLog: `${storagePrefix}volunteer-profile-access-log-v1`
  };
  if (firstTimePreview) {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(storagePrefix))
      .forEach((key) => localStorage.removeItem(key));
  }
  const legacySeededProfileIds = new Set(['demo-volunteer-1', 'demo-volunteer-2', 'demo-volunteer-3']);
  const chapterNames = ['Capital Region', 'Southeast', 'West'];
  const allChapterFilter = 'All Chapters';
  const presidentChapterKey = 'rocks-demo-president-selected-chapter-v1';
  const demoProfiles = [
    { id: 'demo-account-member', demoRole: 'member-volunteer', name: 'Jordan Member', email: 'jordan.member@example.test', memberType: 'Active', chapter: 'Capital Region', interests: ['Community service'], availability: 'Flexible', skills: 'Event support', approvedHours: 0 },
    { id: 'demo-account-guest', demoRole: 'non-member-volunteer', name: 'Taylor Guest', email: 'taylor.guest@example.test', memberType: 'Non-member guest volunteer', chapter: 'Southeast', interests: ['Community service'], availability: 'One-time event', skills: 'Community outreach', sponsorName: 'Morgan President', sponsorEmail: 'morgan.president@example.test', waiver: true, approvedHours: 0 },
    { id: 'demo-account-chapter-president', demoRole: 'chapter-president', name: 'Morgan President', email: 'morgan.president@example.test', memberType: 'Active', chapter: 'Capital Region', interests: ['Chapter administration'], availability: 'Flexible', skills: 'Chapter leadership', approvedHours: 0 },
    { id: 'demo-account-chapter-admin', demoRole: 'chapter-admin', name: 'Casey Chapter Leader', email: 'casey.leader@example.test', memberType: 'Active', chapter: 'Southeast', interests: ['Event planning'], availability: 'Recurring service', skills: 'Volunteer coordination', approvedHours: 0 },
    { id: 'demo-account-west-admin', demoRole: 'chapter-admin', name: 'Avery West Leader', email: 'avery.west@example.test', memberType: 'Active', chapter: 'West', interests: ['Event planning'], availability: 'Recurring service', skills: 'Chapter operations', approvedHours: 0 },
    { id: 'demo-account-rocks-president', demoRole: 'hr-coordinator', name: 'Riley HR Coordinator', email: 'riley.coordinator@example.test', memberType: 'Active', chapter: 'National', interests: ['Volunteer coordination'], availability: 'Flexible', skills: 'Organization-wide volunteer coordination', approvedHours: 0 }
  ];
  const demoOpportunities = [
    {
      id: 'demo-opportunity-1',
      title: 'Mentor the next generation',
      chapter: 'National',
      mission: 'Mentorship',
      description: 'Meet virtually with an Army professional for a focused career and leadership conversation.',
      outcome: 'Help an Army professional identify practical next steps for career growth.',
      date: '2026-11-12',
      startTime: '18:00',
      endTime: '20:00',
      location: 'Virtual',
      hours: 2,
      openings: 8,
      skills: 'Leadership or mentoring experience',
      leader: 'National Mentorship Committee',
      registrationDeadline: '2026-11-05',
      orientation: 'A 30-minute virtual briefing; discussion guide provided.',
      recurringAnnual: false
    },
    {
      id: 'demo-opportunity-2',
      title: 'Chapter community service day',
      chapter: 'Capital Region',
      mission: 'Community service',
      description: 'Help welcome participants and coordinate on-site activities at a local service event.',
      outcome: 'Welcome neighbors and help deliver a safe, organized community service day.',
      date: '2026-11-21',
      startTime: '09:00',
      endTime: '13:00',
      location: 'Arlington, VA',
      hours: 4,
      openings: 5,
      skills: 'Event support; all experience levels welcome',
      leader: 'Capital Region Chapter',
      registrationDeadline: '2026-11-14',
      orientation: 'Bring closed-toe shoes; event briefing at check-in.',
      recurringAnnual: true
    },
    {
      id: 'demo-opportunity-3',
      title: 'Scholarship application review',
      chapter: 'National',
      mission: 'Scholarships',
      description: 'Support a review team by organizing applications and providing consistent rubric-based feedback.',
      outcome: 'Help scholarship applicants receive timely and consistent reviews.',
      date: '2026-12-03',
      startTime: '17:00',
      endTime: '20:00',
      location: 'Virtual',
      hours: 3,
      openings: 4,
      skills: 'Attention to detail; scholarship experience helpful',
      leader: 'National Scholarship Committee',
      registrationDeadline: '2026-11-26',
      orientation: 'Confidentiality and rubric orientation required.',
      recurringAnnual: true
    },
    {
      id: 'demo-opportunity-southeast',
      title: 'Southeast chapter outreach day',
      chapter: 'Southeast',
      mission: 'Community service',
      description: 'Support a chapter outreach event and welcome local community members.',
      outcome: 'Connect neighbors with local service and mentoring resources.',
      date: '2026-11-18',
      startTime: '10:00',
      endTime: '14:00',
      location: 'Atlanta, GA',
      hours: 4,
      openings: 12,
      skills: 'All experience levels welcome',
      leader: 'Southeast Chapter',
      registrationDeadline: '2026-11-12',
      orientation: 'Volunteer briefing at check-in.',
      recurringAnnual: false
    },
    {
      id: 'demo-opportunity-west',
      title: 'West chapter mentoring session',
      chapter: 'West',
      mission: 'Mentorship',
      description: 'Help coordinate a regional mentoring and career development session.',
      outcome: 'Connect participants with practical leadership and career guidance.',
      date: '2026-11-24',
      startTime: '16:00',
      endTime: '19:00',
      location: 'Phoenix, AZ',
      hours: 3,
      openings: 10,
      skills: 'Mentoring or event support',
      leader: 'West Chapter',
      registrationDeadline: '2026-11-17',
      orientation: 'Virtual orientation link provided after signup.',
      recurringAnnual: false
    },
    {
      id: 'demo-opportunity-history-capital',
      title: 'Capital Region service project',
      chapter: 'Capital Region',
      mission: 'Community service',
      description: 'A completed sample volunteer activity for the demo member history.',
      outcome: 'Support a local community service effort.',
      date: '2026-10-10',
      startTime: '09:00',
      endTime: '12:00',
      location: 'Arlington, VA',
      hours: 3,
      openings: 20,
      skills: 'All experience levels welcome',
      leader: 'Capital Region Chapter',
      registrationDeadline: '2026-10-05',
      orientation: 'Completed sample activity.',
      recurringAnnual: false
    },
    {
      id: 'demo-opportunity-history-southeast',
      title: 'Southeast community welcome event',
      chapter: 'Southeast',
      mission: 'Community service',
      description: 'A completed sample guest volunteer activity.',
      outcome: 'Welcome community members and share local resources.',
      date: '2026-10-17',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Atlanta, GA',
      hours: 2,
      openings: 20,
      skills: 'All experience levels welcome',
      leader: 'Southeast Chapter',
      registrationDeadline: '2026-10-12',
      orientation: 'Completed sample activity.',
      recurringAnnual: false
    }
  ];
  const demoApplications = [
    { id: 'demo-application-member-history', profileId: 'demo-account-member', opportunityId: 'demo-opportunity-history-capital', status: 'Approved', submittedAt: '2026-10-01T12:00:00.000Z', reviewedAt: '2026-10-02T12:00:00.000Z', completionVerified: true, verifiedAt: '2026-10-10T18:00:00.000Z', verifiedBy: 'Chapter President' },
    { id: 'demo-application-guest-history', profileId: 'demo-account-guest', opportunityId: 'demo-opportunity-history-southeast', status: 'Approved', submittedAt: '2026-10-08T12:00:00.000Z', reviewedAt: '2026-10-09T12:00:00.000Z', completionVerified: false, verifiedAt: '', verifiedBy: '' },
    { id: 'demo-application-open-capital', profileId: 'demo-account-member', opportunityId: 'demo-opportunity-2', status: 'Submitted', submittedAt: '2026-11-02T15:00:00.000Z', completionVerified: false, verifiedAt: '', verifiedBy: '' },
    { id: 'demo-application-west-admin', profileId: 'demo-account-west-admin', opportunityId: 'demo-opportunity-west', status: 'Submitted', submittedAt: '2026-11-02T16:00:00.000Z', completionVerified: false, verifiedAt: '', verifiedBy: '' }
  ];
  const form = document.querySelector('#volunteer-form');
  const profileFeedback = document.querySelector('#profile-feedback');
  const profileIdInput = document.querySelector('#profile-id');
  const rosterBody = document.querySelector('#roster-body');
  const rosterSearch = document.querySelector('#roster-search');
  const opportunityList = document.querySelector('#opportunity-list');
  const opportunityEmpty = document.querySelector('#opportunity-empty');
  const rosterEmpty = document.querySelector('#roster-empty');
  let profiles;
  let opportunities;
  let applications;
  let currentProfileId;
  let demoRole;
  let accessLog;
  let pendingSmsRequest;
  let pendingProfileSmsRequest;
  let editingVolunteerProfile = false;
  let adminEditingProfile = false;
  let presidentSelectedChapter = localStorage.getItem(presidentChapterKey) || allChapterFilter;
  const roleLabels = {
    'member-volunteer': 'Member Volunteer',
    'non-member-volunteer': 'Non-member Volunteer',
    'chapter-president': 'Chapter President',
    'chapter-admin': 'Chapter Leader / Admin',
    'hr-coordinator': 'HR Coordinator'
  };
  const normalizeRole = (role) => ({
    volunteer: 'member-volunteer',
    coordinator: 'chapter-admin',
    'rocks-president': 'hr-coordinator'
  })[role] || (Object.hasOwn(roleLabels, role) ? role : '');
  const isVolunteerRole = () => demoRole === 'member-volunteer' || demoRole === 'non-member-volunteer';
  const isChapterAdmin = () => demoRole === 'chapter-president' || demoRole === 'chapter-admin';
  const isOrgWideRole = () => demoRole === 'hr-coordinator';
  const isAdminRole = () => isChapterAdmin() || isOrgWideRole();
  const canFinalizeVolunteerActivity = () => demoRole === 'chapter-president' || isOrgWideRole();
  const canManageChapterAdmins = () => demoRole === 'chapter-president' || isOrgWideRole();
  const canManageChapterReports = () => canFinalizeVolunteerActivity();
  const isOpportunityPublished = (opportunity) => !opportunity.approvalStatus || opportunity.approvalStatus === 'Published';
  const currentAdminChapter = () => isChapterAdmin()
    ? findCurrentProfile()?.chapter || 'Capital Region'
    : presidentSelectedChapter;
  const chapterIsInScope = (chapter) => isOrgWideRole()
    ? presidentSelectedChapter === allChapterFilter || chapter === presidentSelectedChapter
    : isChapterAdmin() && chapter === currentAdminChapter();
  const canAccessProfile = (profile) => chapterIsInScope(profile.chapter);
  const canManageOpportunity = (opportunity) => chapterIsInScope(opportunity.chapter);
  const canApproveOpportunity = (opportunity) => canFinalizeVolunteerActivity() && canManageOpportunity(opportunity);
  const verifiedHoursForProfile = (profileId) => applications.reduce((hours, application) => {
    if (application.profileId !== profileId || !application.completionVerified) return hours;
    const opportunity = opportunities.find((item) => item.id === application.opportunityId);
    return hours + (opportunity ? Number(opportunity.hours) || 0 : 0);
  }, 0);

  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);

  const readList = (key, defaults) => {
    const saved = localStorage.getItem(key);
    if (saved === null) {
      localStorage.setItem(key, JSON.stringify(defaults));
      return defaults;
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      throw new Error(`Saved volunteer data for ${key} is not in the expected format.`);
    }
    return parsed;
  };

  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const findCurrentProfile = () => profiles.find((profile) => profile.id === currentProfileId);

  const renderSavedProfile = () => {
    const profile = findCurrentProfile();
    const savedProfile = document.querySelector('#saved-profile');
    const details = document.querySelector('#saved-profile-details');
    savedProfile.hidden = !profile || editingVolunteerProfile || adminEditingProfile;
    if (!profile) {
      details.replaceChildren();
      return;
    }
    const displayValue = (value) => Array.isArray(value) ? value.join(', ') : value || 'Not provided';
    const fields = [
      ['Full name', profile.name],
      ['Member type', profile.memberType],
      ['Email', profile.email],
      ['Telephone', profile.phone],
      ['Chapter', profile.chapter],
      ['City', profile.city],
      ['State', profile.state],
      ['Time zone', profile.timeZone],
      ['Service category', profile.serviceCategory],
      ['Rank / professional category', profile.rank],
      ['Sponsoring member', profile.memberType === 'Non-member guest volunteer'
        ? [profile.sponsorName, profile.sponsorEmail].filter(Boolean).join(' · ')
        : 'Not applicable'],
      ['Guest waiver', profile.memberType === 'Non-member guest volunteer' ? profile.waiver ? 'Acknowledged' : 'Not acknowledged' : 'Not applicable'],
      ['Emergency contact', [profile.emergencyContactName, profile.emergencyContactPhone].filter(Boolean).join(' · ')],
      ['Certifications', profile.certifications],
      ['Background screening', profile.screeningStatus],
      ['Code of conduct', profile.conductAcknowledged ? 'Acknowledged' : 'Not acknowledged'],
      ['Liability / photo release', profile.releaseAcknowledged ? 'Acknowledged' : 'Not acknowledged'],
      ['Interests', profile.interests],
      ['Skills and experience', profile.skills],
      ['Availability', profile.availability],
      ['Hours available per month', profile.hoursAvailable],
      ['Service modes', profile.serviceModes],
      ['Email notifications', profile.notifications ? 'Opted in' : 'Not opted in'],
      ['Text-message confirmations', profile.smsNotifications ? `Opted in${profile.phone ? ` · ${profile.phone}` : ''}` : 'Not opted in']
    ];
    details.innerHTML = fields.map(([label, value]) => `<div class="saved-profile-item">
      <dt>${escapeHtml(label)}</dt><dd>${escapeHtml(displayValue(value))}</dd>
    </div>`).join('');
  };

  const profileCompletion = (profile) => {
    if (!profile) return 0;
    const completed = [
      profile.name,
      profile.memberType,
      profile.email,
      profile.chapter,
      profile.interests && profile.interests.length,
      profile.availability,
      profile.skills
    ].filter(Boolean).length;
    return Math.round((completed / 7) * 100);
  };

  const renderStats = () => {
    const scopedProfiles = isAdminRole() ? profiles.filter(canAccessProfile) : profiles;
    const scopedOpportunities = opportunities.filter((opportunity) =>
      isOpportunityPublished(opportunity) && (!isAdminRole() || canManageOpportunity(opportunity))
    );
    const verifiedHours = applications.reduce((hours, application) => {
      const opportunity = opportunities.find((item) => item.id === application.opportunityId);
      if (!application.completionVerified || !opportunity
        || (isAdminRole() && !canManageOpportunity(opportunity))) return hours;
      return hours + (Number(opportunity.hours) || 0);
    }, 0);
    document.querySelector('#volunteer-count').textContent = String(scopedProfiles.length);
    const previouslyRecordedHours = scopedProfiles.reduce(
      (hours, profile) => hours + (Number(profile.approvedHours) || 0),
      0
    );
    document.querySelector('#hours-count').textContent = String(previouslyRecordedHours + verifiedHours);
    document.querySelector('#opportunity-count').textContent = String(scopedOpportunities.length);
  };

  const renderOpportunities = () => {
    const currentApplications = applications.filter((application) => application.profileId === currentProfileId);
    const visibleOpportunities = isAdminRole()
      ? opportunities.filter((opportunity) => canManageOpportunity(opportunity) && isOpportunityPublished(opportunity))
      : opportunities.filter(isOpportunityPublished);
    opportunityList.innerHTML = visibleOpportunities.map((opportunity) => {
      const applicantCount = applications.filter((application) => application.opportunityId === opportunity.id).length;
      const alreadyApplied = currentApplications.some((application) => application.opportunityId === opportunity.id);
      const full = applicantCount >= Number(opportunity.openings);
      const coordinatorMode = isAdminRole() && canManageOpportunity(opportunity);
      const buttonLabel = coordinatorMode
        ? 'Chapter activity view'
        : alreadyApplied ? 'Application received' : full ? 'Opportunity full' : 'Volunteer Now';
      const disabled = coordinatorMode
        ? false
        : isAdminRole() || (isVolunteerRole() && (alreadyApplied || full));
      const applicants = applications.filter((application) => application.opportunityId === opportunity.id);
      const applicantContent = applicants.length
        ? applicants.map((application) => {
          const profile = profiles.find((item) => item.id === application.profileId);
          return `<li><strong>${escapeHtml(profile ? profile.name : 'Unknown volunteer')}</strong><span>${escapeHtml(application.status || 'Submitted')}</span></li>`;
        }).join('')
        : '<li class="opportunity-no-applicants">No one has signed up yet.</li>';
      const openingsLeft = Math.max(0, Number(opportunity.openings) - applicantCount);
      return `<article class="opportunity-card">
        <span class="opportunity-tag">${escapeHtml(opportunity.mission)} · ${escapeHtml(opportunity.chapter)}</span>
        <h3>${escapeHtml(opportunity.title)}</h3>
        <p>${escapeHtml(opportunity.description)} ${escapeHtml(opportunity.outcome ? `Who benefits: ${opportunity.outcome}` : '')}</p>
        <ul class="opportunity-details">
          <li><strong>Sponsored by:</strong> ${escapeHtml(opportunity.chapter)}</li>
          <li><strong>Mission area:</strong> ${escapeHtml(opportunity.mission)}</li>
          <li><strong>Date and time:</strong> ${escapeHtml(opportunity.date)} · ${escapeHtml(opportunity.startTime || 'Time TBD')}–${escapeHtml(opportunity.endTime || '')}</li>
          <li><strong>Location:</strong> ${escapeHtml(opportunity.location)}</li>
          <li><strong>Time commitment:</strong> ${escapeHtml(opportunity.hours)} estimated service hours</li>
          <li><strong>Volunteer leader:</strong> ${escapeHtml(opportunity.leader || 'To be announced')}</li>
          <li><strong>Register by:</strong> ${escapeHtml(opportunity.registrationDeadline || 'See coordinator')}</li>
          <li><strong>Qualifications:</strong> ${escapeHtml(opportunity.skills)}</li>
          <li><strong>Orientation / documents:</strong> ${escapeHtml(opportunity.orientation || 'None specified')}</li>
          <li><strong>Openings:</strong> ${openingsLeft} of ${escapeHtml(opportunity.openings)} available</li>
          ${opportunity.recurringAnnual ? '<li><strong>Recurring:</strong> Annual event</li>' : ''}
        </ul>
        <button class="btn btn-dark" type="button" ${coordinatorMode ? `data-opportunity-applicants="${escapeHtml(opportunity.id)}" aria-expanded="false" aria-controls="applicants-${escapeHtml(opportunity.id)}"` : `data-apply="${escapeHtml(opportunity.id)}"`} ${disabled ? 'disabled' : ''}>${buttonLabel}</button>
        ${coordinatorMode && opportunity.recurringAnnual ? `<button class="btn btn-outline clone-opportunity" type="button" data-clone-opportunity="${escapeHtml(opportunity.id)}">Clone for next year</button>` : ''}
        ${coordinatorMode ? `<div class="opportunity-applicants" id="applicants-${escapeHtml(opportunity.id)}" hidden>
          <h4>Signed up · ${applicantCount}</h4>
          <p><strong>${openingsLeft}</strong> ${openingsLeft === 1 ? 'slot' : 'slots'} left</p>
          <ul>${applicantContent}</ul>
        </div>` : ''}
      </article>`;
    }).join('');
    opportunityEmpty.hidden = visibleOpportunities.length > 0;
  };

  const renderRoster = () => {
    const query = rosterSearch.value.trim().toLocaleLowerCase();
    const scopedProfiles = profiles.filter(canAccessProfile);
    const filteredProfiles = scopedProfiles.filter((profile) => [
      profile.name, profile.email, profile.chapter, profile.interests.join(' '), profile.skills
    ].join(' ').toLocaleLowerCase().includes(query));
    rosterBody.innerHTML = filteredProfiles.map((profile) => `<tr>
      <td><strong>${escapeHtml(profile.name)}</strong><br>${escapeHtml(profile.city)}${profile.city && profile.state ? ', ' : ''}${escapeHtml(profile.state)}</td>
      <td>${escapeHtml(profile.memberType)}</td>
      <td>${escapeHtml(profile.chapter || '—')}</td>
      <td>${escapeHtml(profile.interests.join(', ') || '—')}</td>
      <td>${escapeHtml(profile.availability || '—')}${profile.hoursAvailable ? `<br>${escapeHtml(profile.hoursAvailable)} hrs/month` : ''}</td>
      <td class="roster-contact"><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>${profile.phone ? `<a href="tel:${escapeHtml(profile.phone)}">${escapeHtml(profile.phone)}</a>` : ''}</td>
      <td><button class="btn btn-dark" type="button" data-edit-profile="${escapeHtml(profile.id)}">Edit</button></td>
    </tr>`).join('');
    rosterEmpty.hidden = filteredProfiles.length > 0;
    document.querySelector('#roster-summary').textContent =
      `Showing ${filteredProfiles.length} of ${scopedProfiles.length} volunteer${scopedProfiles.length === 1 ? '' : 's'} in ${isOrgWideRole() ? presidentSelectedChapter.toLowerCase() : currentAdminChapter()}.`;
  };

  const renderChapterAdminAssignments = () => {
    const body = document.querySelector('#chapter-admin-body');
    const empty = document.querySelector('#chapter-admin-empty');
    if (!canManageChapterAdmins()) {
      body.innerHTML = '';
      empty.hidden = true;
      return;
    }
    const eligibleProfiles = profiles.filter((profile) => canAccessProfile(profile)
      && profile.id !== currentProfileId
      && profile.memberType !== 'Non-member guest volunteer'
      && ['member-volunteer', 'chapter-admin'].includes(profile.demoRole));
    body.innerHTML = eligibleProfiles.map((profile) => {
      const isChapterLeader = profile.demoRole === 'chapter-admin';
      return `<tr>
        <td>${escapeHtml(profile.name)}</td>
        <td>${escapeHtml(profile.chapter)}</td>
        <td>${isChapterLeader ? 'Chapter Leader / Admin' : 'Volunteer'}</td>
        <td><button class="btn ${isChapterLeader ? 'btn-outline' : 'btn-dark'}" type="button" data-chapter-admin-action="${isChapterLeader ? 'remove' : 'appoint'}" data-profile-id="${escapeHtml(profile.id)}">${isChapterLeader ? 'Remove chapter admin' : 'Appoint chapter admin'}</button></td>
      </tr>`;
    }).join('');
    empty.hidden = eligibleProfiles.length > 0;
  };

  const getChapterReportRows = () => chapterNames
    .filter(chapterIsInScope)
    .map((chapter) => {
      const chapterProfiles = profiles.filter((profile) => profile.chapter === chapter);
      const chapterOpportunities = opportunities.filter((opportunity) =>
        opportunity.chapter === chapter && isOpportunityPublished(opportunity)
      );
      const chapterOpportunityIds = new Set(chapterOpportunities.map((opportunity) => opportunity.id));
      const chapterApplications = applications.filter((application) =>
        chapterOpportunityIds.has(application.opportunityId)
      );
      const serviceHours = chapterProfiles.reduce((total, profile) =>
        total + (Number(profile.approvedHours) || 0) + verifiedHoursForProfile(profile.id), 0
      );
      return {
        chapter,
        volunteers: chapterProfiles.length,
        opportunities: chapterOpportunities.length,
        applications: chapterApplications.length,
        serviceHours
      };
    });

  const renderChapterReport = () => {
    const rows = getChapterReportRows();
    document.querySelector('#chapter-report-body').innerHTML = rows.map((row) => `<tr>
      <td>${escapeHtml(row.chapter)}</td>
      <td>${row.volunteers}</td>
      <td>${row.opportunities}</td>
      <td>${row.applications}</td>
      <td>${row.serviceHours}</td>
    </tr>`).join('');
    document.querySelector('#chapter-report-summary').textContent = rows.length > 1
      ? `Organization-wide snapshot across ${rows.length} chapters.`
      : rows.length ? `Chapter snapshot for ${rows[0].chapter}.` : 'No chapter report is available for this selection.';
  };

  const renderPendingOpportunities = () => {
    const reviewSection = document.querySelector('#pending-opportunity-review');
    const list = document.querySelector('#pending-opportunity-list');
    const pending = opportunities.filter((opportunity) =>
      opportunity.approvalStatus === 'Pending' && canManageOpportunity(opportunity)
    );
    reviewSection.hidden = !isAdminRole();
    list.innerHTML = pending.map((opportunity) => `<article class="pending-opportunity">
      <div>
        <span class="opportunity-tag">${escapeHtml(opportunity.chapter)} · ${escapeHtml(opportunity.mission)}</span>
        <h4>${escapeHtml(opportunity.title)}</h4>
        <p>${escapeHtml(opportunity.description)}</p>
        <p class="profile-small">${escapeHtml(opportunity.date)} · ${escapeHtml(opportunity.location)} · ${escapeHtml(opportunity.hours)} hours</p>
      </div>
      ${canApproveOpportunity(opportunity)
        ? `<div class="pending-opportunity-actions">
          <button class="btn btn-gold" type="button" data-opportunity-review="approve" data-opportunity-id="${escapeHtml(opportunity.id)}">Approve & publish</button>
          <button class="btn btn-outline" type="button" data-opportunity-review="reject" data-opportunity-id="${escapeHtml(opportunity.id)}">Reject</button>
        </div>`
        : '<p class="profile-small">Waiting for Chapter President or HR Coordinator approval.</p>'}
    </article>`).join('');
    document.querySelector('#pending-opportunity-empty').hidden = pending.length > 0;
  };

  const renderAccessLog = () => {
    const body = document.querySelector('#access-log-body');
    const scopedLog = accessLog.filter((entry) => isOrgWideRole()
      ? presidentSelectedChapter === allChapterFilter || entry.chapter === presidentSelectedChapter
      : entry.chapter === currentAdminChapter());
    body.innerHTML = scopedLog.slice().reverse().map((entry) => `<tr>
      <td>${escapeHtml(new Date(entry.at).toLocaleString())}</td>
      <td>${escapeHtml(entry.role)}</td>
      <td>${escapeHtml(entry.action)}</td>
      <td>${escapeHtml(entry.name)}</td>
    </tr>`).join('');
  };

  const logProfileAccess = (action, profile) => {
    accessLog.push({ at: new Date().toISOString(), role: roleLabels[demoRole], chapter: profile.chapter, action, name: profile.name });
    accessLog = accessLog.slice(-100);
    save(storageKeys.accessLog, accessLog);
    renderAccessLog();
  };

  const sendSignupText = () => {
    if (!pendingSmsRequest) return;
    const smsFeedback = document.querySelector('#signup-sms-status');
    const retryButton = document.querySelector('#signup-sms-retry');
    retryButton.hidden = true;
    smsFeedback.textContent = 'Sending your text confirmation…';
    fetch('/api/volunteer-reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pendingSmsRequest)
    }).then(async (response) => {
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error(`The SMS service returned HTTP ${response.status}.`);
      }
      if (!response.ok) throw new Error(result.error || `The SMS service returned HTTP ${response.status}.`);
      smsFeedback.textContent = 'Your text confirmation has been queued for delivery.';
    }).catch((error) => {
      console.error('Volunteer text confirmation failed.', error);
      smsFeedback.textContent = `Text confirmation was not sent: ${error.message}`;
      retryButton.hidden = false;
    });
  };

  const sendProfileUpdatedText = () => {
    if (!pendingProfileSmsRequest) return;
    const status = document.querySelector('#saved-profile-status');
    const retryButton = document.querySelector('#profile-sms-retry');
    retryButton.hidden = true;
    status.textContent = 'Profile saved. Sending an update text to your new number…';
    status.hidden = false;
    fetch('/api/volunteer-reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pendingProfileSmsRequest)
    }).then(async (response) => {
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error(`The SMS service returned HTTP ${response.status}.`);
      }
      if (!response.ok) throw new Error(result.error || `The SMS service returned HTTP ${response.status}.`);
      status.textContent = 'Profile updated and saved. A confirmation text was queued for your new number.';
    }).catch((error) => {
      console.error('Profile update text failed.', error);
      status.textContent = `Profile updated and saved, but the text was not sent: ${error.message}`;
      retryButton.hidden = false;
    });
  };

  const renderApplications = () => {
    const visibleApplications = applications.filter((application) => {
      const opportunity = opportunities.find((item) => item.id === application.opportunityId);
      return isAdminRole() && opportunity && canManageOpportunity(opportunity);
    });
    document.querySelector('#application-body').innerHTML = visibleApplications.map((application) => {
      const profile = profiles.find((item) => item.id === application.profileId);
      const opportunity = opportunities.find((item) => item.id === application.opportunityId);
      const status = application.status || 'Submitted';
      const approved = status === 'Approved';
      const decision = application.completionVerified
        ? 'Approved'
        : canFinalizeVolunteerActivity()
          ? `<button class="btn ${approved ? 'btn-outline' : 'btn-dark'}" type="button" data-application-action="${approved ? 'unapprove' : 'approve'}" data-application-id="${escapeHtml(application.id)}">${approved ? 'Unapprove' : 'Approve'}</button>`
          : approved ? 'Approved' : 'Chapter President or HR Coordinator approval required';
      const verification = application.completionVerified
        ? `Verified by ${escapeHtml(application.verifiedBy || 'chapter leader')}<br>${escapeHtml(application.verifiedAt ? new Date(application.verifiedAt).toLocaleDateString() : '')}`
        : !canFinalizeVolunteerActivity()
          ? 'Chapter President or HR Coordinator verification required'
        : approved
          && opportunity && opportunity.date <= new Date().toISOString().slice(0, 10)
          ? `<button class="btn btn-outline" type="button" data-application-action="verify" data-application-id="${escapeHtml(application.id)}">Verify completed service</button>`
          : approved
            ? `Available after the event${opportunity && opportunity.date ? ` (${escapeHtml(opportunity.date)})` : ''}`
          : 'Approve signup first';
      return `<tr>
      <td>${escapeHtml(profile ? profile.name : 'Unknown volunteer')}</td>
      <td>${escapeHtml(opportunity ? opportunity.title : 'Opportunity no longer available')}</td>
      <td>${escapeHtml(opportunity ? opportunity.chapter : '—')}</td>
      <td><span class="application-status" data-status="${escapeHtml(status)}">${escapeHtml(status)}</span></td>
      <td>${escapeHtml(profile && profile.memberType === 'Non-member guest volunteer'
        ? profile.sponsorName || profile.sponsorEmail || 'Sponsoring member'
        : '—')}</td>
      <td>${escapeHtml(application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : '—')}</td>
      <td>${decision}</td>
      <td>${verification}</td>
    </tr>`;
    }).join('');
    document.querySelector('#application-empty').hidden = visibleApplications.length > 0;
  };

  const renderMemberDashboard = () => {
    const profile = findCurrentProfile();
    if (!profile) return;
    const memberApplications = applications.filter((application) => application.profileId === currentProfileId);
    const pendingApplications = memberApplications.filter((application) =>
      ['Submitted', 'Under Review', 'Information Needed'].includes(application.status)
    );
    document.querySelector('#member-dashboard-name').textContent = profile.name.split(' ')[0];
    document.querySelector('#member-applications-count').textContent = String(memberApplications.length);
    document.querySelector('#member-pending-count').textContent = String(pendingApplications.length);
    document.querySelector('#member-approved-hours').textContent = String(
      (Number(profile.approvedHours) || 0) + verifiedHoursForProfile(profile.id)
    );
    document.querySelector('#member-profile-completion').textContent = `${profileCompletion(profile)}%`;
    const latestDecision = memberApplications
      .filter((application) => application.reviewedAt)
      .sort((first, second) => new Date(second.reviewedAt) - new Date(first.reviewedAt))[0];
    const statusUpdate = document.querySelector('#member-status-update');
    if (latestDecision) {
      const opportunity = opportunities.find((item) => item.id === latestDecision.opportunityId);
      const opportunityName = opportunity ? opportunity.title : 'your volunteer opportunity';
      const approved = latestDecision.status === 'Approved';
      document.querySelector('#member-status-title').textContent = approved
        ? 'Your application has been approved'
        : 'Your application is not approved yet';
      document.querySelector('#member-status-message').textContent = approved
        ? `You’re confirmed for ${opportunityName}. We look forward to seeing you soon.`
        : `Your application for ${opportunityName} has been returned to Under Review.`;
      document.querySelector('#member-status-date').textContent =
        `Updated ${new Date(latestDecision.reviewedAt).toLocaleString()}`;
      statusUpdate.dataset.status = approved ? 'approved' : 'review';
      statusUpdate.hidden = false;
    } else {
      statusUpdate.hidden = true;
    }
    const applicationList = document.querySelector('#member-application-list');
    applicationList.innerHTML = memberApplications.length ? memberApplications.map((application) => {
      const opportunity = opportunities.find((item) => item.id === application.opportunityId);
      const status = application.status || 'Submitted';
      const verification = application.completionVerified
        ? `Service verified${application.verifiedAt ? ` on ${new Date(application.verifiedAt).toLocaleDateString()}` : ''}`
        : opportunity && opportunity.date < new Date().toISOString().slice(0, 10)
          ? 'Past activity · awaiting completion verification'
          : 'Completion not yet recorded';
      return `<div class="member-application">
        <div><strong>${escapeHtml(opportunity ? opportunity.title : 'Volunteer opportunity')}</strong>
        <span>${escapeHtml(opportunity ? opportunity.date : '')}${opportunity ? ` · ${escapeHtml(opportunity.chapter)}` : ''}</span>
        <span>${escapeHtml(verification)}</span></div>
        <span class="application-status">${escapeHtml(status)}</span>
      </div>`;
    }).join('') : '<p class="empty-state">No applications yet. Browse opportunities when you are ready to help.</p>';
  };

  const renderRole = () => {
    const hasRole = Boolean(roleLabels[demoRole]);
    const isVolunteer = isVolunteerRole();
    const isAdmin = isAdminRole();
    document.querySelector('#demo-session').hidden = !hasRole;
    document.querySelector('#role-prompt').hidden = hasRole;
    document.querySelector('#demo-session-role').textContent = roleLabels[demoRole] || '';
    const profileAction = document.querySelector('#demo-profile-action');
    profileAction.hidden = !isVolunteer;
    profileAction.textContent = findCurrentProfile() ? 'Update my profile' : 'Create my profile';
    document.querySelector('#my-activity').hidden = !isVolunteer || !findCurrentProfile();
    document.querySelector('#volunteer-profile').hidden = !isVolunteer && !adminEditingProfile;
    document.querySelector('#coordinator').hidden = !isAdmin;
    const chapterFilterWrap = document.querySelector('#president-chapter-filter-wrap');
    chapterFilterWrap.hidden = !isOrgWideRole();
    document.querySelector('#president-chapter-filter').value = presidentSelectedChapter;
    document.querySelector('#workspace-role-scope').textContent = isOrgWideRole()
      ? `HR Coordinator view: organization-wide oversight. Current chapter filter: ${presidentSelectedChapter}.`
      : demoRole === 'chapter-president'
        ? `Chapter President view for ${currentAdminChapter()}: final approval and chapter-admin assignment permissions.`
        : `${roleLabels[demoRole] || 'Chapter administrator'} view: assigned to ${currentAdminChapter()} only. Other chapters’ volunteer records and activity are not shown in this workspace.`;
    document.querySelector('#coordinator .section-head h2').textContent = isOrgWideRole()
      ? 'Organization-wide volunteer coordination.'
      : `${currentAdminChapter()} chapter volunteer workspace.`;
    document.querySelector('#coordinator .section-head p').textContent = isOrgWideRole()
      ? 'Review volunteer records and activity across ROCKS chapters, manage chapter access, and provide organization-wide oversight.'
      : canFinalizeVolunteerActivity()
        ? `Manage ${currentAdminChapter()} volunteers and opportunities, make final application decisions, verify service, and appoint chapter admins.`
        : `Coordinate ${currentAdminChapter()} volunteers and opportunities. Chapter Presidents approve applications and verify completed service.`;
    document.querySelector('#chapter-admin-management').hidden = !canManageChapterAdmins();
    document.querySelector('#chapter-reports').hidden = !canManageChapterReports();
    document.querySelector('#opportunity-request-form').hidden = !isAdmin;
    document.querySelector('#pending-opportunity-review').hidden = !isAdmin;
    document.querySelector('#export-chapter-report').hidden = !canManageChapterReports();
    const opportunityChapter = document.querySelector('#opportunity-chapter');
    opportunityChapter.innerHTML = chapterNames.filter(chapterIsInScope)
      .map((chapter) => `<option value="${escapeHtml(chapter)}">${escapeHtml(chapter)}</option>`).join('');
    if (isChapterAdmin()) opportunityChapter.disabled = true;
    else opportunityChapter.disabled = false;
    if (isAdmin) {
      opportunityChapter.value = isChapterAdmin() ? currentAdminChapter()
        : chapterNames.includes(presidentSelectedChapter) ? presidentSelectedChapter : chapterNames[0];
    }
    document.querySelector('#volunteer-profile .profile-intro h2').textContent = isVolunteer
      ? findCurrentProfile() ? 'Update your volunteer profile.' : 'Create your volunteer profile.'
      : 'Update volunteer profile.';
    if (isVolunteer && !findCurrentProfile() && !adminEditingProfile) {
      form.elements.memberType.value = demoRole === 'non-member-volunteer'
        ? 'Non-member guest volunteer'
        : form.elements.memberType.value || 'Active';
    }
    form.elements.memberType.disabled = demoRole === 'non-member-volunteer';
    form.querySelector('[type="submit"]').textContent = findCurrentProfile()
      ? 'Save changes and finish'
      : 'Create volunteer profile';
    form.hidden = Boolean(findCurrentProfile()) && !editingVolunteerProfile && !adminEditingProfile;
    document.querySelector('#cancel-profile-update').hidden = !editingVolunteerProfile;
    document.querySelector('#profile-reset').hidden = editingVolunteerProfile;
    renderSavedProfile();
    updateFormValidation();
    renderOpportunities();
    renderRoster();
    renderApplications();
    renderAccessLog();
    if (isVolunteer) renderMemberDashboard();
    renderChapterAdminAssignments();
    renderChapterReport();
    renderPendingOpportunities();
  };

  const updateProgress = () => {
    const completed = [
      form.elements.name.value.trim(),
      form.elements.email.value.trim(),
      form.elements.memberType.value,
      form.elements.chapter.value.trim(),
      form.querySelectorAll('input[name="interests"]:checked').length,
      form.elements.availability.value,
      form.elements.skills.value.trim()
    ].filter(Boolean).length;
    const percentage = Math.round((completed / 7) * 100);
    const progress = document.querySelector('#profile-progress');
    progress.setAttribute('aria-valuenow', String(percentage));
    progress.querySelector('span').style.width = `${percentage}%`;
    document.querySelector('#profile-progress-label').textContent = `${percentage}%`;
  };

  const updateFormValidation = () => {
    const administratorEditing = isAdminRole() && adminEditingProfile;
    form.noValidate = administratorEditing;
    const isGuest = form.elements.memberType.value === 'Non-member guest volunteer';
    if (!isGuest) {
      form.elements.sponsorName.value = '';
      form.elements.sponsorEmail.value = '';
      form.elements.waiver.checked = false;
    }
    document.querySelector('#guest-fields').hidden = !isGuest;
    form.elements.sponsorName.required = isGuest && !administratorEditing;
    form.elements.sponsorEmail.required = isGuest && !administratorEditing;
    form.elements.waiver.required = isGuest && !administratorEditing;
    form.elements.phone.required = form.elements.smsNotifications.checked && !administratorEditing;
    form.elements.phone.pattern = form.elements.smsNotifications.checked ? '\\+[1-9][0-9]{7,14}' : '';
    document.querySelector('#profile-form-hint').textContent = administratorEditing
      ? 'You can save updates to an incomplete profile for your authorized chapter scope.'
      : 'Fields marked with * are required. Please fill in your own information; details are not prefilled.';
    document.querySelector('#sms-status').textContent = form.elements.smsNotifications.checked
      ? 'Opt-in and your international-format phone number will be saved. SMS provider pricing and recipient message/data rates may apply; confirm costs before production use.'
      : 'You can opt in to receive a text confirmation after signing up. Provider pricing and recipient message/data rates may apply.';
  };

  const setForm = (profile) => {
    form.elements.name.value = profile.name || '';
    form.elements.memberType.value = profile.memberType || '';
    form.elements.email.value = profile.email || '';
    form.elements.phone.value = profile.phone || '';
    form.elements.chapter.value = profile.chapter || '';
    form.elements.city.value = profile.city || '';
    form.elements.state.value = profile.state || '';
    form.elements.timeZone.value = profile.timeZone || '';
    form.elements.serviceCategory.value = profile.serviceCategory || '';
    form.querySelectorAll('select[name="rank"] option[data-legacy-rank]').forEach((option) => option.remove());
    form.elements.rank.value = profile.rank || '';
    if (profile.rank && !form.elements.rank.value) {
      const legacyRank = document.createElement('option');
      legacyRank.value = profile.rank;
      legacyRank.textContent = `Previously entered: ${profile.rank}`;
      legacyRank.dataset.legacyRank = 'true';
      form.elements.rank.append(legacyRank);
      form.elements.rank.value = profile.rank;
    }
    form.elements.sponsorName.value = profile.sponsorName || '';
    form.elements.sponsorEmail.value = profile.sponsorEmail || '';
    form.elements.waiver.checked = Boolean(profile.waiver);
    form.elements.emergencyContactName.value = profile.emergencyContactName || '';
    form.elements.emergencyContactPhone.value = profile.emergencyContactPhone || '';
    form.elements.certifications.value = profile.certifications || '';
    form.elements.screeningStatus.value = profile.screeningStatus || 'Not required';
    form.elements.conductAcknowledged.checked = Boolean(profile.conductAcknowledged);
    form.elements.releaseAcknowledged.checked = Boolean(profile.releaseAcknowledged);
    form.elements.skills.value = profile.skills || '';
    form.elements.availability.value = profile.availability || '';
    form.elements.hoursAvailable.value = profile.hoursAvailable || '';
    form.elements.notifications.checked = Boolean(profile.notifications);
    form.elements.smsNotifications.checked = Boolean(profile.smsNotifications);
    profileIdInput.value = profile.id;
    form.querySelectorAll('input[name="interests"]').forEach((input) => {
      input.checked = profile.interests.includes(input.value);
    });
    form.querySelectorAll('input[name="serviceModes"]').forEach((input) => {
      input.checked = profile.serviceModes.includes(input.value);
    });
    updateProgress();
    updateFormValidation();
  };

  const showStorageError = (error) => {
    console.error('Unable to load or save volunteer demo data.', error);
    const warning = document.createElement('p');
    warning.className = 'coordinator-warning';
    warning.setAttribute('role', 'alert');
    warning.textContent = 'Volunteer demo data could not be loaded or saved in this browser. Check browser storage settings and reload the page.';
    document.querySelector('.volunteer-notice').after(warning);
    form.querySelectorAll('button').forEach((button) => { button.disabled = true; });
  };

  try {
    const params = pageParams;
    const requestedRole = params.get('demoRole');
    const requestedAccountId = params.get('accountId');
    demoRole = normalizeRole(requestedRole || localStorage.getItem(storageKeys.role));
    const legacyCurrentProfileKey = storageKeys.currentProfile;
    storageKeys.currentProfile = `${storagePrefix}current-volunteer-profile-${demoRole || 'visitor'}-v1`;
    if (!firstTimePreview && demoRole === 'member-volunteer' && !localStorage.getItem(storageKeys.currentProfile)) {
      const legacyCurrentProfileId = localStorage.getItem(legacyCurrentProfileKey);
      if (legacyCurrentProfileId) localStorage.setItem(storageKeys.currentProfile, legacyCurrentProfileId);
    }
    if (demoRole) {
      localStorage.setItem(storageKeys.role, demoRole);
    }
    profiles = readList(storageKeys.profiles, []).map((profile) => ({
      ...profile,
      demoRole: normalizeRole(profile.demoRole),
      memberType: profile.memberType === 'Guest volunteer' ? 'Non-member guest volunteer' : profile.memberType,
      serviceCategory: profile.serviceCategory === 'Non-member' ? 'Other' : profile.serviceCategory,
      interests: Array.isArray(profile.interests) ? profile.interests : [],
      serviceModes: Array.isArray(profile.serviceModes) ? profile.serviceModes : [],
      smsNotifications: Boolean(profile.smsNotifications),
      sponsorName: profile.sponsorName || '',
      sponsorEmail: profile.sponsorEmail || '',
      waiver: Boolean(profile.waiver),
      emergencyContactName: profile.emergencyContactName || '',
      emergencyContactPhone: profile.emergencyContactPhone || '',
      certifications: profile.certifications || '',
      screeningStatus: profile.screeningStatus || 'Not required',
      conductAcknowledged: Boolean(profile.conductAcknowledged),
      releaseAcknowledged: Boolean(profile.releaseAcknowledged),
      approvedHours: Number(profile.approvedHours) || 0
    }));
    const removedLegacyProfileIds = new Set(
      profiles.filter((profile) => legacySeededProfileIds.has(profile.id)).map((profile) => profile.id)
    );
    if (removedLegacyProfileIds.size) {
      profiles = profiles.filter((profile) => !removedLegacyProfileIds.has(profile.id));
      localStorage.removeItem(storageKeys.currentProfile);
      localStorage.removeItem(legacyCurrentProfileKey);
    }
    if (!firstTimePreview) {
      const profileIds = new Set(profiles.map((profile) => profile.id));
      profiles = [...profiles, ...demoProfiles.filter((profile) => !profileIds.has(profile.id))];
    }
    save(storageKeys.profiles, profiles);
    opportunities = readList(storageKeys.opportunities, []);
    const opportunityIds = new Set(opportunities.map((opportunity) => opportunity.id));
    opportunities = [...opportunities, ...demoOpportunities.filter((opportunity) => !opportunityIds.has(opportunity.id))];
    save(storageKeys.opportunities, opportunities);
    applications = readList(storageKeys.applications, [])
      .filter((application) => !removedLegacyProfileIds.has(application.profileId))
      .map((application) => ({
        ...application,
        completionVerified: Boolean(application.completionVerified),
        verifiedAt: application.verifiedAt || '',
        verifiedBy: application.verifiedBy || ''
      }));
    if (!firstTimePreview) {
      const applicationIds = new Set(applications.map((application) => application.id));
      applications = [...applications, ...demoApplications.filter((application) => !applicationIds.has(application.id))];
    }
    save(storageKeys.applications, applications);
    accessLog = readList(storageKeys.accessLog, []);
    const accountProfile = profiles.find((profile) => profile.id === requestedAccountId && profile.demoRole === demoRole);
    currentProfileId = accountProfile
      ? accountProfile.id
      : localStorage.getItem(storageKeys.currentProfile);
    if (accountProfile) localStorage.setItem(storageKeys.currentProfile, accountProfile.id);
    if (!chapterNames.includes(presidentSelectedChapter) && presidentSelectedChapter !== allChapterFilter) {
      presidentSelectedChapter = allChapterFilter;
    }
    if (requestedRole) {
      params.delete('demoRole');
    }
    if (requestedAccountId) params.delete('accountId');
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
    renderStats();
    renderRoster();
    renderApplications();
    renderAccessLog();
    renderRole();
    const initialSection = window.location.hash === '#my-activity' && !findCurrentProfile()
      ? document.querySelector('#volunteer-profile')
      : window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (initialSection && !initialSection.hidden) {
      window.setTimeout(() => initialSection.scrollIntoView(), 0);
    }
  } catch (error) {
    showStorageError(error);
    return;
  }

  form.addEventListener('input', updateProgress);
  form.addEventListener('change', () => {
    updateProgress();
    updateFormValidation();
  });
  form.addEventListener('reset', () => {
    const profile = profiles.find((savedProfile) => savedProfile.id === profileIdInput.value);
    if (profile) {
      window.setTimeout(() => setForm(profile), 0);
      return;
    }
    profileIdInput.value = '';
    profileFeedback.textContent = '';
    window.setTimeout(() => {
      updateProgress();
      updateFormValidation();
    }, 0);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const previousProfile = profiles.find((savedProfile) => savedProfile.id === profileIdInput.value);
    if (adminEditingProfile && (!isAdminRole() || !previousProfile || !canAccessProfile(previousProfile))) {
      profileFeedback.textContent = 'This role cannot edit volunteer profiles outside its assigned access.';
      return;
    }
    const updatingExistingProfile = Boolean(previousProfile);
    const profile = {
      id: profileIdInput.value || `vol-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      demoRole: previousProfile ? previousProfile.demoRole || '' : '',
      name: form.elements.name.value.trim(),
      memberType: demoRole === 'non-member-volunteer'
        ? 'Non-member guest volunteer'
        : demoRole === 'member-volunteer' && form.elements.memberType.value === 'Non-member guest volunteer'
          ? 'Active'
          : form.elements.memberType.value,
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      chapter: form.elements.chapter.value.trim(),
      city: form.elements.city.value.trim(),
      state: form.elements.state.value.trim(),
      timeZone: form.elements.timeZone.value,
      serviceCategory: form.elements.serviceCategory.value,
      rank: form.elements.rank.value.trim(),
      sponsorName: form.elements.sponsorName.value.trim(),
      sponsorEmail: form.elements.sponsorEmail.value.trim(),
      waiver: form.elements.waiver.checked,
      emergencyContactName: form.elements.emergencyContactName.value.trim(),
      emergencyContactPhone: form.elements.emergencyContactPhone.value.trim(),
      certifications: form.elements.certifications.value.trim(),
      screeningStatus: form.elements.screeningStatus.value,
      conductAcknowledged: form.elements.conductAcknowledged.checked,
      releaseAcknowledged: form.elements.releaseAcknowledged.checked,
      interests: Array.from(form.querySelectorAll('input[name="interests"]:checked'), (input) => input.value),
      skills: form.elements.skills.value.trim(),
      availability: form.elements.availability.value,
      hoursAvailable: form.elements.hoursAvailable.value,
      serviceModes: Array.from(form.querySelectorAll('input[name="serviceModes"]:checked'), (input) => input.value),
      notifications: form.elements.notifications.checked,
      smsNotifications: form.elements.smsNotifications.checked,
      approvedHours: 0
    };
    const existingIndex = profiles.findIndex((savedProfile) => savedProfile.id === profile.id);
    if (existingIndex >= 0) {
      profile.approvedHours = profiles[existingIndex].approvedHours || 0;
      profiles[existingIndex] = profile;
    } else {
      profiles.push(profile);
      currentProfileId = profile.id;
    }
    try {
      save(storageKeys.profiles, profiles);
      if (!profileIdInput.value) {
        currentProfileId = profile.id;
        localStorage.setItem(storageKeys.currentProfile, currentProfileId);
      }
      const administratorUpdatedProfile = adminEditingProfile && isAdminRole();
      if (administratorUpdatedProfile) logProfileAccess('Profile updated', profile);
      editingVolunteerProfile = false;
      adminEditingProfile = false;
      profileIdInput.value = profile.id;
      const savedProfileStatus = document.querySelector('#saved-profile-status');
      savedProfileStatus.textContent = updatingExistingProfile
        ? 'Profile updated and saved. Editing is finished. Choose “Update my profile” only when you want to make changes again.'
        : 'Profile created and saved. Your details will stay here until you choose to update them.';
      savedProfileStatus.hidden = false;
      document.querySelector('#profile-sms-retry').hidden = true;
      pendingProfileSmsRequest = null;
      profileFeedback.textContent = administratorUpdatedProfile
        ? 'Volunteer profile updated in this browser demo.'
        : 'Your volunteer profile has been saved in this browser.';
      renderStats();
      renderRoster();
      renderApplications();
      renderRole();
      updateProgress();
      if (isVolunteerRole() && previousProfile && previousProfile.phone !== profile.phone && profile.smsNotifications) {
        pendingProfileSmsRequest = {
          notificationId: `${profile.id}-profile-updated-${Date.now()}`,
          notificationType: 'profile-updated',
          phone: profile.phone,
          smsOptIn: true
        };
        sendProfileUpdatedText();
      }
    } catch (error) {
      showStorageError(error);
    }
  });

  rosterSearch.addEventListener('input', renderRoster);
  document.querySelector('#president-chapter-filter').addEventListener('change', (event) => {
    if (!isOrgWideRole() || ![allChapterFilter, ...chapterNames].includes(event.target.value)) return;
    presidentSelectedChapter = event.target.value;
    localStorage.setItem(presidentChapterKey, presidentSelectedChapter);
    renderRole();
  });

  document.querySelector('#chapter-admin-body').addEventListener('click', (event) => {
    const button = event.target.closest('[data-chapter-admin-action]');
    if (!button || !canManageChapterAdmins()) return;
    const profile = profiles.find((item) => item.id === button.dataset.profileId);
    if (!profile || profile.id === currentProfileId || !canAccessProfile(profile)
      || profile.memberType === 'Non-member guest volunteer') return;
    const action = button.dataset.chapterAdminAction;
    if (action === 'appoint' && profile.demoRole === 'member-volunteer') {
      profile.demoRole = 'chapter-admin';
    } else if (action === 'remove' && profile.demoRole === 'chapter-admin') {
      profile.demoRole = 'member-volunteer';
    } else {
      return;
    }
    try {
      save(storageKeys.profiles, profiles);
      logProfileAccess(action === 'appoint' ? 'Chapter admin appointed' : 'Chapter admin removed', profile);
      document.querySelector('#chapter-admin-feedback').textContent =
        `${profile.name} is now ${profile.demoRole === 'chapter-admin' ? 'a chapter admin' : 'a volunteer'}. The updated role takes effect the next time they sign in.`;
      renderRole();
    } catch (error) {
      showStorageError(error);
    }
  });

  document.querySelector('#opportunity-request-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!isAdminRole()) return;
    const requestForm = event.currentTarget;
    const chapter = requestForm.elements.chapter.value;
    const date = requestForm.elements.date.value;
    if (!chapterIsInScope(chapter) || !date || date < new Date().toISOString().slice(0, 10)) {
      document.querySelector('#opportunity-request-feedback').textContent =
        'Choose a chapter within your access and a future event date.';
      return;
    }
    const opportunity = {
      id: `opportunity-${Date.now()}`,
      title: requestForm.elements.title.value.trim(),
      chapter,
      mission: requestForm.elements.mission.value,
      description: requestForm.elements.description.value.trim(),
      date,
      location: requestForm.elements.location.value.trim(),
      hours: Number(requestForm.elements.hours.value),
      openings: Number(requestForm.elements.openings.value),
      leader: findCurrentProfile()?.name || roleLabels[demoRole],
      registrationDeadline: '',
      startTime: '',
      endTime: '',
      outcome: '',
      skills: '',
      orientation: '',
      recurringAnnual: false,
      approvalStatus: 'Pending'
    };
    try {
      save(storageKeys.opportunities, [...opportunities, opportunity]);
      opportunities.push(opportunity);
      requestForm.reset();
      document.querySelector('#opportunity-request-feedback').textContent =
        'Opportunity submitted. It will appear publicly after Chapter President or HR Coordinator approval.';
      renderRole();
      renderStats();
    } catch (error) {
      showStorageError(error);
    }
  });

  document.querySelector('#pending-opportunity-list').addEventListener('click', (event) => {
    const button = event.target.closest('[data-opportunity-review]');
    if (!button || !['approve', 'reject'].includes(button.dataset.opportunityReview)) return;
    const opportunity = opportunities.find((item) => item.id === button.dataset.opportunityId);
    if (!opportunity || opportunity.approvalStatus !== 'Pending' || !canApproveOpportunity(opportunity)) {
      document.querySelector('#opportunity-review-feedback').textContent =
        'Only the Chapter President or HR Coordinator can make a final decision for opportunities in their scope.';
      return;
    }
    const approvalStatus = button.dataset.opportunityReview === 'approve' ? 'Published' : 'Rejected';
    try {
      const updatedOpportunities = opportunities.map((item) =>
        item.id === opportunity.id ? { ...item, approvalStatus } : item
      );
      save(storageKeys.opportunities, updatedOpportunities);
      opportunities = updatedOpportunities;
      document.querySelector('#opportunity-review-feedback').textContent = approvalStatus === 'Published'
        ? `${opportunity.title} was approved and published.`
        : `${opportunity.title} was rejected and will not be published.`;
      renderRole();
      renderStats();
    } catch (error) {
      showStorageError(error);
    }
  });

  document.querySelector('#application-body').addEventListener('click', (event) => {
    const button = event.target.closest('[data-application-action]');
    if (!button || !canFinalizeVolunteerActivity()) return;
    const application = applications.find((item) => item.id === button.dataset.applicationId);
    if (!application) return;
    const opportunity = opportunities.find((item) => item.id === application.opportunityId);
    if (!opportunity || !canManageOpportunity(opportunity)) {
      document.querySelector('#application-feedback').textContent = 'This role cannot manage activity outside its assigned access.';
      return;
    }
    const volunteer = profiles.find((profile) => profile.id === application.profileId);
    const action = button.dataset.applicationAction;
    if (!['approve', 'unapprove', 'verify'].includes(action)) return;
    if (action === 'verify' && application.status !== 'Approved') {
      document.querySelector('#application-feedback').textContent = 'Approve the volunteer signup before verifying completed service.';
      return;
    }
    if (action === 'verify' && (!opportunity.date || opportunity.date > new Date().toISOString().slice(0, 10))) {
      document.querySelector('#application-feedback').textContent = 'Completed service can only be verified after the event date.';
      return;
    }
    if (action === 'unapprove' && application.completionVerified) {
      document.querySelector('#application-feedback').textContent = 'A verified volunteer activity cannot be unapproved.';
      return;
    }
    if (!['approve', 'unapprove', 'verify'].includes(action)
      || (action === 'approve' && application.status === 'Approved')
      || (action === 'unapprove' && application.status !== 'Approved')
      || (action === 'verify' && application.completionVerified)) return;
    const now = new Date().toISOString();
    const nextStatus = action === 'approve' ? 'Approved' : 'Under Review';
    const updatedApplications = applications.map((item) => {
      if (item.id !== application.id) return item;
      if (action === 'verify') {
        return { ...item, completionVerified: true, verifiedAt: now, verifiedBy: roleLabels[demoRole] };
      }
      return { ...item, status: nextStatus, reviewedAt: now };
    });
    try {
      save(storageKeys.applications, updatedApplications);
      applications = updatedApplications;
      renderApplications();
      renderOpportunities();
      renderMemberDashboard();
      renderStats();
      renderChapterReport();
      document.querySelector('#application-feedback').textContent = action === 'verify'
        ? `${volunteer ? volunteer.name : 'The volunteer'}'s completed service was verified by ${roleLabels[demoRole]}.`
        : `${volunteer ? volunteer.name : 'The volunteer'}'s application is now ${nextStatus.toLowerCase()}.`;
    } catch (error) {
      console.error('Unable to save the application decision.', error);
      document.querySelector('#application-feedback').textContent =
        'The decision could not be saved. Check browser storage settings and try again.';
    }
  });

  rosterBody.addEventListener('click', (event) => {
    const button = event.target.closest('[data-edit-profile]');
    if (!button) return;
    const profile = profiles.find((item) => item.id === button.dataset.editProfile);
    if (!profile) return;
    if (!isAdminRole() || !canAccessProfile(profile)) return;
    adminEditingProfile = true;
    updateFormValidation();
    document.querySelector('#volunteer-profile').hidden = false;
    setForm(profile);
    try {
      logProfileAccess('Sensitive profile opened for editing', profile);
    } catch (error) {
      showStorageError(error);
      return;
    }
    profileFeedback.textContent = `${roleLabels[demoRole]} demo: editing ${profile.name}. Save the form to update this roster record.`;
    document.querySelector('#volunteer-profile').scrollIntoView({ behavior: 'smooth' });
    form.elements.name.focus({ preventScroll: true });
  });

  const openOwnProfile = () => {
    if (!isVolunteerRole()) return;
    const profile = findCurrentProfile();
    if (profile) {
      editingVolunteerProfile = true;
      setForm(profile);
      renderRole();
      profileFeedback.textContent = 'Your saved profile is loaded for you to update.';
    } else {
      document.querySelector('#volunteer-profile').hidden = false;
      form.hidden = false;
      renderRole();
      profileFeedback.textContent = 'Create your volunteer profile to get started.';
    }
    document.querySelector('#volunteer-profile').scrollIntoView({ behavior: 'smooth' });
    form.elements.name.focus({ preventScroll: true });
  };

  document.querySelector('#demo-profile-action').addEventListener('click', openOwnProfile);
  document.querySelector('#update-member-profile').addEventListener('click', openOwnProfile);

  document.querySelector('#edit-saved-profile').addEventListener('click', () => {
    openOwnProfile();
  });

  document.querySelector('#cancel-profile-update').addEventListener('click', () => {
    const profile = findCurrentProfile();
    if (!profile || !editingVolunteerProfile) return;
    editingVolunteerProfile = false;
    setForm(profile);
    renderRole();
    profileFeedback.textContent = '';
  });

  document.querySelector('#profile-sms-retry').addEventListener('click', sendProfileUpdatedText);

  opportunityList.addEventListener('click', (event) => {
    const cloneButton = event.target.closest('[data-clone-opportunity]');
    if (cloneButton) {
      if (!isAdminRole()) return;
      const source = opportunities.find((item) => item.id === cloneButton.dataset.cloneOpportunity);
      if (!source || !canManageOpportunity(source)) return;
      const nextDate = new Date(`${source.date}T12:00:00`);
      if (Number.isNaN(nextDate.getTime())) {
        document.querySelector('#application-feedback').textContent = 'This opportunity has no valid date to clone.';
        return;
      }
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      let nextDeadline = '';
      if (source.registrationDeadline) {
        const deadline = new Date(`${source.registrationDeadline}T12:00:00`);
        if (!Number.isNaN(deadline.getTime())) {
          deadline.setFullYear(deadline.getFullYear() + 1);
          nextDeadline = deadline.toISOString().slice(0, 10);
        }
      }
      const clone = {
        ...source,
        id: `opportunity-${Date.now()}`,
        title: `${source.title} (${nextDate.getFullYear()})`,
        date: nextDate.toISOString().slice(0, 10),
        registrationDeadline: nextDeadline,
        openings: source.openings,
        recurringAnnual: true,
        approvalStatus: 'Pending'
      };
      try {
        opportunities = [...opportunities, clone];
        save(storageKeys.opportunities, opportunities);
        document.querySelector('#application-feedback').textContent =
          `Created ${clone.title} as a draft. A Chapter President or HR Coordinator must approve it before publication.`;
        renderOpportunities();
        renderStats();
        renderPendingOpportunities();
      } catch (error) {
        showStorageError(error);
      }
      return;
    }
    const applicantsButton = event.target.closest('[data-opportunity-applicants]');
    if (applicantsButton) {
      if (!isAdminRole()) return;
      const opportunity = opportunities.find((item) => item.id === applicantsButton.dataset.opportunityApplicants);
      if (!opportunity || !canManageOpportunity(opportunity)) return;
      const applicantsPanel = document.getElementById(`applicants-${applicantsButton.dataset.opportunityApplicants}`);
      if (!applicantsPanel) return;
      const expanded = applicantsButton.getAttribute('aria-expanded') === 'true';
      applicantsButton.setAttribute('aria-expanded', String(!expanded));
      applicantsButton.textContent = expanded ? 'Coordinator view' : 'Hide sign-ups';
      applicantsPanel.hidden = expanded;
      return;
    }
    const button = event.target.closest('[data-apply]');
    if (!button) return;
    if (!isVolunteerRole()) {
      window.location.href = 'login.html?role=volunteer';
      return;
    }
    const profile = findCurrentProfile();
    if (!profile) {
      profileFeedback.textContent = 'Please complete and save your volunteer profile before signing up for an opportunity.';
      document.querySelector('#volunteer-profile').scrollIntoView({ behavior: 'smooth' });
      form.elements.name.focus({ preventScroll: true });
      return;
    }
    const opportunity = opportunities.find((item) => item.id === button.dataset.apply);
    if (!opportunity || applications.some((application) => application.profileId === profile.id && application.opportunityId === opportunity.id)) return;
    const applicationId = `application-${Date.now()}`;
    const updatedApplications = [...applications, {
      id: applicationId,
      profileId: profile.id,
      opportunityId: opportunity.id,
      hoursCreditedTo: profile.memberType === 'Non-member guest volunteer' ? profile.sponsorEmail : '',
      status: 'Submitted',
      submittedAt: new Date().toISOString()
    }];
    try {
      save(storageKeys.applications, updatedApplications);
      applications = updatedApplications;
      profileFeedback.textContent = 'Application saved in this browser demo.';
      renderOpportunities();
      renderMemberDashboard();
      renderApplications();
      document.querySelector('#signup-confirmation-opportunity').textContent = opportunity.title;
      document.querySelector('#signup-confirmation').showModal();
      const smsFeedback = document.querySelector('#signup-sms-status');
      if (!profile.smsNotifications) {
        pendingSmsRequest = null;
        document.querySelector('#signup-sms-retry').hidden = true;
        smsFeedback.textContent = 'You did not opt in to text messages. No text was sent.';
      } else {
        pendingSmsRequest = {
          applicationId,
          opportunityTitle: opportunity.title,
          opportunityDate: opportunity.date,
          phone: profile.phone,
          smsOptIn: profile.smsNotifications
        };
        sendSignupText();
      }
    } catch (error) {
      showStorageError(error);
    }
  });

  document.querySelector('#export-chapter-report').addEventListener('click', () => {
    if (!canManageChapterReports()) return;
    const columns = [
      ['Chapter', 'chapter'], ['Volunteers', 'volunteers'], ['Published opportunities', 'opportunities'],
      ['Applications', 'applications'], ['Recorded service hours', 'serviceHours']
    ];
    const csvCell = (value) => {
      const text = String(value ?? '');
      const safeText = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
      return `"${safeText.replace(/"/g, '""')}"`;
    };
    const rows = [columns.map(([heading]) => csvCell(heading)).join(',')];
    getChapterReportRows().forEach((report) =>
      rows.push(columns.map(([, field]) => csvCell(report[field])).join(','))
    );
    const blob = new Blob([`\uFEFF${rows.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rocks-chapter-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  });

  document.querySelector('#demo-sign-out').addEventListener('click', () => {
    localStorage.removeItem(storageKeys.role);
    window.location.href = 'volunteer.html';
  });

  document.querySelector('#signup-close').addEventListener('click', () => {
    document.querySelector('#signup-confirmation').close();
  });

  document.querySelector('#signup-sms-retry').addEventListener('click', sendSignupText);

  document.querySelector('#signup-view-activity').addEventListener('click', () => {
    if (!isVolunteerRole()) return;
    document.querySelector('#signup-confirmation').close();
    document.querySelector('#my-activity').scrollIntoView({ behavior: 'smooth' });
  });
});
