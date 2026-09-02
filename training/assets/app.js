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
    // 本页面由 培训报名详情.html 根据来源动态设置返回入口与面包屑，不能在此重建节点。
    if (pageId === '培训报名详情.html') return;
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

/* 创建送考批次：候选学员在弹窗内选择，主页面只展示已选人员 */
document.addEventListener('DOMContentLoaded', function () {
  const pageId = decodeURIComponent(location.pathname.split('/').pop()) || '';
  if (pageId !== '创建送考批次.html' || document.body.dataset.sendBatchCreateReady) return;
  document.body.dataset.sendBatchCreateReady = 'true';

  const basicSection = document.querySelector('.form-page .form-section');
  const formGrid = basicSection?.querySelector('.form-grid');
  const sourceItem = [...(formGrid?.querySelectorAll('.form-item') || [])].find(function (item) {
    return item.querySelector('label')?.textContent.trim() === '来源班次';
  });
  if (sourceItem) sourceItem.remove();
  const projectItem = [...(formGrid?.querySelectorAll('.form-item') || [])].find(function (item) {
    return item.querySelector('label')?.textContent.trim() === '评价项目';
  });
  const orgItem = [...(formGrid?.querySelectorAll('.form-item') || [])].find(function (item) {
    return item.querySelector('label')?.textContent.trim() === '评价机构';
  });
  if (formGrid && projectItem && orgItem) formGrid.insertBefore(orgItem, projectItem);
  if (formGrid && !formGrid.querySelector('[data-batch-attachment-item]')) {
    const attachmentItem = document.createElement('div');
    attachmentItem.className = 'form-item wide';
    attachmentItem.dataset.batchAttachmentItem = '';
    attachmentItem.innerHTML = '<label>送考附件</label><div class="form-value"><div class="send-batch-attachment-card"><span class="file-preview-icon word" aria-hidden="true">W</span><div class="attachment-file-copy"><strong data-batch-attachment-name>建筑信息模型技术员送考说明.docx</strong><span>示例 Word 文件</span></div><label class="link attachment-replace">替换附件<input type="file" accept=".doc,.docx,.pdf" data-batch-attachment-input hidden></label></div></div>';
    const descriptionItem = [...formGrid.querySelectorAll('.form-item')].find(function (item) { return item.querySelector('label')?.textContent.trim() === '批次说明'; });
    formGrid.insertBefore(attachmentItem, descriptionItem || null);
    attachmentItem.querySelector('[data-batch-attachment-input]').addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) attachmentItem.querySelector('[data-batch-attachment-name]').textContent = file.name;
    });
  }

  const candidates = [
    { id: 'HBIC-2026-000129', name: '李建国', idCard: '420106********1288', phone: '138****2361', batch: '建筑信息模型技术人员实务班', completed: '2026-10-28', material: '齐全', attachment: '李建国送考附件.docx', eligible: true },
    { id: 'HBIC-2026-000131', name: '周志强', idCard: '420106********4726', phone: '139****8512', batch: '建筑信息模型技术人员实务班', completed: '2026-10-28', material: '齐全', attachment: '周志强送考附件.docx', eligible: true }
  ];
  let selectedIds = new Set(candidates.filter(x => x.eligible).map(x => x.id));
  let modalSelectedIds = new Set(selectedIds);

  const actions = document.querySelector('.header-actions');
  if (actions) {
    actions.innerHTML = '<button type="button" class="btn" data-send-cancel>取消</button>' +
      '<button type="button" class="btn" data-send-save>保存草稿</button>' +
      '<button type="button" class="btn btn-primary" data-send-submit>提交送考</button>';
  }

  const oldFooter = document.querySelector('.form-page .form-footer');
  if (oldFooter) oldFooter.remove();

  const oldLearnerSection = document.querySelector('.detail-body[style*="padding-top"] section');
  if (!oldLearnerSection) return;
  oldLearnerSection.className = 'plain-card send-selected-section';
  oldLearnerSection.innerHTML = '<div class="block-head"><h2 data-selected-title>已选送考学员（0人）</h2><button type="button" class="btn btn-primary" data-send-add>＋ 添加送考学员</button></div><div class="plain-card-body"><div class="send-selected-table standard-table-shell"></div><div class="send-selected-empty" hidden><strong>暂未添加送考学员</strong><span>点击右上角“添加送考学员”，选择已完成培训且符合送考条件的学员。</span></div></div>';
  const selectedTable = oldLearnerSection.querySelector('.send-selected-table');
  const emptyState = oldLearnerSection.querySelector('.send-selected-empty');

  function renderSelected() {
    const rows = candidates.filter(x => selectedIds.has(x.id));
    oldLearnerSection.querySelector('[data-selected-title]').textContent = '已选送考学员（' + rows.length + '人）';
    emptyState.hidden = rows.length > 0;
    selectedTable.innerHTML = rows.length ? '<table class="standard-table"><thead><tr><th>平台报名编号</th><th>姓名</th><th>来源班次</th><th>培训完成时间</th><th>材料状态</th><th class="sticky-op">操作</th></tr></thead><tbody>' + rows.map(function (x) {
      return '<tr><td>' + x.id + '</td><td>' + x.name + '</td><td>' + x.batch + '</td><td>' + x.completed + '</td><td><span class="tag tag-green"><span class="status-dot"></span>' + x.material + '</span></td><td class="sticky-op"><button type="button" class="link" data-send-edit="' + x.id + '">编辑</button><button type="button" class="link danger-link" data-send-remove="' + x.id + '">移除</button></td></tr>';
    }).join('') + '</tbody></table>' : '';
  }
  renderSelected();

  const modal = document.createElement('div');
  modal.className = 'modal-mask';
  modal.innerHTML = '<section class="modal send-batch-candidate-modal"><header class="modal-head"><h2>选择送考学员</h2><button type="button" class="icon-btn" data-send-modal-close>×</button></header><div class="modal-body"><p>从已完成培训且符合当前评价项目要求的学员中选择本次送考人员。</p><div class="filter-row"><label class="field"><span>培训班次</span><select class="control" data-send-batch-filter><option value="">全部符合条件班次</option><option>建筑信息模型技术人员实务班</option><option>其他符合当前送考工种的培训班次</option></select></label><label class="field"><span>关键词</span><input class="control" placeholder="姓名 / 平台报名编号" data-send-keyword></label><button type="button" class="btn btn-primary btn-sm send-filter-button" data-send-filter>搜索</button></div><div class="standard-table-shell send-candidate-table"><table class="standard-table"><thead><tr><th>选择</th><th>平台报名编号</th><th>姓名</th><th>身份证号</th><th>手机号</th><th>来源班次</th><th>培训完成时间</th></tr></thead><tbody data-send-candidate-body></tbody></table></div></div><footer class="modal-foot"><span class="send-selected-count" data-send-modal-count>已选择 0 人</span><button type="button" class="btn" data-send-modal-cancel>取消</button><button type="button" class="btn btn-primary" data-send-modal-confirm>确认添加 0 人</button></footer></section>';
  document.body.appendChild(modal);
  const attachmentModal = document.createElement('div');
  attachmentModal.className = 'modal-mask';
  attachmentModal.innerHTML = '<section class="modal send-attachment-edit-modal"><header class="modal-head"><div><h2>编辑学员送考附件</h2><p class="modal-subtitle" data-send-attachment-person>—</p></div><button type="button" class="icon-btn" data-send-attachment-close>×</button></header><div class="modal-body"><label class="field"><span>送考附件</span><div class="send-batch-attachment-card"><span class="file-preview-icon word" aria-hidden="true">W</span><div class="attachment-file-copy"><strong data-send-attachment-name>—</strong><span>Word 文档</span></div><label class="link attachment-replace">重新上传<input type="file" accept=".doc,.docx,.pdf" data-send-attachment-input hidden></label></div></label><p class="help">可上传 Word 或 PDF 格式的送考附件。</p></div><footer class="modal-foot"><button type="button" class="btn" data-send-attachment-cancel>取消</button><button type="button" class="btn btn-primary" data-send-attachment-save>保存</button></footer></section>';
  document.body.appendChild(attachmentModal);
  let editingCandidateId = '';
  const candidateBody = modal.querySelector('[data-send-candidate-body]');
  const batchFilter = modal.querySelector('[data-send-batch-filter]');
  const keyword = modal.querySelector('[data-send-keyword]');

  function renderCandidates() {
    const q = keyword.value.trim().toLowerCase();
    const batch = batchFilter.value;
    const rows = candidates.filter(function (x) {
      return (!batch || x.batch === batch || (batch.startsWith('其他') && x.batch !== '建筑信息模型技术人员实务班')) && (!q || (x.id + x.name).toLowerCase().includes(q));
    });
    candidateBody.innerHTML = rows.length ? rows.map(function (x) {
      const checked = modalSelectedIds.has(x.id);
      return '<tr><td><input type="checkbox" data-send-candidate="' + x.id + '"' + (checked ? ' checked' : '') + '></td><td>' + x.id + '</td><td>' + x.name + '</td><td>' + x.idCard + '</td><td>' + x.phone + '</td><td>' + x.batch + '</td><td>' + x.completed + '</td></tr>';
    }).join('') : '<tr><td colspan="7">未找到符合条件的记录</td></tr>';
    updateModalCount();
  }
  function updateModalCount() {
    const count = [...modalSelectedIds].filter(id => candidates.some(x => x.id === id && x.eligible)).length;
    modal.querySelector('[data-send-modal-count]').textContent = '已选择 ' + count + ' 人';
    modal.querySelector('[data-send-modal-confirm]').textContent = '确认添加 ' + count + ' 人';
  }
  function openModal() { modalSelectedIds = new Set(selectedIds); renderCandidates(); modal.classList.add('open'); }
  function closeModal() { modal.classList.remove('open'); }
  oldLearnerSection.querySelector('[data-send-add]')?.addEventListener('click', openModal);
  modal.querySelector('[data-send-modal-close]').addEventListener('click', closeModal);
  modal.querySelector('[data-send-modal-cancel]').addEventListener('click', closeModal);
  modal.querySelector('[data-send-filter]').addEventListener('click', renderCandidates);
  keyword.addEventListener('keydown', function (event) { if (event.key === 'Enter') renderCandidates(); });
  candidateBody.addEventListener('change', function (event) {
    const checkbox = event.target.closest('[data-send-candidate]');
    if (!checkbox) return;
    if (checkbox.checked) modalSelectedIds.add(checkbox.dataset.sendCandidate); else modalSelectedIds.delete(checkbox.dataset.sendCandidate);
    updateModalCount();
  });
  modal.querySelector('[data-send-modal-confirm]').addEventListener('click', function () { selectedIds = new Set(modalSelectedIds); renderSelected(); closeModal(); });
  function closeAttachmentModal() { attachmentModal.classList.remove('open'); editingCandidateId = ''; }
  attachmentModal.querySelectorAll('[data-send-attachment-close], [data-send-attachment-cancel]').forEach(function (button) { button.addEventListener('click', closeAttachmentModal); });
  attachmentModal.querySelector('[data-send-attachment-input]').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) attachmentModal.querySelector('[data-send-attachment-name]').textContent = file.name;
  });
  attachmentModal.querySelector('[data-send-attachment-save]').addEventListener('click', function () {
    const candidate = candidates.find(function (item) { return item.id === editingCandidateId; });
    if (!candidate) return;
    candidate.attachment = attachmentModal.querySelector('[data-send-attachment-name]').textContent;
    renderSelected();
    closeAttachmentModal();
    toast('学员送考附件已更新');
  });
  oldLearnerSection.addEventListener('click', function (event) {
    const edit = event.target.closest('[data-send-edit]');
    if (edit) {
      const candidate = candidates.find(function (item) { return item.id === edit.dataset.sendEdit; });
      if (!candidate) return;
      editingCandidateId = candidate.id;
      attachmentModal.querySelector('[data-send-attachment-person]').textContent = candidate.name + ' ｜ ' + candidate.id;
      attachmentModal.querySelector('[data-send-attachment-name]').textContent = candidate.attachment;
      attachmentModal.querySelector('[data-send-attachment-input]').value = '';
      attachmentModal.classList.add('open');
      return;
    }
    const remove = event.target.closest('[data-send-remove]');
    if (remove) { selectedIds.delete(remove.dataset.sendRemove); renderSelected(); }
  });

  function selectedProject() { return [...document.querySelectorAll('.form-page .form-grid .form-item')].find(x => x.querySelector('label')?.textContent.trim() === '评价项目')?.querySelector('select')?.value || ''; }
  function selectedOrg() { return [...document.querySelectorAll('.form-page .form-grid .form-item')].find(x => x.querySelector('label')?.textContent.trim() === '评价机构')?.querySelector('select')?.value || ''; }
  function toast(message) { const stack = document.querySelector('.toast-stack'); if (!stack) return; const item = document.createElement('div'); item.className = 'toast success'; item.textContent = message; stack.appendChild(item); setTimeout(() => item.remove(), 2400); }
  function confirmDialog(title, body, confirmText, onConfirm) {
    const box = document.createElement('div'); box.className = 'modal-mask open'; box.innerHTML = '<section class="modal"><header class="modal-head"><h2>' + title + '</h2></header><div class="modal-body"><p>' + body + '</p></div><footer class="modal-foot"><button type="button" class="btn" data-dialog-cancel>取消</button><button type="button" class="btn btn-primary" data-dialog-confirm>' + confirmText + '</button></footer></section>'; document.body.appendChild(box); box.querySelector('[data-dialog-cancel]').onclick = () => box.remove(); box.querySelector('[data-dialog-confirm]').onclick = () => { box.remove(); onConfirm(); };
  }
  const projectControl = [...document.querySelectorAll('.form-page .form-grid .form-item')].find(x => x.querySelector('label')?.textContent.trim() === '评价项目')?.querySelector('select');
  const orgControl = [...document.querySelectorAll('.form-page .form-grid .form-item')].find(x => x.querySelector('label')?.textContent.trim() === '评价机构')?.querySelector('select');
  [projectControl, orgControl].forEach(function (control) {
    if (!control) return;
    let previousValue = control.value;
    control.addEventListener('change', function () {
      const nextValue = control.value;
      if (!selectedIds.size) { previousValue = nextValue; return; }
      confirmDialog('确认修改', '修改评价项目或评价机构可能影响当前已选送考人员，继续修改将清空已选择学员，是否继续修改？', '继续修改', function () { selectedIds.clear(); previousValue = nextValue; renderSelected(); });
      const dialog = [...document.querySelectorAll('.modal-mask')].find(function (item) { return item !== modal && item.classList.contains('open'); });
      dialog?.querySelector('[data-dialog-cancel]')?.addEventListener('click', function () { control.value = previousValue; });
    });
  });
  actions?.querySelector('[data-send-save]')?.addEventListener('click', function () { toast('草稿保存成功'); });
  actions?.querySelector('[data-send-cancel]')?.addEventListener('click', function () { confirmDialog('确认离开', '当前内容尚未保存，确认离开？', '确认离开', function () { location.href = '送考批次台账.html'; }); });
  actions?.querySelector('[data-send-submit]')?.addEventListener('click', function () {
    if (!selectedProject()) return toast('请选择评价项目');
    if (!selectedOrg()) return toast('请选择评价机构');
    if (!selectedIds.size) return toast('至少选择1名送考学员');
    confirmDialog('确认提交送考', '评价项目：' + selectedProject() + '<br>评价机构：' + selectedOrg() + '<br>送考人数：' + selectedIds.size + '人<br><br>提交后，本批送考人员及培训完成信息将发送至评价机构进行考试资格受理。', '确认提交', function () { toast('送考批次已提交'); });
  });
  renderCandidates();
});

