
document.addEventListener('DOMContentLoaded', (event) => {
  const toggleSwitch = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Check local storage for theme preference
  if (localStorage.getItem('theme') === 'dark') {
    toggleSwitch.checked = true;
    body.classList.add('dark-mode');
  }

  // Toggle dark mode on switch change
  toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
});
