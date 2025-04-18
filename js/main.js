// DOM元素缓存
const domElements = {
  showRecommend: document.getElementById('showRecommend'),
  recommendModal: document.getElementById('recommendModal'),
  visits: document.getElementById('visits'),
  sidebarItems: document.querySelectorAll('.sidebar-item'),
  navigateElements: document.querySelectorAll('[data-navigate]'),
  goalItems: document.querySelectorAll('.goal-item')
};

// 应用状态
const appState = {
  selectedGoal: '',
  visitCount: 0
};

// 初始化模态框
function initModal() {
  if (domElements.showRecommend && domElements.recommendModal) {
    domElements.showRecommend.addEventListener('click', () => {
      domElements.recommendModal.style.display = 'flex';
    });
  }
}

// 隐藏模态框
function hideModal() {
  if (domElements.recommendModal) {
    domElements.recommendModal.style.display = 'none';
  }
}

// 选择目标
function selectGoal(goal, event) {
  appState.selectedGoal = goal;

  // 重置所有目标项样式
  domElements.goalItems.forEach(item => {
    item.style.backgroundColor = 'white';
  });

  // 高亮当前选择项
  if (event && event.currentTarget) {
    event.currentTarget.style.backgroundColor = '#f0f9eb';
  }
}

// 确认选择
function confirmGoal() {
  if (!appState.selectedGoal) {
    alert('请选择您的饮食目标');
    return;
  }

  hideModal();

  // 页面跳转映射
  const pageMap = {
    'fat_loss': 'fat_loss.html',
    'muscle_gain': 'muscle_gain.html',
    'sugar_control': 'sugar_control.html',
    'family': 'family.html'
  };

  const targetPage = pageMap[appState.selectedGoal];
  if (targetPage) {
    navigateTo(targetPage);
  }
}

// 导航功能
function navigateTo(url) {
  if (!url) return;

  // 处理完整URL
  if (url.startsWith('http')) {
    window.location.href = url;
    return;
  }

  // 处理本地路径
  const basePath = window.location.pathname.replace(/\/[^/]*$/, '');
  window.location.href = `${basePath}/${url.replace(/^\//, '')}`;
}

// 初始化侧边栏活动状态
function initSidebarActiveState() {
  const path = window.location.pathname.split('/').pop();

  domElements.sidebarItems.forEach(item => {
    const onclickAttr = item.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes(path)) {
      item.classList.add('active');
    }
  });
}

// 初始化导航事件
function initNavigation() {
  // 侧边栏导航
  domElements.sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
      const onclickAttr = this.getAttribute('onclick');
      if (onclickAttr) {
        const match = onclickAttr.match(/navigateTo\('([^']+)'/);
        if (match && match[1]) {
          navigateTo(match[1]);
        }
      }
    });
  });

  // 数据导航属性元素
  domElements.navigateElements.forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.navigate;
      if (target) {
        navigateTo(target);
      }
    });
  });
}

// 获取访问计数
async function fetchVisitCount() {
  try {
    const response = await fetch('https://counterapi.com/api/main.d2pnbgwan6hos5.amplifyapp.com/homepage/increment', {
      method: 'GET',
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    appState.visitCount = data.value;
    document.getElementById('counter').innerText=`${data.value}`

    if (domElements.visits) {
      domElements.visits.textContent = data.value.toLocaleString();

      // 存储到localStorage
      localStorage.setItem('visitCount', data.value);
      localStorage.setItem('lastVisit', new Date().toISOString());
    }
  } catch (error) {
    console.error('获取访问计数失败:', error);

    // 尝试从localStorage恢复
    const savedCount = localStorage.getItem('visitCount');
    if (domElements.visits) {
      domElements.visits.textContent = savedCount ? savedCount : 'N/A';
    }
  }
}

// 初始化应用
function initApp() {
  initModal();
  initSidebarActiveState();
  initNavigation();
  fetchVisitCount();
}

// 当DOM完全加载后初始化应用
document.addEventListener('DOMContentLoaded', initApp);
