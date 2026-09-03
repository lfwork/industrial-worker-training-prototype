(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const pageId = document.body.dataset.page;
  const definition = window.H5_PAGES && window.H5_PAGES[pageId];
  const root = $('#pageRoot');
  const TEAM_STATE = {
    submitted: 'H5_TEAM_BATCH_SUBMITTED',
    accepted: 'H5_TEAM_BATCH_ACCEPTED',
    paid: 'H5_TEAM_ORDER_PAID',
    paymentPending: 'H5_TEAM_ORDER_PAYMENT_PENDING'
  };
  let toastTimer;

  const navItems = [
    ['home', '../首页.html', 'home', '首页'],
    ['courses', '02-培训课程.html', 'book-open', '课程'],
    ['training', '15-我的培训.html', 'monitor-play', '培训'],
    ['exam', '04-考试信息.html', 'file-text', '考试'],
    ['my', '06-我的.html', 'user', '我的']
  ];

  function icons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2300);
  }

  function navMarkup(active) {
    if (!active) return '';
    return `<nav class="bottom-nav" aria-label="主导航">${navItems.map(([key, href, icon, label]) => `<a class="${active === key ? 'is-active' : ''}" href="${href}"><i data-lucide="${icon}"></i><span>${label}</span></a>`).join('')}</nav>`;
  }

  function render() {
    if (!definition) {
      root.innerHTML = `<main class="page-main"><section class="mobile-card empty-state"><span><i data-lucide="circle-alert"></i></span><h2>页面配置不存在</h2><p>请返回首页重新进入。</p><a class="primary-button" style="margin-top:16px" href="../首页.html">返回首页</a></section></main>`;
      icons();
      return;
    }
    document.title = `${pageId} ${definition.title}｜工人H5端`;
    root.innerHTML = `
      <div class="prototype-shell">
        <header class="app-bar sub-app-bar">
          <a class="icon-button" href="${definition.back || '../首页.html'}" aria-label="返回"><i data-lucide="arrow-left"></i></a>
          <h1>${definition.title}</h1>
          <button class="icon-button" type="button" data-toast="${definition.help || '当前页面为高保真原型演示'}" aria-label="页面说明"><i data-lucide="circle-help"></i></button>
        </header>
        <main class="page-main ${definition.sticky ? 'has-sticky-action' : ''} ${definition.nav ? 'has-bottom-nav' : ''}">${definition.body}</main>
        ${definition.sticky ? `<footer class="page-sticky-bar">${definition.sticky}</footer>` : ''}
        ${navMarkup(definition.nav)}
      </div>`;
    icons();
  }

  function closeModal() {
    const backdrop = $('#prototypeModalBackdrop');
    const modal = $('#prototypeModal');
    if (backdrop) backdrop.remove();
    if (modal) modal.remove();
    document.body.style.overflow = '';
  }

  function showModal({ title, body, confirmLabel = '确认', cancelLabel = '取消', onConfirm, hideCancel = false, hideConfirm = false }) {
    closeModal();
    const backdrop = document.createElement('div');
    backdrop.id = 'prototypeModalBackdrop';
    backdrop.className = 'prototype-modal-backdrop';
    const modal = document.createElement('section');
    modal.id = 'prototypeModal';
    modal.className = 'prototype-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `<button class="prototype-modal-close" type="button" aria-label="关闭"><i data-lucide="x"></i></button><h2>${title}</h2><div class="prototype-modal-body">${body}</div>${hideConfirm ? '' : `<div class="prototype-modal-actions">${hideCancel ? '' : `<button class="outline-small-button" type="button" data-modal-cancel>${cancelLabel}</button>`}<button class="small-button" type="button" data-modal-confirm>${confirmLabel}</button></div>`}`;
    document.body.append(backdrop, modal);
    document.body.style.overflow = 'hidden';
    icons();
    backdrop.addEventListener('click', closeModal);
    $('.prototype-modal-close', modal).addEventListener('click', closeModal);
    const cancel = $('[data-modal-cancel]', modal);
    if (cancel) cancel.addEventListener('click', closeModal);
    const confirm = $('[data-modal-confirm]', modal);
    if (confirm) confirm.addEventListener('click', () => {
      if (onConfirm) onConfirm();
      closeModal();
    });
  }

  function setupTabs() {
    $$('[data-tab-group]').forEach((group) => {
      const buttons = $$('[data-tab]', group);
      buttons.forEach((button) => button.addEventListener('click', () => {
        const name = button.dataset.tab;
        buttons.forEach((item) => item.classList.toggle('is-active', item === button));
        $$('[data-tab-panel]').forEach((panel) => {
          if (panel.closest('.prototype-shell') !== group.closest('.prototype-shell')) return;
          panel.hidden = panel.dataset.tabPanel !== name;
        });
      }));
    });
    const requestedTab = window.location.hash.replace('#', '');
    if (requestedTab) {
      const requestedButton = $(`[data-tab="${requestedTab}"]`);
      if (requestedButton) requestedButton.click();
    }
  }

  function setupCourseLinks() {
    $$('[data-course-link]').forEach((card) => {
      const open = (event) => {
        if (event.target.closest('a,button,input,label')) return;
        window.location.href = card.dataset.courseLink;
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        window.location.href = card.dataset.courseLink;
      });
    });
  }

  function setupTrainingLinks() {
    $$('[data-training-link]').forEach((card) => {
      const open = (event) => {
        if (event.target.closest('a,button,input,label')) return;
        window.location.href = card.dataset.trainingLink;
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if (event.target.closest('a,button')) return;
        event.preventDefault();
        window.location.href = card.dataset.trainingLink;
      });
    });
  }

  function setupScrollTargets() {
    $$('[data-scroll-target]').forEach((button) => button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.scrollTarget);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }

  function applyCourseDetailData() {
    if (pageId !== 'H03') return;
    const courses = {
      bim: {
        title: '建筑信息模型技术员实务班', occupation: '建筑信息模型技术员 · 数字设计领域', lead: '面向运用BIM技术从事工程模型创建、深化、整合和应用的从业人员，系统学习建模基础与项目协同实务。', period: '10-12 至 11-15', hours: '48学时', mode: '在线学习', capacity: '50人 · 余36人', org: '武汉绿色建造职业培训中心（模拟）', price: '¥1,280',
        learning: [['建模基础', '模型创建、视图与构件基础。'], ['专业建模', '建筑与机电专业建模方法。'], ['模型整合协同', '碰撞检查、问题协同和版本管理。'], ['工程项目应用', 'BIM在施工策划和交付中的应用。']],
        stages: [['BIM基础与协同建模', '线上理论', '8学时', '有效学习100%'], ['工程模型深化与应用', '线上＋线下', '16学时', '完成作业'], ['项目实训', '线下实训', '24学时', '实训记录齐全']]
      },
      equipment: {
        title: '智能装备操作员线下实训班', occupation: '智能装备操作员 · 智能施工领域', lead: '面向智能施工装备操作与现场协同人员，强化设备规范操作、安全检查和现场实训能力。', period: '09-28 至 10-30', hours: '48学时', mode: '线下实训', capacity: '40人 · 余18人', org: '湖北智建产业工人培训中心（模拟）', price: '¥880',
        learning: [['装备认知', '掌握智能施工装备组成与作业边界。'], ['安全检查', '完成开机前检查与风险识别。'], ['规范操作', '按作业规程完成典型操作任务。'], ['现场协同', '衔接施工计划、人员和设备调度。']],
        stages: [['安全与理论', '设备基础、作业规范和安全要求', '12学时', '集中讲授'], ['基础操作', '开机检查与标准动作训练', '16学时', '现场实训'], ['任务演练', '典型施工场景连续作业', '16学时', '实操考核'], ['结业复盘', '风险复盘与规范巩固', '4学时', '综合测验']]
      },
      construction: {
        title: '装配式建筑施工员混合培训班', occupation: '装配式建筑施工员 · 智能施工领域', lead: '围绕装配式构件安装、节点施工、质量检查与现场协同，采用线上理论与线下实训结合的方式组织培训。', period: '09-15 至 10-20', hours: '48学时', mode: '混合培训', capacity: '45人 · 余3人', org: '湖北智建产业工人培训中心（模拟）', price: '¥980',
        learning: [['构件识图', '识读构件图、安装图和节点要求。'], ['安装工艺', '掌握吊装定位与临时支撑工艺。'], ['节点施工', '完成连接、灌浆与成品保护。'], ['质量安全', '执行过程检查和安全控制。']],
        stages: [['线上理论', '构件识图、工艺标准和安全要求', '12学时', '视频＋测验'], ['安装实训', '吊装定位、支撑与校正', '20学时', '现场实训'], ['节点与质检', '连接灌浆和过程质量检查', '12学时', '案例练习'], ['结业考核', '实操复盘与重点知识测验', '4学时', '综合测验']]
      },
      operation: {
        title: '建筑设备智慧运维员综合班', occupation: '建筑设备智慧运维员 · 智慧运维领域', lead: '面向建筑设备巡检、故障诊断和智慧运维人员，学习设备数据采集、运行分析与维护协同。', period: '10-18 至 11-22', hours: '52学时', mode: '混合培训', capacity: '35人 · 余16人', org: '宜昌智能建造技能培训中心（模拟）', price: '¥1,260',
        learning: [['运维基础', '掌握建筑设备系统与运维规范。'], ['数据采集', '采集、核对和记录设备运行数据。'], ['故障诊断', '识别异常并完成初步诊断。'], ['维护协同', '形成工单、处置与复盘闭环。']],
        stages: [['系统基础', '设备系统、运维规范与安全要求', '12学时', '在线学习'], ['数据实训', '巡检采集与运行数据核对', '16学时', '现场实训'], ['诊断处置', '典型故障分析与工单协同', '20学时', '案例实操'], ['结业复盘', '维护闭环与综合能力检验', '4学时', '综合测验']]
      }
    };
    const key = new URLSearchParams(window.location.search).get('course') || 'bim';
    const course = courses[key] || courses.bim;
    if (key === 'bim') $$('#courseSchedule .schedule-stage-list article')[3]?.remove();
    $$('#courseOverview, #courseSchedule, #courseCompletion, #courseMaterials, #courseProvider, .mobile-card:not([id])').forEach((section) => section.querySelector('.section-number-title p')?.remove());
    $('#courseCompletion .notice-strip.warning')?.remove();
    $('#courseProvider .provider-mobile p')?.remove();
    $('#courseProvider .outline-button')?.remove();
    const fields = {
      courseDetailTitle: course.title,
      courseDetailOccupation: course.occupation,
      courseDetailLead: course.lead,
      courseDetailPeriod: course.period,
      courseDetailHours: course.hours,
      courseDetailMode: course.mode,
      courseDetailCapacity: course.capacity,
      courseDetailOrg: course.org,
      courseDetailPrice: course.price
    };
    Object.entries(fields).forEach(([id, value]) => { if ($(`#${id}`)) $(`#${id}`).textContent = value; });
    $$('#courseIntro .learning-card-mobile').forEach((card, index) => {
      const item = course.learning[index];
      if (!item) return;
      const title = $('b', card);
      const description = $('small', card);
      if (title) title.textContent = item[0];
      if (description) description.textContent = item[1];
    });
    const scheduleCaption = $('#courseSchedule .section-number-title p');
    if (scheduleCaption) scheduleCaption.textContent = `本班次采用${course.mode}方式组织培训`;
    $$('#courseSchedule .schedule-stage-list article').forEach((card, index) => {
      const item = course.stages[index];
      if (!item) return;
      const title = $('b', card);
      const description = $('small', card);
      const duration = $('em', card);
      if (title) title.textContent = item[0];
      if (description) description.textContent = item[1];
      if (duration) duration.innerHTML = `${item[2]}<br>${item[3]}`;
    });
    const completionHours = $('#courseCompletion .condition-list-mobile li:first-child small');
    if (completionHours) completionHours.textContent = `累计有效学习时长达到${course.hours}。`;
  }

  function applyTrainingDetailData() {
    if (pageId !== 'H16') return;
    const records = {
      ongoing: {
        title: '建筑信息模型技术员实务班', percent: 68, summary: '已完成32/48有效学时<br>最近学习：今天 10:32', source: '个人报名', registration: 'HBIC-2026-000128', state: '培训中',
        notice: '学习进度持续保存。只有满足有效学时、必要测验和培训机构确认后，培训状态才变更为已完成。', noticeClass: '',
        overview: [['有效学时', '32', '/48'], ['必修内容', '8', '/10'], ['测验通过', '6', '/7'], ['线下签到', '1', '/2']],
        process: [
          ['monitor-play', '在线学习', '28学时', '章节、学习时长和测验记录持续保存', '系统记录／机构核验', '进行中', 'blue'],
          ['map-pinned', '线下实训', '1/2课次', '10月19日出勤记录有效，下次10月26日', '培训机构', '进行中', 'orange'],
          ['clipboard-check', '阶段测验', '78分', '已通过6项，剩余结业测验待完成', '培训机构', '已达标', 'green']
        ],
        tasks: `<a class="task-entry" href="17-在线学习.html"><span class="task-icon"><i data-lucide="monitor-play"></i></span><span><b>在线课程学习</b><small>已完成28/40学时 · 5个章节</small></span><em class="status-chip blue">继续学习</em><i data-lucide="chevron-right"></i></a><a class="task-entry" href="18-线下日程签到.html"><span class="task-icon"><i data-lucide="map-pinned"></i></span><span><b>线下实训与签到</b><small>已出勤1/2课次 · 下次10月26日</small></span><em class="status-chip orange">待签到</em><i data-lucide="chevron-right"></i></a>`, taskCount: '2类任务',
        completion: [['完成至少40学时在线学习', '28/40', 'orange', 'circle-check'], ['完成2次线下实训', '1/2', 'orange', 'circle-check'], ['结业测验达到60分', '78分', 'green', 'circle-check'], ['培训机构完成结业确认', '待确认', '', 'clock-3']],
        period: '10-12 至 11-02', mode: '线上＋线下', org: '武汉绿色建造职业培训中心（模拟）', confirmation: '待培训机构确认',
        action: '<a class="primary-button" href="17-在线学习.html">继续培训</a>'
      },
      pending: {
        title: '智能装备操作员线下实训班', percent: 0, summary: '培训任务待开通<br>计划开班：2026-09-28', source: '湖北智创建筑工程有限公司培训队 · 报名批次02', registration: 'HBIC-2026-000245', state: '待开班',
        notice: '本记录由团队报名批次生成，但培训过程仍归属于李明本人；团队发起人不能代替学习、签到或完成测验。', noticeClass: 'warning',
        overview: [['有效学时', '0', '/48'], ['必修内容', '0', '/8'], ['实操任务', '0', '/4'], ['线下签到', '0', '/6']],
        process: [
          ['badge-check', '报名受理', '已通过', '团队报名批次02已由培训机构受理', '平台／培训机构', '已完成', 'green'],
          ['circle-dollar-sign', '报名订单', '已支付', '团队报名订单REG-TEAM-20260813002支付完成', '平台记录', '已完成', 'green'],
          ['calendar-clock', '培训任务开通', '待开班', '预计开班前24小时开放日程与签到入口', '培训机构', '等待中', 'orange']
        ],
        tasks: `<div class="task-entry is-disabled"><span class="task-icon"><i data-lucide="calendar-clock"></i></span><span><b>开班与日程</b><small>2026-09-28开班 · 日程待机构发布</small></span><em class="status-chip orange">待开放</em></div><div class="task-entry is-disabled"><span class="task-icon"><i data-lucide="hard-hat"></i></span><span><b>线下实训任务</b><small>计划6次课 · 培训任务尚未开通</small></span><em class="status-chip">未开始</em></div>`, taskCount: '2类任务',
        completion: [['完成48学时线下实训', '0/48', '', 'clock-3'], ['完成6次现场签到', '0/6', '', 'clock-3'], ['完成4项实操任务', '0/4', '', 'clock-3'], ['培训机构完成结业确认', '未开始', '', 'clock-3']],
        period: '09-28 至 10-30', mode: '线下实训', org: '湖北智建产业工人培训中心（模拟）', confirmation: '尚未开班',
        action: '<button class="outline-button" type="button" data-toast="开班提醒已设置">设置开班提醒</button>'
      },
      completed: {
        title: 'BIM项目应用基础班', percent: 100, summary: '有效学时36/36<br>完成确认：2026-07-20 16:18', source: '个人报名', registration: 'HBIC-2026-000128', state: '培训已完成',
        notice: '培训机构已依据过程事实完成结业确认。培训完成不等于考试资格审核通过，送考进度仍由评价机构独立审核。', noticeClass: 'success',
        overview: [['有效学时', '36', '/36'], ['必修内容', '100', '%'], ['课程测验', '7', '/7'], ['线下实训', '2', '/2']],
        process: [
          ['monitor-play', '在线学习', '30学时', '章节、时长及7项测验记录完整', '系统记录／机构核验', '已完成', 'green'],
          ['map-pinned', '线下实训', '6学时', '2次签到、考勤和实训记录完整', '培训机构', '已完成', 'green'],
          ['clipboard-check', '结业测验', '86分', '达到课程设定的结业要求', '培训机构', '已通过', 'green'],
          ['folder-check', '完成确认', '已确认', '2026-07-20 16:18形成V1.0培训档案', '培训机构', '已归档', 'green']
        ],
        tasks: `<div class="task-entry"><span class="task-icon"><i data-lucide="monitor-check"></i></span><span><b>在线学习档案</b><small>30学时 · 章节与测验记录完整</small></span><em class="status-chip green">已归档</em></div><div class="task-entry"><span class="task-icon"><i data-lucide="map-pin-check"></i></span><span><b>线下实训档案</b><small>6学时 · 2次签到记录完整</small></span><em class="status-chip green">已归档</em></div>`, taskCount: '2类档案',
        completion: [['完成规定有效学时', '36/36', 'green', 'circle-check'], ['完成全部必修内容', '100%', 'green', 'circle-check'], ['结业测验达到要求', '86分', 'green', 'circle-check'], ['培训机构完成结业确认', '已确认', 'green', 'circle-check']],
        period: '06-15 至 07-20', mode: '线上＋线下', org: '湖北智建产业工人培训中心（模拟）', confirmation: '2026-07-20 16:18 · 档案V1.0',
        action: '<a class="primary-button" href="19-送考进度.html">查看送考状态</a>'
      }
    };
    const key = new URLSearchParams(window.location.search).get('record') || 'ongoing';
    const record = records[key] || records.ongoing;
    $('#trainingDetailTitle').textContent = record.title;
    $('#trainingProgressPercent').textContent = `${record.percent}%`;
    $('#trainingProgressRing').style.background = `conic-gradient(var(--brand) ${record.percent}%, #e7edf6 0)`;
    $('#trainingDetailSummary').innerHTML = record.summary;
    $('#trainingDetailSource').textContent = record.source;
    $('#trainingRegistrationNumber').textContent = record.registration;
    $('#trainingOverviewStatus').textContent = record.state;
    $('#trainingDetailNotice').className = `notice-strip ${record.noticeClass}`.trim();
    $('#trainingDetailNotice span').textContent = record.notice;
    $('#trainingOverviewGrid').innerHTML = record.overview.map(([label, value, unit]) => `<div><small>${label}</small><strong>${value}<em>${unit}</em></strong></div>`).join('');
    $('#trainingProcessCount').textContent = `${record.process.length}项`;
    $('#trainingProcessRecords').innerHTML = record.process.map(([icon, type, value, detail, owner, state, tone]) => `<article><span class="training-process-icon"><i data-lucide="${icon}"></i></span><div><b>${type} · ${value}</b><small>${detail}</small><em>确认主体：${owner}</em></div><strong class="status-chip ${tone}">${state}</strong></article>`).join('');
    $('#trainingTaskCount').textContent = record.taskCount;
    $('#trainingTaskList').innerHTML = record.tasks;
    $('#trainingCompletionList').innerHTML = record.completion.map(([label, value, tone, icon]) => `<div class="eligibility-row"><i data-lucide="${icon}"${tone ? '' : ' style="color:var(--muted)"'}></i><b>${label}</b><em class="status-chip ${tone}">${value}</em></div>`).join('');
    $('#trainingDetailPeriod').textContent = record.period;
    $('#trainingDetailMode').textContent = record.mode;
    $('#trainingDetailOrg').textContent = record.org;
    $('#trainingDetailConfirmation').textContent = record.confirmation;
    $('#trainingDetailAction').innerHTML = record.action;
    icons();
  }

  function setupFilters() {
    $$('[data-filter-group]').forEach((group) => {
      const listName = group.dataset.filterGroup;
      const buttons = $$('[data-filter]', group);
      const list = $(`[data-filter-list="${listName}"]`);
      if (!list) return;
      const cards = $$('[data-filter-card]', list);
      const empty = $('[data-filter-empty]');
      const apply = (filter, keyword = '') => {
        let count = 0;
        cards.forEach((card) => {
          const categoryMatch = filter === 'all' || card.dataset.filterCard === filter;
          const textMatch = !keyword || (card.dataset.searchText || card.textContent).toLowerCase().includes(keyword.toLowerCase());
          card.hidden = !(categoryMatch && textMatch);
          if (!card.hidden) count += 1;
        });
        if (empty) empty.hidden = count !== 0;
      };
      buttons.forEach((button) => button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.toggle('is-active', item === button));
        const search = $('[data-course-search]');
        apply(button.dataset.filter, search ? search.value.trim() : '');
      }));
      const search = $('[data-course-search]');
      if (search && listName === 'courses') search.addEventListener('input', () => {
        const active = $('[data-filter].is-active', group);
        apply(active ? active.dataset.filter : 'all', search.value.trim());
      });
    });
  }

  function setupUploads() {
    $$('[data-upload]').forEach((button) => button.addEventListener('click', () => {
      button.classList.add('is-uploaded');
      const action = button.querySelector(':scope > em');
      if (action) action.textContent = '已上传';
      showToast(`${button.dataset.upload}已上传（演示）`);
      const profileCount = $('#profileMaterialCount');
      if (profileCount) profileCount.textContent = '2/2 已上传';
      const examCount = $('#examMaterialCount');
      if (examCount) examCount.textContent = `${$$('[data-upload].is-uploaded').length}/2 已上传`;
    }));
  }

  function setupPaymentMethods() {
    $$('[data-payment-group]').forEach((group) => {
      const methods = $$('[data-payment-method]', group);
      const panel = group.closest('.mobile-card') || group.parentElement;
      const offline = $('[data-offline-form]', panel);
      methods.forEach((method) => method.addEventListener('click', () => {
        methods.forEach((item) => item.classList.toggle('is-active', item === method));
        if (offline) offline.hidden = method.dataset.paymentMethod !== 'offline';
        group.dataset.selectedMethod = method.dataset.paymentMethod;
        const offlineSelected = method.dataset.paymentMethod === 'offline';
        if (group.dataset.paymentGroup === 'personal-training' && $('#trainingPayButton')) $('#trainingPayButton').textContent = offlineSelected ? '提交汇款凭证' : '确认支付 ¥1,280';
        if (group.dataset.paymentGroup === 'exam' && $('#examPayButton')) $('#examPayButton').textContent = offlineSelected ? '提交考试费汇款凭证' : '确认支付 ¥480';
      }));
    });
  }

  function teamState(key) {
    try { return window.localStorage.getItem(key) === '1'; } catch (_) { return false; }
  }

  function setTeamState(key, value) {
    try {
      if (value) window.localStorage.setItem(key, '1');
      else window.localStorage.removeItem(key);
    } catch (_) {}
  }

  function applyTeamState() {
    if (pageId !== 'H11') return;
    const submitted = teamState(TEAM_STATE.submitted);
    const accepted = teamState(TEAM_STATE.accepted);
    const paid = teamState(TEAM_STATE.paid);
    const paymentPending = teamState(TEAM_STATE.paymentPending);

    if (pageId === 'H11') {
      if ($('#teamReadyCount')) $('#teamReadyCount').textContent = submitted ? '0人' : '1人';
      if ($('#teamSubmittedCount')) $('#teamSubmittedCount').textContent = submitted ? '1人' : '0人';
      if ($('#teamPaidCount')) $('#teamPaidCount').textContent = paid ? '1人' : '0人';
      if ($('#teamBatchTabCount')) $('#teamBatchTabCount').textContent = submitted ? '1' : '0';
      if ($('#teamOrderTabCount')) $('#teamOrderTabCount').textContent = accepted ? '1' : '0';
      if ($('#teamBatchEmpty')) $('#teamBatchEmpty').hidden = submitted;
      if ($('#teamBatchCard')) $('#teamBatchCard').hidden = !submitted;
      if ($('#teamOrderEmpty')) $('#teamOrderEmpty').hidden = accepted;
      if ($('#teamOrderCard')) $('#teamOrderCard').hidden = !accepted;
      const checkbox = $('[data-team-ready-checkbox]');
      if (checkbox) { checkbox.checked = !submitted; checkbox.disabled = submitted; }
      const submitButton = $('#teamSubmitBatchButton');
      if (submitButton) { submitButton.disabled = submitted; submitButton.textContent = submitted ? '王强已进入报名批次01' : '提交本批合格成员（1）'; }
      if ($('#teamBatchStatus')) {
        $('#teamBatchStatus').textContent = accepted ? '机构已受理' : '待机构受理';
        $('#teamBatchStatus').className = accepted ? 'status-chip green' : 'status-chip orange';
      }
      if ($('#teamBatchOrderText')) $('#teamBatchOrderText').textContent = accepted ? 'REG-TEAM-20260813001' : '受理通过后生成';
      if ($('#teamSyncAcceptanceButton')) {
        $('#teamSyncAcceptanceButton').disabled = accepted;
        $('#teamSyncAcceptanceButton').textContent = accepted ? '机构已受理并生成团队订单' : '模拟培训机构受理';
      }
      if ($('#teamOrderStatus')) {
        $('#teamOrderStatus').textContent = paid ? '已支付' : (paymentPending ? '待核款' : '待支付');
        $('#teamOrderStatus').className = paid ? 'status-chip green' : 'status-chip orange';
      }
    }

  }

  function hideStickyAction() {
    const sticky = $('.page-sticky-bar');
    if (sticky) sticky.hidden = true;
  }

  function setupFlows() {
    $$('[data-flow]').forEach((control) => control.addEventListener('click', async () => {
      const flow = control.dataset.flow;
      if (flow === 'choose-enrollment') {
        const course = new URLSearchParams(window.location.search).get('course') || 'bim';
        showModal({
          title: '选择报名方式', hideConfirm: true,
          body: `<div class="enrollment-options"><a class="enrollment-option personal" href="12-个人培训报名.html?course=${course}"><span class="enrollment-option-icon"><i data-lucide="user-round"></i></span><span><b>个人报名</b><small>核对本人资料并建立个人报名记录</small></span><i class="enrollment-option-arrow" data-lucide="chevron-right"></i></a><a class="enrollment-option team" href="08-团队服务.html?source=course&course=${course}"><span class="enrollment-option-icon"><i data-lucide="users-round"></i></span><span><b>团队报名</b><small>按成员池、报名批次和团队订单办理</small></span><i class="enrollment-option-arrow" data-lucide="chevron-right"></i></a></div>`
        });
      }
      if (flow === 'exam-gate') {
        showModal({ title: '暂未进入送考', confirmLabel: '查看我的培训', body: '<div class="notice-strip warning" style="margin:0"><i data-lucide="shield-alert"></i><span>当前培训尚未完成。完成有效学时并经培训机构确认后，由培训机构统一安排送考。</span></div>', onConfirm: () => { window.location.href = '15-我的培训.html'; } });
      }
      if (flow === 'query-certificate') {
        const number = $('#certificateNumber').value.trim();
        const name = $('#certificateName').value.trim();
        if (!number || !name) return showToast('请输入证书编号和持证人姓名');
        $('#certificateResult').hidden = false;
        $('#certificateResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast('证书查验完成（Mock结果）');
      }
      if (flow === 'create-team') {
        showModal({ title: '确认创建团队', body: `团队“${$('#teamName').value || '新建培训团队'}”创建后，可通过邀请链接由成员本人加入并确认。`, confirmLabel: '确认创建', onConfirm: () => {
          Object.values(TEAM_STATE).forEach((key) => setTeamState(key, false));
          window.location.href = '11-团队详情.html';
        }});
      }
      if (flow === 'copy-invite') {
        const text = $('#inviteLink').textContent.trim();
        try { if (navigator.clipboard) await navigator.clipboard.writeText(text); } catch (_) {}
        showToast('邀请链接已复制');
      }
      if (flow === 'reject-invitation') {
        showModal({ title: '确认拒绝邀请？', body: '拒绝后不会被纳入本次团队报名。发起人可重新发送新的邀请。', confirmLabel: '确认拒绝', onConfirm: () => showToast('已拒绝本次团队邀请') });
      }
      if (flow === 'confirm-member') {
        if (!$('#teamAgreement') || !$('#teamAgreement').checked) return showToast('请先确认本人资料与授权声明');
        const proof = $('[data-upload="从业证明"]');
        if (proof && !proof.classList.contains('is-uploaded')) return showToast('请先上传从业或技能证明');
        showModal({ title: '确认加入团队', body: '确认后本人资料和授权结果将回传团队任务，发起人不能代替你修改关键确认信息。', confirmLabel: '确认加入', onConfirm: () => { window.location.href = '11-团队详情.html'; } });
      }
      if (flow === 'submit-team-batch') {
        if (!$('[data-team-ready-checkbox]') || !$('[data-team-ready-checkbox]').checked) return showToast('请先选择可提交成员');
        showModal({ title: '提交本批合格成员', body: '<div class="summary-grid"><div class="summary-item"><small>成员池</small><b>3人</b></div><div class="summary-item"><small>本次提交</small><b>1人</b></div><div class="summary-item"><small>待补材料</small><b>1人</b></div><div class="summary-item"><small>待本人确认</small><b>1人</b></div></div><div class="notice-strip" style="margin:12px 0 0"><i data-lucide="info"></i><span>本次仅提交王强，其他成员继续留在团队任务中。</span></div>', confirmLabel: '确认提交1人', onConfirm: () => {
          setTeamState(TEAM_STATE.submitted, true);
          applyTeamState();
          const tab = $('[data-tab="batches"]');
          if (tab) tab.click();
          showToast('报名批次01已生成');
        }});
      }
      if (flow === 'sync-team-acceptance') {
        showModal({ title: '模拟培训机构受理', body: '受理通过后，平台将为报名批次01生成一张团队报名主订单和28条个人费用明细。', confirmLabel: '确认受理通过', onConfirm: () => {
          setTeamState(TEAM_STATE.accepted, true);
          applyTeamState();
          const tab = $('[data-tab="orders"]');
          if (tab) tab.click();
          showToast('团队订单已生成');
        }});
      }
      if (flow === 'pay-training') {
        const paymentGroup = $('[data-payment-group="personal-training"]');
        const offline = paymentGroup && $('[data-payment-method].is-active', paymentGroup)?.dataset.paymentMethod === 'offline';
        showModal({ title: offline ? '提交报名订单汇款凭证' : '确认报名缴费', body: `<div class="order-amount"><small>${offline ? '本次汇款金额' : '本次支付金额'}</small><strong>¥1,960.00</strong><span>张明的报名订单，包含培训费与考试费</span></div>`, confirmLabel: offline ? '确认提交凭证' : '确认支付', onConfirm: () => {
          const status = $('#trainingOrderStatus'), summary = $('#trainingPaymentOrderSummary'), panel = $('#trainingPaymentPanel'), success = $('#trainingPaymentSuccess');
          if (status) { status.textContent = offline ? '待核款' : '已支付'; status.className = offline ? 'status-chip orange' : 'status-chip green'; }
          if (panel) panel.hidden = true;
          if (summary && !offline) summary.hidden = true;
          if (success) { success.hidden = false; success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          if (offline) {
            if ($('#trainingPaymentSuccessTitle')) $('#trainingPaymentSuccessTitle').textContent = '报名订单汇款凭证已提交';
            if ($('#trainingPaymentSuccessText')) $('#trainingPaymentSuccessText').textContent = '平台核款通过后，报名订单状态将更新为已支付';
            const nextLink = $('#trainingPaymentSuccess a');
            if (nextLink) { nextLink.href = '13-培训报名进度.html'; nextLink.textContent = '查看报名进度'; }
          }
          const sticky = $('.page-sticky-bar');
          if (sticky && !offline) { sticky.hidden = false; sticky.innerHTML = '<div class="sticky-actions"><a class="outline-button" href="20-报名订单详情.html">订单详情</a><a class="primary-button" href="15-我的培训.html">进入我的培训</a></div>'; }
          else hideStickyAction();
          showToast(offline ? '汇款凭证已提交（演示）' : '报名成功（演示）');
        }});
      }
      if (flow === 'submit-exam') {
        const agreement = $('#examAgreement');
        if (!agreement || !agreement.checked) return showToast('请先确认机构送考声明');
        if ($$('[data-upload].is-uploaded').length < 2) return showToast('请先补齐机构送考材料');
        showModal({ title: '确认提交送考进度', body: '提交后将由评价机构独立审核申报资格；审核结论和退回原因将同步到本端。', confirmLabel: '确认提交', onConfirm: () => {
          $('#examSubmitSuccess').hidden = false;
          $('#examSubmitSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
          hideStickyAction();
          showToast('送考进度已提交');
        }});
      }
      if (flow === 'toggle-learning') {
        const progress = $('#learningProgress');
        const percent = $('#learningPercent');
        const status = $('#learningStatus');
        const current = parseInt(progress.style.width, 10) || 44;
        const next = Math.min(current + 8, 100);
        progress.style.width = `${next}%`;
        percent.textContent = `${next}%`;
        status.textContent = next >= 100 ? '本节已完成' : '学习中';
        status.className = next >= 100 ? 'status-chip green' : 'status-chip blue';
        control.innerHTML = `<i data-lucide="${next >= 100 ? 'rotate-ccw' : 'pause'}"></i>`;
        icons();
        showToast(next >= 100 ? '本节学习完成' : '学习进度已自动保存');
      }
      if (flow === 'next-chapter') {
        $('#learningProgress').style.width = '100%';
        $('#learningPercent').textContent = '100%';
        $('#learningStatus').textContent = '本节已完成';
        $('#learningStatus').className = 'status-chip green';
        showToast('进度已保存，下一章节已解锁');
      }
      if (flow === 'checkin') {
        showModal({ title: '现场签到', body: '<div class="form-field"><label>动态签到码</label><input value="1026" inputmode="numeric"></div><div class="notice-strip" style="margin:12px 0 0"><i data-lucide="map-pin-check"></i><span>原型模拟到场核验和培训机构签到确认。</span></div>', confirmLabel: '确认签到', onConfirm: () => {
          $('#checkinStatus').textContent = '已签到';
          $('#checkinStatus').className = 'status-chip green';
          $('#checkinButton').textContent = '签到成功 08:46';
          $('#checkinButton').disabled = true;
          $('#attendanceCount').textContent = '2次';
          showToast('现场签到成功');
        }});
      }
      if (flow === 'score-review') {
        showModal({ title: '申请成绩复核', body: '<div class="form-field"><label>复核说明 <em>*</em></label><textarea id="reviewReason" placeholder="请说明需要复核的科目和原因">申请核对实操成绩记录及成绩汇总过程。</textarea></div><div class="notice-strip warning" style="margin:12px 0 0"><i data-lucide="info"></i><span>成绩复核是核对评分记录和汇总过程，不等同于重新评分。</span></div>', confirmLabel: '提交申请', onConfirm: () => {
          $('#reviewSubmitted').hidden = false;
          $('#reviewSubmitted').scrollIntoView({ behavior: 'smooth', block: 'center' });
          showToast('成绩复核申请已提交');
        }});
      }
    }));
  }

  function setupLinksAndToasts() {
    $$('[data-link]').forEach((element) => element.addEventListener('click', () => { window.location.href = element.dataset.link; }));
    $$('[data-toast]').forEach((element) => element.addEventListener('click', () => showToast(element.dataset.toast)));
  }

  const ORDER_DEMOS = [
    {id:'REG2026081300128', type:'personal', typeText:'个人报名', course:'建筑信息模型技术员实务班', batch:'建筑信息模型技术员实务班第3班', org:'某某培训机构', date:'2026-10-12 至 2026-11-15', method:'线上 + 线下', student:'张明', registration:'HBIC-2026-000128', created:'2026-08-13 16:25', status:'paid', statusText:'已支付', note:'2026-08-13 16:36', amount:1960, training:'待开班'},
    {id:'REG2026081800245', type:'personal', typeText:'个人报名', course:'智能装备操作员线下实训班', batch:'智能装备操作员线下实训班第2班', org:'某某培训机构', date:'2026-10-12 至 2026-11-15', method:'线下实训', student:'李明', registration:'HBIC-2026-000245', created:'2026-08-18 14:32', status:'pending', statusText:'待支付', note:'请于30分钟内完成支付', amount:1960, training:'待开班'},
    {id:'REG-TEAM-20260813001', type:'team', typeText:'团体报名', course:'建筑信息模型技术员实务班', batch:'建筑信息模型技术员实务班第3班', org:'某某培训机构', date:'2026-10-12 至 2026-11-15', method:'线上 + 线下', team:'湖北智创建筑工程有限公司', leader:'李明', count:12, registration:'HBIC-2026-000201', created:'2026-08-13 10:25', status:'paid', statusText:'已支付', note:'2026-08-13 16:36', amount:23520, training:'待开班'},
    {id:'REG2026081600168', type:'personal', typeText:'个人报名', course:'BIM技术员基础培训班', batch:'BIM技术员基础培训班第1班', org:'湖北智能建造培训中心', date:'2026-09-20 至 2026-10-18', method:'在线学习', student:'张明', registration:'HBIC-2026-000168', created:'2026-08-16 09:18', status:'review', statusText:'待核款', note:'等待确认到账', amount:1680, training:'未生效'},
    {id:'REG2026081400218', type:'personal', typeText:'个人报名', course:'建筑机器人操作员培训班', batch:'建筑机器人操作员培训班第1班', org:'某某培训机构', date:'2026-09-08 至 2026-10-10', method:'线下实训', student:'李明', registration:'HBIC-2026-000218', created:'2026-08-14 11:08', status:'refunding', statusText:'退款中', note:'等待退款审核', amount:2180, training:'已暂停'},
    {id:'REG2026081200158', type:'personal', typeText:'个人报名', course:'智能建造施工员培训班', batch:'智能建造施工员培训班第2班', org:'湖北智能建造培训中心', date:'2026-08-20 至 2026-09-26', method:'线上 + 线下', student:'张明', registration:'HBIC-2026-000158', created:'2026-08-12 16:20', status:'refunded', statusText:'已退款', note:'2026-08-15 10:32', amount:1580, training:'已终止'},
    {id:'REG2026081000128', type:'personal', typeText:'个人报名', course:'装配式建筑施工培训班', batch:'装配式建筑施工培训班第1班', org:'某某培训机构', date:'2026-08-28 至 2026-09-22', method:'混合培训', student:'李明', registration:'HBIC-2026-000128', created:'2026-08-10 10:05', status:'closed', statusText:'已关闭', note:'超时未支付', amount:1280, training:'未生效'}
  ];
  const orderMoney = value => `¥${value.toLocaleString('zh-CN')}`;
  const orderStatusClass = status => status === 'paid' ? 'green' : status === 'refunded' ? 'blue' : status === 'closed' ? 'gray' : 'orange';
  const orderAmountName = status => status === 'paid' ? '实付金额' : status === 'refunded' || status === 'refunding' ? '退款金额' : '应付金额';
  const currentOrder = () => ORDER_DEMOS.find(order => order.id === new URLSearchParams(location.search).get('order')) || ORDER_DEMOS[0];

  function setupOrderList() {
    if (pageId !== 'H25') return;
    const root = $('#h5-order-list-root'); if (!root) return;
    let tab = 'all'; let type = 'all'; let keyword = '';
    const renderOrders = () => {
      const list = ORDER_DEMOS.filter(o => (tab === 'all' || (tab === 'after' ? ['refunding','refunded'].includes(o.status) : o.status === tab)) && (type === 'all' || o.type === type) && (!keyword || `${o.course} ${o.id}`.toLowerCase().includes(keyword.toLowerCase())));
      const actions = o => { const detail = `20-报名订单详情.html?order=${encodeURIComponent(o.id)}`; if (o.status === 'pending') return `<button class="outline-small-button" type="button" data-toast="订单已取消（原型模拟）">取消订单</button><a class="small-button" href="14-报名订单.html">立即支付</a>`; if (o.status === 'review') return `<a class="outline-small-button" href="${detail}">付款信息</a><a class="small-button" href="${detail}">订单详情</a>`; if (o.status === 'paid') return `<a class="outline-small-button" href="${detail}">订单详情</a><a class="small-button" href="15-我的培训.html">进入我的培训</a>`; if (o.status === 'refunding') return `<a class="small-button" href="${detail}">退款详情</a>`; if (o.status === 'closed') return `<a class="outline-small-button" href="${detail}">订单详情</a><a class="small-button" href="02-培训课程.html">重新报名</a>`; return `<a class="small-button" href="${detail}">订单详情</a>`; };
      root.innerHTML = `<div class="filter-tabs order-filter-tabs h5-order-tabs">${[['all','全部'],['pending','待支付'],['review','待核款'],['paid','已支付'],['after','退款']].map(([key,label])=>`<button class="${tab===key?'is-active':''}" type="button" data-new-order-tab="${key}">${label}</button>`).join('')}</div><div class="h5-order-search"><label><i data-lucide="search"></i><input id="h5-order-keyword" placeholder="搜索课程名称 / 订单编号" value="${keyword}"></label><button type="button" id="h5-order-filter"><i data-lucide="sliders-horizontal"></i>筛选</button></div><section class="order-list h5-order-list">${list.map(o=>`<article class="order-list-card h5-order-card" data-h5-order="${o.id}"><div class="order-list-head"><div><small>${o.typeText}</small><h2>${o.course}</h2></div><em class="status-chip ${orderStatusClass(o.status)}">${o.statusText}</em></div><div class="h5-order-meta"><p>${o.org}</p><p>${o.date}</p><div><span>${o.type==='team'?'报名团队':'学员'}：</span><b>${o.type==='team'?o.team:o.student}</b></div>${o.type==='team'?`<div><span>报名人数：</span><b>${o.count}人</b></div>`:''}<div><span>订单编号：</span><b>${o.id}</b></div></div><div class="h5-order-bottom"><div><small>${orderAmountName(o.status)}</small><strong>${orderMoney(o.amount)}</strong></div><div class="h5-order-actions">${actions(o)}</div></div></article>`).join('') || '<section class="mobile-card empty-state"><span><i data-lucide="receipt-text"></i></span><h2>暂无对应订单</h2><p>请切换状态或调整筛选条件。</p></section>'}</section>`;
      $$('[data-new-order-tab]', root).forEach(button=>button.addEventListener('click',()=>{tab=button.dataset.newOrderTab;renderOrders()})); $('#h5-order-keyword',root)?.addEventListener('input',event=>{keyword=event.target.value;renderOrders()}); $('#h5-order-filter',root)?.addEventListener('click',()=>showModal({title:'筛选订单', body:`<div class="filter-choice"><b>报名类型</b><div><button data-h5-filter-type="all" class="${type==='all'?'is-active':''}">全部</button><button data-h5-filter-type="personal" class="${type==='personal'?'is-active':''}">个人报名</button><button data-h5-filter-type="team" class="${type==='team'?'is-active':''}">团体报名</button></div></div><div class="filter-choice"><b>下单时间</b><div><button class="is-active">近3个月</button><button>近6个月</button><button>自定义</button></div></div><div class="filter-choice"><b>培训机构</b><div><button class="is-active">全部机构</button><button>某某培训机构</button></div></div>`, confirmLabel:'确定', cancelLabel:'重置', onConfirm:()=>{renderOrders()}})); $$('[data-h5-filter-type]').forEach(button=>button.addEventListener('click',()=>{type=button.dataset.h5FilterType;$$('[data-h5-filter-type]').forEach(item=>item.classList.toggle('is-active',item===button))})); $$('[data-h5-order]',root).forEach(card=>card.addEventListener('click',event=>{if(event.target.closest('a,button,input'))return;location.href=`20-报名订单详情.html?order=${encodeURIComponent(card.dataset.h5Order)}`})); icons();
    }; renderOrders();
  }

  function setupUnifiedOrderDetail() {
    if (pageId !== 'H20') return;
    const o = currentOrder(); const root = $('#h5-order-detail-root'); if (!root) return;
    const paid = o.status === 'paid'; const team = o.type === 'team'; const payment = paid ? `<div><span>支付状态</span><b>已支付</b></div><div><span>支付方式</span><b>在线支付</b></div><div><span>支付渠道</span><b>微信支付</b></div><div><span>支付时间</span><b>2026-08-13 16:36</b></div><div><span>支付流水号</span><b>PAY202608130088</b></div><div><span>收款方</span><b>某某培训机构</b></div>` : `<div><span>支付状态</span><b>${o.statusText}</b></div><div><span>收款方</span><b>某某培训机构</b></div>`;
    const log = paid ? `<li class="is-complete"><b>支付成功</b><time>2026-08-13 16:36</time><small>在线支付 ${orderMoney(o.amount)}。</small></li><li class="is-complete"><b>提交报名订单</b><time>${o.created}</time><small>订单创建成功。</small></li>` : o.status==='refunded' ? `<li class="is-complete"><b>退款完成</b><time>2026-08-15 10:32</time><small>退款 ${orderMoney(o.amount)} 已原路退回。</small></li><li class="is-complete"><b>提交退款申请</b><time>2026-08-14 11:20</time><small>退款申请已受理。</small></li>` : `<li class="is-current"><b>${o.status==='closed'?'订单已关闭':o.status==='refunding'?'提交退款申请':'提交报名订单'}</b><time>${o.created}</time><small>${o.note}</small></li>`;
    root.innerHTML = `<section class="mobile-card h5-detail-status"><div class="card-title-row"><div><h2>${o.statusText}</h2><p>${paid?'订单已支付，报名已生效。':o.note}</p></div><em class="status-chip ${orderStatusClass(o.status)}">${o.typeText}</em></div><div class="h5-detail-amount"><small>${orderAmountName(o.status)}</small><strong>${orderMoney(o.amount)}</strong></div><div class="h5-detail-number"><span>订单编号</span><b>${o.id}</b><button type="button" data-toast="订单编号已复制">复制</button></div><div class="h5-detail-number"><span>平台报名编号</span><b>${o.registration}</b><button type="button" data-toast="平台报名编号已复制">复制</button></div></section><section class="mobile-card"><h2>报名信息</h2><div class="h5-field-list"><div><span>培训课程</span><b>${o.course}</b></div><div><span>培训班次</span><b>${o.batch}</b></div><div><span>培训机构</span><b>${o.org}</b></div><div><span>培训时间</span><b>${o.date}</b></div><div><span>培训方式</span><b>${o.method}</b></div><div><span>报名方式</span><b>${o.typeText}</b></div><div><span>报名时间</span><b>${o.created}</b></div></div></section><section class="mobile-card"><div class="card-title-row"><h2>培训进度</h2><em class="status-chip blue">${o.training}</em></div><div class="h5-progress-flow"><div class="done">报名成功</div><div class="current">${o.training}</div><div>培训中</div><div>培训完成</div><div>待送考</div></div><p class="muted">${paid?'培训将于2026-10-12开始。':'订单生效后将进入培训安排。'}</p>${paid?'<a class="text-button" href="03-课程详情.html?course=bim#courseSchedule">查看培训计划<i data-lucide="chevron-right"></i></a>':''}</section><section class="mobile-card"><h2>${team?'团体报名信息':'学员信息'}</h2><div class="h5-field-list">${team?`<div><span>报名团队</span><b>${o.team}</b></div><div><span>团体负责人</span><b>${o.leader}</b></div><div><span>联系电话</span><b>138****8888</b></div><div><span>报名人数</span><b>${o.count}人</b></div><div><span>缴费单位</span><b>${o.team}</b></div>`:`<div><span>学员</span><b>${o.student}</b></div><div><span>手机号</span><b>138****8888</b></div><div><span>证件类型</span><b>居民身份证</b></div><div><span>证件号码</span><b>4201********1234</b></div>`}</div>${team?`<div class="h5-member-title">报名成员</div>${['张明','王强','陈敏','赵敏','吴刚'].map(name=>`<div class="h5-member-row"><b>${name}</b><span>138****8888</span><em>待开班</em></div>`).join('')}`:''}</section><section class="mobile-card"><h2>费用明细</h2><div class="payment-detail-list"><div><span>培训费</span><strong>${orderMoney(Math.round(o.amount*.65))}</strong></div><div><span>考试费</span><strong>${orderMoney(o.amount-Math.round(o.amount*.65))}</strong></div><div><span>优惠金额</span><strong>-¥0</strong></div><div class="payment-detail-total"><span>${orderAmountName(o.status)}</span><strong>${orderMoney(o.amount)}</strong></div></div></section><section class="mobile-card"><h2>支付信息</h2><div class="h5-field-list">${payment}</div></section><section class="mobile-card"><h2>订单记录</h2><ul class="timeline">${log}</ul></section>`;
    const sticky=$('.page-sticky-bar'); if(sticky) sticky.innerHTML=o.status==='pending'?`<div class="sticky-actions"><a class="outline-button" href="25-我的订单.html">取消订单</a><a class="primary-button" href="14-报名订单.html">立即支付</a></div>`:paid?`<div class="sticky-actions"><a class="outline-button" href="25-我的订单.html">订单列表</a><a class="primary-button" href="15-我的培训.html">进入我的培训</a></div>`:o.status==='closed'?`<div class="sticky-actions"><a class="outline-button" href="25-我的订单.html">返回订单</a><a class="primary-button" href="02-培训课程.html">重新报名</a></div>`:`<div class="sticky-actions"><a class="primary-button" href="25-我的订单.html">返回我的订单</a></div>`;
    icons();
  }

  render();
  setupUnifiedOrderDetail();
  setupOrderList();
  applyCourseDetailData();
  applyTrainingDetailData();
  setupLinksAndToasts();
  setupTabs();
  setupCourseLinks();
  setupTrainingLinks();
  setupScrollTargets();
  setupFilters();
  setupUploads();
  setupPaymentMethods();
  setupFlows();
  applyTeamState();
})();
