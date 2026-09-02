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
    const requestedPanel = window.location.hash.replace('#', '');
    if (requestedPanel) document.querySelector('[data-panel-tab="' + requestedPanel + '"]')?.click();
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

/* 机构信息统一维护：培训机构与评价机构 */
document.addEventListener('DOMContentLoaded', function () {
  const pageId = decodeURIComponent(location.pathname.split('/').pop()) || document.body.dataset.pageId || '';
  const kind = pageId.indexOf('评价机构') !== -1 || pageId.indexOf('evaluation-org') === 0
    ? 'evaluation'
    : pageId.indexOf('培训机构') !== -1 || pageId.indexOf('training-org') === 0
      ? 'training'
      : '';
  if (!kind) return;
  const data = kind === 'training' ? {
    label: '培训机构', name: '湖北数字建造培训中心', code: '91420100MA4K123418', legal: '王建设', contact: '王老师', phone: '027-87886618', address: '武汉市洪山区智能建造产业园', scope: '九大新工种培训'
  } : {
    label: '评价机构', name: '湖北省智能建造评价中心', code: '91420100MA4K123462', legal: '陈建华', contact: '陈老师', phone: '027-87886626', address: '武汉市洪山区智能建造产业园', scope: '数字设计、智能施工相关评价项目'
  };
  function addAdminDetail() {
    const mainStack = document.querySelector('.detail-body .main-stack');
    if (!mainStack || mainStack.querySelector('.admin-info-card')) return;
    const card = document.createElement('section');
    card.className = 'plain-card admin-info-card';
    card.innerHTML = '<div class="block-head"><h2>管理员</h2></div><div class="plain-card-body"><div class="detail-grid"><div class="detail-item"><span class="detail-label">管理员姓名</span><span class="detail-value">' + data.contact + '</span></div><div class="detail-item"><span class="detail-label">手机号</span><span class="detail-value">' + data.phone + '</span></div><div class="detail-item wide"><span class="detail-label">备注</span><span class="detail-value">负责机构日常业务管理</span></div></div></div>';
    const qualification = mainStack.querySelector('.plain-card:nth-child(2)');
    mainStack.insertBefore(card, qualification || null);
  }
  function addAdminForm() {
    const form = document.querySelector('.detail-body.form-page');
    const firstSection = form?.querySelector('.form-section');
    if (!form || !firstSection || form.querySelector('.admin-form-section')) return;
    const section = document.createElement('section');
    section.className = 'form-section admin-form-section';
    section.innerHTML = '<div class="form-section-title"><h2>管理员</h2></div><div class="form-grid"><div class="form-item"><label class="required">管理员姓名</label><div class="form-value"><input class="control" type="text" value="' + data.contact + '"></div></div><div class="form-item"><label class="required">手机号</label><div class="form-value"><input class="control" type="text" value="' + data.phone + '"></div></div><div class="form-item wide"><label>备注</label><div class="form-value"><textarea class="control" rows="3">负责机构日常业务管理</textarea></div></div></div>';
    firstSection.insertAdjacentElement('afterend', section);
    document.querySelectorAll('.form-page .form-section:first-child .form-item').forEach(function (item) {
      const label = item.querySelector('label')?.textContent.trim();
      if (label === '统一社会信用代码' || label === '联系电话' || label === '机构地址') item.querySelector('label')?.classList.add('required');
      const input = item.querySelector('input');
      if (label === '统一社会信用代码' && input) input.value = data.code;
      if (label === '联系电话' && input) input.value = data.phone;
    });
    document.querySelector('.form-page .form-section:first-child .form-item:nth-child(3)')?.remove();
  }
  if (pageId === '培训机构管理.html' || pageId === '评价机构管理.html') {
    const actions = document.querySelector('.page-head-row .header-actions');
    if (actions && !actions.querySelector('[data-add-org]')) {
      const add = document.createElement('a'); add.className = 'btn btn-primary'; add.href = (kind === 'training' ? '编辑培训机构.html' : '编辑评价机构.html') + '?mode=create'; add.dataset.addOrg = 'true'; add.textContent = '新增' + data.label; actions.insertBefore(add, actions.firstChild);
    }
  }
  if (pageId === '编辑培训机构.html' || pageId === '编辑评价机构.html') {
    const title = document.querySelector('.page-title'); if (new URLSearchParams(location.search).get('mode') === 'create' && title) title.textContent = '新增' + data.label;
    addAdminForm();
  }
  if (pageId === '培训机构详情.html' || pageId === '评价机构详情.html') {
    addAdminDetail();
    document.querySelectorAll('.record-banner-main p, .detail-body .detail-value').forEach(function (node) {
      node.textContent = node.textContent.replace(/91420100MA4K\*{4}18|91420100MA4K\*{4}62/g, data.code).replace(/027-87\*{4}18|027-86\*{4}26/g, data.phone);
    });
  }
});