/* 课程课时与章节形式维护 */
document.addEventListener('DOMContentLoaded', function () {
  const pageId = decodeURIComponent(location.pathname.split('/').pop()) || '';
  if (pageId !== '编辑课程.html') return;

  const formItems = Array.from(document.querySelectorAll('.form-section .form-grid .form-item'));
  const totalItem = formItems.find(function (item) {
    return item.querySelector('label')?.textContent.trim() === '总学时';
  });
  if (totalItem && !document.querySelector('[data-course-hours-online]')) {
    const makeHourItem = function (label, marker, value) {
      const item = document.createElement('div');
      item.className = 'form-item';
      item.innerHTML = '<label>' + label + '</label><div class="form-value"><input class="control" type="number" min="0" value="' + value + '" ' + marker + '></div>';
      return item;
    };
    const onlineItem = makeHourItem('线上课时', 'data-course-hours-online', 24);
    const offlineItem = makeHourItem('线下课时', 'data-course-hours-offline', 24);
    totalItem.parentNode.insertBefore(onlineItem, totalItem);
    totalItem.parentNode.insertBefore(offlineItem, totalItem);
  }

  const online = document.querySelector('[data-course-hours-online]');
  const offline = document.querySelector('[data-course-hours-offline]');
  const total = totalItem?.querySelector('input');
  if (online && offline && total) {
    total.readOnly = true;
    total.setAttribute('aria-readonly', 'true');
    total.classList.add('readonly-control');
    const updateTotal = function () {
      total.value = (Number(online.value) || 0) + (Number(offline.value) || 0);
    };
    online.addEventListener('input', updateTotal);
    offline.addEventListener('input', updateTotal);
    updateTotal();
  }

  document.querySelectorAll('[data-chapter-field="form"]').forEach(function (select) {
    const selected = select.value === '线下实训' ? '线下课程' : '线上课程';
    select.innerHTML = '<option>线上课程</option><option>线下课程</option>';
    select.value = selected;
  });
});

