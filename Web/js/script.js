const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const home = document.getElementById('home');

// Swipe detection variables
let touchStartX = 0;

// When DOM is loaded, set up initial states for sidebar and active links
document.addEventListener('DOMContentLoaded', () => {
  const isSidebarClosed = localStorage.getItem('sidebarClosed') === 'true';
  if (isSidebarClosed) {
    sidebar.classList.add('close');
    toggleButton.classList.add('rotate');
  }

  // Handle active link setup
  const sidebarLinks = document.querySelectorAll('#sidebar a');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove 'active' from all links and reset their icons
      sidebarLinks.forEach(l => {
        l.classList.remove('active');
        home.classList.remove('active');
        const icon = l.querySelector('svg');
        if (icon) icon.style.fill = ''; // Reset icon color
      });

      // Add 'active' to the clicked link and change icon color
      this.classList.add('active');
      const icon = this.querySelector('svg');
      if (icon) icon.style.fill = '#f6962f'; // Set icon color to purple
    });
  });

  // Set the active link if the page loads with a hash
  const currentHash = window.location.hash;
  if (currentHash) {
    const activeLink = document.querySelector(`#sidebar a[href="${currentHash}"]`);
    if (activeLink) {
      sidebarLinks.forEach(l => l.classList.remove('active')); // Remove active from all links
      activeLink.classList.add('active');
      const icon = activeLink.querySelector('svg');
      if (icon) icon.style.fill = '#f6962f'; // Set icon color on page load
    }
  }
});

// Swipe detection functions
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  const touchEndX = event.changedTouches[0].clientX;
  const threshold = 50; // Minimum swipe distance to consider

  if (touchStartX - touchEndX > threshold) {
    // Swipe left to close
    if (!sidebar.classList.contains('close')) {
      toggleSidebar();
    }
  } else if (touchEndX - touchStartX > threshold) {
    // Swipe right to open
    if (sidebar.classList.contains('close')) {
      toggleSidebar();
    }
  }
}

// Attach touch event listeners
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);

function toggleSidebar() {
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');
  localStorage.setItem('sidebarClosed', sidebar.classList.contains('close'));
  closeAllSubMenus();
}

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains('show')) {
    closeAllSubMenus();
  }
  button.nextElementSibling.classList.toggle('show');
  button.classList.toggle('rotate');
  if (sidebar.classList.contains('close')) {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show');
    ul.previousElementSibling.classList.remove('rotate');
  });
}