/* 机构关联业务、机构核款口径与送考进度状态演示增强 */
document.addEventListener('DOMContentLoaded', function () {
  const pageId = decodeURIComponent(location.pathname.split('/').pop() || '');

  function replaceText(root, from, to) {
    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (node.nodeValue.indexOf(from) !== -1) node.nodeValue = node.nodeValue.split(from).join(to);
    });
  }

  function modalTable(title, summary, columns, rows) {
    const old = document.getElementById('related-business-modal');
    if (old) old.remove();
    const head = columns.map(function (item) { return '<th>' + item + '</th>'; }).join('');
    const body = rows.map(function (row) {
      return '<tr>' + row.map(function (item) { return '<td>' + item + '</td>'; }).join('') + '</tr>';
    }).join('');
    document.body.insertAdjacentHTML('beforeend', '<div id="related-business-modal" class="modal-mask open"><section class="modal related-business-modal"><header class="modal-head"><h2>' + title + '</h2><button class="icon-btn" type="button" data-related-close>×</button></header><div class="modal-body"><div class="related-business-summary">' + summary + '</div><div class="standard-table-shell"><table class="standard-table"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div></div><footer class="modal-foot"><button class="btn btn-primary" type="button" data-related-close>关闭</button></footer></section></div>');
    const modal = document.getElementById('related-business-modal');
    modal.querySelectorAll('[data-related-close]').forEach(function (button) {
      button.addEventListener('click', function () { modal.remove(); });
    });
    modal.addEventListener('click', function (event) { if (event.target === modal) modal.remove(); });
  }

  const relatedData = {
    '已发布课程': {
      title: '湖北数字建造培训中心 · 课程列表', summary: '共 6 门已发布课程',
      columns: ['课程编号', '课程名称', '适用工种', '状态'],
      rows: [
        ['KC-2026-0018', '建筑信息模型技术员实务课程', '建筑信息模型技术员', '<span class="tag tag-green"><span class="status-dot"></span>已发布</span>'],
        ['KC-2026-0021', '工程数据管理基础课程', '工程数据管理员', '<span class="tag tag-green"><span class="status-dot"></span>已发布</span>'],
        ['KC-2026-0026', '装配式建筑施工实务课程', '装配式建筑施工员', '<span class="tag tag-green"><span class="status-dot"></span>已发布</span>'],
        ['KC-2026-0030', '智能装备安全操作课程', '智能装备操作员', '<span class="tag tag-green"><span class="status-dot"></span>已发布</span>']
      ]
    },
    '进行中班次': {
      title: '湖北数字建造培训中心 · 班次列表', summary: '共 3 个进行中班次',
      columns: ['班次编号', '班次名称', '报名人数', '状态'],
      rows: [
        ['BC-2026-0068', '建筑信息模型技术员实务班', '32 / 50', '<span class="tag tag-green"><span class="status-dot"></span>报名中</span>'],
        ['BC-2026-0062', '工程数据管理员线上班', '42 / 60', '<span class="tag tag-blue"><span class="status-dot"></span>培训中</span>'],
        ['BC-2026-0057', '装配式建筑施工员混合班', '36 / 50', '<span class="tag tag-blue"><span class="status-dot"></span>培训中</span>']
      ]
    },
    '已发布考试项目': {
      title: '湖北省智能建造评价中心 · 考试项目列表', summary: '共 4 个已发布考试项目',
      columns: ['项目编号', '项目名称', '适用工种', '状态'],
      rows: [
        ['PJ-2026-0028', '建筑信息模型技术员职业技能评价', '建筑信息模型技术员', '<span class="tag tag-green"><span class="status-dot"></span>已发布</span>'],
        ['PJ-2026-0031', '工程数据管理员职业技能评价', '工程数据管理员', '<span class="tag tag-green"><span class="status-dot"></span>已发布</span>'],
        ['PJ-2026-0035', '装配式建筑施工员职业技能评价', '装配式建筑施工员', '<span class="tag tag-green"><span class="status-dot"></span>已发布</span>'],
        ['PJ-2026-0039', '智能装备操作员职业技能评价', '智能装备操作员', '<span class="tag tag-green"><span class="status-dot"></span>已发布</span>']
      ]
    },
    '办理中送考批次': {
      title: '湖北省智能建造评价中心 · 送考批次列表', summary: '共 5 个办理中送考批次',
      columns: ['送考批次号', '培训机构', '送考人数', '状态'],
      rows: [
        ['SKPC-20260820-0006', '湖北数字建造培训中心', '28人', '<span class="tag tag-blue"><span class="status-dot"></span>资格审核中</span>'],
        ['SKPC-20260818-0003', '湖北建造产业技能培训学校', '32人', '<span class="tag tag-green"><span class="status-dot"></span>已排考</span>'],
        ['SKPC-20260816-0008', '武汉智能建造实训中心', '25人', '<span class="tag tag-orange"><span class="status-dot"></span>待补充</span>']
      ]
    }
  };

  if (pageId === '培训机构详情.html' || pageId === '评价机构详情.html') {
    document.querySelectorAll('table.standard-table tbody tr').forEach(function (row) {
      const key = row.cells[0] ? row.cells[0].textContent.trim() : '';
      const spec = relatedData[key];
      const button = row.querySelector('button.link');
      if (!spec || !button) return;
      button.removeAttribute('data-toast');
      button.addEventListener('click', function () { modalTable(spec.title, spec.summary, spec.columns, spec.rows); });
    });
  }

  /* 平台仅查看订单，收款核款由培训机构办理。 */
  if (pageId === '报名订单.html' || pageId === '报名订单详情.html') {
    replaceText(document.body, '待平台核款', '待机构核款');
  }
  if (pageId === '报名订单详情.html') {
    const verifyButton = document.getElementById('order-verify-trigger');
    const verifyModal = document.getElementById('order-verify-modal');
    const legacyDetail = document.getElementById('order-verify-detail');
    if (verifyButton) verifyButton.remove();
    if (verifyModal) verifyModal.remove();
    if (legacyDetail) legacyDetail.remove();
    function renderPaidOrder() {
      const paid = location.hash === '#paid';
      if (!paid) return;
      const tag = document.getElementById('order-status-tag');
      const text = document.getElementById('order-status-text');
      if (tag) tag.className = 'tag tag-green';
      if (text) text.textContent = '已支付';
      const stateValue = document.getElementById('order-status-value');
      if (stateValue) stateValue.textContent = '已支付';
      const stack = document.querySelector('.detail-body .main-stack');
      if (stack && !document.getElementById('institution-verify-section')) {
        stack.insertAdjacentHTML('beforeend', '<section class="plain-card" id="institution-verify-section"><div class="block-head"><h2>机构核款信息</h2></div><div class="plain-card-body"><div class="detail-grid"><div class="detail-item"><span class="detail-label">核款机构</span><span class="detail-value">湖北数字建造培训中心</span></div><div class="detail-item"><span class="detail-label">核款结果</span><span class="detail-value"><span class="tag tag-green"><span class="status-dot"></span>核款通过</span></span></div><div class="detail-item"><span class="detail-label">核款人</span><span class="detail-value">王老师</span></div><div class="detail-item"><span class="detail-label">核款时间</span><span class="detail-value">2026-08-20 14:36</span></div><div class="detail-item wide"><span class="detail-label">核款备注</span><span class="detail-value">款项已到账，金额与汇款凭证一致。</span></div></div><div class="file-card"><div class="file-info"><span data-icon="attachment"></span><div><strong>机构核款凭证.pdf</strong><span>860 KB · 湖北数字建造培训中心上传</span></div></div><button class="link" data-toast="核款附件预览已打开">预览</button></div></div></section>');
      }
    }
    renderPaidOrder();
    window.addEventListener('hashchange', renderPaidOrder);
  }

  /* 送考管理只保留送考进度，并按状态展示详情。 */
  document.querySelectorAll('a.nav-link[href="送考批次台账.html"]').forEach(function (link) { link.remove(); });
  if (pageId === '送考批次详情.html' || pageId === '送考进度详情.html') {
    document.querySelectorAll('a.nav-link[href="送考进度.html"]').forEach(function (link) { link.classList.add('active'); });
  }
  if (pageId === '送考进度.html') {
    document.querySelectorAll('table.standard-table tbody tr').forEach(function (row) {
      const link = row.querySelector('.sticky-op a.link');
      if (!link) return;
      link.href = row.textContent.indexOf('已排考') !== -1 ? '送考进度详情.html#arranged' : '送考进度详情.html#reviewing';
    });
  }
  if (pageId === '送考批次详情.html') {
    replaceText(document.body, '送考批次台账详情', '送考进度详情');
    replaceText(document.body, '返回送考批次', '返回送考进度');
    document.title = '送考进度详情｜产业培育平台运营端';
    const back = document.querySelector('.back-link');
    if (back) back.href = '送考进度.html';
    const arranged = location.hash === '#arranged';
    if (arranged) {
      replaceText(document.body, '资格审核中', '已排考');
      replaceText(document.body, '待排考', '已排考');
      const tag = document.querySelector('.record-banner-side .tag');
      if (tag) tag.className = 'tag tag-green';
      document.querySelectorAll('.standard-table tbody .sticky-op .tag').forEach(function (item) { item.className = 'tag tag-green'; });
      const stack = document.querySelector('.detail-body .main-stack');
      if (stack && !document.getElementById('exam-arrangement-section')) {
        stack.insertAdjacentHTML('beforeend', '<section class="plain-card" id="exam-arrangement-section"><div class="block-head"><h2>考试安排</h2></div><div class="plain-card-body"><div class="detail-grid"><div class="detail-item"><span class="detail-label">考试批次</span><span class="detail-value">KSPC-20261128-0003</span></div><div class="detail-item"><span class="detail-label">考试时间</span><span class="detail-value">2026-11-28 09:00—17:00</span></div><div class="detail-item"><span class="detail-label">理论考试</span><span class="detail-value">线下闭卷 · 09:00—10:30</span></div><div class="detail-item"><span class="detail-label">实操考试</span><span class="detail-value">武汉市洪山区智能建造评价基地 · 13:30—17:00</span></div><div class="detail-item wide"><span class="detail-label">准考信息</span><span class="detail-value">32名考生准考信息已生成，可由培训机构和学员查看。</span></div></div></div></section>');
      }
    }
  }
});

