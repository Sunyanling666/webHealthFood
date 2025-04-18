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

// counter.js - 计数器功能
function updateCounter() {
  const counterElement = document.getElementById('counter');
  const userId = getUniqueId();

  // 检查是否已经计数过
  const hasCounted = localStorage.getItem(`hasCounted_${userId}`);

  if (!hasCounted) {
    // 第一次访问，进行计数
    localStorage.setItem(`hasCounted_${userId}`, 'true');

    // 更新本地存储的总计数
    const totalCount = parseInt(localStorage.getItem('totalCount') || '0') + 1;
    localStorage.setItem('totalCount', totalCount.toString());

    // 立即显示本地计数
    counterElement.textContent = totalCount.toLocaleString();

    // 然后尝试更新API计数
    fetch('https://main.d2pnbgwan6hos5.amplifyapp.com/', {
      method: 'POST', // 改为POST方法更安全
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'increment' })
    })
      .then(res => res.json())
      .then(data => {
        // 如果API返回成功，更新为服务器计数
        counterElement.textContent = data.count.toLocaleString();
      })
      .catch(error => {
        console.error('计数器API请求失败:', error);
      });
  } else {
    // 已经计数过，只显示当前总数
    const totalCount = localStorage.getItem('totalCount') || '0';
    counterElement.textContent = totalCount.toLocaleString();

    // 可以添加一个请求来获取最新计数，但不增加计数
    fetch('https://main.d2pnbgwan6hos5.amplifyapp.com/', {
      method: 'GET',
      cache: 'no-cache'
    })
      .then(res => res.json())
      .then(data => {
        counterElement.textContent = data.count.toLocaleString();
      })
      .catch(error => {
        console.error('计数器API请求失败:', error);
      });
  }
}

// 生成唯一用户ID（保持不变）
function getUniqueId() {
  let id = localStorage.getItem('userUniqueId');
  if (!id) {
    id = Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem('userUniqueId', id);
  }
  return id;
}

// 页面加载时初始化计数器
document.addEventListener('DOMContentLoaded', function() {
  updateCounter();
});
