(function () {
  const icons = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5M9 9h6M9 13h6M9 17h4"/>',
    building: '<path d="M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M17 13h1M17 17h1M2 21h20"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13M8 8h8"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    graduation: '<path d="m2 10 10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    export: '<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v7h14v-7"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12"/><circle cx="12" cy="12" r="2.5"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    alert: '<path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    attachment: '<path d="m21.4 11.6-8.8 8.8a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 1 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    shield: '<path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/>'
  };

  function hydrateIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (node) {
      const content = icons[node.dataset.icon];
      if (!content || node.querySelector('svg')) return;
      node.classList.add('icon');
      node.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + content + '</svg>';
    });
  }

  function toast(message, type) {
    const stack = document.querySelector('.toast-stack');
    if (!stack) return;
    const item = document.createElement('div');
    item.className = 'toast ' + (type || 'success');
    item.innerHTML = '<span data-icon="' + (type === 'warning' ? 'alert' : 'check') + '"></span><span>' + message + '</span>';
    stack.appendChild(item);
    hydrateIcons(item);
    window.setTimeout(function () { item.remove(); }, 2600);
  }

  function setOverlay(mask, open) {
    if (!mask) return;
    mask.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function normalizeBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;
    const pageId = document.body.dataset.pageId || decodeURIComponent(location.pathname.split('/').pop());
    const overrides = {
      '培训报名详情.html': { current: '报名详情' },
      '线下培训过程录入.html': { trail: ['培训实施', '班次详情', '线下培训过程录入'] },
      '个人订单详情.html': { trail: ['订单管理', '报名订单', '个人报名订单详情'] },
      '培训班级详情.html': { trail: ['培训实施', '班次管理', '班次详情'] },
      '政策补贴详情.html': { trail: ['专区内容管理', '政策管理', '政策补贴', '政策补贴详情'] },
      '编辑政策补贴.html': { trail: ['专区内容管理', '政策管理', '政策补贴', '编辑政策补贴'] },
      '报名记录详情.html': { trail: ['报名管理', '报名记录', '报名记录详情'] },
      '考试批次详情.html': { trail: ['考务管理', '考试批次', '考试批次详情'] },
      '送考进度详情.html': { menu: '送考管理', current: '送考进度详情' },
      '证书模板.html': { menu: '成绩与证书', current: '证书模板' },
      '编辑证书模板.html': { menu: '成绩与证书', current: '新增证书模板' }
    };
    const active = document.querySelector('.nav-link.active, .nav-group-title.active, .nav-group-title.active-parent');
    const groupTitle = active?.closest('.nav-group')?.querySelector(':scope > .nav-group-title');
    const textOf = function (node) {
      return Array.from(node?.querySelectorAll?.('span') || []).map(function (item) { return item.textContent.trim(); }).filter(Boolean).pop() || node?.textContent.trim() || '';
    };
    const breadcrumbKey = pageId === '班次详情.html' && location.hash === '#training' ? '培训班级详情.html' : pageId;
    const override = overrides[breadcrumbKey] || {};
    const menu = override.menu || textOf(groupTitle) || textOf(active);
    const current = override.current || document.querySelector('h1.page-title')?.textContent.trim() || document.title.split('｜')[0].trim();
    const trail = override.trail || ((current === menu || ['工作台.html', '机构信息.html', '考试任务.html'].includes(pageId)) ? [menu] : [menu, current]);
    if (!trail.every(Boolean)) return;
    breadcrumb.replaceChildren();
    trail.forEach(function (label, index) {
      if (index) {
        const divider = document.createElement('span');
        divider.textContent = '/';
        breadcrumb.appendChild(divider);
      }
      const item = document.createElement('span');
      if (index === trail.length - 1 && trail.length > 1) item.className = 'muted';
      item.textContent = label;
      breadcrumb.appendChild(item);
    });
  }

  function markListTables() {
    document.querySelectorAll('.filter-panel').forEach(function (filter) {
      filter.closest('.content-card')?.querySelectorAll('.standard-table-shell').forEach(function (table) { table.classList.add('list-table-shell'); });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    hydrateIcons();
    normalizeBreadcrumb();
    markListTables();

    document.querySelectorAll('.nav-group-title').forEach(function (control) {
      if (control.tagName !== 'BUTTON') return;
      control.addEventListener('click', function () { control.closest('.nav-group')?.classList.toggle('open'); });
    });
    document.querySelectorAll('.sidebar-toggle, .mobile-menu-trigger').forEach(function (control) {
      control.addEventListener('click', function () {
        document.body.classList.toggle(window.innerWidth <= 900 ? 'nav-open' : 'sidebar-compact');
      });
    });

    document.querySelectorAll('[data-toast]').forEach(function (control) {
      control.addEventListener('click', function () { toast(control.dataset.toast); });
    });

    let currentStatus = '全部';
    function activeRows() {
      return Array.from(document.querySelectorAll('tr[data-filter-row]')).filter(function (row) {
        const panel = row.closest('[data-panel]');
        return !panel || !panel.classList.contains('hidden');
      });
    }
    function applyFilters() {
      const keyword = (document.querySelector('[data-list-keyword]')?.value || '').trim().toLowerCase();
      const values = Array.from(document.querySelectorAll('[data-list-select]')).map(function (el) { return el.value; }).filter(Boolean);
      activeRows().forEach(function (row) {
        const text = row.textContent.toLowerCase();
        const show = (currentStatus === '全部' || row.dataset.status === currentStatus) && (!keyword || text.includes(keyword)) && values.every(function (value) { return text.includes(value.toLowerCase()); });
        row.classList.toggle('hidden', !show);
      });
      document.querySelectorAll('.standard-table').forEach(function (tableEl) {
        const panel = tableEl.closest('[data-panel]');
        if (panel?.classList.contains('hidden')) return;
        const visible = Array.from(tableEl.querySelectorAll('tr[data-filter-row]')).filter(function (row) { return !row.classList.contains('hidden'); }).length;
        tableEl.querySelector('.empty-row')?.classList.toggle('hidden', visible !== 0);
      });
    }

    document.querySelectorAll('[data-demo-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('[data-demo-tab]').forEach(function (item) { item.classList.remove('active'); });
        tab.classList.add('active');
        currentStatus = tab.dataset.demoTab;
        applyFilters();
      });
    });
    document.querySelectorAll('[data-panel-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('[data-panel-tab]').forEach(function (item) { item.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('[data-panel]').forEach(function (panel) { panel.classList.toggle('hidden', panel.dataset.panel !== tab.dataset.panelTab); });
        currentStatus = '全部';
        applyFilters();
      });
    });
    document.querySelectorAll('[data-list-search]').forEach(function (button) { button.addEventListener('click', applyFilters); });
    document.querySelectorAll('[data-list-keyword]').forEach(function (input) { input.addEventListener('keydown', function (event) { if (event.key === 'Enter') applyFilters(); }); });
    document.querySelectorAll('[data-list-reset]').forEach(function (button) {
      button.addEventListener('click', function () {
        document.querySelectorAll('[data-list-keyword]').forEach(function (input) { input.value = ''; });
        document.querySelectorAll('[data-list-select]').forEach(function (select) { select.value = ''; });
        currentStatus = '全部';
        document.querySelectorAll('[data-demo-tab]').forEach(function (tab, index) { tab.classList.toggle('active', index === 0); });
        applyFilters();
        toast('筛选条件已重置');
      });
    });

    document.querySelectorAll('[data-select-all]').forEach(function (selectAll) {
      selectAll.addEventListener('change', function () {
        document.querySelectorAll('[data-result-select]').forEach(function (box) {
          if (!box.closest('tr')?.classList.contains('hidden')) box.checked = selectAll.checked;
        });
      });
    });
    document.querySelectorAll('[data-batch-confirm]').forEach(function (button) {
      button.addEventListener('click', function () {
        const selected = Array.from(document.querySelectorAll('[data-result-select]:checked'));
        if (!selected.length) { toast('请先选择待确认结果', 'warning'); return; }
        selected.forEach(function (box) {
          const row = box.closest('tr');
          row.dataset.status = '已确认';
          const statusCell = row.querySelectorAll('td')[8];
          if (statusCell) statusCell.innerHTML = '<span class="tag tag-green"><span class="status-dot"></span>已确认</span>';
          box.checked = false;
        });
        document.querySelectorAll('[data-select-all]').forEach(function (box) { box.checked = false; });
        toast('已批量确认考试结果');
      });
    });

    document.querySelectorAll('[data-page-submit]').forEach(function (button) {
      button.addEventListener('click', function () { toast(button.dataset.pageSubmit || '保存成功'); });
    });

    const serviceMask = document.getElementById('service-state-modal');
    let serviceButton = null;
    document.querySelectorAll('[data-service-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        serviceButton = button;
        serviceMask.querySelector('[data-service-org]').textContent = button.dataset.org;
        setOverlay(serviceMask, true);
      });
    });
    serviceMask?.querySelectorAll('.choice-card').forEach(function (card) {
      card.addEventListener('click', function () {
        serviceMask.querySelectorAll('.choice-card').forEach(function (item) { item.classList.remove('selected'); });
        card.classList.add('selected');
        card.querySelector('input').checked = true;
      });
    });
    document.querySelectorAll('[data-close-overlay]').forEach(function (button) { button.addEventListener('click', function () { setOverlay(button.closest('.modal-mask'), false); }); });
    document.getElementById('service-confirm')?.addEventListener('click', function () {
      const reason = document.getElementById('service-reason').value.trim();
      if (reason.length < 5) { document.getElementById('service-error').textContent = '请至少填写5个字的维护原因。'; return; }
      const action = serviceMask.querySelector('input[name="service-choice"]:checked').value;
      setOverlay(serviceMask, false);
      document.getElementById('service-error').textContent = '';
      toast((serviceButton?.dataset.org || '机构') + '已' + action, 'warning');
    });

    document.querySelectorAll('[data-order-verify]').forEach(function (button) {
      button.addEventListener('click', function () {
        const passed = button.dataset.orderVerify === '通过';
        toast(passed ? '核款通过，订单状态已更新' : '支付凭证已驳回', passed ? 'success' : 'warning');
      });
    });
    document.querySelectorAll('[data-audit-choice]').forEach(function (choice) {
      choice.addEventListener('click', function () {
        document.querySelectorAll('[data-audit-choice]').forEach(function (item) { item.classList.remove('selected'); });
        choice.classList.add('selected');
        choice.querySelector('input').checked = true;
      });
    });
    document.querySelector('[data-audit-submit]')?.addEventListener('click', function () {
      const selected = document.querySelector('[data-audit-choice].selected')?.dataset.auditChoice || '通过';
      const opinion = document.getElementById('audit-opinion')?.value.trim() || '';
      if (selected === '退回' && opinion.length < 5) { toast('退回时请填写审核意见', 'warning'); return; }
      toast(selected === '通过' ? '审核已通过' : '已退回修改', selected === '通过' ? 'success' : 'warning');
    });

    const candidateChecks = Array.from(document.querySelectorAll('.candidate-check:not(:disabled)'));
    const generateButton = document.getElementById('generate-exam-list');
    candidateChecks.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        const count = candidateChecks.filter(function (item) { return item.checked; }).length;
        const counter = document.getElementById('candidate-selected');
        if (counter) counter.textContent = count;
        if (generateButton) generateButton.disabled = count === 0;
      });
    });
    generateButton?.addEventListener('click', function () {
      const count = candidateChecks.filter(function (item) { return item.checked; }).length;
      toast('已为' + count + '人生成送考名单');
    });
  });
})();