/* 课程与考试项目启停用演示闭环 */
document.addEventListener('DOMContentLoaded', function () {
    const pageId = decodeURIComponent(location.pathname.split('/').pop()) || document.body.dataset.pageId || '';
  const specs = {
    '课程管理.html': {
      kind: '课程', detail: '课程详情.html', stoppedId: 'KC-2026-0009',
      stoppedRow: '<tr data-filter-row data-status="已停用"><td>KC-2026-0009</td><td>智慧物业管理基础课程</td><td>武汉绿色建造职业培训中心</td><td>智慧物业管理员</td><td>线上培训</td><td><span class="tag tag-gray"><span class="status-dot"></span>已停用</span></td><td>2026-08-18 16:20</td><td class="sticky-op"><a class="link" href="课程详情.html#disabled">查看</a></td></tr>'
    },
    '考试管理.html': {
      kind: '考试项目', detail: '考试详情.html', stoppedId: 'PJ-2026-0016',
      stoppedRow: '<tr data-filter-row data-status="已停用"><td>PJ-2026-0016</td><td>智慧物业管理员职业技能评价</td><td>湖北省智能建造评价中心</td><td>智慧物业管理员</td><td>线下理论＋线下实操</td><td>¥280/人</td><td><span class="tag tag-gray"><span class="status-dot"></span>已停用</span></td><td>2026-08-18 14:35</td><td class="sticky-op"><a class="link" href="考试详情.html#disabled">查看</a></td></tr>'
    },
    '课程详情.html': { kind: '课程', detailPage: true },
    '考试详情.html': { kind: '考试项目', detailPage: true }
  };
  const spec = specs[pageId];
  if (!spec) return;

  function toast(message) {
    const stack = document.querySelector('.toast-stack');
    if (!stack) return;
    const item = document.createElement('div');
    item.className = 'toast success';
    item.innerHTML = '<span>' + message + '</span>';
    stack.appendChild(item);
    setTimeout(function () { item.remove(); }, 2400);
  }
  function ensureModal() {
    if (document.getElementById('lifecycle-modal')) return;
    document.body.insertAdjacentHTML('beforeend', '<div id="lifecycle-modal" class="modal-mask"><section class="modal"><header class="modal-head"><h2 data-lifecycle-title>状态操作</h2><button class="icon-btn" type="button" data-lifecycle-close>×</button></header><div class="modal-body"><p><span data-lifecycle-kind></span>：<strong data-lifecycle-name>—</strong></p><label class="field"><span data-lifecycle-reason-label>操作原因</span><textarea class="control" rows="4" data-lifecycle-reason placeholder="请输入操作原因"></textarea></label><div class="error" data-lifecycle-error></div></div><footer class="modal-foot"><button class="btn" type="button" data-lifecycle-close>取消</button><button class="btn btn-primary" type="button" data-lifecycle-confirm>确认</button></footer></section></div>');
  }
  ensureModal();
  const modal = document.getElementById('lifecycle-modal');
  let active = null;
  function openModal(target, action, name) {
    active = { target: target, action: action, name: name };
    modal.querySelector('[data-lifecycle-title]').textContent = action + spec.kind;
    modal.querySelector('[data-lifecycle-kind]').textContent = spec.kind;
    modal.querySelector('[data-lifecycle-name]').textContent = name;
    modal.querySelector('[data-lifecycle-reason-label]').textContent = action === '停用' ? '停用原因（必填）' : '启用说明（选填）';
    modal.querySelector('[data-lifecycle-reason]').value = '';
    modal.querySelector('[data-lifecycle-error]').textContent = '';
    const confirm = modal.querySelector('[data-lifecycle-confirm]');
    confirm.className = 'btn ' + (action === '停用' ? 'btn-danger' : 'btn-primary');
    confirm.textContent = '确认' + action;
    modal.classList.add('open');
  }
  modal.querySelectorAll('[data-lifecycle-close]').forEach(function (button) {
    button.addEventListener('click', function () { modal.classList.remove('open'); });
  });

  function setBadge(badge, state) {
    badge.className = 'tag ' + (state === '已发布' ? 'tag-green' : 'tag-gray');
    badge.innerHTML = '<span class="status-dot"></span>' + state;
  }
  function adjustCount(oldState, newState) {
    [oldState, newState].forEach(function (state, index) {
      const count = document.querySelector('[data-demo-tab="' + state + '"] .tab-count');
      if (!count) return;
      count.textContent = Math.max(0, Number(count.textContent || 0) + (index === 0 ? -1 : 1));
    });
  }

  if (!spec.detailPage) {
    const tbody = document.querySelector('.standard-table tbody');
    if (tbody && !tbody.querySelector('[data-status="已停用"]')) {
      const empty = tbody.querySelector('.empty-row');
      empty.insertAdjacentHTML('beforebegin', spec.stoppedRow);
    }
    document.querySelectorAll('.standard-table tbody tr[data-filter-row]').forEach(function (row) {
      const state = row.dataset.status;
      if (state !== '已发布' && state !== '已停用') return;
      const cell = row.querySelector('.sticky-op');
      if (!cell.querySelector('[data-lifecycle-action]')) {
        cell.insertAdjacentHTML('beforeend', '<button type="button" class="link" data-lifecycle-action="' + (state === '已发布' ? '停用' : '启用') + '">' + (state === '已发布' ? '停用' : '启用') + '</button>');
      }
    });
    document.addEventListener('click', function (event) {
      const button = event.target.closest('[data-lifecycle-action]');
      if (!button) return;
      const row = button.closest('tr');
      openModal(row, button.dataset.lifecycleAction, row.children[1].textContent.trim());
    });
  } else {
    const stopped = location.hash === '#disabled';
    const badge = document.querySelector('.record-banner-side .tag');
    if (badge) setBadge(badge, stopped ? '已停用' : '已发布');
    let actions = document.querySelector('.header-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'header-actions';
      document.querySelector('.page-head-row')?.appendChild(actions);
    }
    if (actions) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = stopped ? 'btn btn-primary' : 'btn btn-danger';
      button.dataset.lifecycleDetail = stopped ? '启用' : '停用';
      button.textContent = (stopped ? '启用' : '停用') + spec.kind;
      actions.appendChild(button);
      button.addEventListener('click', function () {
        const name = document.querySelector('.record-banner-main h2').textContent.trim();
        openModal(button, button.dataset.lifecycleDetail, name);
      });
    }
  }

  modal.querySelector('[data-lifecycle-confirm]').addEventListener('click', function () {
    if (!active) return;
    const reason = modal.querySelector('[data-lifecycle-reason]').value.trim();
    if (active.action === '停用' && !reason) {
      modal.querySelector('[data-lifecycle-error]').textContent = '请填写停用原因';
      return;
    }
    const newState = active.action === '停用' ? '已停用' : '已发布';
    const oldState = newState === '已停用' ? '已发布' : '已停用';
    const row = active.target.tagName === 'TR' ? active.target : active.target.closest('tr');
    if (row) {
      row.dataset.status = newState;
      setBadge(row.querySelector('.tag'), newState);
      const operation = row.querySelector('[data-lifecycle-action]');
      operation.dataset.lifecycleAction = active.action === '停用' ? '启用' : '停用';
      operation.textContent = operation.dataset.lifecycleAction;
      adjustCount(oldState, newState);
    } else {
      const badge = document.querySelector('.record-banner-side .tag');
      if (badge) setBadge(badge, newState);
      active.target.dataset.lifecycleDetail = active.action === '停用' ? '启用' : '停用';
      active.target.textContent = active.target.dataset.lifecycleDetail + spec.kind;
      active.target.className = active.target.dataset.lifecycleDetail === '启用' ? 'btn btn-primary' : 'btn btn-danger';
    }
    modal.classList.remove('open');
    toast(spec.kind + '已' + active.action);
  });
});

/* 平台运营端从业务菜单进入，隐藏工作台入口。 */
document.querySelector('.sidebar .nav-section > a.nav-group-title[href="工作台.html"]')?.remove();

/* 一期隐藏平台审核入口，保留课程管理与考试管理核心闭环。 */
document.querySelectorAll('.sidebar .nav-link').forEach(function (link) {
  const href = link.getAttribute('href') || '';
  if (href === '课程发布审核.html' || href === '考试项目审核.html') link.remove();
});

/* 四端原型共用：可拖动页面导航与功能说明。 */
(() => {
  if (window.__prototypeFloatToolsBootstrapped) return;
  window.__prototypeFloatToolsBootstrapped = true;
  const script = document.createElement('script');
  script.src = new URL('../prototype-float-tools.js', location.href).href;
  document.head.appendChild(script);
})();
