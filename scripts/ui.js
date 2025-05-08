export function initUI() {
  const themeToggle = document.getElementById('themeToggle');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const mobileSidebarClose = document.getElementById('mobileSidebarClose');
  const newChatBtn = document.getElementById('newChatBtn');
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Load saved theme
  loadTheme();
  
  // Sidebar toggle for mobile
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  
  // Close sidebar on mobile
  mobileSidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
  
  // New chat button
  newChatBtn.addEventListener('click', () => {
    import('./chat.js').then(module => {
      module.startNewChat();
      sidebar.classList.remove('open');
    });
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      const clickedInsideSidebar = sidebar.contains(e.target);
      const clickedOnToggle = sidebarToggle.contains(e.target);
      
      if (!clickedInsideSidebar && !clickedOnToggle && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    }
  });
  
  // Auto-resize textarea on input
  const textarea = document.getElementById('userInput');
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  });
  
  // Handle Ctrl+Enter or Command+Enter to submit
  textarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('chatForm').dispatchEvent(new Event('submit'));
    }
  });
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  
  if (body.classList.contains('dark-theme')) {
    // Switch to light theme
    body.classList.remove('dark-theme');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark mode';
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark theme
    body.classList.add('dark-theme');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light mode';
    localStorage.setItem('theme', 'dark');
  }
}

/**
 * Load saved theme preference
 */
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  
  if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
    document.body.classList.add('dark-theme');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light mode';
  } else {
    document.body.classList.remove('dark-theme');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark mode';
  }
}