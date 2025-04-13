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
// 更新后的导航函数（确保绝对路径）
function navigateTo(url) {
  // 如果已经是完整URL则直接跳转
  if (url.startsWith('http')) return window.location.href = url;

  // 处理本地路径
  const basePath = window.location.pathname.replace(/\/[^/]*$/, '');
  window.location.href = `${basePath}/${url.replace(/^\//, '')}`;
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

// 统一绑定导航事件
document.addEventListener('DOMContentLoaded', () => {
  // 处理侧边栏导航
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
      const url = this.getAttribute('onclick').match(/navigateTo\('([^']+)'/)[1];
      navigateTo(url);
    });
  });

  // 处理其他点击导航（如section-more）
  document.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', () => {
      navigateTo(el.dataset.navigate);
    });
  });
});

// counter.js
function updateCounter() {
  const userId = getUniqueId(); // 获取用户ID
  const counterElement = document.getElementById('counter');
  const userVisits = localStorage.getItem(userId) || 0;

  // 更新访问次数
  const newVisits = parseInt(userVisits) + 1;
  localStorage.setItem(userId, newVisits.toString());

  // 更新页面显示
  counterElement.textContent = newVisits;
}

// 获取用户ID，可以使用简单的随机字符串或更复杂的生成方法
function getUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 页面加载时更新计数器
document.addEventListener('DOMContentLoaded', updateCounter);

