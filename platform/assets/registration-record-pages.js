(function () {
  const records = [
    {
      id: 'zhang-team', number: 'HBIC-2026-000128', name: '张明', type: '团队报名',
      course: '建筑信息模型技术员实务班', className: '建筑信息模型技术员实务班第3期', organization: '湖北数字建造培训中心',
      materialStatus: '齐全', acceptance: '已受理', registeredAt: '2026-08-20 09:18', order: 'BMDD-20260820-00128', orderStatus: '待平台核款',
      idNo: '420106********2412', phone: '138****6218', leader: '李建国', leaderPhone: '139****3026', receiver: '陈老师', receivedAt: '2026-08-20 10:05', result: '受理通过',
      materials: [['身份证正反面', '身份证正反面扫描件', '身份证正反面.pdf'], ['学历/工作证明', 'BIM相关从业证明', '工作证明.pdf']]
    },
    {
      id: 'li-team', number: 'HBIC-2026-000129', name: '李建国', type: '团队报名',
      course: '建筑信息模型技术员实务班', className: '建筑信息模型技术员实务班第3期', organization: '湖北数字建造培训中心',
      materialStatus: '齐全', acceptance: '已受理', registeredAt: '2026-08-20 09:22', order: 'BMDD-20260820-00128', orderStatus: '待平台核款',
      idNo: '420106********1046', phone: '139****3026', leader: '李建国', leaderPhone: '139****3026', receiver: '陈老师', receivedAt: '2026-08-20 10:05', result: '受理通过',
      materials: [['身份证正反面', '身份证正反面扫描件', '身份证正反面.pdf'], ['学历/工作证明', '学历证明材料', '学历证明.pdf']]
    },
    {
      id: 'chen-team', number: 'HBIC-2026-000136', name: '陈浩', type: '团队报名',
      course: '建筑信息模型技术员实务班', className: '建筑信息模型技术员实务班第3期', organization: '湖北数字建造培训中心',
      materialStatus: '待补充', acceptance: '待受理', registeredAt: '2026-08-20 09:36', order: '', orderStatus: '',
      idNo: '420106********3271', phone: '136****7215', leader: '李建国', leaderPhone: '139****3026', receiver: '—', receivedAt: '—', result: '待受理',
      materials: [['身份证正反面', '身份证正反面扫描件', '身份证正反面.pdf'], ['学历/工作证明', '材料待补充', '—']]
    },
    {
      id: 'zhang-personal', number: 'HBIC-2026-000116', name: '张明', type: '个人报名',
      course: '装配式建筑施工员混合班', className: '装配式建筑施工员混合班', organization: '湖北建造产业技能培训学校',
      materialStatus: '齐全', acceptance: '已受理', registeredAt: '2026-08-19 14:06', order: 'BMDD-20260819-00116', orderStatus: '已支付',
      idNo: '420106********2412', phone: '138****6218', receiver: '王老师', receivedAt: '2026-08-19 15:20', result: '受理通过',
      materials: [['身份证正反面', '身份证正反面扫描件', '身份证正反面.pdf'], ['学历/工作证明', '装配式施工相关证明', '工作证明.pdf'], ['其他报名材料', '近期证件照', 'photo.jpg']]
    },
    {
      id: 'wang-returned', number: 'HBIC-2026-000142', name: '王琳', type: '个人报名',
      course: '智能装备操作员线下实训班', className: '智能装备操作员线下实训班', organization: '湖北建造产业技能培训学校',
      materialStatus: '待补充', acceptance: '已退回', registeredAt: '2026-08-20 11:32', order: '', orderStatus: '',
      idNo: '420106********1898', phone: '137****8256', receiver: '王老师', receivedAt: '2026-08-20 13:40', result: '退回补充材料', returnReason: '学历/工作证明材料不清晰，请重新提交。',
      materials: [['身份证正反面', '身份证正反面扫描件', '身份证正反面.pdf'], ['学历/工作证明', '材料不清晰，待补充', '—']]
    }
  ];

  function tag(status) {
    const type = status === '已受理' || status === '齐全' || status === '已支付' ? 'tag-green' : (status === '待受理' || status === '待补充' || status === '待平台核款' ? 'tag-orange' : 'tag-red');
    return '<span class="tag ' + type + '"><span class="status-dot"></span>' + status + '</span>';
  }

  function safe(value) { return String(value || '—'); }
  function orderHref(record) { return record.orderStatus === '已支付' ? '报名订单详情.html#paid' : '报名订单详情.html'; }

  function renderList() {
    const body = document.getElementById('registration-record-rows');
    if (!body) return;
    const keyword = (document.getElementById('record-keyword').value || '').trim().toLowerCase();
    const registrationType = document.getElementById('record-type').value;
    const organization = document.getElementById('record-org').value;
    const acceptance = document.getElementById('record-acceptance').value;
    const date = document.getElementById('record-date').value;
    const activeTab = document.querySelector('[data-registration-tab].active')?.dataset.registrationTab || '全部';
    const list = records.filter(function (record) {
      const haystack = [record.number, record.name, record.course, record.organization].join(' ').toLowerCase();
      return (!keyword || haystack.includes(keyword)) && (!registrationType || record.type === registrationType) && (!organization || record.organization === organization) && (!acceptance || record.acceptance === acceptance) && (!date || record.registeredAt.indexOf(date) === 0) && (activeTab === '全部' || record.acceptance === activeTab);
    });
    body.innerHTML = list.length ? list.map(function (record) {
      const order = record.order ? '<a class="link" href="' + orderHref(record) + '">' + record.order + '</a>' : '<span class="muted">未生成</span>';
      return '<tr><td><a class="link" href="报名记录详情.html?record=' + record.id + '">' + record.number + '</a></td><td>' + record.name + '</td><td>' + record.type + '</td><td><strong>' + record.course + '</strong><br><span class="muted">' + record.className + '</span></td><td>' + record.organization + '</td><td>' + tag(record.materialStatus) + '</td><td>' + tag(record.acceptance) + '</td><td>' + order + '</td><td class="sticky-op"><a class="link" href="报名记录详情.html?record=' + record.id + '">查看</a></td></tr>';
    }).join('') : '<tr class="empty-row"><td colspan="9">未找到符合条件的报名记录</td></tr>';
    const total = document.getElementById('record-total');
    if (total) total.textContent = '共 ' + list.length + ' 条';
  }

  function detailItem(label, value, wide) {
    return '<div class="detail-item' + (wide ? ' wide' : '') + '"><span class="detail-label">' + label + '</span><strong>' + safe(value) + '</strong></div>';
  }

  function renderDetail() {
    const mount = document.getElementById('registration-record-detail');
    if (!mount) return;
    const id = new URLSearchParams(window.location.search).get('record') || 'zhang-team';
    const record = records.find(function (item) { return item.id === id; }) || records[0];
    const teamInfo = record.type === '团队报名' ? detailItem('团队负责人', record.leader) + detailItem('负责人联系电话', record.leaderPhone) : '';
    const materials = record.materials.map(function (material) {
      return '<tr><td>' + material[0] + '</td><td>' + material[1] + '</td><td>' + (material[2] === '—' ? '<span class="muted">—</span>' : '<button class="link" type="button" data-toast="正在预览：' + material[2] + '">预览</button>') + '</td></tr>';
    }).join('');
    const returnReason = record.returnReason ? detailItem('退回原因', record.returnReason, true) : '';
    const order = record.order ? '<div class="detail-grid"><div class="detail-item"><span class="detail-label">订单号</span><a class="link" href="' + orderHref(record) + '">' + record.order + '</a></div><div class="detail-item"><span class="detail-label">订单状态</span>' + tag(record.orderStatus) + '</div></div>' : '<div class="empty-state"><strong>暂未生成报名订单</strong><span>培训机构受理通过后将按报名情况形成订单。</span></div>';
    mount.innerHTML =
      '<section class="record-banner"><div class="record-banner-main"><div class="record-icon record-registration-mark">报</div><div><h2>' + record.name + ' · ' + record.course + '</h2><p>平台报名编号：' + record.number + '　·　报名类型：' + record.type + '</p></div></div><div class="record-banner-side">' + tag(record.acceptance) + '</div></section>' +
      '<section class="plain-card"><div class="block-head"><h2>报名信息</h2></div><div class="plain-card-body"><div class="detail-grid">' +
      detailItem('姓名', record.name) + detailItem('证件号码', record.idNo) + detailItem('联系电话', record.phone) + detailItem('报名课程', record.course) + detailItem('培训班次', record.className) + detailItem('报名类型', record.type) + detailItem('培训机构', record.organization) + detailItem('报名时间', record.registeredAt) + teamInfo +
      '</div></div></section>' +
      '<section class="plain-card"><div class="block-head"><h2>报名材料</h2></div><div class="plain-card-body"><div class="standard-table-shell"><table class="standard-table" style="min-width:720px"><thead><tr><th>材料名称</th><th>材料内容</th><th class="sticky-op">预览</th></tr></thead><tbody>' + materials + '</tbody></table></div></div></section>' +
      '<section class="plain-card"><div class="block-head"><h2>受理信息</h2></div><div class="plain-card-body"><div class="detail-grid">' +
      detailItem('受理机构', record.organization) + detailItem('受理人', record.receiver) + detailItem('受理时间', record.receivedAt) + detailItem('受理结果', record.result) + returnReason +
      '</div></div></section>' +
      '<section class="plain-card"><div class="block-head"><h2>关联订单</h2></div><div class="plain-card-body">' + order + '</div></section>';
    mount.querySelectorAll('[data-toast]').forEach(function (button) {
      button.addEventListener('click', function () {
        const stack = document.querySelector('.toast-stack');
        if (!stack) return;
        const item = document.createElement('div');
        item.className = 'toast success';
        item.textContent = button.dataset.toast;
        stack.appendChild(item);
        window.setTimeout(function () { item.remove(); }, 2200);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('registration-record-rows')) {
      renderList();
      document.querySelectorAll('[data-registration-tab]').forEach(function (tab) {
        tab.addEventListener('click', function () {
          document.querySelectorAll('[data-registration-tab]').forEach(function (item) { item.classList.remove('active'); });
          tab.classList.add('active');
          renderList();
        });
      });
      document.getElementById('record-search')?.addEventListener('click', renderList);
      document.getElementById('record-keyword')?.addEventListener('keydown', function (event) { if (event.key === 'Enter') renderList(); });
      document.getElementById('record-reset')?.addEventListener('click', function () {
        ['record-keyword', 'record-type', 'record-org', 'record-acceptance', 'record-date'].forEach(function (id) { document.getElementById(id).value = ''; });
        document.querySelectorAll('[data-registration-tab]').forEach(function (item, index) { item.classList.toggle('active', index === 0); });
        renderList();
      });
    }
    renderDetail();
  });
})();