/* 一期送考批次：审核反馈融入批次详情，菜单只保留送考批次。 */
document.querySelectorAll('.sidebar .nav-link[href="送考审核反馈.html"]').forEach(function (link) { link.remove(); });
(function sendBatchPhaseOne() {
  var page = document.body.dataset.pageId;
  var params = new URLSearchParams(window.location.search);
  var batches = {
    draft: { id: 'SKPC-20261110-0001', occupation: '工程数据管理员', project: '工程数据管理员职业技能评价', agency: '湖北省智能建造评价中心', source: '工程数据管理员实务班', count: 16, created: '2026-11-10 09:20', status: '草稿', tag: 'tag-gray', progress: '16人待提交' },
    reviewing: { id: 'SKPC-20260822-0008', occupation: '智能装备操作员', project: '智能装备操作员职业技能评价', agency: '湖北省智能建造评价中心', source: '智能装备操作员实务班', count: 28, created: '2026-08-22 10:40', status: '审核中', tag: 'tag-blue', progress: '19人通过 / 9人待审核', audit: [{ label: '送考人数', value: '28人' }, { label: '审核通过', value: '19人' }, { label: '待审核', value: '9人' }] },
    supplement: { id: 'SKPC-20260820-0006', occupation: '建筑信息模型技术员', project: '建筑信息模型技术员职业技能评价', agency: '湖北省智能建造评价中心', source: '建筑信息模型技术员实务班', count: 28, created: '2026-08-20 11:30', status: '待补充', tag: 'tag-orange', progress: '19人通过 / 4人待补充 / 5人待审核', audit: [{ label: '送考人数', value: '28人' }, { label: '审核通过', value: '19人' }, { label: '待补充', value: '4人', key: 'supplement' }, { label: '待审核', value: '5人' }] },
    arranged: { id: 'SKPC-20260818-0003', occupation: '装配式建筑施工员', project: '装配式建筑施工员职业技能评价', agency: '武汉市建设职业技能评价中心', source: '装配式建筑施工员混合班', count: 32, created: '2026-08-18 16:20', status: '已排考', tag: 'tag-green', progress: '32人审核通过', audit: [{ label: '送考人数', value: '32人' }, { label: '审核通过', value: '32人' }] }
  };

  function phaseToast(message) {
    var stack = document.querySelector('.toast-stack');
    if (!stack) return;
    var item = document.createElement('div');
    item.className = 'toast success';
    item.textContent = message;
    stack.appendChild(item);
    window.setTimeout(function () { item.remove(); }, 2600);
  }

  function badge(state, style) { return '<span class="tag ' + style + '"><span class="status-dot"></span>' + state + '</span>'; }
  function candidateRows(kind) {
    if (kind === 'arranged') return [
      ['HBIC-2026-000201', '王建华', '已通过', '—', 'tag-green'], ['HBIC-2026-000202', '陈敏', '已通过', '—', 'tag-green'], ['HBIC-2026-000203', '刘洋', '已通过', '—', 'tag-green']
    ];
    if (kind === 'reviewing') return [
      ['HBIC-2026-000161', '赵鹏', '已通过', '—', 'tag-green'], ['HBIC-2026-000162', '孙雪', '已通过', '—', 'tag-green'], ['HBIC-2026-000163', '杨帆', '待审核', '—', 'tag-blue']
    ];
    return [
      ['HBIC-2026-000128', '张明', '已通过', '—', 'tag-green'], ['HBIC-2026-000129', '李建国', '待补充', '工作证明缺少单位盖章', 'tag-orange'], ['HBIC-2026-000130', '周志强', '待审核', '—', 'tag-blue']
    ];
  }
  function candidateAttachment(candidateId) {
    var attachments = {
      'HBIC-2026-000161': '赵鹏送考附件.docx', 'HBIC-2026-000162': '孙雪送考附件.docx', 'HBIC-2026-000163': '杨帆送考附件.docx',
      'HBIC-2026-000128': '张明送考附件.docx', 'HBIC-2026-000129': '李建国送考附件.docx', 'HBIC-2026-000130': '周志强送考附件.docx',
      'HBIC-2026-000201': '王建华送考附件.docx', 'HBIC-2026-000202': '陈敏送考附件.docx', 'HBIC-2026-000203': '刘洋送考附件.docx'
    };
    return attachments[candidateId] || '学员送考附件.docx';
  }

  if (page === '送考批次台账.html') {
    var listTable = document.querySelector('.standard-table');
    var listTabs = document.querySelector('.tabs');
    var listRows = ['draft', 'reviewing', 'supplement', 'arranged'].map(function (key) {
      var batch = batches[key];
      var action = key === 'draft' ? '继续编辑' : key === 'supplement' ? '补充资料' : '查看';
      var target = key === 'draft' ? '创建送考批次.html' : '送考批次详情.html?status=' + key;
      return '<tr data-filter-row data-status="' + batch.status + '"><td>' + batch.id + '</td><td>' + batch.occupation + '</td><td>' + batch.agency + '</td><td>' + batch.count + '人</td><td>' + batch.created + '</td><td>' + badge(batch.status, batch.tag) + '</td><td>' + batch.progress + '</td><td class="sticky-op"><a class="link" href="' + target + '">' + action + '</a></td></tr>';
    }).join('');
    document.querySelector('.header-actions .btn:not(.btn-primary)')?.remove();
    if (listTable) {
      listTable.querySelector('thead').innerHTML = '<tr><th>送考批次号</th><th>工种</th><th>评价机构</th><th>送考人数</th><th>创建时间</th><th>状态</th><th>审核进度</th><th class="sticky-op">操作</th></tr>';
      listTable.querySelector('tbody').innerHTML = listRows + '<tr class="empty-row hidden"><td colspan="8">未找到符合条件的记录</td></tr>';
    }
    if (listTabs) {
      listTabs.innerHTML = ['全部', '草稿', '审核中', '待补充', '已排考'].map(function (label, index) {
        return '<button class="tab ' + (index === 0 ? 'active' : '') + '" data-demo-tab="' + label + '">' + label + '<span class="tab-count">' + (index === 0 ? 4 : 1) + '</span></button>';
      }).join('');
      listTabs.querySelectorAll('.tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
          listTabs.querySelectorAll('.tab').forEach(function (item) { item.classList.toggle('active', item === tab); });
          listTable.querySelectorAll('tbody tr[data-filter-row]').forEach(function (row) { row.hidden = tab.dataset.demoTab !== '全部' && row.dataset.status !== tab.dataset.demoTab; });
        });
      });
    }
    document.querySelectorAll('[data-list-select]').forEach(function (select) {
      if (Array.from(select.options).some(function (option) { return option.textContent.trim() === '待提交'; })) {
        select.querySelectorAll('option').forEach(function (option) { if (option.textContent.trim() === '待提交') option.remove(); });
      }
    });
    var listTotal = document.querySelector('.pagination > span');
    if (listTotal) listTotal.textContent = '共 4 条';
    return;
  }

  if (page !== '送考批次详情.html') return;
  var kind = params.get('status') || 'supplement';
  var batch = batches[kind] || batches.supplement;
  var pageTitle = document.querySelector('.page-title');
  var backLink = document.querySelector('.back-link');
  var breadcrumb = document.querySelector('.breadcrumb');
  if (pageTitle) pageTitle.textContent = '送考批次详情';
  if (backLink) { backLink.href = '送考批次台账.html'; backLink.innerHTML = '<span aria-hidden="true">←</span> 返回送考批次'; }
  if (breadcrumb) breadcrumb.innerHTML = '<a href="机构信息.html">机构信息</a><span class="muted">/</span><a href="送考批次台账.html">送考管理</a><span class="muted">/</span><span class="muted">送考批次详情</span>';

  var auditSection = batch.audit ? '<section class="plain-card"><div class="block-head"><h2>审核进度</h2></div><div class="plain-card-body"><div class="send-batch-progress">' + batch.audit.map(function (item) { return '<div data-audit-item="' + (item.key || '') + '"><span>' + item.label + '</span><strong>' + item.value + '</strong></div>'; }).join('') + '</div></div></section>' : '';
  var resultSection = '';
  if (kind !== 'draft') {
    resultSection = '<section class="plain-card"><div class="block-head"><h2>送考学员审核结果</h2></div><div class="plain-card-body"><div class="standard-table-shell"><table class="standard-table" style="min-width:800px"><thead><tr><th>平台报名编号</th><th>姓名</th><th>审核结果</th><th>退回原因</th><th class="sticky-op">操作</th></tr></thead><tbody>' + candidateRows(kind).map(function (row) {
      var action = row[2] === '待补充' ? '<button type="button" class="link" data-supplement-candidate="' + row[0] + '">补充资料</button>' : '<button type="button" class="link" data-view-candidate="' + row[0] + '" data-candidate-name="' + row[1] + '">查看</button>';
      return '<tr data-candidate-id="' + row[0] + '"><td>' + row[0] + '</td><td>' + row[1] + '</td><td data-candidate-result>' + badge(row[2], row[4]) + '</td><td>' + row[3] + '</td><td class="sticky-op" data-candidate-action>' + action + '</td></tr>';
    }).join('') + '</tbody></table></div><div class="pagination"><span>共 ' + batch.count + ' 条</span><button class="page-btn" disabled>‹</button><button class="page-btn active">1</button><button class="page-btn">›</button><select class="page-size"><option>10 条/页</option><option>20 条/页</option></select></div></div></section>';
  }
  var sideSection = kind === 'arranged' ? '<aside class="side-stack"><section class="plain-card"><div class="block-head"><h2>考试安排</h2></div><div class="plain-card-body"><p class="muted">考试日期：2026-09-30</p><p class="muted">考试地点：武汉市 · 湖北绿色建造职业技能评价中心考场</p><a class="btn btn-block" href="考试安排查询.html">查看考试安排</a></div></section></aside>' : '';
  var detailBody = document.querySelector('.detail-body');
  if (!detailBody) return;
  var attachmentInfo = '<div class="detail-item wide"><span class="detail-label">送考附件</span><span class="detail-value"><button type="button" class="attachment-preview-link" data-view-batch-attachment><span class="file-preview-icon word" aria-hidden="true">W</span><span><strong>建筑信息模型技术员送考说明.docx</strong><small>示例 Word 文件，点击预览</small></span></button></span></div>';
  var sendInfoSection = '<section class="plain-card"><div class="block-head"><h2>送考信息</h2></div><div class="plain-card-body"><div class="detail-grid"><div class="detail-item"><span class="detail-label">评价项目</span><span class="detail-value">' + batch.project + '</span></div><div class="detail-item"><span class="detail-label">评价机构</span><span class="detail-value">' + batch.agency + '</span></div><div class="detail-item"><span class="detail-label">来源班次</span><span class="detail-value">' + batch.source + '</span></div><div class="detail-item"><span class="detail-label">送考人数</span><span class="detail-value">' + batch.count + '人</span></div><div class="detail-item"><span class="detail-label">创建时间</span><span class="detail-value">' + batch.created + '</span></div>' + attachmentInfo + '</div></div></section>';
  detailBody.innerHTML = '<div class="record-banner"><div class="record-banner-main"><span class="record-symbol" aria-hidden="true">✓</span><div><h2>' + batch.occupation + '送考批次</h2><p>送考批次号：' + batch.id + '　·　来源班次：' + batch.source + '</p></div></div><div class="record-banner-side">' + badge(batch.status, batch.tag) + '</div></div><div class="two-column ' + (sideSection ? '' : 'single-column') + '"><div class="main-stack">' + sendInfoSection + auditSection + resultSection + '</div>' + sideSection + '</div>';

  if (kind !== 'draft') {
    document.body.insertAdjacentHTML('beforeend', '<div class="modal-mask" id="candidate-attachment-view-modal"><section class="modal send-attachment-view-modal"><header class="modal-head"><div><h2>送考附件信息</h2><p class="modal-subtitle" data-view-attachment-person>—</p></div><button type="button" class="icon-btn" data-close-attachment-view>×</button></header><div class="modal-body"><div class="send-batch-attachment-card"><span class="file-preview-icon word" aria-hidden="true">W</span><div class="attachment-file-copy"><strong data-view-attachment-name>—</strong><span>送考附件 · Word 文档</span></div><button type="button" class="link" data-preview-attachment-file>预览文件</button></div></div><footer class="modal-foot"><button type="button" class="btn btn-primary" data-close-attachment-view>关闭</button></footer></section></div><div class="modal-mask" id="batch-attachment-view-modal"><section class="modal send-attachment-view-modal"><header class="modal-head"><h2>送考附件</h2><button type="button" class="icon-btn" data-close-batch-attachment>×</button></header><div class="modal-body"><div class="send-batch-attachment-card"><span class="file-preview-icon word" aria-hidden="true">W</span><div class="attachment-file-copy"><strong>建筑信息模型技术员送考说明.docx</strong><span>示例 Word 文件</span></div><button type="button" class="link" data-preview-batch-attachment>预览文件</button></div></div><footer class="modal-foot"><button type="button" class="btn btn-primary" data-close-batch-attachment>关闭</button></footer></section></div>');
    var candidateAttachmentModal = document.getElementById('candidate-attachment-view-modal');
    var batchAttachmentModal = document.getElementById('batch-attachment-view-modal');
    function closeAttachmentView(modal) { modal.classList.remove('open'); }
    candidateAttachmentModal.querySelectorAll('[data-close-attachment-view]').forEach(function (button) { button.addEventListener('click', function () { closeAttachmentView(candidateAttachmentModal); }); });
    batchAttachmentModal.querySelectorAll('[data-close-batch-attachment]').forEach(function (button) { button.addEventListener('click', function () { closeAttachmentView(batchAttachmentModal); }); });
    detailBody.addEventListener('click', function (event) {
      var candidateButton = event.target.closest('[data-view-candidate]');
      if (candidateButton) {
        candidateAttachmentModal.querySelector('[data-view-attachment-person]').textContent = candidateButton.dataset.candidateName + ' ｜ ' + candidateButton.dataset.viewCandidate;
        candidateAttachmentModal.querySelector('[data-view-attachment-name]').textContent = candidateAttachment(candidateButton.dataset.viewCandidate);
        candidateAttachmentModal.classList.add('open');
      }
      if (event.target.closest('[data-view-batch-attachment]')) batchAttachmentModal.classList.add('open');
    });
    document.querySelectorAll('[data-preview-attachment-file], [data-preview-batch-attachment]').forEach(function (button) { button.addEventListener('click', function () { phaseToast('原型演示：预览 Word 附件'); }); });
  }

  if (kind !== 'supplement') return;
  document.body.insertAdjacentHTML('beforeend', '<div class="modal-mask" id="supplement-material-modal"><section class="modal supplement-material-modal" role="dialog" aria-modal="true" aria-labelledby="supplement-modal-title"><header class="modal-head"><div><h2 id="supplement-modal-title">补充送考资料</h2><p class="modal-subtitle">李建国 ｜ HBIC-2026-000129</p></div><button class="icon-btn" type="button" data-close-supplement>×</button></header><div class="modal-body"><section class="supplement-return-note"><strong>评价机构退回意见</strong><p><b>退回原因：</b>工作证明缺少单位盖章，请重新上传完整的工作证明材料。</p><p><b>需补充材料：</b>从业/工作证明</p></section><section class="supplement-material"><h3>补充材料</h3><div class="supplement-material-row"><div><span>工作证明</span><p>原材料：工作证明.pdf</p></div><a class="link" href="#" data-view-original>查看</a></div><label class="upload-box supplement-upload"><input type="file" accept=".pdf,.jpg,.jpeg,.png" data-supplement-file hidden><span data-supplement-file-name>点击上传或拖拽文件</span><small>支持 PDF、JPG、PNG</small></label><div class="supplement-upload-result" hidden><span data-uploaded-file-name>新工作证明.pdf</span><a class="link" href="#" data-view-uploaded>查看</a><button class="link" type="button" data-replace-upload>替换</button></div></section><label class="field supplement-note-field"><span>补充说明（选填）</span><textarea class="control" rows="3" placeholder="请输入本次补充说明">已重新加盖单位公章，并上传完整扫描件。</textarea></label></div><footer class="modal-foot"><button class="btn" type="button" data-close-supplement>取消</button><button class="btn btn-primary" type="button" data-submit-supplement>提交补充资料</button></footer></section></div>');
  var modal = document.getElementById('supplement-material-modal');
  var currentCandidate = null;
  function closeSupplement() { modal.classList.remove('open'); currentCandidate = null; }
  function openSupplement(candidateId) { currentCandidate = candidateId; modal.classList.add('open'); }
  document.querySelectorAll('[data-supplement-candidate]').forEach(function (button) { button.addEventListener('click', function () { openSupplement(button.dataset.supplementCandidate); }); });
  modal.querySelectorAll('[data-close-supplement]').forEach(function (button) { button.addEventListener('click', closeSupplement); });
  modal.addEventListener('click', function (event) { if (event.target === modal) closeSupplement(); });
  modal.querySelector('[data-supplement-file]').addEventListener('change', function (event) {
    var file = event.target.files[0];
    if (!file) return;
    modal.querySelector('[data-uploaded-file-name]').textContent = file.name;
    modal.querySelector('.supplement-upload-result').hidden = false;
    modal.querySelector('[data-supplement-file-name]').textContent = '已选择：' + file.name;
  });
  modal.querySelector('[data-replace-upload]').addEventListener('click', function () { modal.querySelector('[data-supplement-file]').click(); });
  modal.querySelectorAll('[data-view-original], [data-view-uploaded]').forEach(function (link) { link.addEventListener('click', function (event) { event.preventDefault(); phaseToast('原型演示：查看材料'); }); });
  modal.querySelector('[data-submit-supplement]').addEventListener('click', function () {
    var row = document.querySelector('[data-candidate-id="' + currentCandidate + '"]');
    if (!row) return;
    row.querySelector('[data-candidate-result]').innerHTML = badge('待复核', 'tag-blue');
    row.querySelector('[data-candidate-action]').innerHTML = '<button type="button" class="link" data-view-candidate="' + currentCandidate + '" data-candidate-name="李建国">查看</button>';
    var auditSupplement = document.querySelector('[data-audit-item="supplement"]');
    if (auditSupplement) auditSupplement.querySelector('strong').textContent = '3人';
    var awaitingAudit = document.createElement('div');
    awaitingAudit.innerHTML = '<span>待复核</span><strong>1人</strong>';
    document.querySelector('.send-batch-progress')?.appendChild(awaitingAudit);
    closeSupplement();
    phaseToast('补充资料已提交，等待评价机构复核');
  });
}());

