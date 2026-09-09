(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const pageId = document.body.dataset.page;
  const definition = window.H5_PAGES && window.H5_PAGES[pageId];
  const root = $('#pageRoot');
  const TEAM_STATE = {
    submitted: 'H5_TEAM_REGISTRATION_SUBMITTED',
    accepted: 'H5_TEAM_REGISTRATION_ACCEPTED',
    paid: 'H5_TEAM_ORDER_PAID',
    paymentPending: 'H5_TEAM_ORDER_PAYMENT_PENDING'
  };
  const courseAdvancedState = { domain: 'all', occupation: 'all', mode: 'all', status: 'all', sort: 'recommended' };
  let toastTimer;

  const navItems = [
    ['home', '../首页.html', 'home', '首页'],
    ['courses', '02-培训课程.html', 'book-open', '课程'],
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
    const params = new URLSearchParams(window.location.search);
    let backHref = definition.back || '../首页.html';
    if (pageId === 'H07' && params.get('from') === 'registration') backHref = `12-个人培训报名.html?course=${encodeURIComponent(params.get('course') || 'bim')}`;
    if (pageId === 'H11' && params.get('from') === 'my') backHref = '06-我的.html';
    if (pageId === 'H29' && params.get('from') === 'registration') backHref = `07-个人资料与材料.html?from=registration&course=${encodeURIComponent(params.get('course') || 'bim')}`;
    if (pageId === 'H24') backHref = `03-课程详情.html?course=${encodeURIComponent(params.get('course') || 'bim')}`;
    if (pageId === 'H23' && params.get('from') === 'score') backHref = '22-成绩与复核.html';
    if (pageId === 'H23' && params.get('from') === 'verify') backHref = '05-证书查验.html';
    if (pageId === 'H14' && params.get('from') === 'orders') backHref = '25-我的订单.html';
    if (pageId === 'H14' && params.get('from') === 'detail') backHref = `20-报名订单详情.html?order=${encodeURIComponent(params.get('order') || '')}`;
    if (pageId === 'H14' && (params.get('order') || '').startsWith('REG-TEAM-')) backHref = '11-团队详情.html';
    if (pageId === 'H20' && params.get('from') === 'team') backHref = '11-团队详情.html';
    root.innerHTML = `
      <div class="prototype-shell">
        <header class="app-bar sub-app-bar">
          <a class="icon-button" href="${backHref}" aria-label="返回"><i data-lucide="arrow-left"></i></a>
          <h1>${definition.title}</h1>
          <button class="icon-button" type="button" data-toast="${definition.help || '当前页面为高保真原型演示'}" aria-label="页面说明"><i data-lucide="circle-help"></i></button>
        </header>
        <main class="page-main ${definition.sticky ? 'has-sticky-action' : ''} ${definition.nav ? 'has-bottom-nav' : ''}">${definition.body}</main>
        ${definition.sticky ? `<footer class="page-sticky-bar">${definition.sticky}</footer>` : ''}
        ${navMarkup(definition.nav)}
      </div>`;
    icons();
    if (pageId === 'H07' && params.get('from') === 'registration') {
      const profileEditHref = `07-个人资料编辑.html?from=registration&course=${encodeURIComponent(params.get('course') || 'bim')}`;
      $$('[data-profile-edit-link]').forEach((link) => { link.href = profileEditHref; });
    }
  }

  function setupGenericSearch() {
    $$('[data-search-input]').forEach((input) => {
      const key = input.dataset.searchInput;
      const list = $(`[data-search-list="${key}"]`);
      if (!list) return;
      input.addEventListener('input', () => {
        const keyword = input.value.trim().toLowerCase();
        $$('[data-search-card]', list).forEach((card) => {
          card.hidden = keyword && !card.textContent.toLowerCase().includes(keyword);
        });
      });
    });
  }

  function setupEvaluationProject() {
    if (pageId !== 'H27') return;
    if (new URLSearchParams(window.location.search).get('project') !== 'assembly') return;
    const values = {
      evaluationProjectTitle: '装配式建筑施工员职业技能评价',
      evaluationProjectOrg: '湖北智能建造职业技能评价中心',
      evaluationProjectIntro: '评价装配式构件识读、安装准备、现场施工与质量检查等岗位技能，考试结论由评价机构确认。',
      evaluationProjectOccupation: '装配式建筑施工员',
      evaluationProjectFee: '¥760／人',
      evaluationProjectDate: '2026-12-12'
    };
    Object.entries(values).forEach(([id, value]) => { if ($(`#${id}`)) $(`#${id}`).textContent = value; });
  }

  function setupScoreReviewAvailability() {
    if (pageId !== 'H22') return;
    const available = new URLSearchParams(window.location.search).get('review') === 'available';
    if ($('#scoreReviewWindow')) $('#scoreReviewWindow').hidden = !available;
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
    const providerLink = $('#courseProviderLink');
    if (providerLink) providerLink.href = `24-培训机构详情.html?course=${encodeURIComponent(key)}`;
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
          ['map-pinned', '线下实训', '1/2课次', '10月19日出勤记录有效，下次10月26日', '培训机构', '进行中', 'orange']
        ],
        tasks: `<a class="task-entry" href="17-在线学习.html"><span class="task-icon"><i data-lucide="monitor-play"></i></span><span><b>在线课程学习</b><small>已完成28/40学时 · 5个章节</small></span><em class="status-chip blue">继续学习</em><i data-lucide="chevron-right"></i></a><a class="task-entry" href="18-线下日程签到.html"><span class="task-icon"><i data-lucide="map-pinned"></i></span><span><b>线下实训与签到</b><small>已出勤1/2课次 · 下次10月26日</small></span><em class="status-chip orange">待签到</em><i data-lucide="chevron-right"></i></a>`, taskCount: '2类任务',
        completion: [['完成至少40学时在线学习', '28/40', 'orange', 'circle-check'], ['完成2次线下实训', '1/2', 'orange', 'circle-check'], ['结业测验达到60分', '78分', 'green', 'circle-check'], ['培训机构完成结业确认', '待确认', '', 'clock-3']],
        period: '10-12 至 11-02', mode: '线上＋线下', org: '武汉绿色建造职业培训中心（模拟）', confirmation: '待培训机构确认',
        action: '<a class="primary-button" href="17-在线学习.html">继续培训</a>'
      },
      pending: {
        title: '智能装备操作员线下实训班', percent: 0, summary: '培训任务待开通<br>计划开班：2026-09-28', source: '湖北智创建筑工程有限公司培训队 · 团队报名', registration: 'HBIC-2026-000245', state: '待开班',
        notice: '本记录来源于团队报名，但培训过程仍归属于李明本人；团队发起人不能代替学习、签到或完成测验。', noticeClass: 'warning',
        overview: [['有效学时', '0', '/48'], ['必修内容', '0', '/8'], ['实操任务', '0', '/4'], ['线下签到', '0', '/6']],
        process: [
          ['badge-check', '报名受理', '已通过', '团队报名已由培训机构受理', '平台／培训机构', '已完成', 'green'],
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
    if (key === 'ongoing' && teamState('H5_OFFLINE_ATTENDANCE_COMPLETED')) {
      record.overview[3] = ['线下签到', '2', '/2'];
      record.process[1] = ['map-pinned', '线下实训', '2/2课次', '10月19日、10月26日出勤记录均有效', '培训机构', '已完成', 'green'];
      record.tasks = `<a class="task-entry" href="17-在线学习.html"><span class="task-icon"><i data-lucide="monitor-play"></i></span><span><b>在线课程学习</b><small>已完成28/40学时 · 5个章节</small></span><em class="status-chip blue">继续学习</em><i data-lucide="chevron-right"></i></a><a class="task-entry" href="18-线下日程签到.html"><span class="task-icon"><i data-lucide="map-pinned"></i></span><span><b>线下实训与签到</b><small>已出勤2/2课次 · 考勤已同步</small></span><em class="status-chip green">已完成</em><i data-lucide="chevron-right"></i></a>`;
      record.completion[1] = ['完成2次线下实训', '2/2', 'green', 'circle-check'];
    }
    $('#trainingDetailTitle').textContent = record.title;
    $('#trainingProgressPercent').textContent = `${record.percent}%`;
    $('#trainingProgressRing').style.background = `conic-gradient(var(--brand) ${record.percent}%, #e7edf6 0)`;
    $('#trainingDetailSummary').innerHTML = record.summary;
    $('#trainingDetailSource').textContent = record.source;
    $('#trainingRegistrationNumber').textContent = record.registration;
    if ($('#trainingOverviewStatus')) $('#trainingOverviewStatus').textContent = record.state;
    if ($('#trainingDetailNotice')) {
      $('#trainingDetailNotice').className = `notice-strip ${record.noticeClass}`.trim();
      $('#trainingDetailNotice span').textContent = record.notice;
    }
    if ($('#trainingOverviewGrid')) $('#trainingOverviewGrid').innerHTML = record.overview.map(([label, value, unit]) => `<div><small>${label}</small><strong>${value}<em>${unit}</em></strong></div>`).join('');
    if ($('#trainingProcessCount')) $('#trainingProcessCount').textContent = `${record.process.length}项`;
    $('#trainingProcessRecords').innerHTML = record.process.map(([icon, type, value, detail, owner, state, tone]) => `<article><span class="training-process-icon"><i data-lucide="${icon}"></i></span><div><b>${type} · ${value}</b><small>${detail}</small><em>确认主体：${owner}</em></div><strong class="status-chip ${tone}">${state}</strong></article>`).join('');
    $('#trainingTaskCount').textContent = record.taskCount;
    $('#trainingTaskList').innerHTML = record.tasks;
    if ($('#trainingCompletionList')) $('#trainingCompletionList').innerHTML = record.completion.map(([label, value, tone, icon]) => `<div class="eligibility-row"><i data-lucide="${icon}"${tone ? '' : ' style="color:var(--muted)"'}></i><b>${label}</b><em class="status-chip ${tone}">${value}</em></div>`).join('');
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
          const domainMatch = listName !== 'courses' || courseAdvancedState.domain === 'all' || card.dataset.domain === courseAdvancedState.domain;
          const occupationMatch = listName !== 'courses' || courseAdvancedState.occupation === 'all' || card.dataset.occupation === courseAdvancedState.occupation;
          const modeMatch = listName !== 'courses' || courseAdvancedState.mode === 'all' || card.dataset.mode === courseAdvancedState.mode;
          const statusMatch = listName !== 'courses' || courseAdvancedState.status === 'all' || card.dataset.status === courseAdvancedState.status;
          const textMatch = !keyword || (card.dataset.searchText || card.textContent).toLowerCase().includes(keyword.toLowerCase());
          card.hidden = !(categoryMatch && domainMatch && occupationMatch && modeMatch && statusMatch && textMatch);
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

  function setupCourseAdvancedFilter() {
    if (pageId !== 'H02') return;
    const cards = $$('[data-filter-list="courses"] [data-filter-card]');
    const metadata = [
      ['digital', 'bim', 'online', 'open', 1280, '2026-10-12'],
      ['construction', 'equipment', 'offline', 'closing', 880, '2026-09-28'],
      ['construction', 'assembly', 'mixed', 'open', 980, '2026-09-15'],
      ['operation', 'operation', 'mixed', 'open', 1260, '2026-10-18']
    ];
    cards.forEach((card, index) => {
      const item = metadata[index] || metadata[0];
      [card.dataset.domain, card.dataset.occupation, card.dataset.mode, card.dataset.status, card.dataset.price, card.dataset.date] = item.map(String);
    });
    const button = $('[data-course-advanced-filter]');
    if (!button) return;
    button.addEventListener('click', () => {
      const choices = (name, items) => `<div class="filter-choice"><b>${name}</b><div>${items.map(([value, label]) => `<button type="button" data-course-filter-value="${value}" data-course-filter-key="${name}" class="${courseAdvancedState[name] === value ? 'is-active' : ''}">${label}</button>`).join('')}</div></div>`;
      showModal({
        title: '筛选培训课程',
        cancelLabel: '重置',
        confirmLabel: '查看结果',
        body: choices('domain', [['all','全部领域'],['digital','数字设计'],['construction','智能施工'],['operation','智慧运维']]).replace('<b>domain</b>','<b>培训领域</b>') + choices('occupation', [['all','全部工种'],['bim','建筑信息模型技术员'],['equipment','智能装备操作员'],['assembly','装配式建筑施工员'],['operation','建筑设备智慧运维员']]).replace('<b>occupation</b>','<b>工种</b>') + choices('mode', [['all','全部方式'],['online','线上培训'],['offline','线下培训'],['mixed','混合培训']]).replace('<b>mode</b>','<b>培训方式</b>') + choices('status', [['all','全部状态'],['open','报名中'],['closing','即将截止']]).replace('<b>status</b>','<b>报名状态</b>') + choices('sort', [['recommended','综合排序'],['date','开班时间'],['price','费用排序']]).replace('<b>sort</b>','<b>排序方式</b>'),
        onConfirm: () => {
          const list = $('[data-filter-list="courses"]');
          const sorted = [...cards].sort((a, b) => courseAdvancedState.sort === 'date' ? a.dataset.date.localeCompare(b.dataset.date) : courseAdvancedState.sort === 'price' ? Number(a.dataset.price) - Number(b.dataset.price) : cards.indexOf(a) - cards.indexOf(b));
          sorted.forEach(card => list.appendChild(card));
          const active = $('[data-filter-group="courses"] [data-filter].is-active');
          if (active) active.click();
        }
      });
      $$('[data-course-filter-value]').forEach(choice => choice.addEventListener('click', () => {
        const key = choice.dataset.courseFilterKey;
        courseAdvancedState[key] = choice.dataset.courseFilterValue;
        $$(`[data-course-filter-key="${key}"]`).forEach(item => item.classList.toggle('is-active', item === choice));
      }));
      const cancel = $('[data-modal-cancel]');
      if (cancel) cancel.onclick = () => {
        Object.assign(courseAdvancedState, { domain: 'all', occupation: 'all', mode: 'all', status: 'all', sort: 'recommended' });
        const active = $('[data-filter-group="courses"] [data-filter].is-active');
        if (active) active.click();
      };
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
        if (group.dataset.paymentGroup === 'order-payment' && $('#unifiedPayButton')) $('#unifiedPayButton').textContent = offlineSelected ? '提交汇款凭证' : `确认支付 ${orderMoney(currentOrder().amount)}`;
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
      if ($('#teamAcceptanceCard')) $('#teamAcceptanceCard').hidden = !submitted;
      if ($('#teamOrderCard')) $('#teamOrderCard').hidden = !accepted;
      const submitButton = $('#teamSubmitButton');
      if (submitButton) submitButton.hidden = submitted;
      if ($('#addTeamMemberButton')) $('#addTeamMemberButton').hidden = submitted;
      if ($('#teamMemberCard')) $('#teamMemberCard').classList.toggle('is-submitted', submitted);
      if ($('#teamRegistrationStatus')) $('#teamRegistrationStatus').textContent = submitted ? (accepted ? '团队报名 · 已受理' : '团队报名 · 待机构受理') : '团队报名 · 待提交';
      const stage = accepted ? 3 : (submitted ? 2 : 1);
      $$('.team-registration-flow > div').forEach((step, index) => {
        step.classList.toggle('is-complete', index < stage);
        step.classList.toggle('is-current', index === stage);
      });
      if ($('#teamAcceptanceStatus')) {
        $('#teamAcceptanceStatus').textContent = accepted ? '机构已受理' : '待机构受理';
        $('#teamAcceptanceStatus').className = accepted ? 'status-chip green' : 'status-chip orange';
      }
      if ($('#teamSyncAcceptanceButton')) {
        $('#teamSyncAcceptanceButton').hidden = accepted;
      }
      if ($('#teamOrderStatus')) {
        $('#teamOrderStatus').textContent = paid ? '已支付' : (paymentPending ? '待核款' : '待支付');
        $('#teamOrderStatus').className = paid ? 'status-chip green' : 'status-chip orange';
      }
      if ($('#teamPaidAmount')) $('#teamPaidAmount').hidden = !paid;
      if ($('#teamPayButton')) $('#teamPayButton').hidden = paid;
    }

  }

  function teamMemberForm(member = {}) {
    return `<div class="team-member-form"><h3>基本信息</h3><div class="form-stack"><div class="form-field"><label>成员姓名 <em>*</em></label><input id="modalMemberName" value="${member.name || '刘洋'}" placeholder="请输入成员姓名"></div><div class="form-field"><label>手机号 <em>*</em></label><input id="modalMemberPhone" value="${member.phone || '137****5186'}" placeholder="请输入手机号"></div><div class="form-field"><label>身份证号 <em>*</em></label><input id="modalMemberId" value="${member.id || '4201********3086'}" placeholder="请输入身份证号"></div></div><h3>报名材料</h3><div class="team-upload-grid"><button class="upload-tile" type="button" data-modal-upload><span><i data-lucide="cloud-upload"></i></span><span><b>身份证人像面</b><small>上传清晰图片</small></span><em>上传</em></button><button class="upload-tile" type="button" data-modal-upload><span><i data-lucide="cloud-upload"></i></span><span><b>身份证国徽面</b><small>上传清晰图片</small></span><em>上传</em></button></div><button class="upload-tile" type="button" data-modal-upload><span><i data-lucide="cloud-upload"></i></span><span><b>学历或从业证明</b><small>符合当前培训班次报名要求</small></span><em>上传</em></button></div>`;
  }

  function bindModalUploads() {
    $$('[data-modal-upload]', $('#prototypeModal')).forEach((button) => button.addEventListener('click', () => {
      button.classList.add('is-uploaded');
      const label = $('em', button);
      if (label) label.textContent = '已上传';
      showToast('材料已上传（演示）');
    }));
  }

  function updateTeamMemberSummary() {
    const count = $$('.team-member', $('#teamMemberList')).length;
    if ($('#teamMemberCount')) $('#teamMemberCount').textContent = `${count}人`;
  }

  function setupTeamMembers() {
    if (pageId !== 'H11') return;
    const list = $('#teamMemberList');
    if (!list) return;
    list.addEventListener('click', (event) => {
      const button = event.target.closest('[data-member-action]');
      const row = event.target.closest('.team-member');
      if (!button || !row) return;
      const member = { name: row.dataset.memberName, phone: row.dataset.memberPhone, id: row.dataset.memberId };
      if (button.dataset.memberAction === 'view') {
        showModal({ title: '查看成员资料', body: `<div class="h5-field-list"><div><span>成员姓名</span><b>${member.name}</b></div><div><span>手机号</span><b>${member.phone}</b></div><div><span>身份证号</span><b>${member.id}</b></div></div><div class="modal-material-preview"><h3>报名材料</h3><div class="modal-material-preview-grid"><figure><img src="../assets/images/id-card-front-preview.svg" alt="身份证人像面预览"><figcaption>身份证人像面</figcaption></figure><figure><img src="../assets/images/id-card-back-preview.svg" alt="身份证国徽面预览"><figcaption>身份证国徽面</figcaption></figure><figure><img src="../assets/images/work-proof-preview.svg" alt="学历或从业证明预览"><figcaption>学历或从业证明</figcaption></figure></div></div>`, hideConfirm: true });
      }
      if (button.dataset.memberAction === 'edit' && !teamState(TEAM_STATE.submitted)) {
        showModal({ title: '编辑团队成员', body: teamMemberForm(member), confirmLabel: '保存成员', onConfirm: () => {
          const name = $('#modalMemberName').value.trim();
          const phone = $('#modalMemberPhone').value.trim();
          const id = $('#modalMemberId').value.trim();
          row.dataset.memberName = name; row.dataset.memberPhone = phone; row.dataset.memberId = id;
          $('.member-avatar', row).textContent = name.slice(-2);
          $('b', row).textContent = name;
          $('small', row).textContent = `${phone} · ${id}`;
          showToast('成员资料已保存');
        }});
        bindModalUploads();
      }
      if (button.dataset.memberAction === 'remove' && !teamState(TEAM_STATE.submitted)) {
        showModal({ title: '移除报名成员', body: `确认将“${member.name}”移出本次团队报名？`, confirmLabel: '确认移除', onConfirm: () => { row.remove(); updateTeamMemberSummary(); showToast('成员已移除'); } });
      }
    });
    updateTeamMemberSummary();
  }

  function hideStickyAction() {
    const sticky = $('.page-sticky-bar');
    if (sticky) sticky.hidden = true;
  }

  function applyMyIdentity() {
    if (pageId !== 'H06') return;
    const grid = $('#myServiceGrid');
    const button = $('#identitySwitchButton');
    const role = $('#identityRole');
    if (!grid) return;
    let team = false;
    try { team = window.localStorage.getItem('H5_MY_IDENTITY') === 'team'; } catch (_) {}
    const items = team
      ? [['receipt-text', '我的订单', '25-我的订单.html', '3'], ['users', '团队报名', '11-团队详情.html?from=my', '1']]
      : [['receipt-text', '我的订单', '25-我的订单.html', '3'], ['id-card', '个人资料', '07-个人资料与材料.html', ''], ['award', '我的证书', '26-我的证书.html', '1']];
    grid.classList.toggle('is-team', team);
    grid.innerHTML = items.map(([icon, label, href, count]) => `<a class="menu-item" href="${href}"><span><i data-lucide="${icon}"></i></span><b>${label}</b>${count ? `<em>${count}</em>` : ''}</a>`).join('');
    if (role) role.textContent = team ? '团队负责人' : '个人';
    if (button) button.textContent = team ? '切换为个人' : '切换为团队负责人';
    icons();
  }

  function setupFlows() {
    $$('[data-flow]').forEach((control) => control.addEventListener('click', async () => {
      const flow = control.dataset.flow;
      if (flow === 'choose-enrollment') {
        const course = new URLSearchParams(window.location.search).get('course') || 'bim';
        showModal({
          title: '选择报名方式', hideConfirm: true,
          body: `<div class="enrollment-options"><a class="enrollment-option personal" href="12-个人培训报名.html?course=${course}"><span class="enrollment-option-icon"><i data-lucide="user-round"></i></span><span><b>个人报名</b><small>核对本人资料并建立个人报名记录</small></span><i class="enrollment-option-arrow" data-lucide="chevron-right"></i></a><a class="enrollment-option team" href="08-团队服务.html?source=course&course=${course}"><span class="enrollment-option-icon"><i data-lucide="users-round"></i></span><span><b>团队报名</b><small>填写团队资料、添加成员并整团提交</small></span><i class="enrollment-option-arrow" data-lucide="chevron-right"></i></a></div>`
        });
      }
      if (flow === 'switch-identity') {
        let team = false;
        try { team = window.localStorage.getItem('H5_MY_IDENTITY') === 'team'; } catch (_) {}
        try { window.localStorage.setItem('H5_MY_IDENTITY', team ? 'personal' : 'team'); } catch (_) {}
        applyMyIdentity();
        showToast(team ? '已切换为个人身份' : '已切换为团队负责人身份');
      }
      if (flow === 'exam-gate') {
        showModal({ title: '暂未进入送考', confirmLabel: '查看我的培训', body: '<div class="notice-strip warning" style="margin:0"><i data-lucide="shield-alert"></i><span>当前培训尚未完成。完成有效学时并经培训机构确认后，由培训机构统一安排送考。</span></div>', onConfirm: () => { window.location.href = '15-我的培训.html'; } });
      }
      if (flow === 'query-certificate') {
        const number = $('#certificateNumber').value.trim();
        const name = $('#certificateName').value.trim();
        if (!number || !name) return showToast('请输入证书编号和持证人姓名');
        const matched = number === 'HBCERT-2026-000128' && name === '张明';
        const expired = number === 'HBCERT-2025-000086' && name === '张明';
        $('#certificateWaiting').hidden = true;
        $('#certificateResult').hidden = !matched;
        $('#certificateExpiredResult').hidden = !expired;
        $('#certificateNoResult').hidden = matched || expired;
        const result = matched ? $('#certificateResult') : expired ? $('#certificateExpiredResult') : $('#certificateNoResult');
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast(matched ? '证书查验完成' : expired ? '证书当前已失效' : '未查询到匹配证书');
      }
      if (flow === 'create-team') {
        Object.values(TEAM_STATE).forEach((key) => setTeamState(key, false));
        window.location.href = '11-团队详情.html';
      }
      if (flow === 'add-team-member') {
        showModal({ title: '新增团队成员', body: teamMemberForm(), confirmLabel: '保存成员', onConfirm: () => {
          const name = $('#modalMemberName').value.trim() || '刘洋';
          const phone = $('#modalMemberPhone').value.trim() || '137****5186';
          const id = $('#modalMemberId').value.trim() || '4201********3086';
          $('#teamMemberList').insertAdjacentHTML('beforeend', `<div class="team-member" data-member-name="${name}" data-member-phone="${phone}" data-member-id="${id}"><span class="member-avatar">${name.slice(-2)}</span><span><b>${name}</b><small>${phone} · ${id}</small></span><span class="member-actions"><button type="button" data-member-action="view">查看</button><button type="button" data-member-action="edit">编辑</button><button type="button" data-member-action="remove">移除</button></span></div>`);
          updateTeamMemberSummary();
          showToast('团队成员已添加');
        }});
        bindModalUploads();
      }
      if (flow === 'submit-team-registration') {
        const count = $$('.team-member', $('#teamMemberList')).length;
        showModal({ title: '确认提交团队报名', body: `<div class="summary-grid"><div class="summary-item"><small>培训课程</small><b>建筑信息模型技术员实务班</b></div><div class="summary-item"><small>团队名称</small><b>湖北智创建筑工程有限公司培训队</b></div><div class="summary-item"><small>报名人数</small><b>${count}人</b></div><div class="summary-item"><small>报名费用</small><b>¥1,960/人</b></div><div class="summary-item full"><small>预计总费用</small><b style="color:var(--orange)">¥${(count * 1960).toLocaleString()}</b></div></div><p class="modal-note">提交后将生成团队报名记录并进入培训机构受理流程。</p>`, confirmLabel: '确认提交', onConfirm: () => {
          setTeamState(TEAM_STATE.submitted, true);
          applyTeamState();
          if ($('#teamAcceptanceCard')) $('#teamAcceptanceCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
          showToast('团队报名已提交');
        }});
      }
      if (flow === 'sync-team-acceptance') {
        showModal({ title: '模拟培训机构受理', body: '培训机构受理整团3人后，将生成一张团队报名订单，并按成员列示费用明细。', confirmLabel: '确认受理通过', onConfirm: () => {
          setTeamState(TEAM_STATE.accepted, true);
          applyTeamState();
          if ($('#teamOrderCard')) $('#teamOrderCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      if (flow === 'pay-order') {
        const order = currentOrder();
        const group = $('[data-payment-group="order-payment"]');
        const offline = group && $('[data-payment-method].is-active', group)?.dataset.paymentMethod === 'offline';
        showModal({ title: offline ? '提交报名订单汇款凭证' : '确认支付报名订单', body: `<div class="order-amount"><small>${offline ? '本次汇款金额' : '本次支付金额'}</small><strong>${orderMoney(order.amount)}</strong><span>${order.type === 'team' ? `${order.count}名成员的团队报名订单` : `${order.student}的个人报名订单`}，包含培训费与考试费</span></div>`, confirmLabel: offline ? '确认提交凭证' : '确认支付', onConfirm: () => {
          if ($('#unifiedOrderStatus')) { $('#unifiedOrderStatus').textContent = offline ? '待核款' : '已支付'; $('#unifiedOrderStatus').className = offline ? 'status-chip orange' : 'status-chip green'; }
          if (order.type === 'team') {
            setTeamState(TEAM_STATE.paymentPending, offline);
            setTeamState(TEAM_STATE.paid, !offline);
          }
          hideStickyAction();
          showToast(offline ? '汇款凭证已提交（演示）' : '支付成功（演示）');
          setTimeout(() => showModal({
            title: offline ? '汇款凭证已提交' : '报名订单支付成功',
            body: `<div class="result-banner"><i data-lucide="circle-check"></i><h2>${offline ? '待培训机构核款' : '报名已生效'}</h2><p>${offline ? '汇款凭证已提交，培训机构核款后将同步更新报名和培训状态。' : '后续培训任务将按班次安排开放。'}</p></div>`,
            confirmLabel: order.type === 'team' ? '返回团队报名详情' : '进入我的培训',
            cancelLabel: '留在当前页',
            onConfirm: () => { window.location.href = order.type === 'team' ? '11-团队详情.html' : '15-我的培训.html'; }
          }), 0);
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
          setTeamState('H5_OFFLINE_ATTENDANCE_COMPLETED', true);
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

  function applyAttendanceState() {
    if (pageId !== 'H18' || !teamState('H5_OFFLINE_ATTENDANCE_COMPLETED')) return;
    if ($('#checkinStatus')) { $('#checkinStatus').textContent = '已签到'; $('#checkinStatus').className = 'status-chip green'; }
    if ($('#checkinButton')) { $('#checkinButton').textContent = '签到成功 08:46'; $('#checkinButton').disabled = true; }
    if ($('#attendanceCount')) $('#attendanceCount').textContent = '2次';
  }

  const ORDER_DEMOS = [
    {id:'REG2026081300128', type:'personal', typeText:'个人报名', course:'建筑信息模型技术员实务班', batch:'建筑信息模型技术员实务班第3班', org:'某某培训机构', date:'2026-10-12 至 2026-11-15', method:'线上 + 线下', student:'张明', registration:'HBIC-2026-000128', created:'2026-08-13 16:25', status:'pending', statusText:'待支付', note:'请于30分钟内完成支付', trainingFee:1280, examFee:680, amount:1960, training:'未生效'},
    {id:'REG2026081900302', type:'personal', typeText:'个人报名', course:'建筑信息模型技术员实务班', batch:'建筑信息模型技术员实务班第2班', org:'某某培训机构', date:'2026-09-12 至 2026-10-15', method:'线上 + 线下', student:'张明', registration:'HBIC-2026-000302', created:'2026-08-19 10:25', status:'paid', statusText:'已支付', note:'2026-08-19 10:36', trainingFee:1280, examFee:680, amount:1960, training:'待开班'},
    {id:'REG2026081800245', type:'personal', typeText:'个人报名', course:'智能装备操作员线下实训班', batch:'智能装备操作员线下实训班第2班', org:'某某培训机构', date:'2026-10-12 至 2026-11-15', method:'线下实训', student:'李明', registration:'HBIC-2026-000245', created:'2026-08-18 14:32', status:'pending', statusText:'待支付', note:'请于30分钟内完成支付', trainingFee:1280, examFee:680, amount:1960, training:'未生效'},
    {id:'REG-TEAM-20260813001', type:'team', typeText:'团队报名', course:'建筑信息模型技术员实务班', batch:'建筑信息模型技术员实务班第3班', org:'某某培训机构', date:'2026-10-12 至 2026-11-15', method:'线上 + 线下', team:'湖北智创建筑工程有限公司', leader:'李明', count:3, registration:'HBIC-2026-000201', created:'2026-08-13 10:25', status:'pending', statusText:'待支付', note:'请于30分钟内完成支付', trainingFee:3840, examFee:2040, amount:5880, training:'未生效'},
    {id:'REG2026081600168', type:'personal', typeText:'个人报名', course:'BIM技术员基础培训班', batch:'BIM技术员基础培训班第1班', org:'湖北智能建造培训中心', date:'2026-09-20 至 2026-10-18', method:'在线学习', student:'张明', registration:'HBIC-2026-000168', created:'2026-08-16 09:18', status:'review', statusText:'待核款', note:'等待确认到账', trainingFee:1100, examFee:580, amount:1680, training:'未生效'},
    {id:'REG2026081400218', type:'personal', typeText:'个人报名', course:'建筑机器人操作员培训班', batch:'建筑机器人操作员培训班第1班', org:'某某培训机构', date:'2026-09-08 至 2026-10-10', method:'线下实训', student:'李明', registration:'HBIC-2026-000218', created:'2026-08-14 11:08', status:'refunding', statusText:'退款中', note:'等待退款审核', trainingFee:1500, examFee:680, amount:2180, training:'已暂停'},
    {id:'REG2026081200158', type:'personal', typeText:'个人报名', course:'智能建造施工员培训班', batch:'智能建造施工员培训班第2班', org:'湖北智能建造培训中心', date:'2026-08-20 至 2026-09-26', method:'线上 + 线下', student:'张明', registration:'HBIC-2026-000158', created:'2026-08-12 16:20', status:'refunded', statusText:'已退款', note:'2026-08-15 10:32', trainingFee:1000, examFee:580, amount:1580, training:'已终止'},
    {id:'REG2026081000128', type:'personal', typeText:'个人报名', course:'装配式建筑施工培训班', batch:'装配式建筑施工培训班第1班', org:'某某培训机构', date:'2026-08-28 至 2026-09-22', method:'混合培训', student:'李明', registration:'HBIC-2026-000128', created:'2026-08-10 10:05', status:'closed', statusText:'已关闭', note:'超时未支付', trainingFee:880, examFee:400, amount:1280, training:'未生效'}
  ];
  const orderMoney = value => `¥${value.toLocaleString('zh-CN')}`;
  const orderStatusClass = status => status === 'paid' ? 'green' : status === 'refunded' ? 'blue' : status === 'closed' ? 'gray' : 'orange';
  const orderAmountName = status => status === 'paid' ? '实付金额' : status === 'refunded' || status === 'refunding' ? '退款金额' : '应付金额';
  const currentOrder = () => {
    const orderId = new URLSearchParams(location.search).get('order');
    if (orderId === 'personal-paid') return ORDER_DEMOS.find(order => order.type === 'personal' && order.status === 'paid');
    if (orderId === 'personal-pending') return ORDER_DEMOS.find(order => order.type === 'personal' && order.status === 'pending');
    return ORDER_DEMOS.find(order => order.id === orderId) || ORDER_DEMOS[0];
  };

  function setupPaymentContext() {
    if (pageId !== 'H14') return;
    const order = currentOrder();
    const main = $('.page-main');
    if (!main) return;
    const team = order.type === 'team';
    const payer = team ? order.team : order.student;
    main.innerHTML = `
      <section class="mobile-card" id="unifiedOrderSummary"><div class="card-title-row"><div><h2>${team ? '团队报名订单' : '个人报名订单'}</h2><p>${order.course}</p></div><em class="status-chip orange" id="unifiedOrderStatus">${order.statusText}</em></div><div class="order-amount"><small>应付合计</small><strong>${orderMoney(order.amount)}</strong><span>培训费 ${orderMoney(order.trainingFee)} · 考试费 ${orderMoney(order.examFee)}<br>订单有效期至 2026-08-16 18:00</span></div><div class="field-display-list" style="margin-top:12px"><div class="field-display-row"><span>订单编号</span><b>${order.id}</b><i data-lucide="copy"></i></div><div class="field-display-row"><span>${team ? '缴费单位' : '缴费人'}</span><b>${payer}</b><i data-lucide="user"></i></div><div class="field-display-row"><span>平台报名编号</span><b>${order.registration}</b><i data-lucide="check"></i></div><div class="field-display-row"><span>收款方</span><b>${order.org}</b><i data-lucide="check"></i></div></div></section>
      ${team ? `<section class="mobile-card"><div class="card-title-row"><h2>报名成员费用</h2></div><div class="summary-grid"><div class="summary-item"><small>报名人数</small><b>${order.count}人</b></div><div class="summary-item"><small>培训费</small><b>${orderMoney(order.trainingFee)}</b></div><div class="summary-item"><small>考试费</small><b>${orderMoney(order.examFee)}</b></div><div class="summary-item full"><small>订单合计</small><b>${orderMoney(order.amount)}</b></div></div></section>` : ''}
      <section class="mobile-card" id="unifiedPaymentPanel"><div class="card-title-row"><div><h2>选择支付方式</h2><p>在线支付或线下对公汇款</p></div></div><div class="payment-methods" data-payment-group="order-payment"><button class="payment-method is-active" type="button" data-payment-method="online"><i data-lucide="smartphone"></i><b>在线支付</b><small>模拟聚合支付通道</small></button><button class="payment-method" type="button" data-payment-method="offline"><i data-lucide="landmark"></i><b>线下对公汇款</b><small>提交凭证后等待平台核款</small></button></div><div class="offline-form" data-offline-form hidden style="margin-top:13px"><div class="bank-account-card"><div class="bank-account-title"><span><i data-lucide="landmark"></i></span><div><b>指定对公账户（模拟）</b><small>汇款附言请填写订单编号</small></div></div><dl><div><dt>户名</dt><dd>${order.org}</dd></div><div><dt>账号</dt><dd>4200 **** **** 6688</dd></div><div><dt>开户行</dt><dd>中国建设银行武汉光谷支行</dd></div><div><dt>汇款附言</dt><dd>${order.id}</dd></div></dl></div><div class="form-stack"><div class="form-field"><label>付款方名称 <em>*</em></label><input value="${payer}"></div><div class="form-field"><label>汇款金额 <em>*</em></label><input value="${order.amount.toFixed(2)}"></div><button class="upload-tile" type="button" data-upload="报名订单汇款凭证"><span><i data-lucide="receipt-text"></i></span><span><b>汇款凭证</b><small>JPG、PNG或PDF，需清晰显示付款信息</small></span><em>上传</em></button></div></div></section>
      `;
    if (order.status !== 'pending' && $('#unifiedPaymentPanel')) {
      $('#unifiedPaymentPanel').innerHTML = `<div class="card-title-row"><div><h2>${order.status === 'review' ? '汇款凭证待核款' : order.statusText}</h2><p>${order.note}</p></div><em class="status-chip ${orderStatusClass(order.status)}">${order.statusText}</em></div><div class="field-display-list"><div class="field-display-row"><span>订单编号</span><b>${order.id}</b><i data-lucide="receipt-text"></i></div><div class="field-display-row"><span>订单金额</span><b>${orderMoney(order.amount)}</b><i data-lucide="wallet-cards"></i></div>${order.status === 'review' ? '<div class="field-display-row"><span>汇款凭证</span><b>已提交</b><i data-lucide="file-check-2"></i></div>' : ''}</div>`;
    }
    const sticky = $('.page-sticky-bar');
    if (sticky) sticky.innerHTML = order.status === 'pending' ? `<button class="primary-button" id="unifiedPayButton" type="button" data-flow="pay-order">确认支付 ${orderMoney(order.amount)}</button>` : `<a class="primary-button" href="20-报名订单详情.html?order=${encodeURIComponent(order.id)}">查看订单详情</a>`;
    icons();
  }

  function setupOrderList() {
    if (pageId !== 'H25') return;
    const root = $('#h5-order-list-root'); if (!root) return;
    let tab = 'all'; let type = 'all'; let keyword = '';
    const renderOrders = () => {
      const list = ORDER_DEMOS.filter(o => (tab === 'all' || (tab === 'after' ? ['refunding','refunded'].includes(o.status) : o.status === tab)) && (type === 'all' || o.type === type) && (!keyword || `${o.course} ${o.id}`.toLowerCase().includes(keyword.toLowerCase())));
      const actions = o => { const detail = `20-报名订单详情.html?order=${encodeURIComponent(o.id)}`; if (o.status === 'pending') return `<button class="outline-small-button" type="button" data-toast="订单已取消（原型模拟）">取消订单</button><a class="small-button" href="14-报名订单.html?order=${encodeURIComponent(o.id)}&from=orders">立即支付</a>`; if (o.status === 'review') return `<a class="outline-small-button" href="${detail}">付款信息</a><a class="small-button" href="${detail}">订单详情</a>`; if (o.status === 'paid') return `<a class="outline-small-button" href="${detail}">订单详情</a><a class="small-button" href="15-我的培训.html">进入我的培训</a>`; if (o.status === 'refunding') return `<a class="small-button" href="${detail}">退款详情</a>`; if (o.status === 'closed') return `<a class="outline-small-button" href="${detail}">订单详情</a><a class="small-button" href="02-培训课程.html">重新报名</a>`; return `<a class="small-button" href="${detail}">订单详情</a>`; };
      root.innerHTML = `<div class="filter-tabs order-filter-tabs h5-order-tabs">${[['all','全部'],['pending','待支付'],['review','待核款'],['paid','已支付'],['after','退款']].map(([key,label])=>`<button class="${tab===key?'is-active':''}" type="button" data-new-order-tab="${key}">${label}</button>`).join('')}</div><div class="h5-order-search"><label><i data-lucide="search"></i><input id="h5-order-keyword" placeholder="搜索课程名称 / 订单编号" value="${keyword}"></label><button type="button" id="h5-order-filter"><i data-lucide="sliders-horizontal"></i>筛选</button></div><section class="order-list h5-order-list">${list.map(o=>`<article class="order-list-card h5-order-card" data-h5-order="${o.id}"><div class="order-list-head"><div><small>${o.typeText}</small><h2>${o.course}</h2></div><em class="status-chip ${orderStatusClass(o.status)}">${o.statusText}</em></div><div class="h5-order-meta"><p>${o.org}</p><p>${o.date}</p><div><span>${o.type==='team'?'报名团队':'学员'}：</span><b>${o.type==='team'?o.team:o.student}</b></div>${o.type==='team'?`<div><span>报名人数：</span><b>${o.count}人</b></div>`:''}<div><span>订单编号：</span><b>${o.id}</b></div></div><div class="h5-order-bottom"><div><small>${orderAmountName(o.status)}</small><strong>${orderMoney(o.amount)}</strong></div><div class="h5-order-actions">${actions(o)}</div></div></article>`).join('') || '<section class="mobile-card empty-state"><span><i data-lucide="receipt-text"></i></span><h2>暂无对应订单</h2><p>请切换状态或调整筛选条件。</p></section>'}</section>`;
      $$('[data-new-order-tab]', root).forEach(button=>button.addEventListener('click',()=>{tab=button.dataset.newOrderTab;renderOrders()})); $('#h5-order-keyword',root)?.addEventListener('input',event=>{keyword=event.target.value;renderOrders()}); $('#h5-order-filter',root)?.addEventListener('click',()=>showModal({title:'筛选订单', body:`<div class="form-field"><label>报名类型</label><select id="h5-order-type"><option value="all" ${type==='all'?'selected':''}>全部</option><option value="personal" ${type==='personal'?'selected':''}>个人报名</option><option value="team" ${type==='team'?'selected':''}>团队报名</option></select></div><div class="form-field" style="margin-top:12px"><label>下单时间</label><select><option>近3个月</option><option>近6个月</option></select></div><div class="form-field" style="margin-top:12px"><label>培训机构</label><select><option>全部机构</option><option>某某培训机构</option></select></div>`, confirmLabel:'确定', cancelLabel:'取消', onConfirm:()=>{type=$('#h5-order-type')?.value||'all';renderOrders()}})); $$('[data-h5-order]',root).forEach(card=>card.addEventListener('click',event=>{if(event.target.closest('a,button,input'))return;location.href=`20-报名订单详情.html?order=${encodeURIComponent(card.dataset.h5Order)}`})); icons();
    }; renderOrders();
  }

  function setupUnifiedOrderDetail() {
    if (pageId !== 'H20') return;
    const o = currentOrder();
    const root = $('#h5-order-detail-root');
    if (!root) return;
    const paid = o.status === 'paid';
    const team = o.type === 'team';
    const payment = paid ? `<div><span>支付状态</span><b>已支付</b></div><div><span>支付方式</span><b>在线支付</b></div><div><span>支付渠道</span><b>微信支付</b></div><div><span>支付时间</span><b>2026-08-13 16:36</b></div><div><span>支付流水号</span><b>PAY202608130088</b></div><div><span>收款方</span><b>${o.org}</b></div>` : `<div><span>支付状态</span><b>${o.statusText}</b></div><div><span>收款方</span><b>${o.org}</b></div>${team ? '<div><span>付款方式</span><b>待选择</b></div><div><span>汇款凭证</span><b>未提交</b></div>' : ''}`;
    const log = paid ? `<li class="is-complete"><b>支付成功</b><time>2026-08-13 16:36</time><small>在线支付 ${orderMoney(o.amount)}。</small></li><li class="is-complete"><b>提交报名订单</b><time>${o.created}</time><small>订单创建成功。</small></li>` : o.status==='refunded' ? `<li class="is-complete"><b>退款完成</b><time>2026-08-15 10:32</time><small>退款 ${orderMoney(o.amount)} 已原路退回。</small></li><li class="is-complete"><b>提交退款申请</b><time>2026-08-14 11:20</time><small>退款申请已受理。</small></li>` : `<li class="is-current"><b>${o.status==='closed'?'订单已关闭':o.status==='refunding'?'提交退款申请':'提交报名订单'}</b><time>${o.created}</time><small>${o.note}</small></li>`;
    const memberNames = ['张明','王强','陈敏','赵敏','吴刚'].slice(0, o.count || 0);
    root.innerHTML = `<section class="mobile-card h5-detail-status"><div class="card-title-row"><div><h2>${o.statusText}</h2><p>${paid?'订单已支付，报名已生效。':o.note}</p></div><em class="status-chip ${orderStatusClass(o.status)}">${o.typeText}</em></div><div class="h5-detail-amount"><small>${orderAmountName(o.status)}</small><strong>${orderMoney(o.amount)}</strong></div><div class="h5-detail-number"><span>订单编号</span><b>${o.id}</b><button type="button" data-toast="订单编号已复制">复制</button></div><div class="h5-detail-number"><span>平台报名编号</span><b>${o.registration}</b><button type="button" data-toast="平台报名编号已复制">复制</button></div></section><section class="mobile-card"><h2>报名信息</h2><div class="h5-field-list"><div><span>培训课程</span><b>${o.course}</b></div><div><span>培训班次</span><b>${o.batch}</b></div><div><span>培训机构</span><b>${o.org}</b></div><div><span>培训时间</span><b>${o.date}</b></div><div><span>培训方式</span><b>${o.method}</b></div><div><span>报名方式</span><b>${o.typeText}</b></div><div><span>报名时间</span><b>${o.created}</b></div></div></section><section class="mobile-card"><div class="card-title-row"><h2>培训进度</h2><em class="status-chip blue">${o.training}</em></div><div class="h5-progress-flow"><div class="done">报名成功</div><div class="current">${o.training}</div><div>培训中</div><div>培训完成</div><div>待送考</div></div><p class="muted">${paid?'培训将于2026-10-12开始。':'订单生效后将进入培训安排。'}</p>${paid?'<a class="text-button" href="03-课程详情.html?course=bim#courseSchedule">查看培训计划<i data-lucide="chevron-right"></i></a>':''}</section><section class="mobile-card"><h2>${team?'团队报名信息':'学员信息'}</h2><div class="h5-field-list">${team?`<div><span>报名团队</span><b>${o.team}</b></div><div><span>团队负责人</span><b>${o.leader}</b></div><div><span>联系电话</span><b>138****8888</b></div><div><span>报名人数</span><b>${o.count}人</b></div><div><span>缴费单位</span><b>${o.team}</b></div>`:`<div><span>学员</span><b>${o.student}</b></div><div><span>手机号</span><b>138****8888</b></div><div><span>证件类型</span><b>居民身份证</b></div><div><span>证件号码</span><b>4201********1234</b></div>`}</div>${team?`<div class="h5-member-title">报名成员</div>${memberNames.map(name=>`<div class="h5-member-row"><b>${name}</b><span>138****8888</span><em>${paid?'待开班':'待支付'}</em></div>`).join('')}`:''}</section><section class="mobile-card"><h2>费用明细</h2><div class="payment-detail-list"><div><span>培训费</span><strong>${orderMoney(o.trainingFee)}</strong></div><div><span>考试费</span><strong>${orderMoney(o.examFee)}</strong></div><div><span>优惠金额</span><strong>-¥0</strong></div><div class="payment-detail-total"><span>${orderAmountName(o.status)}</span><strong>${orderMoney(o.amount)}</strong></div></div></section><section class="mobile-card"><h2>支付信息</h2><div class="h5-field-list">${payment}</div></section><section class="mobile-card"><h2>订单记录</h2><ul class="timeline">${log}</ul></section>`;
    if (team) {
      $$('.mobile-card', root).forEach((section) => {
        const heading = $('h2', section)?.textContent.trim();
        if (heading === '培训进度' || heading === '订单记录') section.remove();
      });
    }
    const sticky=$('.page-sticky-bar');
    if(sticky) sticky.innerHTML=o.status==='pending'?`<div class="sticky-actions"><a class="outline-button" href="25-我的订单.html">取消订单</a><a class="primary-button" href="14-报名订单.html?order=${encodeURIComponent(o.id)}&from=detail">立即支付</a></div>`:paid?`<div class="sticky-actions"><a class="outline-button" href="25-我的订单.html">订单列表</a><a class="primary-button" href="15-我的培训.html">进入我的培训</a></div>`:o.status==='closed'?`<div class="sticky-actions"><a class="outline-button" href="25-我的订单.html">返回订单</a><a class="primary-button" href="02-培训课程.html">重新报名</a></div>`:`<div class="sticky-actions"><a class="primary-button" href="25-我的订单.html">返回我的订单</a></div>`;
    icons();
  }

  render();
  setupGenericSearch();
  setupEvaluationProject();
  setupScoreReviewAvailability();
  setupPaymentContext();
  setupUnifiedOrderDetail();
  setupOrderList();
  applyCourseDetailData();
  applyTrainingDetailData();
  applyAttendanceState();
  setupLinksAndToasts();
  setupTabs();
  setupCourseLinks();
  setupTrainingLinks();
  setupScrollTargets();
  setupCourseAdvancedFilter();
  setupFilters();
  setupUploads();
  setupPaymentMethods();
  setupFlows();
  setupTeamMembers();
  applyMyIdentity();
  applyTeamState();
})();