document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-submit-href]').forEach(function (button) {
    button.addEventListener('click', function () {
      window.setTimeout(function () { window.location.href = button.dataset.submitHref; }, 450);
    });
  });
  document.querySelector('[data-audit-submit]')?.addEventListener('click', function () {
    const choice = document.querySelector('[data-audit-choice].selected')?.dataset.auditChoice || '通过';
    const badge = document.querySelector('.record-banner-side .tag');
    if (badge && !(choice === '退回' && (document.getElementById('audit-opinion')?.value.trim().length || 0) < 5)) {
      badge.className = 'tag ' + (choice === '通过' ? 'tag-green' : 'tag-orange');
      badge.innerHTML = '<span class="status-dot"></span>' + (choice === '通过' ? '已通过' : '已退回');
    }
  });
  document.querySelectorAll('[data-order-verify]').forEach(function (button) {
    button.addEventListener('click', function () {
      const passed = button.dataset.orderVerify === '通过';
      const badge = document.querySelector('.record-banner-side .tag');
      if (badge) {
        badge.className = 'tag ' + (passed ? 'tag-green' : 'tag-orange');
        badge.innerHTML = '<span class="status-dot"></span>' + (passed ? '已支付' : '核款退回');
      }
      document.querySelectorAll('[data-order-verify]').forEach(function (item) { item.disabled = true; });
    });
  });
});

/* 考试任务模块归入评价机构运营端，位于考务管理与成绩证书之间 */
document.addEventListener('DOMContentLoaded', function () {
  const pageId = document.body.dataset.pageId || decodeURIComponent(location.pathname.split('/').pop());
  const taskPages = ['考试任务.html', '考试任务详情.html', '录入考试结果.html'];
  const nav = document.querySelector('.nav-section');
  if (!nav) return;
  const taskNavActive = taskPages.includes(pageId);
  const taskNavOpen = taskPages.includes(pageId);
  const taskMenu = '<div class="nav-group' + (taskNavOpen ? ' open' : '') + '" data-exam-task-nav><button class="nav-group-title' + (taskNavActive ? ' active-parent' : '') + '" type="button"><span data-icon="clipboard"></span><span>考试任务</span><span class="chev" data-icon="chevronRight"></span></button><div class="nav-children"><a class="nav-link" href="考试任务.html">考试任务</a></div></div>';
  if (taskPages.includes(pageId)) {
    nav.innerHTML = '<a class="nav-group-title" href="机构信息.html"><span data-icon="building"></span><span>机构信息</span></a><div class="nav-group"><button class="nav-group-title" type="button"><span data-icon="shield"></span><span>考试项目管理</span><span class="chev" data-icon="chevronRight"></span></button><div class="nav-children"><a class="nav-link" href="考试项目列表.html">考试项目列表</a></div></div><div class="nav-group"><button class="nav-group-title" type="button"><span data-icon="file"></span><span>送考审核</span><span class="chev" data-icon="chevronRight"></span></button><div class="nav-children"><a class="nav-link" href="送考批次台账.html">送考批次</a></div></div><div class="nav-group"><button class="nav-group-title" type="button"><span data-icon="clipboard"></span><span>考务管理</span><span class="chev" data-icon="chevronRight"></span></button><div class="nav-children"><a class="nav-link" href="考生名单.html">考生名单</a><a class="nav-link" href="考试批次.html">考试批次</a><a class="nav-link" href="准考证管理.html">准考证管理</a></div></div>' + taskMenu + '<div class="nav-group"><button class="nav-group-title" type="button"><span data-icon="graduation"></span><span>成绩与证书</span><span class="chev" data-icon="chevronRight"></span></button><div class="nav-children"><a class="nav-link" href="成绩管理.html">成绩管理</a><a class="nav-link" href="成绩发布.html">成绩发布</a><a class="nav-link" href="合格考生.html">合格考生</a><a class="nav-link" href="证书发放.html">证书发放</a></div></div>';
    nav.querySelectorAll('.nav-link').forEach(function (link) { link.classList.toggle('active', link.getAttribute('href') === pageId); });
    document.title = document.title.replace('评价机构考试端', '评价机构运营端');
    document.querySelectorAll('.user-copy strong').forEach(function (node) { node.textContent = '评价机构管理员'; });
    document.querySelectorAll('.user-copy span').forEach(function (node) { node.textContent = '湖北省智能建造评价中心'; });
  } else if (!nav.querySelector('[data-exam-task-nav]')) {
    const certificateGroup = [...nav.querySelectorAll('.nav-group')].find(function (group) { return group.textContent.includes('成绩与证书'); });
    if (certificateGroup) certificateGroup.insertAdjacentHTML('beforebegin', taskMenu);
  }
  nav.querySelectorAll('.nav-group-title span').forEach(function (node) { if (node.textContent.trim() === '送考管理') node.textContent = '送考审核'; });
  nav.querySelectorAll('.nav-link[href="送考批次台账.html"]').forEach(function (node) { node.textContent = '送考批次审核'; });
  document.querySelectorAll('.breadcrumb a, .breadcrumb span').forEach(function (node) { if (node.textContent.trim() === '送考管理') node.textContent = '送考审核'; });
  if (taskPages.includes(pageId)) {
    const breadcrumb = document.querySelector('.breadcrumb');
    const breadcrumbCurrent = pageId === '考试任务.html' ? '考试任务' : (pageId === '考试任务详情.html' ? '考试任务详情' : '考试结果提交');
    if (breadcrumb) breadcrumb.innerHTML = '<a href="考试任务.html">考试任务</a><span class="muted">/</span><span class="muted">' + breadcrumbCurrent + '</span>';
  }
  const inlineIcons = {
    building: '<path d="M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M17 13h1M17 17h1M2 21h20"/>',
    shield: '<path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5M9 9h6M9 13h6M9 17h4"/>',
    graduation: '<path d="m2 10 10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>'
  };
  nav.querySelectorAll('[data-icon]').forEach(function (node) { const shape = inlineIcons[node.dataset.icon]; if (shape && !node.querySelector('svg')) { node.classList.add('icon'); node.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + shape + '</svg>'; } });
  (taskPages.includes(pageId) ? nav.querySelectorAll('.nav-group-title') : nav.querySelectorAll('[data-exam-task-nav] > .nav-group-title')).forEach(function (control) {
    if (control.tagName === 'BUTTON' && !control.dataset.taskMenuBound) {
      control.dataset.taskMenuBound = 'true';
      control.addEventListener('click', function () { control.closest('.nav-group')?.classList.toggle('open'); });
    }
  });
});

/* 评价机构运营端沿用考试任务的现场执行与成绩录入交互 */
document.addEventListener('DOMContentLoaded', function () {
  const pageId = document.body.dataset.pageId || decodeURIComponent(location.pathname.split('/').pop());
  if (!['考试任务详情.html', '录入考试结果.html'].includes(pageId)) return;
  function notify(message, type) {
    const stack = document.querySelector('.toast-stack'); if (!stack) return;
    const item = document.createElement('div'); item.className = 'toast ' + (type || 'success'); item.textContent = message; stack.appendChild(item); window.setTimeout(function () { item.remove(); }, 2200);
  }
  document.querySelectorAll('[data-id-verify]').forEach(function (button) { button.addEventListener('click', function () { const row = button.closest('tr'); row.querySelector('[data-id-state]').innerHTML = '<span class="tag tag-green"><span class="status-dot"></span>已核验</span>'; button.disabled = true; notify('身份核验已记录'); }); });
  document.querySelectorAll('[data-checkin]').forEach(function (button) { button.addEventListener('click', function () { const row = button.closest('tr'); if (!(row.querySelector('[data-id-state]')?.textContent || '').includes('已核验')) { notify('请先完成身份核验', 'error'); return; } row.querySelector('[data-checkin-state]').innerHTML = '<span class="tag tag-green"><span class="status-dot"></span>已签到</span>'; button.disabled = true; notify('签到已记录'); }); });
  if (pageId === '考试任务详情.html') {
    const taskPanel = document.querySelector('.side-stack section.plain-card'); const taskBody = taskPanel?.querySelector('.plain-card-body'); const headerActions = document.querySelector('.page-header .header-actions');
    if (taskPanel && taskBody && headerActions) { taskBody.querySelector('p.muted')?.remove(); taskBody.querySelector('.action-list')?.querySelectorAll('.btn').forEach(function (button) { button.classList.add('btn-sm'); headerActions.appendChild(button); }); taskPanel.closest('.side-stack')?.remove(); document.querySelector('.two-column')?.classList.add('single-column'); }
    const executionCard = [...document.querySelectorAll('.plain-card')].find(function (card) { return card.querySelector('.block-head h2')?.textContent.includes('现场执行记录'); });
    executionCard?.querySelectorAll('.detail-item:not(.wide)').forEach(function (item) { const value = item.querySelector('.detail-value'); if (!value || value.querySelector('input')) return; const input = document.createElement('input'); input.className = 'control'; input.type = 'datetime-local'; input.setAttribute('aria-label', item.querySelector('.detail-label')?.textContent || ''); value.replaceChildren(input); });
    const note = executionCard?.querySelector('.detail-item.wide'); if (note) { note.querySelector('.detail-label').textContent = '现场说明'; const textarea = document.createElement('textarea'); textarea.className = 'control'; textarea.rows = 3; textarea.placeholder = '请输入现场情况说明'; note.querySelector('.detail-value').replaceChildren(textarea); }
    const finish = document.querySelector('[data-task-finish]'); if (finish) finish.textContent = '结束考试并录入成绩';
  }
  const start = document.querySelector('[data-task-start]'); const finish = document.querySelector('[data-task-finish]');
  start?.addEventListener('click', function () { start.disabled = true; start.textContent = '任务执行中'; if (finish) finish.disabled = false; const badge = document.querySelector('.record-banner-side .tag'); if (badge) { badge.className = 'tag tag-blue'; badge.innerHTML = '<span class="status-dot"></span>执行中'; } notify('考试任务已开始'); });
  finish?.addEventListener('click', function () { location.href = '录入考试结果.html'; });
  function calculate(row) { const theory = row.querySelector('.result-theory'), practical = row.querySelector('.result-practical'), target = row.querySelector('.result-conclusion'); if (!target) return false; if (row.querySelector('.result-attendance')?.value === '缺考') { target.innerHTML = '<span class="tag tag-red"><span class="status-dot"></span>缺考</span>'; return true; } if (!theory.value || !practical.value) { target.innerHTML = '<span class="tag tag-orange"><span class="status-dot"></span>待录入</span>'; return false; } const pass = Number(theory.value) >= 60 && Number(practical.value) >= 60; target.innerHTML = '<span class="tag tag-' + (pass ? 'green' : 'red') + '"><span class="status-dot"></span>' + (pass ? '考试通过' : '考试不通过') + '</span>'; return true; }
  function refresh() { const rows = [...document.querySelectorAll('tbody tr')].filter(function (row) { return row.querySelector('.result-conclusion'); }); let entered = 0; rows.forEach(function (row) { if (calculate(row)) entered++; }); document.querySelector('[data-count-entered]')?.replaceChildren(document.createTextNode(entered + '人')); document.querySelector('[data-count-missing]')?.replaceChildren(document.createTextNode((rows.length - entered) + '人')); return entered === rows.length; }
  document.querySelectorAll('.result-theory,.result-practical,.result-attendance').forEach(function (input) { input.addEventListener('input', refresh); input.addEventListener('change', refresh); }); refresh();
  document.querySelector('[data-save-results]')?.addEventListener('click', function () { refresh(); notify('考试结果已暂存'); });
  document.querySelector('[data-submit-results]')?.addEventListener('click', function () { if (!refresh()) { notify('仍有考生成绩未录入，暂不能提交', 'error'); return; } this.disabled = true; this.textContent = '结果已提交'; notify('考试结果已提交评价机构'); });
});