/* 课程列表不展示平台审核状态：同步清理页签、筛选项和列表行。 */
document.addEventListener('DOMContentLoaded', function () {
  if (document.body.dataset.pageId !== '课程管理.html') return;
  window.setTimeout(function () {
    document.querySelectorAll('[data-demo-tab="待平台审核"]').forEach(function (tab) { tab.remove(); });
    document.querySelectorAll('select.control option').forEach(function (option) {
      if (option.textContent.trim() === '待平台审核') option.remove();
    });
    document.querySelectorAll('tr[data-filter-row][data-status="待平台审核"]').forEach(function (row) { row.remove(); });
    const total = document.querySelector('[data-demo-tab="全部"] .tab-count');
    if (total) total.textContent = '11';
    const paginationTotal = document.querySelector('.pagination > span');
    if (paginationTotal) paginationTotal.textContent = '共 11 条';
  }, 0);
});

/* 课程启停用演示闭环 */
document.addEventListener('DOMContentLoaded', function () {
    const pageId = decodeURIComponent(location.pathname.split('/').pop()) || document.body.dataset.pageId || '';
  if (pageId !== '课程管理.html' && pageId !== '课程详情.html') return;
  const isList = pageId === '课程管理.html';
  const kind = '课程';
  function toast(message) {
    const stack = document.querySelector('.toast-stack');
    if (!stack) return;
    const item = document.createElement('div'); item.className = 'toast success'; item.textContent = message; stack.appendChild(item);
    setTimeout(function () { item.remove(); }, 2400);
  }
  document.body.insertAdjacentHTML('beforeend', '<div id="course-lifecycle-modal" class="modal-mask"><section class="modal"><header class="modal-head"><h2 data-state-title>课程状态操作</h2><button class="icon-btn" type="button" data-state-close>×</button></header><div class="modal-body"><p>课程：<strong data-state-name>—</strong></p><label class="field"><span data-state-label>操作原因</span><textarea class="control" rows="4" data-state-reason></textarea></label><div class="error" data-state-error></div></div><footer class="modal-foot"><button class="btn" type="button" data-state-close>取消</button><button class="btn btn-primary" type="button" data-state-confirm>确认</button></footer></section></div>');
  const modal = document.getElementById('course-lifecycle-modal'); let active = null;
  function openModal(target, action, name) {
    active = { target: target, action: action };
    modal.querySelector('[data-state-title]').textContent = action + kind;
    modal.querySelector('[data-state-name]').textContent = name;
    modal.querySelector('[data-state-label]').textContent = action === '停用' ? '停用原因（必填）' : '启用说明（选填）';
    modal.querySelector('[data-state-reason]').value = ''; modal.querySelector('[data-state-error]').textContent = '';
    const confirm = modal.querySelector('[data-state-confirm]'); confirm.className = 'btn ' + (action === '停用' ? 'btn-danger' : 'btn-primary'); confirm.textContent = '确认' + action;
    modal.classList.add('open');
  }
  modal.querySelectorAll('[data-state-close]').forEach(function (button) { button.addEventListener('click', function () { modal.classList.remove('open'); }); });
  function setBadge(badge, state) { badge.className = 'tag ' + (state === '已发布' ? 'tag-green' : 'tag-gray'); badge.innerHTML = '<span class="status-dot"></span>' + state; }
  if (isList) {
    const tabs = document.querySelector('.tabs');
    if (tabs && !tabs.querySelector('[data-demo-tab="已停用"]')) tabs.insertAdjacentHTML('beforeend', '<button class="tab" data-demo-tab="已停用">已停用<span class="tab-count">1</span></button>');
    const statusSelect = Array.from(document.querySelectorAll('select.control')).find(function (select) { return Array.from(select.options).some(function (o) { return o.text === '待平台审核'; }); });
    if (statusSelect && !Array.from(statusSelect.options).some(function (o) { return o.text === '已停用'; })) statusSelect.insertAdjacentHTML('beforeend', '<option>已停用</option>');
    const total = document.querySelector('[data-demo-tab="全部"] .tab-count'); if (total) total.textContent = '13';
    const tbody = document.querySelector('.standard-table tbody');
    if (tbody && !tbody.querySelector('[data-status="已停用"]')) tbody.querySelector('.empty-row').insertAdjacentHTML('beforebegin', '<tr data-filter-row data-status="已停用"><td>KC-2026-0015</td><td>智能装备操作员基础课程</td><td>智能装备操作员</td><td>线下培训</td><td>40学时</td><td><span class="tag tag-gray"><span class="status-dot"></span>已停用</span></td><td>2026-08-18 15:40</td><td class="sticky-op"><a class="link" href="课程详情.html#disabled">查看</a><a class="link" href="编辑课程.html#disabled">编辑</a></td></tr>');
    document.querySelectorAll('tr[data-filter-row]').forEach(function (row) {
      if (row.dataset.status === '已发布') {
        const view = row.querySelector('.sticky-op a[href^="course-detail"]'); if (view) view.href = '课程详情.html?status=published';
        const edit = row.querySelector('.sticky-op a[href^="course-edit"]'); if (edit) edit.href = '编辑课程.html?status=published';
      }
      if (row.dataset.status !== '已发布' && row.dataset.status !== '已停用') return;
      row.querySelector('.sticky-op').insertAdjacentHTML('beforeend', '<button type="button" class="link" data-course-state="' + (row.dataset.status === '已发布' ? '停用' : '启用') + '">' + (row.dataset.status === '已发布' ? '停用' : '启用') + '</button>');
    });
    document.addEventListener('click', function (event) { const button = event.target.closest('[data-course-state]'); if (!button) return; const row = button.closest('tr'); openModal(row, button.dataset.courseState, row.children[1].textContent.trim()); });
  } else {
    const queryState = new URLSearchParams(location.search).get('status');
    const stopped = location.hash === '#disabled'; const published = queryState === 'published'; const review = queryState === 'review';
    const status = document.querySelector('[data-course-status]'); const publish = document.querySelector('[data-course-publish]'); const actions = document.querySelector('.header-actions'); const edit = actions.querySelector('a[href^="course-edit"]');
    if (review) {
      status.className = 'tag tag-blue'; status.innerHTML = '<span class="status-dot"></span>待审核';
      if (publish) publish.remove();
      if (edit) edit.href = '编辑课程.html?status=review';
    } else if (stopped || published) {
      setBadge(status, stopped ? '已停用' : '已发布'); if (publish) publish.remove();
      if (edit) edit.href = stopped ? '编辑课程.html#disabled' : '编辑课程.html?status=published';
      const button = document.createElement('button'); button.type = 'button'; button.className = stopped ? 'btn btn-primary' : 'btn btn-danger'; button.dataset.courseState = stopped ? '启用' : '停用'; button.textContent = button.dataset.courseState + kind; actions.appendChild(button);
      button.addEventListener('click', function () { openModal(button, button.dataset.courseState, document.querySelector('.record-banner-main h2').textContent.trim()); });
    } else if (edit) {
      edit.href = '编辑课程.html#draft';
    }
  }
  modal.querySelector('[data-state-confirm]').addEventListener('click', function () {
    if (!active) return; const reason = modal.querySelector('[data-state-reason]').value.trim();
    if (active.action === '停用' && !reason) { modal.querySelector('[data-state-error]').textContent = '请填写停用原因'; return; }
    const newState = active.action === '停用' ? '已停用' : '已发布';
    const row = active.target.tagName === 'TR' ? active.target : active.target.closest('tr');
    if (row) { row.dataset.status = newState; setBadge(row.querySelector('.tag'), newState); const button = row.querySelector('[data-course-state]'); button.dataset.courseState = active.action === '停用' ? '启用' : '停用'; button.textContent = button.dataset.courseState; }
    else { setBadge(document.querySelector('[data-course-status]'), newState); active.target.dataset.courseState = active.action === '停用' ? '启用' : '停用'; active.target.textContent = active.target.dataset.courseState + kind; active.target.className = active.target.dataset.courseState === '启用' ? 'btn btn-primary' : 'btn btn-danger'; }
    modal.classList.remove('open'); toast(kind + '已' + active.action);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const resultModal = document.getElementById('training-result-modal');
  if (!resultModal) return;

  const trainingTab = document.querySelector('[data-panel-tab="training"]');
  const trainingPanel = document.querySelector('[data-panel="training"]');
  const batchButton = document.getElementById('batch-training-result');
  const statusTag = document.getElementById('class-status-tag');
  const statusValue = document.getElementById('class-status-value');
  const summary = document.getElementById('training-result-summary');
  const selectAll = document.querySelector('[data-training-select-all]');
  const form = document.getElementById('training-result-form');
  const view = document.getElementById('training-result-view');
  const saveButton = document.getElementById('save-training-result');
  const modalTitle = document.getElementById('training-result-title');
  const selectedCount = document.getElementById('training-selected-count');
  const confirmTime = document.getElementById('training-confirm-time');
  const confirmNote = document.getElementById('training-confirm-note');
  let targetRows = [];
  let selectedResult = 'complete';

  function trainingToast(message, type) {
    const stack = document.querySelector('.toast-stack');
    if (!stack) return;
    const item = document.createElement('div');
    item.className = 'toast ' + (type || 'success');
    item.textContent = message;
    stack.appendChild(item);
    window.setTimeout(function () { item.remove(); }, 2400);
  }

  function activateTrainingPanel() {
    document.querySelectorAll('[data-panel-tab]').forEach(function (tab) {
      tab.classList.toggle('active', tab === trainingTab);
    });
    document.querySelectorAll('[data-panel]').forEach(function (panel) {
      panel.classList.toggle('hidden', panel !== trainingPanel);
    });
  }

  if (window.location.hash === '#ended') {
    activateTrainingPanel();
    if (batchButton) batchButton.hidden = false;
    if (statusTag) {
      statusTag.className = 'tag tag-gray';
      statusTag.innerHTML = '<span class="status-dot"></span>已结束';
    }
    if (statusValue) statusValue.textContent = '已结束';
  } else if (window.location.hash === '#training') {
    activateTrainingPanel();
  }

  function nowValue() {
    const date = new Date();
    const pad = function (value) { return String(value).padStart(2, '0'); };
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes());
  }

  function displayTime(value) {
    return value ? value.replace('T', ' ') : '';
  }

  function setChoice(value) {
    selectedResult = value;
    document.querySelectorAll('[data-training-choice]').forEach(function (button) {
      button.classList.toggle('selected', button.dataset.trainingChoice === value);
    });
  }

  function openModal(rows, mode) {
    targetRows = rows;
    const row = rows[0];
    const isView = mode === 'view';
    resultModal.classList.add('open');
    resultModal.setAttribute('aria-hidden', 'false');
    form.hidden = isView;
    view.hidden = !isView;
    form.classList.toggle('hidden', isView);
    view.classList.toggle('hidden', !isView);
    saveButton.hidden = isView;
    modalTitle.textContent = isView ? '培训结果确认信息' : (rows.length > 1 ? '批量确认培训结果' : '确认培训结果');

    if (isView) {
      view.querySelector('[data-view-name]').textContent = row.dataset.studentName || '—';
      view.querySelector('[data-view-result]').textContent = row.dataset.resultStatus === 'complete' ? '培训完成' : '培训未完成';
      view.querySelector('[data-view-user]').textContent = row.dataset.confirmUser || '—';
      view.querySelector('[data-view-time]').textContent = row.dataset.confirmTime || '—';
      view.querySelector('[data-view-note]').textContent = row.dataset.confirmNote || '—';
    } else {
      selectedCount.textContent = '已选择' + rows.length + '人';
      setChoice(row.dataset.resultStatus === 'incomplete' ? 'incomplete' : 'complete');
      confirmTime.value = row.dataset.confirmTime ? row.dataset.confirmTime.replace(' ', 'T') : nowValue();
      confirmNote.value = mode === 'reconfirm' ? (row.dataset.confirmNote || '') : '';
    }
  }

  function closeModal() {
    resultModal.classList.remove('open');
    resultModal.setAttribute('aria-hidden', 'true');
    targetRows = [];
  }

  function updateSummary() {
    if (!summary) return;
    const rows = Array.from(document.querySelectorAll('[data-training-row]'));
    const counts = rows.reduce(function (result, row) {
      const status = row.dataset.resultStatus || 'pending';
      result[status] = (result[status] || 0) + 1;
      return result;
    }, {});
    const pending = summary.querySelector('[data-result-count="pending"]');
    const complete = summary.querySelector('[data-result-count="complete"]');
    const incomplete = summary.querySelector('[data-result-count="incomplete"]');
    if (pending) pending.textContent = (counts.pending || 0) + '人';
    if (complete) complete.textContent = (counts.complete || 0) + '人';
    if (incomplete) incomplete.textContent = (counts.incomplete || 0) + '人';
  }

  function renderRow(row, result, time, note) {
    row.dataset.resultStatus = result;
    row.dataset.confirmUser = '王老师';
    row.dataset.confirmTime = time;
    row.dataset.confirmNote = note;
    const statusCell = row.querySelector('[data-training-status]');
    const actionCell = row.querySelector('[data-training-actions]');
    const checkbox = row.querySelector('[data-training-select]');
    if (statusCell) {
      statusCell.innerHTML = result === 'complete'
        ? '<span class="tag tag-green"><span class="status-dot"></span>培训完成</span>'
        : '<span class="tag tag-red"><span class="status-dot"></span>培训未完成</span>';
    }
    if (checkbox) {
      checkbox.checked = false;
      checkbox.disabled = true;
    }
    if (actionCell) {
      actionCell.innerHTML = result === 'complete'
        ? '<button class="link" type="button" data-training-action="view">查看确认信息</button>'
        : '<span class="training-inline-actions"><button class="link" type="button" data-training-action="view">查看结果</button><button class="link" type="button" data-training-action="reconfirm">重新确认</button></span>';
    }
  }

  document.addEventListener('click', function (event) {
    const choice = event.target.closest('[data-training-choice]');
    if (choice) {
      setChoice(choice.dataset.trainingChoice);
      return;
    }

    const close = event.target.closest('[data-training-close]');
    if (close) {
      closeModal();
      return;
    }

    const action = event.target.closest('[data-training-action]');
    if (action) {
      const row = action.closest('[data-training-row]');
      if (!row) return;
      openModal([row], action.dataset.trainingAction);
    }
  });

  if (selectAll) {
    selectAll.addEventListener('change', function () {
      document.querySelectorAll('[data-training-select]:not(:disabled)').forEach(function (checkbox) {
        checkbox.checked = selectAll.checked;
      });
    });
  }

  if (batchButton) {
    batchButton.addEventListener('click', function () {
      const rows = Array.from(document.querySelectorAll('[data-training-select]:checked')).map(function (checkbox) {
        return checkbox.closest('[data-training-row]');
      }).filter(Boolean);
      if (!rows.length) {
        trainingToast('请先选择待确认学员', 'warning');
        return;
      }
      openModal(rows, 'batch');
    });
  }

  if (saveButton) {
    saveButton.addEventListener('click', function () {
      const note = confirmNote.value.trim();
      if (selectedResult === 'incomplete' && !note) {
        trainingToast('请填写未完成原因', 'warning');
        confirmNote.focus();
        return;
      }
      const time = displayTime(confirmTime.value || nowValue());
      const finalNote = note || '线上与线下培训记录均达到课程完成要求。';
      targetRows.forEach(function (row) {
        renderRow(row, selectedResult, time, finalNote);
      });
      if (selectAll) selectAll.checked = false;
      updateSummary();
      closeModal();
      trainingToast('培训结果已保存', 'success');
    });
  }

  resultModal.addEventListener('click', function (event) {
    if (event.target === resultModal) closeModal();
  });

  updateSummary();
});

document.addEventListener('DOMContentLoaded', function () {
  if (document.body.dataset.pageId !== '培训完成名单.html') return;
  document.querySelector('.page-header .header-actions')?.remove();
  document.querySelectorAll('tbody tr').forEach(function (row) {
    const cells = row.querySelectorAll('td');
    if (cells.length > 1 && cells[0].textContent.trim() === 'HBIC-2026-000129') {
      cells[0].textContent = 'HBIC-2026-000132';
      cells[1].textContent = '李莉';
    }
  });
});

/* 报名订单由培训机构核款：待核款、退回补正、已支付三种状态演示 */
document.addEventListener('DOMContentLoaded', function () {
  const pageId = decodeURIComponent(location.pathname.split('/').pop()) || '';
  if (pageId !== '报名订单详情.html') return;

  const trigger = document.getElementById('institution-verify-trigger');
  const modal = document.getElementById('institution-verify-modal');
  const badge = document.getElementById('order-status-badge');
  const statusValue = document.getElementById('order-status-value');
  const section = document.getElementById('institution-verification-section');
  const content = document.getElementById('institution-verification-content');
  let result = '核款通过';

  function showToast(message) {
    const stack = document.querySelector('.toast-stack');
    if (!stack) return;
    const item = document.createElement('div');
    item.className = 'toast success';
    item.textContent = message;
    stack.appendChild(item);
    setTimeout(function () { item.remove(); }, 2400);
  }

  function setStatus(state) {
    const passed = state === '已支付';
    if (badge) {
      badge.className = 'tag ' + (passed ? 'tag-green' : 'tag-orange');
      badge.innerHTML = '<span class="status-dot"></span>' + state;
    }
    if (statusValue) statusValue.textContent = state;
  }

  function renderVerification(data) {
    if (!section || !content) return;
    section.classList.remove('hidden');
    section.hidden = false;
    const passed = data.result === '核款通过';
    content.innerHTML = '<div class="detail-grid">' +
      '<div class="detail-item"><span class="detail-label">核款机构</span><span class="detail-value">湖北数字建造培训中心</span></div>' +
      '<div class="detail-item"><span class="detail-label">核款结果</span><span class="detail-value"><span class="tag ' + (passed ? 'tag-green' : 'tag-orange') + '"><span class="status-dot"></span>' + data.result + '</span></span></div>' +
      '<div class="detail-item"><span class="detail-label">核款人</span><span class="detail-value">王老师</span></div>' +
      '<div class="detail-item"><span class="detail-label">核款时间</span><span class="detail-value">' + data.time + '</span></div>' +
      '<div class="detail-item wide"><span class="detail-label">核款备注</span><span class="detail-value">' + (data.note || '—') + '</span></div>' +
      '</div>' +
      '<div class="file-card"><div class="file-info"><span data-icon="attachment"></span><div><strong>' + data.file + '</strong><span>培训机构上传</span></div></div><button class="link" type="button" data-toast="核款附件预览已打开">预览</button></div>';
  }

  if (location.hash === '#paid') {
    setStatus('已支付');
    if (trigger) trigger.hidden = true;
    renderVerification({ result: '核款通过', time: '2026-08-20 14:36', note: '款项已到账，金额与汇款凭证一致。', file: '机构核款凭证.pdf' });
  }

  if (!trigger || !modal) return;
  trigger.addEventListener('click', function () {
    result = '核款通过';
    modal.querySelectorAll('[data-institution-result]').forEach(function (item) {
      item.classList.toggle('selected', item.dataset.institutionResult === result);
    });
    const note = modal.querySelector('[data-institution-note]');
    const error = modal.querySelector('[data-institution-error]');
    if (note) note.value = '';
    if (error) error.textContent = '';
    modal.classList.add('open');
  });
  modal.querySelectorAll('[data-institution-result]').forEach(function (item) {
    item.addEventListener('click', function () {
      result = item.dataset.institutionResult;
      modal.querySelectorAll('[data-institution-result]').forEach(function (choice) { choice.classList.toggle('selected', choice === item); });
    });
  });
  modal.querySelectorAll('[data-institution-close]').forEach(function (button) {
    button.addEventListener('click', function () { modal.classList.remove('open'); });
  });
  modal.querySelector('[data-institution-confirm]').addEventListener('click', function () {
    const note = modal.querySelector('[data-institution-note]').value.trim();
    const error = modal.querySelector('[data-institution-error]');
    if (result === '退回补正' && !note) {
      error.textContent = '退回补正时请填写核款备注';
      return;
    }
    const fileInput = modal.querySelector('[data-institution-file]');
    const filename = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0].name : '机构核款附件.pdf';
    const passed = result === '核款通过';
    setStatus(passed ? '已支付' : '核款退回');
    renderVerification({ result: result, time: '2026-08-24 15:20', note: note || '款项已到账，金额与汇款凭证一致。', file: filename });
    if (passed) trigger.hidden = true;
    modal.classList.remove('open');
    showToast(passed ? '机构核款已通过，订单状态已更新为已支付' : '订单已退回付款方补正');
  });
});

/* 四端原型共用：可拖动页面导航与功能说明。 */
(() => {
  if (window.__prototypeFloatToolsBootstrapped) return;
  window.__prototypeFloatToolsBootstrapped = true;
  const script = document.createElement('script');
  script.src = new URL('../prototype-float-tools.js', location.href).href;
  document.head.appendChild(script);
})();
