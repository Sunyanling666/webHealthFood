// Show recommendation modal
document.getElementById('showRecommend')?.addEventListener('click', function() {
  document.getElementById('recommendModal').style.display = 'flex';
});

// Hide modal
function hideModal() {
  document.getElementById('recommendModal').style.display = 'none';
}

let selectedGoal = '';

// Select goal
function selectGoal(goal) {
  selectedGoal = goal;
  // Highlight selected item
  const items = document.querySelectorAll('.goal-item');
  items.forEach(item => {
    item.style.backgroundColor = 'white';
  });
  event.currentTarget.style.backgroundColor = '#f0f9eb';
}

// Confirm selection
function confirmGoal() {
  if (!selectedGoal) {
    alert('Please select your dietary goal');
    return;
  }

  hideModal();

  // Navigate based on selection
  switch(selectedGoal) {
    case 'fat_loss':
      navigateTo('fat_loss.html');
      break;
    case 'muscle_gain':
      navigateTo('muscle_gain.html');
      break;
    case 'sugar_control':
      navigateTo('sugar_control.html');
      break;
    case 'family':
      navigateTo('family.html');
      break;
  }
}

// Navigation function
function navigateTo(url) {
  window.location.href = url;
}

// Set active sidebar item based on current page
document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname.split('/').pop();
  const sidebarItems = document.querySelectorAll('.sidebar-item');

  sidebarItems.forEach(item => {
    if (item.getAttribute('onclick').includes(path)) {
      item.classList.add('active');
    }
  });
});