/* 成绩与证书一期闭环：合格考生、证书模板、证书发放 */
document.addEventListener('DOMContentLoaded', function () {
  const pageId = document.body.dataset.pageId || '';
  const storageKey = 'hbic-certificate-templates-v1';
  const defaults = [
    { trade:'装配式建筑施工员', name:'装配式建筑施工员合格证书模板', file:'装配式建筑施工员证书模板.docx', updated:'2026-08-25 14:30', user:'评价机构管理员' },
    { trade:'建筑信息模型技术员', name:'建筑信息模型技术员合格证书模板', file:'BIM技术员证书模板.docx', updated:'2026-08-26 09:20', user:'评价机构管理员' }
  ];
  const escapeHtml = function (value) { return String(value).replace(/[&<>"']/g, function (char) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]; }); };
  const toast = function (message) { const stack=document.querySelector('.toast-stack'); if (!stack) return; const item=document.createElement('div'); item.className='toast success'; item.textContent=message; stack.appendChild(item); window.setTimeout(function(){item.remove();},2400); };
  const templates = function () { try { const saved=JSON.parse(localStorage.getItem(storageKey)); if (Array.isArray(saved)) return saved; } catch (error) {} localStorage.setItem(storageKey, JSON.stringify(defaults)); return defaults.slice(); };
  const saveTemplates = function (items) { localStorage.setItem(storageKey, JSON.stringify(items)); };
  const currentTemplates = function () { return templates(); };
  const configured = function (trade) { return currentTemplates().some(function (item) { return item.trade === trade; }); };

  const qualifiedLink = document.querySelector('.nav-children a[href="合格考生.html"]');
  if (qualifiedLink && !qualifiedLink.parentElement.querySelector('a[href="证书模板.html"]')) {
    qualifiedLink.insertAdjacentHTML('afterend', '<a class="nav-link" href="证书模板.html">证书模板</a>');
  }

  let activeModal = null;
  function closeModal() { activeModal?.remove(); activeModal=null; document.body.style.overflow=''; }
  function openModal(title, content, primaryLabel, onPrimary, secondaryLabel) {
    closeModal();
    const mask=document.createElement('div'); mask.className='modal-mask open';
    mask.innerHTML='<section class="modal" role="dialog" aria-modal="true"><header class="modal-head"><h2>'+escapeHtml(title)+'</h2><button class="icon-btn" type="button" data-flow-close aria-label="关闭">×</button></header><div class="modal-body">'+content+'</div><footer class="modal-foot"><button class="btn" type="button" data-flow-close>'+escapeHtml(secondaryLabel || '取消')+'</button><button class="btn btn-primary" type="button" data-flow-confirm>'+escapeHtml(primaryLabel)+'</button></footer></section>';
    document.body.appendChild(mask); document.body.style.overflow='hidden'; activeModal=mask;
    mask.querySelectorAll('[data-flow-close]').forEach(function(button){button.addEventListener('click',closeModal);});
    mask.addEventListener('click',function(event){if(event.target===mask)closeModal();});
    mask.querySelector('[data-flow-confirm]').addEventListener('click',function(){ if(onPrimary) onPrimary(); });
  }

  function renderTemplateList() {
    const body=document.querySelector('[data-template-list]'); if (!body) return;
    const items=currentTemplates();
    body.innerHTML=items.map(function(item){ const trade=escapeHtml(item.trade); return '<tr data-filter-row data-template-trade="'+trade+'"><td>'+trade+'</td><td>'+escapeHtml(item.name)+'</td><td>'+escapeHtml(item.file)+'</td><td>'+escapeHtml(item.updated)+'</td><td>'+escapeHtml(item.user)+'</td><td class="sticky-op"><button class="link" data-template-preview>预览</button><button class="link" data-template-download>下载</button><a class="link" href="编辑证书模板.html?trade='+encodeURIComponent(item.trade)+'">编辑</a></td></tr>'; }).join('')+'<tr class="empty-row hidden"><td colspan="6">未找到符合条件的模板</td></tr>';
    const count=document.querySelector('.pagination > span'); if(count) count.textContent='共 '+items.length+' 条';
  }

  if (pageId === '证书模板.html') {
    renderTemplateList();
    document.addEventListener('click', function(event) {
      if (event.target.closest('[data-template-preview]')) toast('已打开证书模板预览');
      if (event.target.closest('[data-template-download]')) toast('模板文件已开始下载');
    });
  }

  if (pageId === '编辑证书模板.html') {
    const form=document.querySelector('[data-template-form]');
    const trade=form?.querySelector('[data-template-trade]');
    const name=form?.querySelector('[data-template-name]');
    const file=form?.querySelector('[data-template-file]');
    const uploadResult=form?.querySelector('[data-template-upload-result]');
    const fileName=form?.querySelector('[data-template-file-name]');
    const fileSize=form?.querySelector('[data-template-file-size]');
    const error=form?.querySelector('[data-template-error]');
    const editing=new URLSearchParams(location.search).get('trade') || '';
    let uploaded=false;
    if (editing) {
      const item=currentTemplates().find(function(entry){return entry.trade===editing;});
      document.querySelectorAll('[data-template-page-title]').forEach(function(node){node.textContent='编辑证书模板';});
      if (item && trade && name) { trade.value=item.trade; trade.disabled=true; name.value=item.name; uploaded=true; uploadResult?.classList.remove('hidden'); if(fileName)fileName.textContent=item.file; if(fileSize)fileSize.textContent='当前模板文件'; }
    }
    trade?.addEventListener('change',function(){ if (!name.value && trade.value) name.value=trade.value+'合格证书模板'; });
    form?.querySelector('[data-template-standard-download]')?.addEventListener('click',function(){ toast('证书标准模板已开始下载'); });
    form?.querySelector('[data-template-file-trigger]')?.addEventListener('click',function(){ file?.click(); });
    file?.addEventListener('change',function(){ const picked=file.files?.[0]; if (!picked) return; uploaded=true; uploadResult?.classList.remove('hidden'); if(fileName)fileName.textContent=picked.name; if(fileSize)fileSize.textContent=(picked.size/1024).toFixed(1)+' KB · 上传成功'; if(error)error.textContent=''; });
    form?.querySelector('[data-template-preview]')?.addEventListener('click',function(){ if(uploaded)toast('已打开模板预览'); else toast('请先上传模板文件'); });
    form?.addEventListener('submit',function(event){
      event.preventDefault(); const selected=trade?.value || ''; const templateName=name?.value.trim() || '';
      if (!selected || !templateName || !uploaded) { if(error)error.textContent=!selected?'请选择工种':!templateName?'请输入模板名称':'请上传模板文件'; return; }
      const items=currentTemplates(); const duplicated=!editing && items.some(function(item){return item.trade===selected;});
      if (duplicated) { openModal('当前工种已配置证书模板','<p>当前“'+escapeHtml(selected)+'”已配置证书模板，请直接编辑原模板。</p>','知道了',closeModal,''); return; }
      const filename=fileName?.textContent || selected+'证书模板.docx'; const updated='2026-08-27 10:30';
      const record={trade:selected,name:templateName,file:filename,updated:updated,user:'评价机构管理员'};
      const next=editing ? items.map(function(item){return item.trade===editing?record:item;}) : items.concat(record);
      saveTemplates(next); toast(editing?'证书模板已更新':'证书模板已保存'); window.setTimeout(function(){location.href='证书模板.html';},350);
    });
  }

  function updateIssueToolbar() {
    const selected=Array.from(document.querySelectorAll('[data-issue-select]:checked'));
    const count=document.querySelector('[data-issue-selected-count]'); const batch=document.querySelector('[data-issue-batch]');
    if(count)count.textContent=selected.length; if(batch)batch.disabled=!selected.length;
  }
  function issueRow(row) {
    const registration=row.children[1]?.textContent.trim() || ''; const code='HBCERT-2026-'+registration.slice(-6);
    row.dataset.status='已发放'; row.querySelector('[data-issue-code]').textContent=code;
    row.querySelector('[data-issue-status]').innerHTML='<span class="tag tag-green"><span class="status-dot"></span>已发放</span>';
    row.querySelector('[data-issue-time]').textContent='2026-09-21 10:32';
    const box=row.querySelector('[data-issue-select]'); if(box)box.closest('td').innerHTML='';
    const action=row.querySelector('td.sticky-op'); if(action)action.innerHTML='<a class="link" href="证书发放详情.html#issued">查看</a>';
    const pending=document.querySelector('[data-issue-pending-count]'); const issued=document.querySelector('[data-issue-issued-count]');
    if(pending)pending.textContent=Math.max(0,Number(pending.textContent)-1); if(issued)issued.textContent=Number(issued.textContent)+1;
  }
  function confirmIssue(rows) {
    const names=rows.map(function(row){return row.children[2]?.textContent.trim();}).join('、');
    const trades=Array.from(new Set(rows.map(function(row){return row.dataset.issueTrade;})));
    const info=rows.length===1 ? '<div class="review-person-summary"><span>持证人</span><strong>'+escapeHtml(names)+'</strong><small>工种：'+escapeHtml(trades[0])+'　·　考试批次：'+escapeHtml(rows[0].children[4]?.textContent.trim())+'　·　合格日期：'+escapeHtml(rows[0].children[5]?.textContent.trim())+'</small></div><p>确认后将生成正式电子证书并同步至考生个人证书档案。</p>' : '<div class="review-person-summary"><span>本次选择</span><strong>'+rows.length+'人</strong><small>涉及工种：'+trades.length+'个</small></div><p>系统将根据考生工种自动匹配对应证书模板并生成电子证书。</p>';
    openModal(rows.length===1?'确认证书发放':'批量发放证书',info,'确认发放',function(){ rows.forEach(issueRow); closeModal(); updateIssueToolbar(); toast(rows.length===1?'证书已发放':'已完成批量证书发放'); });
  }
  function warnMissing(trades) {
    const text=trades.map(function(item){return '<li>'+escapeHtml(item.trade)+'：'+item.count+'人</li>';}).join('');
    openModal('暂无法批量发放','<p>发现以下工种未配置证书模板：</p><ul class="modal-list">'+text+'</ul><p>请先完成证书模板配置后重新发放。</p>','前往证书模板',function(){location.href='证书模板.html';},'取消');
  }
  function rowsWithMissingTemplate(rows) {
    const groups={}; rows.forEach(function(row){const trade=row.dataset.issueTrade; if(!configured(trade))groups[trade]=(groups[trade]||0)+1;}); return Object.keys(groups).map(function(trade){return {trade:trade,count:groups[trade]};});
  }
  if (pageId === '证书发放.html') {
    document.querySelector('[data-issue-select-all]')?.addEventListener('change',function(event){ document.querySelectorAll('[data-issue-select]').forEach(function(box){if(!box.closest('tr').classList.contains('hidden'))box.checked=event.target.checked;}); updateIssueToolbar(); });
    document.addEventListener('change',function(event){if(event.target.matches('[data-issue-select]'))updateIssueToolbar();});
    document.addEventListener('click',function(event){
      const single=event.target.closest('[data-issue-single]'); if(single){const row=single.closest('tr'); const missing=rowsWithMissingTemplate([row]); if(missing.length)warnMissing(missing); else confirmIssue([row]);}
      if(event.target.closest('[data-issue-batch]')){const rows=Array.from(document.querySelectorAll('[data-issue-select]:checked')).map(function(box){return box.closest('tr');}); const missing=rowsWithMissingTemplate(rows); if(missing.length)warnMissing(missing); else confirmIssue(rows);}
    });
  }

  if (pageId === '证书发放详情.html') {
    const detail=document.querySelector('[data-certificate-detail]'); const action=detail?.querySelector('[data-cert-detail-issue]');
    const hash=location.hash;
    if(hash==='#issued'){
      detail.querySelector('[data-cert-detail-status]').className='tag tag-green'; detail.querySelector('[data-cert-detail-status]').innerHTML='<span class="status-dot"></span>已发放';
      detail.querySelector('[data-cert-holder-title]').textContent='周强 · 装配式建筑施工员证书'; detail.querySelector('[data-cert-holder-meta]').textContent='平台报名编号：HBIC-2026-000087　·　考试批次：KSPC-20260918-0002';
      action?.remove(); detail.querySelector('.main-stack').innerHTML='<section class="plain-card"><div class="block-head"><h2>证书信息</h2></div><div class="plain-card-body"><div class="detail-grid"><div class="detail-item"><span class="detail-label">证书编号</span><span class="detail-value">HBCERT-2026-000087</span></div><div class="detail-item"><span class="detail-label">持证人</span><span class="detail-value">周强</span></div><div class="detail-item"><span class="detail-label">工种</span><span class="detail-value">装配式建筑施工员</span></div><div class="detail-item"><span class="detail-label">发证机构</span><span class="detail-value">湖北省智能建造评价中心</span></div><div class="detail-item"><span class="detail-label">发证日期</span><span class="detail-value">2026-09-21</span></div></div></div></section><section class="plain-card"><div class="block-head"><h2>电子证书</h2></div><div class="plain-card-body"><div class="certificate-preview"><div class="certificate-seal">HBIC</div><div><strong>职业技能合格证书</strong><p>兹证明周强已通过装配式建筑施工员职业技能评价</p><small>证书编号：HBCERT-2026-000087</small></div></div><div class="card-actions"><button class="btn" data-toast="电子证书已开始下载">下载证书</button><button class="btn" data-toast="已打开证书查验页">查看证书</button></div></div></section><section class="plain-card"><div class="block-head"><h2>发放记录</h2></div><div class="plain-card-body"><div class="detail-grid"><div class="detail-item"><span class="detail-label">发放人员</span><span class="detail-value">评价机构管理员 王敏</span></div><div class="detail-item"><span class="detail-label">发放时间</span><span class="detail-value">2026-09-21 10:32</span></div></div></div></section>';
    } else if(hash==='#missing-template') {
      detail.querySelector('[data-cert-holder-title]').textContent='陈涛 · 建筑机器人操作员证书'; detail.querySelector('[data-cert-holder-meta]').textContent='平台报名编号：HBIC-2026-000129　·　考试批次：KSPC-20260918-0002'; detail.querySelector('[data-cert-holder-name]').textContent='陈涛'; detail.querySelector('[data-cert-trade]').textContent='建筑机器人操作员';
    }
    action?.addEventListener('click',function(){
      const trade=detail.querySelector('[data-cert-trade]')?.textContent.trim() || '';
      const holder=detail.querySelector('[data-cert-holder-name]')?.textContent || '赵敏';
      if(!configured(trade)){warnMissing([{trade:trade,count:1}]);return;}
      openModal('确认证书发放','<div class="review-person-summary"><span>持证人</span><strong>'+escapeHtml(holder)+'</strong><small>工种：'+escapeHtml(trade)+'　·　考试批次：KSPC-20260918-0002　·　合格日期：2026-09-20</small></div><p>确认后将生成正式电子证书并同步至考生个人证书档案。</p>','确认发放',function(){ closeModal(); action.remove(); const status=detail.querySelector('[data-cert-detail-status]'); if(status){status.className='tag tag-green';status.innerHTML='<span class="status-dot"></span>已发放';} toast('证书已发放'); });
    });
  }
});

/* 考试项目启停用演示闭环 */
document.addEventListener('DOMContentLoaded', function () {
    const pageId = decodeURIComponent(location.pathname.split('/').pop()) || document.body.dataset.pageId || '';
  if (pageId === '编辑考试项目.html') {
    const state = new URLSearchParams(location.search).get('status');
    const canPublish = !state && (location.hash === '' || location.hash === '#draft');
    const footer = document.querySelector('.form-footer');
    const save = footer?.querySelector('button:last-of-type');
    if (save) { save.classList.remove('btn-primary'); save.dataset.pageSubmit = '考试项目已保存'; }
    if (canPublish && footer && !footer.querySelector('[data-project-save-publish]')) {
      const publish = document.createElement('button'); publish.type = 'button'; publish.className = 'btn btn-primary'; publish.dataset.projectSavePublish = ''; publish.textContent = '保存并发布'; footer.appendChild(publish);
      publish.addEventListener('click', function () {
        if (!window.confirm('确认保存项目并提交发布审核吗？')) return;
        const stack = document.querySelector('.toast-stack'); if (stack) stack.insertAdjacentHTML('beforeend', '<div class="toast success"><span data-icon="check"></span><span>项目已保存并提交发布审核</span></div>');
        window.setTimeout(function () { location.href = '考试项目详情.html?status=review'; }, 650);
      });
    }
    return;
  }
  if (pageId !== '考试项目列表.html' && pageId !== '考试项目详情.html') return;
  const isList = pageId === '考试项目列表.html';
  document.body.insertAdjacentHTML('beforeend', '<div id="project-lifecycle-modal" class="modal-mask"><section class="modal"><header class="modal-head"><h2 data-project-state-title>考试项目状态操作</h2><button class="icon-btn" type="button" data-project-state-close>×</button></header><div class="modal-body"><p>考试项目：<strong data-project-state-name>—</strong></p><label class="field"><span data-project-state-label>操作原因</span><textarea class="control" rows="4" data-project-state-reason></textarea></label><div class="error" data-project-state-error></div></div><footer class="modal-foot"><button class="btn" type="button" data-project-state-close>取消</button><button class="btn btn-primary" type="button" data-project-state-confirm>确认</button></footer></section></div>');
  const modal = document.getElementById('project-lifecycle-modal'); let active = null;
  function toast(message) { const stack = document.querySelector('.toast-stack'); if (!stack) return; const item = document.createElement('div'); item.className = 'toast success'; item.textContent = message; stack.appendChild(item); setTimeout(function () { item.remove(); }, 2400); }
  function setBadge(badge, state) { badge.className = 'tag ' + (state === '已发布' ? 'tag-green' : 'tag-gray'); badge.innerHTML = '<span class="status-dot"></span>' + state; }
  function openModal(target, action, name) { active = { target: target, action: action }; modal.querySelector('[data-project-state-title]').textContent = action + '考试项目'; modal.querySelector('[data-project-state-name]').textContent = name; modal.querySelector('[data-project-state-label]').textContent = action === '停用' ? '停用原因（必填）' : '启用说明（选填）'; modal.querySelector('[data-project-state-reason]').value = ''; modal.querySelector('[data-project-state-error]').textContent = ''; const confirm = modal.querySelector('[data-project-state-confirm]'); confirm.className = 'btn ' + (action === '停用' ? 'btn-danger' : 'btn-primary'); confirm.textContent = '确认' + action; modal.classList.add('open'); }
  modal.querySelectorAll('[data-project-state-close]').forEach(function (button) { button.addEventListener('click', function () { modal.classList.remove('open'); }); });
  if (isList) {
    const tabs = document.querySelector('.tabs'); if (tabs && !tabs.querySelector('[data-demo-tab="已停用"]')) tabs.insertAdjacentHTML('beforeend', '<button class="tab" data-demo-tab="已停用">已停用<span class="tab-count">1</span></button>');
    const statusSelect = Array.from(document.querySelectorAll('select.control')).find(function (select) { return Array.from(select.options).some(function (o) { return o.text === '待平台审核'; }); }); if (statusSelect && !Array.from(statusSelect.options).some(function (o) { return o.text === '已停用'; })) statusSelect.insertAdjacentHTML('beforeend', '<option>已停用</option>');
    const total = document.querySelector('[data-demo-tab="全部"] .tab-count'); if (total) total.textContent = '11';
    const tbody = document.querySelector('.standard-table tbody'); if (tbody && !tbody.querySelector('[data-status="已停用"]')) tbody.querySelector('.empty-row').insertAdjacentHTML('beforebegin', '<tr data-filter-row data-status="已停用"><td>PJ-2026-0019</td><td>智能装备操作员职业技能评价</td><td>智能装备操作员</td><td>线下理论＋线下实操</td><td>¥280/人</td><td><span class="tag tag-gray"><span class="status-dot"></span>已停用</span></td><td>2026-08-18 14:20</td><td class="sticky-op"><a class="link" href="考试项目详情.html#disabled">查看</a><a class="link" href="编辑考试项目.html#disabled">编辑</a></td></tr>');
    document.querySelectorAll('tr[data-filter-row]').forEach(function (row) {
      const view = row.querySelector('.sticky-op a[href^="project-detail"]');
      const edit = row.querySelector('.sticky-op a[href^="project-edit"]');
      if (row.dataset.status === '已发布') {
        if (view) view.href = '考试项目详情.html?status=published';
        if (edit) edit.href = '编辑考试项目.html?status=published';
      } else if (row.dataset.status === '待平台审核') {
        if (view) view.href = '考试项目详情.html?status=review';
        if (edit) edit.href = '编辑考试项目.html?status=review';
      }
      if (row.dataset.status !== '已发布' && row.dataset.status !== '已停用') return;
      row.querySelector('.sticky-op').insertAdjacentHTML('beforeend', '<button type="button" class="link" data-project-state="' + (row.dataset.status === '已发布' ? '停用' : '启用') + '">' + (row.dataset.status === '已发布' ? '停用' : '启用') + '</button>');
    });
    document.addEventListener('click', function (event) { const button = event.target.closest('[data-project-state]'); if (!button) return; const row = button.closest('tr'); openModal(row, button.dataset.projectState, row.children[1].textContent.trim()); });
  } else {
    const queryState = new URLSearchParams(location.search).get('status');
    const stopped = location.hash === '#disabled'; const draft = location.hash === '#draft'; const review = queryState === 'review';
    const badge = document.querySelector('.record-banner-side .tag'); const actions = document.querySelector('.header-actions'); const edit = actions.querySelector('a[href^="project-edit"]');
    if (draft) {
      setBadge(badge, '草稿');
      if (edit) edit.href = '编辑考试项目.html#draft';
      const publish = document.createElement('button'); publish.type = 'button'; publish.className = 'btn btn-primary'; publish.textContent = '项目发布'; actions.appendChild(publish);
      publish.addEventListener('click', function () {
        if (!window.confirm('确认提交项目发布审核吗？')) return;
        badge.className = 'tag tag-blue'; badge.innerHTML = '<span class="status-dot"></span>待平台审核';
        publish.remove();
        if (edit) edit.href = '编辑考试项目.html?status=review';
        toast('项目已提交发布审核');
      });
    } else if (review) {
      badge.className = 'tag tag-blue'; badge.innerHTML = '<span class="status-dot"></span>待平台审核';
      if (edit) edit.href = '编辑考试项目.html?status=review';
    } else {
      const published = queryState === 'published' || !stopped;
      setBadge(badge, stopped ? '已停用' : '已发布');
      if (edit) edit.href = stopped ? '编辑考试项目.html#disabled' : '编辑考试项目.html?status=published';
      const button = document.createElement('button'); button.type = 'button'; button.className = stopped ? 'btn btn-primary' : 'btn btn-danger'; button.dataset.projectState = stopped ? '启用' : '停用'; button.textContent = button.dataset.projectState + '考试项目'; actions.appendChild(button); button.addEventListener('click', function () { openModal(button, button.dataset.projectState, document.querySelector('.record-banner-main h2').textContent.trim()); });
    }
  }
  modal.querySelector('[data-project-state-confirm]').addEventListener('click', function () { if (!active) return; const reason = modal.querySelector('[data-project-state-reason]').value.trim(); if (active.action === '停用' && !reason) { modal.querySelector('[data-project-state-error]').textContent = '请填写停用原因'; return; } const newState = active.action === '停用' ? '已停用' : '已发布'; const row = active.target.tagName === 'TR' ? active.target : active.target.closest('tr'); if (row) { row.dataset.status = newState; setBadge(row.querySelector('.tag'), newState); const button = row.querySelector('[data-project-state]'); button.dataset.projectState = active.action === '停用' ? '启用' : '停用'; button.textContent = button.dataset.projectState; } else { setBadge(document.querySelector('.record-banner-side .tag'), newState); active.target.dataset.projectState = active.action === '停用' ? '启用' : '停用'; active.target.textContent = active.target.dataset.projectState + '考试项目'; active.target.className = active.target.dataset.projectState === '启用' ? 'btn btn-primary' : 'btn btn-danger'; } modal.classList.remove('open'); toast('考试项目已' + active.action); });
});

/* 考试批次一期静态数据：人工维护考场、考生座位和监考人员。 */
(function () {
  const storageKey = 'evaluationExamBatchV1';
  const pageId = document.body.dataset.pageId;
  if (!['考试批次.html', '考试批次详情.html', '编辑考试批次.html'].includes(pageId)) return;
  const esc = function (value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) { return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]; }); };
  const tagClass = function (status) { return status === '筹备中' ? 'tag-blue' : status === '任务已下发' ? 'tag-green' : status === '草稿' ? 'tag-gray' : 'tag-gray'; };
  const notify = function (message, type) { const stack = document.querySelector('.toast-stack'); if (!stack) return; const node = document.createElement('div'); node.className = 'toast ' + (type || 'success'); node.textContent = message; stack.appendChild(node); window.setTimeout(function () { node.remove(); }, 2400); };
  const buildCandidates = function () {
    return [
      { name:'张明', registration:'HBIC-2026-000128', admission:'ZK202611200128', room:'A01', seat:'08' },
      { name:'李建国', registration:'HBIC-2026-000129', admission:'ZK202611200129', room:'A01', seat:'09' },
      { name:'周志强', registration:'HBIC-2026-000131', admission:'ZK202611200131', room:'A02', seat:'05' },
      { name:'赵敏', registration:'HBIC-2026-000132', admission:'ZK202611200132', room:'A02', seat:'06' }
    ];
  };
  const seed = function () { return {
    sampleVersion:2, id:'KSPC-20261120-0006', name:'建筑信息模型技术员考试批次', project:'建筑信息模型技术员职业技能评价', date:'2026-11-20', startTime:'09:00', endTime:'17:00', site:'湖北智能建造评价基地', mode:'线下理论 + 线下实操', status:'筹备中',
    rooms:[{ name:'A01', location:'评价基地2楼201', capacity:45 }, { name:'A02', location:'评价基地2楼202', capacity:45 }],
    candidates:buildCandidates(),
    proctors:[{ room:'A01', role:'主监考', name:'王老师', phone:'138****6218', taskStatus:'待下发' }, { room:'A01', role:'监考员', name:'李老师', phone:'139****3026', taskStatus:'待下发' }, { room:'A02', role:'主监考', name:'陈老师', phone:'138****1122', taskStatus:'待下发' }, { room:'A02', role:'监考员', name:'周老师', phone:'139****6678', taskStatus:'待下发' }],
    remark:'A01优先安排第一期送考学员；特殊情况由现场负责人统一协调。'
  }; };
  const load = function () { try { const value = JSON.parse(localStorage.getItem(storageKey)); return value && value.id && value.sampleVersion === 2 ? value : seed(); } catch (error) { return seed(); } };
  const save = function (batch) { localStorage.setItem(storageKey, JSON.stringify(batch)); };
  const roomCount = function (batch, name) { return batch.candidates.filter(function (item) { return item.room === name; }).length; };
  const dateLabel = function (batch) { return batch.date || '—'; };
  const staticRows = function () { return [
    { id:'KSPC-20260918-0002', name:'装配式建筑施工员考试批次', project:'装配式建筑施工员职业技能评价', date:'2026-09-18', startTime:'09:00', endTime:'12:00', site:'洪山区职业技能评价基地', rooms:[{}], candidates:new Array(32), status:'任务已下发' },
    { id:'KSPC-20261206-0003', name:'智能装备操作员考试批次', project:'智能装备操作员职业技能评价', date:'2026-12-06', startTime:'09:00', endTime:'12:00', site:'湖北智能建造评价基地', rooms:[], candidates:[], status:'草稿' },
    { id:'KSPC-20260812-0001', name:'建筑信息模型技术员考试批次（第一期）', project:'建筑信息模型技术员职业技能评价', date:'2026-08-12', startTime:'09:00', endTime:'17:00', site:'湖北智能建造评价基地', rooms:[{},{}], candidates:new Array(82), status:'已结束' }
  ]; };
  const allRows = function () { return [load()].concat(staticRows()); };

  function renderList() {
    const body = document.querySelector('[data-exam-list-body]'); if (!body) return;
    const rows = allRows();
    body.innerHTML = rows.map(function (batch, index) {
      const count = Array.isArray(batch.candidates) ? batch.candidates.length : 0;
      const detailState = batch.status === '草稿' ? 'draft' : batch.status === '筹备中' ? 'prepared' : batch.status === '任务已下发' ? 'dispatched' : 'ended';
      const detailHref = '考试批次详情.html?state=' + detailState;
      const actions = batch.status === '草稿' ? '<a class="link" href="编辑考试批次.html">编辑</a><a class="link" href="' + detailHref + '">查看</a>' : batch.status === '筹备中' ? '<a class="link" href="' + detailHref + '">查看</a><a class="link" href="编辑考试批次.html">编辑</a>' : '<a class="link" href="' + detailHref + '">查看</a>';
      return '<tr data-filter-row data-status="' + esc(batch.status) + '"><td><span class="exam-batch-name">' + esc(batch.name) + '</span><span class="exam-batch-sub">' + esc(batch.id || '保存后自动生成') + '</span></td><td>' + esc(batch.project || '—') + '</td><td><div class="exam-time"><strong>' + esc(dateLabel(batch)) + '</strong><span>' + esc(batch.startTime || '—') + '–' + esc(batch.endTime || '—') + '</span></div></td><td>' + esc(batch.site || '—') + '</td><td>' + (batch.rooms.length ? batch.rooms.length + '个考场' : '—') + '</td><td>' + count + '人</td><td><span class="tag ' + tagClass(batch.status) + '"><span class="status-dot"></span>' + esc(batch.status) + '</span></td><td class="sticky-op"><div class="exam-actions">' + actions + '</div></td></tr>';
    }).join('') + '<tr class="empty-row hidden"><td colspan="8">未找到符合条件的记录</td></tr>';
    document.querySelector('[data-exam-list-total]').textContent = '共 ' + rows.length + ' 条';
    const counts = rows.reduce(function (result, row) { result[row.status] = (result[row.status] || 0) + 1; return result; }, { 全部:rows.length });
    document.querySelectorAll('[data-exam-tabs] [data-demo-tab]').forEach(function (tab) { const count = tab.querySelector('.tab-count'); if (count) count.textContent = counts[tab.dataset.demoTab] || 0; });
  }

  function renderDetail() {
    const batch = load(); const routeState = new URLSearchParams(window.location.search).get('state'); const displayStatus = routeState === 'draft' ? '草稿' : routeState === 'prepared' ? '筹备中' : routeState === 'dispatched' ? '任务已下发' : routeState === 'ended' ? '已结束' : batch.status; const summary = document.querySelector('[data-exam-summary]'); if (!summary) return;
    const assigned = batch.candidates.filter(function (item) { return item.room && item.seat; }).length;
    const unassigned = batch.candidates.length - assigned;
    summary.innerHTML = '<div class="exam-summary-main"><span class="exam-summary-icon"><span data-icon="clipboard"></span></span><div><h2>' + esc(batch.name || '未命名考试批次') + '</h2><p>批次号：' + esc(batch.id || '保存后自动生成') + '　·　考试日期：' + esc(dateLabel(batch)) + '</p></div></div><span class="tag ' + tagClass(displayStatus) + '"><span class="status-dot"></span>' + esc(displayStatus) + '</span><div class="exam-kpis"><div class="exam-kpi"><strong>' + batch.candidates.length + '人</strong><span>考生</span></div><div class="exam-kpi"><strong>' + batch.rooms.length + '个</strong><span>考场</span></div><div class="exam-kpi"><strong>' + batch.proctors.length + '人</strong><span>监考人员</span></div><div class="exam-kpi"><strong>' + unassigned + '人</strong><span>未安排考生</span></div></div>';
    const basic = [['考试项目',batch.project],['考试日期',batch.date],['考试时间',(batch.startTime || '—') + '–' + (batch.endTime || '—')],['考点',batch.site],['考试方式',batch.mode],['考生人数',batch.candidates.length + '人']];
    document.querySelector('[data-exam-basic]').innerHTML = basic.map(function (item) { return '<div class="detail-item"><span class="detail-label">' + item[0] + '</span><span class="detail-value">' + esc(item[1] || '—') + '</span></div>'; }).join('');
    document.querySelector('[data-exam-rooms]').innerHTML = batch.rooms.length ? batch.rooms.map(function (room) { return '<tr><td>' + esc(room.name) + '</td><td>' + esc(room.location) + '</td><td>' + esc(room.capacity) + '人</td><td>' + roomCount(batch, room.name) + '人</td></tr>'; }).join('') : '<tr><td colspan="4" class="muted">暂未添加考场</td></tr>';
    const showAdmission = displayStatus === '任务已下发' || displayStatus === '已结束';
    const candidateTable = document.querySelector('[data-exam-candidates]').closest('table');
    candidateTable.querySelectorAll('thead th')[3].hidden = !showAdmission;
    document.querySelector('[data-exam-candidate-summary]').textContent = '共' + batch.candidates.length + '名考生 · 已安排' + assigned + '人 · 未安排' + unassigned + '人';
    document.querySelector('[data-exam-candidate-total]').textContent = '共 ' + batch.candidates.length + ' 条';
    document.querySelector('[data-exam-candidates]').innerHTML = batch.candidates.slice(0, 10).map(function (candidate) { const arranged = candidate.room && candidate.seat; const admissionCell = showAdmission ? '<td>' + esc(candidate.admission || '—') + '</td>' : ''; return '<tr><td>' + esc(candidate.room || '—') + '</td><td>' + esc(candidate.seat || '—') + '</td><td>' + esc(candidate.name) + '</td>' + admissionCell + '<td>' + esc(candidate.registration) + '</td><td class="sticky-op"><span class="tag ' + (arranged ? 'tag-green' : 'tag-orange') + '"><span class="status-dot"></span>' + (arranged ? '已安排' : '未安排') + '</span></td></tr>'; }).join('') || '<tr><td colspan="' + (showAdmission ? '6' : '5') + '" class="muted">暂未选择考生</td></tr>';
    document.querySelector('[data-exam-proctor-summary]').textContent = '共' + batch.proctors.length + '名工作人员';
    document.querySelector('[data-exam-proctors]').innerHTML = batch.proctors.length ? batch.proctors.map(function (person) { const taskStatus = displayStatus === '任务已下发' ? '已下发' : (person.taskStatus || '待下发'); return '<tr><td>' + esc(person.room || '—') + '</td><td>' + esc(person.role) + '</td><td>' + esc(person.name) + '</td><td>' + esc(person.phone) + '</td><td class="sticky-op"><span class="tag ' + (taskStatus === '待下发' ? 'tag-orange' : 'tag-green') + '"><span class="status-dot"></span>' + esc(taskStatus) + '</span></td></tr>'; }).join('') : '<tr><td colspan="5" class="muted">暂未安排监考人员</td></tr>';
    const ready = batch.rooms.length && batch.candidates.length && assigned === batch.candidates.length && batch.proctors.length;
    const remark = document.querySelector('[data-exam-remark]');
    if (remark) remark.textContent = batch.remark || '暂无备注';
    const actions = document.querySelector('[data-exam-detail-actions]');
    if (displayStatus === '草稿') actions.innerHTML = '<a class="btn btn-primary" href="编辑考试批次.html">编辑批次</a>';
    else if (displayStatus === '筹备中') actions.innerHTML = '<a class="btn" href="编辑考试批次.html">编辑批次</a><button class="btn btn-primary" type="button" data-exam-dispatch>下发考试任务</button>';
    else if (displayStatus === '任务已下发') actions.innerHTML = '<button class="btn btn-primary" type="button" data-toast="考试任务已下发，可在考试执行端查看">任务已下发</button><a class="btn" href="编辑考试批次.html">调整安排</a>';
    else actions.innerHTML = '<button class="btn" type="button" data-toast="考试批次已导出"><span data-icon="export"></span>导出</button>';
    const dispatchButton = actions.querySelector('[data-exam-dispatch]');
    dispatchButton?.addEventListener('click', function () {
      if (!ready) { notify('当前考试安排尚未完成，请先完善考场、考生和监考人员安排后再下发任务。', 'warning'); return; }
      let modal=document.querySelector('[data-exam-dispatch-modal]');
      if(!modal){
        modal=document.createElement('div'); modal.className='modal-mask dispatch-modal-mask'; modal.dataset.examDispatchModal='';
        modal.innerHTML='<div class="modal dispatch-modal" role="dialog" aria-modal="true" aria-labelledby="dispatch-modal-title"><div class="modal-head"><h2 id="dispatch-modal-title">考试任务下发确认</h2><button class="icon-btn" type="button" aria-label="关闭" data-exam-dispatch-close>×</button></div><div class="modal-body" data-exam-dispatch-content></div><div class="modal-foot"><button class="btn" type="button" data-exam-dispatch-close>取消</button><button class="btn btn-primary" type="button" data-exam-dispatch-confirm>确认下发</button></div></div>';
        document.body.appendChild(modal);
        modal.querySelectorAll('[data-exam-dispatch-close]').forEach(function(button){ button.addEventListener('click',function(){modal.classList.remove('open');}); });
        modal.addEventListener('click',function(event){if(event.target===modal)modal.classList.remove('open');});
        modal.querySelector('[data-exam-dispatch-confirm]').addEventListener('click',function(){ batch.status='任务已下发'; batch.proctors.forEach(function(person){person.taskStatus='已下发';}); save(batch); modal.classList.remove('open'); notify('考试任务下发成功'); renderDetail(); });
      }
      const content=modal.querySelector('[data-exam-dispatch-content]');
      content.innerHTML='<section class="dispatch-section"><h3>基本信息</h3><div class="dispatch-info-grid"><span>考试项目<strong>'+esc(batch.project)+'</strong></span><span>考试批次编号<strong>'+esc(batch.id)+'</strong></span><span>考试日期<strong>'+esc(batch.date)+'</strong></span><span>考点<strong>'+esc(batch.site)+'</strong></span></div></section><section class="dispatch-section"><h3>下发范围</h3><div class="dispatch-info-grid compact"><span>考生<strong>'+batch.candidates.length+'人</strong></span><span>考场<strong>'+batch.rooms.length+'个</strong></span><span>监考人员<strong>'+batch.proctors.length+'人</strong></span><span>理论考试<strong>'+esc(batch.startTime)+'–10:30</strong></span><span>实操考试<strong>13:30–17:00</strong></span></div></section><div class="alert alert-info">下发后，考试执行人员可在考试执行端查看该任务，并开展考生核验、签到、现场考试执行及考试结果录入。</div>';
      modal.classList.add('open');
    });
    document.querySelectorAll('[data-icon]').forEach(function (node) { if (node.querySelector('svg')) return; const icons = { clipboard:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5M9 9h6M9 13h6M9 17h4"/></svg>' }; if (icons[node.dataset.icon]) node.innerHTML = icons[node.dataset.icon]; });
  }

  function editBatch() {
    const isNew = new URLSearchParams(window.location.search).get('mode') === 'new';
    let batch = isNew ? { sampleVersion:2, id:'', name:'', project:'', date:'', startTime:'', endTime:'', site:'', mode:'线下理论 + 线下实操', status:'草稿', rooms:[], candidates:[], proctors:[], remark:'' } : load();
    const field = function (name) { return document.querySelector('[data-field="' + name + '"]'); };
  const writeFields = function () { ['name','project','date','startTime','endTime','site','mode','remark'].forEach(function (name) { if (field(name)) field(name).value = batch[name] || ''; }); const number = document.querySelector('[data-exam-number]'); const title = document.querySelector('[data-exam-edit-title]'); const crumb = document.querySelector('[data-exam-edit-crumb]') || document.querySelector('.breadcrumb span:last-child'); if (number) number.textContent = batch.id ? '批次号：' + batch.id : '批次号将在保存后自动生成'; if (title) title.textContent = isNew ? '新建考试批次' : '编辑考试批次'; if (crumb) crumb.textContent = isNew ? '新建考试批次' : '编辑考试批次'; };
    const roomOptions = function (current, includeBlank) { return (includeBlank ? '<option value="">未安排</option>' : '') + batch.rooms.map(function (room) { return '<option value="' + esc(room.name) + '"' + (room.name === current ? ' selected' : '') + '>' + esc(room.name) + '</option>'; }).join(''); };
    const sync = function () { ['name','project','date','startTime','endTime','site','mode','remark'].forEach(function (name) { batch[name] = field(name)?.value.trim() || ''; }); };
    const renderRooms = function () { const body = document.querySelector('[data-edit-rooms]'); body.innerHTML = batch.rooms.length ? batch.rooms.map(function (room, index) { return '<tr><td><input class="control" data-room-field="name" data-room-index="' + index + '" value="' + esc(room.name) + '"></td><td><input class="control" data-room-field="location" data-room-index="' + index + '" value="' + esc(room.location) + '"></td><td><input class="control" data-room-field="capacity" data-room-index="' + index + '" type="number" min="1" value="' + esc(room.capacity) + '"></td><td class="sticky-op"><button class="link" type="button" data-remove-room="' + index + '">删除</button></td></tr>'; }).join('') : '<tr><td colspan="4" class="muted">暂未添加考场</td></tr>'; body.querySelectorAll('[data-room-field]').forEach(function (input) { input.addEventListener('input', function () { batch.rooms[Number(input.dataset.roomIndex)][input.dataset.roomField] = input.value; renderCandidates(); renderProctors(); }); }); body.querySelectorAll('[data-remove-room]').forEach(function (button) { button.addEventListener('click', function () { const removed = batch.rooms.splice(Number(button.dataset.removeRoom), 1)[0]; batch.candidates.forEach(function (candidate) { if (candidate.room === removed.name) { candidate.room=''; candidate.seat=''; } }); batch.proctors.forEach(function (person) { if (person.room === removed.name) person.room=''; }); renderAllTables(); }); }); };
    const renderCandidates = function () { const body = document.querySelector('[data-edit-candidates]'); document.querySelector('[data-edit-candidate-count]').textContent = batch.candidates.length; const roomSelect = document.querySelector('[data-batch-room]'); roomSelect.innerHTML = '<option value="">批量设置考场</option>' + roomOptions('', false); body.innerHTML = batch.candidates.length ? batch.candidates.map(function (candidate, index) { return '<tr><td class="table-check"><input type="checkbox" data-candidate-select="' + index + '"></td><td>' + esc(candidate.name) + '<span class="table-sub">' + esc(candidate.registration) + '</span></td><td>' + esc(candidate.admission || '—') + '</td><td><div class="select-wrap"><select class="control" data-candidate-room="' + index + '">' + roomOptions(candidate.room, true) + '</select></div></td><td><input class="control" data-candidate-seat="' + index + '" value="' + esc(candidate.seat || '') + '" placeholder="手工填写"></td><td class="sticky-op"><button class="link" type="button" data-remove-candidate="' + index + '">移除</button></td></tr>'; }).join('') : '<tr><td colspan="6" class="muted">暂未选择考生</td></tr>'; body.querySelectorAll('[data-candidate-room]').forEach(function (select) { select.addEventListener('change', function () { batch.candidates[Number(select.dataset.candidateRoom)].room = select.value; }); }); body.querySelectorAll('[data-candidate-seat]').forEach(function (input) { input.addEventListener('input', function () { batch.candidates[Number(input.dataset.candidateSeat)].seat = input.value; }); }); body.querySelectorAll('[data-remove-candidate]').forEach(function (button) { button.addEventListener('click', function () { batch.candidates.splice(Number(button.dataset.removeCandidate), 1); renderCandidates(); }); }); body.querySelectorAll('[data-candidate-select]').forEach(function (checkbox) { checkbox.addEventListener('change', updateBatchSelection); }); document.querySelector('[data-select-all-candidates]').checked = false; updateBatchSelection(); };
    const renderProctors = function () { const body = document.querySelector('[data-edit-proctors]'); body.innerHTML = batch.proctors.length ? batch.proctors.map(function (person, index) { return '<tr><td><div class="select-wrap"><select class="control" data-proctor-room="' + index + '">' + roomOptions(person.room, true) + '</select></div></td><td><div class="select-wrap"><select class="control" data-proctor-role="' + index + '"><option' + (person.role === '主监考' ? ' selected' : '') + '>主监考</option><option' + (person.role === '监考员' ? ' selected' : '') + '>监考员</option></select></div></td><td><div class="select-wrap"><select class="control" data-proctor-name="' + index + '"><option data-phone="138****6218"' + (person.name === '王老师' ? ' selected' : '') + '>王老师</option><option data-phone="139****3026"' + (person.name === '李老师' ? ' selected' : '') + '>李老师</option><option data-phone="138****1122"' + (person.name === '陈老师' ? ' selected' : '') + '>陈老师</option><option data-phone="139****6678"' + (person.name === '周老师' ? ' selected' : '') + '>周老师</option></select></div></td><td><input class="control" data-proctor-phone="' + index + '" value="' + esc(person.phone) + '"></td><td class="sticky-op"><button class="link" type="button" data-remove-proctor="' + index + '">删除</button></td></tr>'; }).join('') : '<tr><td colspan="5" class="muted">暂未安排监考人员</td></tr>'; body.querySelectorAll('[data-proctor-room]').forEach(function (select) { select.addEventListener('change', function () { batch.proctors[Number(select.dataset.proctorRoom)].room = select.value; }); }); body.querySelectorAll('[data-proctor-role]').forEach(function (select) { select.addEventListener('change', function () { batch.proctors[Number(select.dataset.proctorRole)].role = select.value; }); }); body.querySelectorAll('[data-proctor-name]').forEach(function (select) { select.addEventListener('change', function () { const index = Number(select.dataset.proctorName); batch.proctors[index].name = select.value; batch.proctors[index].phone = select.selectedOptions[0].dataset.phone; body.querySelector('[data-proctor-phone="' + index + '"]').value = batch.proctors[index].phone; }); }); body.querySelectorAll('[data-proctor-phone]').forEach(function (input) { input.addEventListener('input', function () { batch.proctors[Number(input.dataset.proctorPhone)].phone = input.value; }); }); body.querySelectorAll('[data-remove-proctor]').forEach(function (button) { button.addEventListener('click', function () { batch.proctors.splice(Number(button.dataset.removeProctor), 1); renderProctors(); }); }); };
    const updateBatchSelection = function () { const selected = Array.from(document.querySelectorAll('[data-candidate-select]:checked')); document.querySelector('[data-edit-selected-count]').textContent = selected.length; document.querySelector('[data-batch-toolbar]').hidden = selected.length === 0; };
    const renderAllTables = function () { renderRooms(); renderCandidates(); renderProctors(); };
    writeFields(); renderAllTables();
    document.querySelector('[data-add-room]').addEventListener('click', function () { batch.rooms.push({ name:'', location:'', capacity:'' }); renderAllTables(); });
    document.querySelector('[data-add-proctor]').addEventListener('click', function () { batch.proctors.push({ room:batch.rooms[0]?.name || '', role:'监考员', name:'王老师', phone:'138****6218', taskStatus:'待下发' }); renderProctors(); });
    document.querySelector('[data-select-all-candidates]').addEventListener('change', function (event) { document.querySelectorAll('[data-candidate-select]').forEach(function (box) { box.checked = event.target.checked; }); updateBatchSelection(); });
    document.querySelector('[data-apply-batch-room]').addEventListener('click', function () { const room = document.querySelector('[data-batch-room]').value; const checks = Array.from(document.querySelectorAll('[data-candidate-select]:checked')); if (!room || !checks.length) { notify('请选择考生和考场', 'warning'); return; } checks.forEach(function (box) { batch.candidates[Number(box.dataset.candidateSelect)].room = room; }); renderCandidates(); notify('已批量设置考场'); });
    const mask = document.querySelector('[data-candidate-modal]'); const candidatePool = [{ name:'张明', registration:'HBIC-2026-000128' },{ name:'李建国', registration:'HBIC-2026-000129' },{ name:'周志强', registration:'HBIC-2026-000131' },{ name:'赵敏', registration:'HBIC-2026-000132' },{ name:'吴刚', registration:'HBIC-2026-000133' },{ name:'刘芳', registration:'HBIC-2026-000134' }];
    const renderPool = function () { const existing = batch.candidates.map(function (item) { return item.registration; }); document.querySelector('[data-candidate-pool]').innerHTML = candidatePool.map(function (candidate, index) { const checked = existing.includes(candidate.registration); return '<tr class="candidate-pool-row"><td class="table-check"><input type="checkbox" data-pool-candidate="' + index + '"' + (checked ? ' checked' : '') + '></td><td>' + candidate.name + '</td><td>' + candidate.registration + '</td><td>建筑信息模型技术员</td><td>湖北绿色建造职业培训中心</td><td><span class="tag tag-green"><span class="status-dot"></span>资格通过</span></td></tr>'; }).join(''); };
    document.querySelector('[data-open-candidate-modal]').addEventListener('click', function () { renderPool(); mask.classList.add('open'); document.body.style.overflow='hidden'; });
    document.querySelectorAll('[data-close-exam-modal]').forEach(function (button) { button.addEventListener('click', function () { mask.classList.remove('open'); document.body.style.overflow=''; }); });
    document.querySelector('[data-candidate-search]').addEventListener('input', function (event) { const needle = event.target.value.trim().toLowerCase(); document.querySelectorAll('.candidate-pool-row').forEach(function (row) { row.classList.toggle('hidden', needle && !row.textContent.toLowerCase().includes(needle)); }); });
    document.querySelector('[data-confirm-candidates]').addEventListener('click', function () { const picked = Array.from(document.querySelectorAll('[data-pool-candidate]:checked')).map(function (box) { return candidatePool[Number(box.dataset.poolCandidate)]; }); picked.forEach(function (candidate) { if (!batch.candidates.some(function (item) { return item.registration === candidate.registration; })) batch.candidates.push({ name:candidate.name, registration:candidate.registration, admission:'ZK' + (batch.date || '20261120').replaceAll('-', '') + candidate.registration.slice(-4), room:'', seat:'' }); }); mask.classList.remove('open'); document.body.style.overflow=''; renderCandidates(); notify('已更新考生名单'); });
    document.querySelectorAll('[data-save-exam]').forEach(function (button) { button.addEventListener('click', function () { sync(); const type = button.dataset.saveExam; if (type === 'prepared') { const required = [['批次名称',batch.name],['考试项目',batch.project],['考试日期',batch.date],['开始时间',batch.startTime],['结束时间',batch.endTime],['考点',batch.site]]; const missing = required.find(function (item) { return !item[1]; }); if (missing) { notify('请填写' + missing[0], 'warning'); return; } batch.status = '筹备中'; } else batch.status = '草稿'; if (!batch.id) batch.id = 'KSPC-' + batch.date.replaceAll('-', '') + '-0006'; save(batch); notify(type === 'prepared' ? '考试批次已保存，当前为筹备中' : '草稿已保存'); window.setTimeout(function () { window.location.href = type === 'prepared' ? '考试批次详情.html' : '考试批次.html'; }, 450); }); });
  }
  document.addEventListener('DOMContentLoaded', function () { if (pageId === '考试批次.html') renderList(); if (pageId === '考试批次详情.html') renderDetail(); if (pageId === '编辑考试批次.html') editBatch(); });
})();


document.addEventListener('DOMContentLoaded', function () {
  function show(message) {
    const stack=document.querySelector('.toast-stack'); if(!stack) return;
    const item=document.createElement('div'); item.className='toast success'; item.textContent=message; stack.appendChild(item);
    window.setTimeout(function(){ item.remove(); },2200);
  }
  const reviewModal=document.querySelector('[data-review-modal]');
  const reviewTitle=reviewModal?.querySelector('[data-review-modal-title]');
  const reviewName=reviewModal?.querySelector('[data-review-name]');
  const reviewRegistration=reviewModal?.querySelector('[data-review-registration]');
  const reviewEdit=reviewModal?.querySelector('[data-review-edit]');
  const reviewReadonly=reviewModal?.querySelector('[data-review-readonly]');
  const reviewEditFoot=reviewModal?.querySelector('[data-review-edit-foot]');
  const reviewViewFoot=reviewModal?.querySelector('[data-review-view-foot]');
  const reviewOpinion=reviewModal?.querySelector('[data-review-opinion-input]');
  const reviewConfirm=reviewModal?.querySelector('[data-review-confirm]');
  let activeReviewButton=null;
  let activeReviewState='';
  function closeReviewModal(){ reviewModal?.classList.remove('open'); }
  reviewModal?.querySelectorAll('[data-review-modal-close]').forEach(function(button){button.addEventListener('click',closeReviewModal);});
  function openReviewEdit(button){
    activeReviewButton=button; activeReviewState=button.dataset.reviewOpen || '';
    if(reviewTitle) reviewTitle.textContent=activeReviewState==='审核通过'?'审核通过':'审核退回';
    if(reviewName) reviewName.textContent=button.dataset.name || '—';
    if(reviewRegistration) reviewRegistration.textContent=button.dataset.registration || '—';
    reviewEdit?.classList.remove('hidden'); reviewReadonly?.classList.add('hidden');
    reviewEditFoot?.classList.remove('hidden'); reviewViewFoot?.classList.add('hidden');
    if(reviewOpinion) reviewOpinion.value=activeReviewState==='审核通过'?'材料齐全，符合申报条件。':'';
    if(reviewConfirm) reviewConfirm.textContent=activeReviewState==='审核通过'?'确认通过':'确认退回';
    reviewModal?.classList.add('open'); window.setTimeout(function(){reviewOpinion?.focus();},0);
  }
  function openReviewDetail(button){
    if(reviewTitle) reviewTitle.textContent='审核详情';
    if(reviewName) reviewName.textContent=button.dataset.name || '—';
    if(reviewRegistration) reviewRegistration.textContent=button.dataset.registration || '—';
    const reviewer=reviewModal?.querySelector('[data-reviewer]'); if(reviewer) reviewer.textContent=button.dataset.reviewer || '—';
    const time=reviewModal?.querySelector('[data-review-time]'); if(time) time.textContent=button.dataset.reviewTime || '—';
    const opinion=reviewModal?.querySelector('[data-review-detail-opinion]'); if(opinion) opinion.textContent=button.dataset.reviewOpinion || '—';
    reviewEdit?.classList.add('hidden'); reviewReadonly?.classList.remove('hidden');
    reviewEditFoot?.classList.add('hidden'); reviewViewFoot?.classList.remove('hidden'); reviewModal?.classList.add('open');
  }
  document.addEventListener('click',function(event){
    const editButton=event.target.closest('[data-review-open]'); if(editButton){openReviewEdit(editButton);return;}
    const detailButton=event.target.closest('[data-review-detail]'); if(detailButton){openReviewDetail(detailButton);return;}
    if(event.target.closest('[data-review-modal-close]')){closeReviewModal();return;}
    if(event.target===reviewModal) closeReviewModal();
  });
  reviewConfirm?.addEventListener('click',function(){
    const opinion=reviewOpinion?.value.trim() || '';
    if(!opinion){show('请填写审核意见');reviewOpinion?.focus();return;}
    const row=activeReviewButton?.closest('tr'); const target=row?.querySelector('[data-review-state]');
    if(!row || !target) return;
    const previous=target.dataset.reviewState;
    if(previous!==activeReviewState){
      const oldCount=document.querySelector('[data-summary="'+previous+'"]'); const newCount=document.querySelector('[data-summary="'+activeReviewState+'"]');
      if(oldCount) oldCount.textContent=Math.max(0,parseInt(oldCount.textContent,10)-1)+'人';
      if(newCount) newCount.textContent=(parseInt(newCount.textContent,10)+1)+'人';
    }
    const color=activeReviewState==='审核通过'?'green':'orange'; target.dataset.reviewState=activeReviewState;
    target.innerHTML='<span class="tag tag-'+color+'"><span class="status-dot"></span>'+activeReviewState+'</span>';
    const opinionCell=row.querySelector('[data-review-opinion-cell]'); if(opinionCell) opinionCell.textContent=opinion;
    const operationCell=activeReviewButton.closest('td');
    if(operationCell){operationCell.innerHTML='<button class="link" data-review-detail data-name="'+(activeReviewButton.dataset.name || '')+'" data-registration="'+(activeReviewButton.dataset.registration || '')+'" data-reviewer="评价机构审核员 王敏" data-review-time="2026-08-20 15:28" data-review-opinion="'+opinion.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')+'">查看详情</button>';}
    closeReviewModal(); show('审核结果已记录：'+activeReviewState);
  });
  const returnModal=document.querySelector('[data-return-modal]');
  const returnReason=returnModal?.querySelector('[data-return-reason]');
  const returnNote=returnModal?.querySelector('[data-return-note]');
  const returnError=returnModal?.querySelector('[data-return-error]');
  function closeReturnModal(){ returnModal?.classList.remove('open'); document.body.style.overflow=''; }
  function openReturnModal(){ if(returnReason) returnReason.value=''; if(returnNote) returnNote.value=''; if(returnError) returnError.textContent=''; returnModal?.classList.add('open'); document.body.style.overflow='hidden'; window.setTimeout(function(){returnReason?.focus();},0); }
  document.addEventListener('click',function(event){
    if(event.target.closest('[data-return-open]')){openReturnModal();return;}
    if(event.target.closest('[data-return-close]') || event.target===returnModal){closeReturnModal();return;}
  });
  returnModal?.querySelector('[data-return-submit]')?.addEventListener('click',function(){
    const reason=returnReason?.value || '';
    if(!reason){if(returnError) returnError.textContent='请选择退回原因'; returnReason?.focus(); return;}
    closeReturnModal(); show('已提交退回核对：'+reason);
  });
  const detailActionPages={
    '成绩详情.html':['确认考试结果','退回核对'],
    '成绩发布详情.html':['发布成绩']
  };
  const pageActions=detailActionPages[document.body.dataset.pageId];
  if(pageActions){
    const sideStack=document.querySelector('.two-column > .side-stack');
    const headerActions=document.querySelector('.page-head-row > .header-actions');
    const mainColumn=document.querySelector('.two-column');
    if(sideStack && headerActions && mainColumn){
      const actionFragment=document.createDocumentFragment();
      sideStack.querySelectorAll('.plain-card-body > .btn').forEach(function(action){
        action.classList.remove('btn-block');
        actionFragment.append(action);
      });
      headerActions.prepend(actionFragment);
      sideStack.remove();
      mainColumn.classList.add('single-column');
    }
  }

  if(document.body.dataset.pageId==='成绩发布详情.html' && location.hash==='#published'){
    const publishAction=document.querySelector('.page-head-row > .header-actions button');
    const publishBadge=document.querySelector('.record-banner-side .tag');
    const firstCard=document.querySelector('.main-stack > .plain-card');
    if(publishAction){ publishAction.textContent='撤回发布'; publishAction.classList.remove('btn-primary'); publishAction.dataset.publishWithdraw=''; publishAction.removeAttribute('data-page-submit'); }
    if(publishBadge){ publishBadge.className='tag tag-green'; publishBadge.innerHTML='<span class="status-dot"></span>已发布'; }
    if(firstCard && !document.querySelector('[data-publish-info]')){
      firstCard.insertAdjacentHTML('afterend','<section class="plain-card" data-publish-info><div class="block-head"><h2>已发布信息</h2></div><div class="plain-card-body"><div class="detail-grid"><div class="detail-item"><span class="detail-label">发布人</span><span class="detail-value">评价机构管理员 王敏</span></div><div class="detail-item"><span class="detail-label">发布时间</span><span class="detail-value">2026-08-22 15:30</span></div></div></div></section>');
    }
    publishAction?.addEventListener('click',function(){ show('已撤回发布'); });
  }

  if(document.body.dataset.pageId==='送考批次台账.html'){
    document.title='送考批次审核｜评价机构运营端';
    document.querySelectorAll('h1.page-title, .breadcrumb span.muted, .nav-link.active').forEach(function(node){ if(node.textContent.trim()==='送考批次') node.textContent='送考批次审核'; });
    document.querySelectorAll('tbody tr[data-filter-row]').forEach(function(row){
      const summary=row.children[5]?.textContent||'';
      const action=row.querySelector('td.sticky-op a.link');
      if(action && (row.dataset.status==='待审核' || summary.includes('待审'))) action.textContent='审核';
    });
  }

  if(document.body.dataset.pageId==='准考证管理.html'){
    const admissionTabs=document.querySelector('.content-card > .tabs');
    if(admissionTabs) admissionTabs.hidden=true;
    const admissionStatusFilter=document.querySelector('.filter-panel .filter-row > .field:nth-child(3)');
    if(admissionStatusFilter) admissionStatusFilter.hidden=true;
    document.querySelectorAll('.standard-table thead th:nth-child(7), .standard-table tbody td:nth-child(7)').forEach(function(cell){ cell.hidden=true; });
    document.querySelectorAll('.standard-table thead th:nth-child(3)').forEach(function(header){ header.textContent='考试项目'; });
    document.querySelectorAll('.standard-table tbody tr[data-filter-row] td:nth-child(3)').forEach(function(cell){ cell.textContent='建筑信息模型技术员职业技能评价'; });
  }

  if(document.body.dataset.pageId==='准考证详情.html'){
    document.querySelectorAll('.record-banner-side .tag').forEach(function(tag){ tag.hidden=true; });
  }
});

/* 考试项目无需展示平台审核状态：同步清理页签、筛选项和列表行。 */
document.addEventListener('DOMContentLoaded', function () {
  if (document.body.dataset.pageId !== '考试项目列表.html') return;
  document.querySelectorAll('[data-demo-tab="待平台审核"]').forEach(function (tab) { tab.remove(); });
  document.querySelectorAll('select.control option').forEach(function (option) {
    if (option.textContent.trim() === '待平台审核') option.remove();
  });
  document.querySelectorAll('tr[data-filter-row][data-status="待平台审核"]').forEach(function (row) { row.remove(); });
  const total = document.querySelector('[data-demo-tab="全部"] .tab-count');
  if (total) total.textContent = '10';
  const paginationTotal = document.querySelector('.pagination > span');
  if (paginationTotal) paginationTotal.textContent = '共 10 条';
});

/* 四端原型共用：可拖动页面导航与功能说明。 */
(() => {
  if (window.__prototypeFloatToolsBootstrapped) return;
  window.__prototypeFloatToolsBootstrapped = true;
  const script = document.createElement('script');
  script.src = new URL('../prototype-float-tools.js', location.href).href;
  document.head.appendChild(script);
})();
