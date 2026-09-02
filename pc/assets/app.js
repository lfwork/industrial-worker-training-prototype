(function(){
  const occupations=[
    {domain:"数字设计",name:"建筑信息模型技术员",icon:"cuboid"},{domain:"数字设计",name:"工程数据管理员",icon:"database"},
    {domain:"智能生产",name:"装配式构件生产操作员",icon:"factory"},{domain:"智能生产",name:"部品部件质量检测员",icon:"scan-search"},
{domain:"智能施工",name:"装配式建筑施工员",icon:"blocks"},{domain:"智能施工",name:"智能装备操作员",icon:"construction"},{domain:"智能施工",name:"建筑机器人操作员",icon:"bot"},
    {domain:"智慧运维",name:"建筑设备智慧运维员",icon:"settings-2"},{domain:"智慧运维",name:"智慧物业管理员",icon:"building-cog"}
  ];
  const courses=[
    {name:"建筑信息模型技术员实务班",mode:"线上",date:"10月12日开班",org:"武汉绿色建造职业培训中心（模拟）",price:"¥1,280"},
    {name:"智能装备操作员线下实训班",mode:"线下",date:"9月28日开班",org:"湖北智建产业工人培训中心（模拟）",price:"¥880"},
    {name:"建筑设备智慧运维员综合班",mode:"混合",date:"10月18日开班",org:"宜昌智能建造技能培训中心（模拟）",price:"¥1,260"}
  ];
  const courseCatalog={
    "建筑信息模型技术员":[
      {name:"建筑信息模型技术员实务班",mode:"线上",date:"10月12日开班",org:"武汉绿色建造职业培训中心（模拟）",price:"¥1,280",hours:"48学时",tone:"indigo"},
      {name:"BIM建模与工程协同周末班",mode:"混合",date:"10月19日开班",org:"湖北数字建造培训中心（模拟）",price:"¥1,480",hours:"56学时",tone:"cyan"},
      {name:"建筑信息模型技术员强化班",mode:"线下",date:"11月02日开班",org:"武汉建设职业技能学校（模拟）",price:"¥1,600",hours:"64学时",tone:"teal"},
      {name:"BIM项目应用基础班",mode:"线上",date:"11月10日开班",org:"湖北智建产业工人培训中心（模拟）",price:"¥880",hours:"36学时",tone:"indigo"}
    ],
    "工程数据管理员":[
      {name:"工程数据管理员岗位能力班",mode:"线上",date:"10月15日开班",org:"湖北数字建造培训中心（模拟）",price:"¥980",hours:"40学时",tone:"cyan"},
      {name:"工程数据采集与归档实务班",mode:"混合",date:"10月25日开班",org:"武汉绿色建造职业培训中心（模拟）",price:"¥1,180",hours:"48学时",tone:"indigo"}
    ],
    "装配式构件生产操作员":[
      {name:"装配式构件生产操作员实训班",mode:"线下",date:"09月28日开班",org:"湖北装配式建筑培训基地（模拟）",price:"¥1,260",hours:"56学时",tone:"teal"},
      {name:"预制构件生产与安全操作班",mode:"混合",date:"10月16日开班",org:"武汉绿色建造职业培训中心（模拟）",price:"¥1,080",hours:"48学时",tone:"cyan"}
    ],
    "部品部件质量检测员":[
      {name:"部品部件质量检测员基础班",mode:"混合",date:"10月08日开班",org:"湖北建设工程质量培训中心（模拟）",price:"¥1,180",hours:"48学时",tone:"indigo"},
      {name:"建筑部品质量检验实操班",mode:"线下",date:"11月05日开班",org:"武汉检测技能培训基地（模拟）",price:"¥1,380",hours:"52学时",tone:"teal"}
    ],
    "装配式建筑施工员":[
      {name:"装配式建筑施工员混合培训班",mode:"混合",date:"09月15日开班",org:"湖北智建产业工人培训中心（模拟）",price:"¥980",hours:"48学时",tone:"cyan"},
      {name:"装配式建筑施工员实操强化班",mode:"线下",date:"10月10日开班",org:"武汉装配式施工培训基地（模拟）",price:"¥1,280",hours:"56学时",tone:"indigo"},
      {name:"装配施工安全与质量控制班",mode:"线上",date:"10月28日开班",org:"湖北绿色建造职业培训中心（模拟）",price:"¥780",hours:"36学时",tone:"teal"}
    ],
    "智能装备操作员":[
      {name:"智能装备操作员线下实训班",mode:"线下",date:"09月28日开班",org:"湖北智建产业工人培训中心（模拟）",price:"¥880",hours:"48学时",tone:"teal"},
      {name:"智能塔机与升降设备操作班",mode:"混合",date:"10月22日开班",org:"湖北建筑设备技能培训中心（模拟）",price:"¥1,260",hours:"56学时",tone:"cyan"}
    ],
    "建筑机器人操作员":[
      {name:"建筑机器人操作员入门班",mode:"混合",date:"10月20日开班",org:"湖北智能建造实训中心（模拟）",price:"¥1,480",hours:"56学时",tone:"indigo"},
      {name:"建筑机器人现场操作实训班",mode:"线下",date:"11月12日开班",org:"武汉建筑机器人培训基地（模拟）",price:"¥1,680",hours:"64学时",tone:"teal"}
    ],
    "建筑设备智慧运维员":[
      {name:"建筑设备智慧运维员综合班",mode:"混合",date:"10月18日开班",org:"宜昌智能建造技能培训中心（模拟）",price:"¥1,260",hours:"52学时",tone:"cyan"},
      {name:"建筑设备智能巡检实务班",mode:"线上",date:"11月03日开班",org:"湖北智慧运维培训中心（模拟）",price:"¥980",hours:"40学时",tone:"indigo"}
    ],
    "智慧物业管理员":[
      {name:"智慧物业管理员岗位能力班",mode:"线上",date:"10月24日开班",org:"湖北智慧物业培训中心（模拟）",price:"¥880",hours:"36学时",tone:"teal"},
      {name:"智慧社区服务运营实务班",mode:"混合",date:"11月08日开班",org:"武汉城市运维职业培训中心（模拟）",price:"¥1,080",hours:"44学时",tone:"cyan"}
    ]
  };
  const upcomingCourses=[
    {date:"09-15",name:"装配式建筑施工员混合培训班",occupation:"装配式建筑施工员",deadline:"剩3天",course:"装配式建筑施工员混合培训班"},
    {date:"09-28",name:"智能装备操作员线下实训班",occupation:"智能装备操作员",deadline:"剩8天",course:"智能装备操作员线下实训班"},
    {date:"10-08",name:"部品部件质量检测员基础班",occupation:"部品部件质量检测员",deadline:"剩12天",course:"部品部件质量检测员基础班"}
  ];
  const exams=[
    {date:"09-30",year:"2026",title:"装配式建筑施工员职业技能考试",venue:"武汉市 · 湖北建筑职业技能评价中心考场",org:"湖北建筑职业技能评价中心（模拟）"},
    {date:"10-26",year:"2026",title:"建筑信息模型技术员职业技能考试",venue:"武汉市 · 湖北数字建造技能评价中心考场",org:"湖北数字建造技能评价中心（模拟）"},
    {date:"11-08",year:"2026",title:"智能装备操作员职业技能考试",venue:"武汉市 · 湖北智能装备技能评价中心考场",org:"湖北智能装备技能评价中心（模拟）"}
  ];
  const infos=[
    {type:"培训通知",title:"绿色智能建造九大新工种首批培训班报名说明",date:"2026-08-12"},{type:"考试公告",title:"装配式建筑施工员9月评价考试安排公告",date:"2026-08-11"},
    {type:"政策文件",title:"绿色智能建造产业领域职业技能培训工作有关政策说明",date:"2026-08-08"},{type:"成绩公示",title:"建筑信息模型技术员职业技能评价成绩公示（模拟）",date:"2026-08-06"}
  ];
  let role=localStorage.getItem("trainingZone.role")||"visitor";
  let pendingEnrollment=null;
  let slide=0,slideTimer;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  function icons(){window.lucide?.createIcons({attrs:{"stroke-width":1.8}})}
  function toast(message){const n=document.createElement("div");n.className="toast";n.textContent=message;$("#toast-region").appendChild(n);requestAnimationFrame(()=>n.classList.add("show"));setTimeout(()=>{n.classList.remove("show");setTimeout(()=>n.remove(),200)},2800)}
  function modal(content){$("#modal-content").innerHTML=content;$("#modal-backdrop").classList.add("show");$("#modal-backdrop").setAttribute("aria-hidden","false");icons()}
  function closeModal(){$("#modal-backdrop").classList.remove("show");$("#modal-backdrop").setAttribute("aria-hidden","true")}
  function renderOccupations(domain="all"){$("#occupation-rail").innerHTML=occupations.map(o=>`<button class="occupation-item ${domain!=="all"&&domain!==o.domain?"hidden":""}" type="button" data-occupation="${o.name}"><span class="occupation-icon"><i data-lucide="${o.icon}"></i></span><strong>${o.name}</strong><span>${o.domain}</span></button>`).join("");icons()}
  function renderCourses(){$("#course-list").innerHTML=courses.map(c=>`<article class="course-row"><div><h3>${c.name}</h3><p>${c.mode} · ${c.date}<br>${c.org}</p></div><div class="course-meta"><span>培训费</span><strong>${c.price}</strong></div><button type="button" data-course="${c.name}">查看详情</button></article>`).join("")}
  function renderCourseMarket(occupation="建筑信息模型技术员"){
    const list=courseCatalog[occupation]||[];
    const title=$("#selected-occupation-title"),grid=$("#course-card-grid");
    if(!title||!grid)return;
    title.textContent=`${occupation}课程`;
    title.nextElementSibling.textContent=`共${list.length}个近期班次`;
    grid.innerHTML=list.length?list.map((c,i)=>`<article class="course-card"><div class="course-cover" data-tone="${c.tone}"><i data-lucide="${i%2?'book-open-check':'graduation-cap'}"></i><strong>${occupation}</strong></div><div class="course-card-body"><h3>${c.name}</h3><div class="course-card-tags"><span>${c.mode}</span><span>${c.hours}</span><span>${c.date}</span></div><p title="${c.org}">${c.org}</p><div class="course-card-meta"><div><span>培训费</span><strong>${c.price}</strong></div><button type="button" data-course="${c.name}" data-course-occupation="${occupation}">查看详情</button></div></div></article>`).join(""):`<div class="course-empty"><div><i data-lucide="calendar-x-2"></i><strong>当前暂无可报名课程</strong><span>可以查看全部课程或稍后再来</span></div></div>`;
    icons();
  }
  function renderUpcoming(){const el=$("#upcoming-list");if(!el)return;el.innerHTML=upcomingCourses.map(c=>`<article class="upcoming-item"><div class="upcoming-date"><strong>${c.date}</strong><span>开班</span></div><div><h4 title="${c.name}">${c.name}</h4><p>${c.occupation}</p><span><b>${c.deadline}</b><button type="button" data-course="${c.course}" data-course-occupation="${c.occupation}">查看</button></span></div></article>`).join("")}
  function openCourseDetail(course){sessionStorage.setItem("trainingZone.selectedCourse",course);window.location.href="课程详情.html"}
  function renderExams(){$("#exam-timeline").innerHTML=exams.map(e=>`<a class="exam-row" href="评价项目详情.html"><div class="exam-date"><strong>${e.year}-${e.date}</strong></div><div><h3>${e.title}</h3><p class="exam-venue">${e.venue}</p></div><span class="exam-org">${e.org}</span></a>`).join("")}
  function renderInfos(type="all"){$("#info-list").innerHTML=infos.filter(i=>type==="all"||i.type===type).map(i=>`<li><span class="info-type">${i.type}</span><button type="button" data-info-title="${i.title}">${i.title}</button><time>${i.date}</time></li>`).join("")}
  function taskConfig(){return role==="personal"?{title:"我的待办",sub:"个人学员 · 模拟登录状态",actions:[['book-open','继续学习','已完成 18/48 学时','primary'],['badge-check','查看考试安排','机构送考后查看',''],['wallet-cards','报名订单','查看综合订单',''],['scroll-text','我的成绩','查看公示与复核','']]}:role==="team"?{title:"团队办理进度",sub:"团队负责人 · 模拟登录状态",actions:[['users','成员确认','28/30 人已确认','primary'],['wallet-cards','团队报名订单','待核款 1 笔',''],['chart-no-axes-column','培训进度','达标 19 人',''],['send','可送考人员','18 人可提交','']]}:{title:"我来办理",sub:"游客可先浏览课程和考试信息，办理业务时统一登录",actions:[['user-round','个人报名','选择课程后办理','primary'],['users','团队报名','批量导入并邀请确认',''],['clipboard-check','报名进度','登录后查看',''],['search-check','证书查验','免登录公开查询','']]}}
  function renderTasks(){const login=$("#login-button");if(login)login.textContent=role==="visitor"?"登录/注册":role==="personal"?"张明（个人）":"王工（团队）";icons()}
  function showSlide(index){slide=(index+2)%2;$$('.hero-slide').forEach((s,i)=>s.classList.toggle('active',i===slide));$$('[data-slide-to]').forEach((d,i)=>d.classList.toggle('active',i===slide));clearInterval(slideTimer);slideTimer=setInterval(()=>showSlide(slide+1),6500)}
  function roleModal(){modal(`<h2 id="modal-title">切换原型演示身份</h2><p>用于查看专区首页对不同访问角色展示的办理入口和待办信息。</p><div class="modal-options"><button type="button" data-set-role="visitor"><span><strong>游客公众</strong><br><small>查看课程、考试计划和证书查验</small></span><span class="role-badge">免登录</span></button><button type="button" data-set-role="personal"><span><strong>个人学员</strong><br><small>查看个人培训、考试和证书待办</small></span><span class="role-badge">模拟登录</span></button><button type="button" data-set-role="team"><span><strong>团队负责人</strong><br><small>查看成员确认、缴费和送考进度</small></span><span class="role-badge">模拟登录</span></button></div>`)}
  function loginModal(){modal(`<h2 id="modal-title">培训考试统一登录</h2><p>登录后根据人员身份进入“我的培训考试”。</p><form class="login-form" id="login-form"><label>手机号码<input name="mobile" value="13800000000" required maxlength="11"></label><label>验证码<input name="code" value="123456" required maxlength="6"></label><button class="button primary full" type="submit">模拟登录</button><p class="login-hint">固定模拟验证码：123456</p></form>`)}
  document.addEventListener("click",e=>{const set=e.target.closest('[data-set-role]');if(set){role=set.dataset.setRole;localStorage.setItem("trainingZone.role",role);closeModal();renderTasks();toast("已切换演示身份");return}const subsidy=e.target.closest('[data-subsidy-guide]');if(subsidy){modal(`<h2 id="modal-title">职业技能培训补贴说明</h2><p>绿色智能建造九大新工种已纳入就业创业培训补贴项目指导目录管理。</p><div class="subsidy-detail"><i data-lucide="circle-alert"></i><div><strong>不是报名即自动减免费用</strong><p>补贴对象、补贴标准、申领主体和办理方式，取决于人员身份、培训类型、开班审批、培训过程、结业或取证结果等条件。</p><span>符合条件的人员或企业可按规定申领，最终以培训所在地人社部门审核结果为准。</span></div></div><div class="modal-note">一期平台提供政策展示和课程详情说明，不在本专区直接办理补贴审批与资金发放。</div>`);return}const demo=e.target.closest('[data-demo]');if(demo){e.preventDefault();toast(`${demo.dataset.demo}：不在当前PC端演示范围`);return}const occupationTab=e.target.closest('[data-occupation-tab]');if(occupationTab){$$('[data-occupation-tab]').forEach(b=>{b.classList.toggle('active',b===occupationTab);b.setAttribute('aria-selected',b===occupationTab?'true':'false')});renderCourseMarket(occupationTab.dataset.occupationTab);return}const course=e.target.closest('[data-course]');if(course){openCourseDetail(course.dataset.course);return}const enroll=e.target.closest('[data-enroll-type]');if(enroll){const type=enroll.dataset.enrollType==='team'?'团队':'个人';if(role==='visitor'){pendingEnrollment={type,course:enroll.dataset.enrollCourse};closeModal();loginModal();toast(`登录后继续${type}报名`)}else{window.location.href=type==='团队'?'团队报名任务编辑.html':'个人培训报名.html'}return}const info=e.target.closest('[data-info-title]');if(info){modal(`<h2 id="modal-title">${info.dataset.infoTitle}</h2><p>发布时间：2026-08 · 模拟内容</p><div class="modal-note">正式页面将展示平台审核发布的通知、公示或政策原文。</div>`);return}const task=e.target.closest('[data-task]');if(task){if(role==="visitor"&&task.dataset.task!=="证书查验"){loginModal()}else window.location.href=task.dataset.task==="证书查验"?'证书真伪查询.html':'我的培训考试.html';return}const infoTab=e.target.closest('[data-info]');if(infoTab){$$('[data-info]').forEach(b=>b.classList.toggle('active',b===infoTab));renderInfos(infoTab.dataset.info);return}if(e.target.closest('[data-exam-action]')){role==="visitor"?loginModal():(window.location.href='考试安排.html')}});
  $("#modal-backdrop").addEventListener("click",e=>{if(e.target.id==="modal-backdrop"||e.target.closest('.modal-close'))closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
  $("#login-button").addEventListener("click",()=>role==="visitor"?loginModal():roleModal());$("#my-center-button").addEventListener("click",()=>role==="visitor"?loginModal():(window.location.href="我的培训考试.html"));
  $("#platform-search").addEventListener("submit",e=>{e.preventDefault();toast(`平台搜索：${$("#global-keyword").value||"请输入搜索内容"}`)});
  const certificateQuery=$("#certificate-query");if(certificateQuery)certificateQuery.addEventListener("click",()=>{const code=$("#certificate-code").value.trim(),name=$("#certificate-name").value.trim();if(!code||!name){toast("请完整填写证书编号和姓名");return}modal(`<h2 id="modal-title">证书查验结果</h2><p>本结果仅用于原型交互演示。</p><div class="certificate-result"><strong>查验通过（模拟）</strong><span>持证人：${name}</span><span>证书编号：${code}</span><span>工种：装配式建筑施工员</span></div>`)});
  $$('.hero-arrow').forEach(b=>b.addEventListener('click',()=>showSlide(slide+(b.classList.contains('next')?1:-1))));$$('[data-slide-to]').forEach(b=>b.addEventListener('click',()=>showSlide(Number(b.dataset.slideTo))));
  document.addEventListener("submit",e=>{if(e.target.id==="login-form"){e.preventDefault();const d=new FormData(e.target);if(!/^1\d{10}$/.test(d.get('mobile'))||d.get('code')!=="123456"){toast("请输入正确模拟手机号和验证码");return}role="personal";localStorage.setItem("trainingZone.role",role);closeModal();renderTasks();if(pendingEnrollment){const next=pendingEnrollment;pendingEnrollment=null;setTimeout(()=>courseModal(next.course,"已选课程 · 请继续确认报名方式"),160);toast(`登录成功，请继续${next.type}报名`)}else toast("模拟登录成功")}});
  renderCourseMarket();renderUpcoming();renderExams();renderInfos();renderTasks();showSlide(0);icons();
})();

/* 四端原型共用：可拖动页面导航与功能说明。 */
(() => {
  if (window.__prototypeFloatToolsBootstrapped) return;
  window.__prototypeFloatToolsBootstrapped = true;
  const script = document.createElement('script');
  script.src = new URL('../prototype-float-tools.js', location.href).href;
  document.head.appendChild(script);
})();
