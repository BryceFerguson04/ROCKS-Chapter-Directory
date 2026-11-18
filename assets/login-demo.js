document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#demo-login-form');
  const status = document.querySelector('#login-demo-status');
  const accounts = [
    { username: 'member.volunteer', password: 'MemberDemo2026!', role: 'member-volunteer', profileId: 'demo-account-member', section: '#my-activity' },
    { username: 'guest.volunteer', password: 'GuestDemo2026!', role: 'non-member-volunteer', profileId: 'demo-account-guest', section: '#my-activity' },
    { username: 'chapter.president', password: 'ChapterDemo2026!', role: 'chapter-president', profileId: 'demo-account-chapter-president', section: '#coordinator' },
    { username: 'chapter.admin', password: 'AdminDemo2026!', role: 'chapter-admin', profileId: 'demo-account-chapter-admin', section: '#coordinator' },
    { username: 'west.admin', password: 'WestAdmin2026!', role: 'chapter-admin', profileId: 'demo-account-west-admin', section: '#coordinator' },
    { username: 'hr.coordinator', password: 'HrCoordinatorDemo2026!', role: 'hr-coordinator', profileId: 'demo-account-rocks-president', section: '#coordinator' },
    { username: 'rocks.president', password: 'RocksDemo2026!', role: 'hr-coordinator', profileId: 'demo-account-rocks-president', section: '#coordinator' }
  ];

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = form.elements.username.value.trim().toLocaleLowerCase();
    const password = form.elements.password.value;
    const account = accounts.find((item) => item.username === username && item.password === password);
    if (!account) {
      status.textContent = 'We could not sign you in. Check your username and password and try again.';
      form.elements.password.select();
      return;
    }

    let savedProfiles;
    try {
      savedProfiles = JSON.parse(localStorage.getItem('rocks-volunteer-profiles-v1') || '[]');
      if (!Array.isArray(savedProfiles)) throw new TypeError('Saved demo profiles must be a list.');
    } catch (error) {
      console.error('Unable to read saved demo roles.', error);
      status.textContent = 'Demo account roles could not be loaded. Check browser storage and try again.';
      return;
    }
    const savedProfile = savedProfiles.find((profile) => profile.id === account.profileId);
    const savedRole = savedProfile && savedProfile.demoRole === 'rocks-president'
      ? 'hr-coordinator'
      : savedProfile && savedProfile.demoRole;
    const role = ['member-volunteer', 'non-member-volunteer', 'chapter-president', 'chapter-admin', 'hr-coordinator'].includes(savedRole)
      ? savedRole
      : account.role;
    status.textContent = 'Signing in…';
    window.location.href = `volunteer.html?demoRole=${encodeURIComponent(role)}&accountId=${encodeURIComponent(account.profileId)}${account.section}`;
  });
});
