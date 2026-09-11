(function(){
  const role=document.body.dataset.paymentRole;
  const detail=document.body.dataset.paymentView==='detail';
  const STORE='industrialWorkerSendPaymentV1';
  const dynamicId='SKJF-20260910-0001';
  const people=[
    ['张明','420106********3215','138****6608'],['李明','420102********1280','138****5628'],['王强','420111********2046','139****1186'],['刘芳','420104********5521','136****9072']
  ];
  const fixed=[
    {id:'SKJF-20260908-0002',batch:'SKPC-20260908-0008',trade:'智能装备操作员',training:'湖北建造产业技能培训学校',evaluation:'湖北省智能建造评价中心',count:4,price:260,amount:1040,state:'pending',created:'2026-09-08 10:20',submitted:'2026-09-08 15:30',paid:1040,date:'2026-09-08',serial:'HB202609080004'},
    {id:'SKJF-20260907-0003',batch:'SKPC-20260907-0005',trade:'装配式建筑施工员',training:'湖北数字建造培训中心',evaluation:'湖北省智能建造评价中心',count:4,price:280,amount:1120,state:'confirmed',created:'2026-09-07 09:10',submitted:'2026-09-07 16:05',paid:1120,date:'2026-09-07',serial:'HB202609070004',checked:'2026-09-08 09:15'},
    {id:'SKJF-20260906-0004',batch:'SKPC-20260906-0002',trade:'工程数据管理员',training:'湖北建造产业技能培训学校',evaluation:'湖北省智能建造评价中心',count:4,price:240,amount:960,state:'failed',created:'2026-09-06 11:00',submitted:'2026-09-06 14:20',paid:840,date:'2026-09-06',serial:'HB202609060004',checked:'2026-09-07 10:05',reason:'转账金额与订单应缴金额不一致，请核实后重新提交。'},
    {id:'SKJF-20260905-0005',batch:'SKPC-20260905-0001',trade:'建筑信息模型技术员',training:'武汉绿色建造职业培训中心',evaluation:'湖北省智能建造评价中心',count:4,price:280,amount:1120,state:'pending',created:'2026-09-05 09:40',submitted:'2026-09-05 13:50',paid:1120,date:'2026-09-05',serial:'HB202609050004'}
  ];
  const base={id:dynamicId,batch:'SKPC-20260818-0003',trade:'装配式建筑施工员',training:'湖北数字建造培训中心',evaluation:'湖北省智能建造评价中心',count:4,price:280,amount:1120,state:'unpaid',created:'2026-09-10 09:31',submitted:'—',paid:null,date:'',serial:''};
  const read=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){return {}}};
  const write=x=>localStorage.setItem(STORE,JSON.stringify(x));
  const current=()=>Object.assign({},base,read()[dynamicId]||{});
  const all=()=>[current()].concat(fixed);
  const map={training:{unpaid:'待缴费',pending:'待确认',confirmed:'已确认',failed:'未通过'},evaluation:{pending:'待确认',confirmed:'已确认',failed:'未通过'},platform:{unpaid:'待缴费',pending:'待确认',confirmed:'已缴费',failed:'异常订单'}};
  const color={unpaid:'orange',pending:'blue',confirmed:'green',failed:'red'};
  const status=o=>map[role][o.state]||o.state;
  const money=n=>n==null?'—':'¥'+Number(n).toLocaleString('zh-CN');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function nav(){
    const conf={
      training:{home:'机构信息.html',user:'培训机构管理员',org:'湖北数字建造培训中心',groups:[['机构信息','building','机构信息.html'],['课程管理','book','课程管理.html'],['报名管理','file','个人报名审核.html'],['订单管理','receipt','报名订单.html'],['培训实施','graduation','班次管理.html'],['送考管理','shield',[['培训完成名单','培训完成名单.html'],['送考批次','送考批次台账.html'],['送考缴费','送考缴费.html'],['考试安排查询','考试安排查询.html']]]]},
      evaluation:{home:'机构信息.html',user:'评价机构管理员',org:'湖北省智能建造评价中心',groups:[['机构信息','building','机构信息.html'],['考试项目管理','shield','考试项目列表.html'],['送考管理','file',[['送考批次审核','送考批次台账.html'],['送考订单','送考订单.html']]],['考务管理','clipboard','考生名单.html'],['成绩与证书','graduation','成绩管理.html']]},
      platform:{home:'工作台.html',user:'平台运营管理员',org:'产业培育运营中心',groups:[['专区内容管理','file','通知公告管理.html'],['培训课程管理','book','课程管理.html'],['考试项目管理','shield','考试管理.html'],['机构管理','building','培训机构管理.html'],['报名管理','receipt','报名记录.html'],['送考管理','clipboard',[['送考进度','送考进度.html'],['送考订单','送考订单.html']]],['业务档案','graduation','一人一档.html']]}
    }[role];
    const here=role==='training'?'送考缴费.html':'送考订单.html';
    const groups=conf.groups.map(g=>Array.isArray(g[2])?`<div class="nav-group open"><button class="nav-group-title active-parent" type="button"><span data-icon="${g[1]}"></span><span>${g[0]}</span><span class="chev" data-icon="chevronRight"></span></button><div class="nav-children">${g[2].map(x=>`<a class="nav-link ${x[1]===here?'active':''}" href="${x[1]}">${x[0]}</a>`).join('')}</div></div>`:`<a class="nav-group-title" href="${g[2]}"><span data-icon="${g[1]}"></span><span>${g[0]}</span></a>`).join('');
    return `<header class="topbar"><button class="mobile-menu-trigger" type="button"><span data-icon="menu"></span></button><a class="brand" href="${conf.home}"><img src="assets/platform-logo.svg" alt="湖北省智能建造产业互联网平台"></a><div class="topbar-right"><button class="top-action" data-toast="暂无新增待办"><span data-icon="bell"></span></button><div class="user"><div class="avatar"><span data-icon="user"></span></div><div class="user-copy"><strong>${conf.user}</strong><span>${conf.org}</span></div><button><span data-icon="chevronDown"></span></button></div></div></header><aside class="sidebar"><button class="sidebar-toggle"><span data-icon="menu"></span></button><nav class="nav-section">${groups}</nav></aside>`;
  }
  function tag(o){return `<span class="tag tag-${color[o.state]}"><span class="status-dot"></span>${status(o)}</span>`}
  function header(title,back){return `<header class="page-header"><div class="page-head-row"><div><h1 class="page-title">${title}</h1><div class="breadcrumb"><a href="${role==='platform'?'工作台.html':'机构信息.html'}">${role==='platform'?'工作台':'机构信息'}</a><span class="muted">/</span><a href="${back}">送考管理</a><span class="muted">/</span><span class="muted">${title}</span></div></div><div class="header-actions" id="headerActions"></div></div></header>`}
  function filterOptions(states){return states.map(s=>`<option>${s}</option>`).join('')}
  function listPage(){
    const title=role==='training'?'送考缴费':'送考订单';
    const states=role==='training'?['全部','待缴费','待确认','已确认','未通过']:role==='evaluation'?['全部','待确认','已确认','未通过']:['全部','待缴费','待确认','已缴费','异常订单'];
    const help=role==='platform'?'仅用于查询培训机构与评价机构之间的缴费履约记录，平台不参与缴费和核款。':'一张已通过送考批次仅形成一张缴费单，缴费人员名单不可拆分或调整。';
    return `${nav()}<main class="app-main payment-page"><div class="page-wrap"><section class="content-card">${header(title,role==='training'?'送考缴费.html':'送考订单.html')}<div class="tabs" id="paymentTabs">${states.map((s,i)=>`<button class="tab ${i===0?'active':''}" data-state="${s}">${s}<span class="tab-count"></span></button>`).join('')}</div><section class="filter-panel compact-filter"><div class="filter-row"><div class="field"><label>关键词</label><div class="input-wrap"><span data-icon="search"></span><input id="keyword" class="control has-icon" placeholder="${role==='evaluation'?'缴费单号 / 送考批次号 / 培训机构':'缴费单号 / 送考批次号 / 工种'}"></div></div><div class="field"><label>${role==='evaluation'?'培训机构':'评价机构'}</label><div class="select-wrap"><select id="orgFilter" class="control"><option value="">全部</option><option>湖北数字建造培训中心</option><option>湖北省智能建造评价中心</option><option>湖北建造产业技能培训学校</option></select></div></div><div class="field"><label>状态</label><div class="select-wrap"><select id="stateFilter" class="control"><option value="">全部</option>${filterOptions(states.slice(1))}</select></div></div><div class="filter-actions"><button id="searchBtn" class="btn btn-primary"><span data-icon="search"></span>搜索</button><button id="resetBtn" class="btn"><span data-icon="rotate"></span>重置</button></div></div></section><p class="section-note">${help}</p><div class="standard-table-shell"><table class="standard-table"><thead id="paymentHead"></thead><tbody id="paymentRows"></tbody></table></div><div class="pagination"><span id="totalText"></span><button class="page-btn" disabled><span data-icon="chevronLeft"></span></button><button class="page-btn active">1</button><button class="page-btn"><span data-icon="chevronRight"></span></button><select class="page-size"><option>10 条/页</option></select></div></section></div></main><div class="toast-stack"></div>`;
  }
  function detailPage(){
    const id=new URLSearchParams(location.search).get('id')||dynamicId;
    const o=all().find(x=>x.id===id)||current();
    const title=role==='training'?'送考缴费详情':'送考订单详情';
    const list=role==='training'?'送考缴费.html':'送考订单.html';
    const basic=[['缴费单号',o.id],['当前状态',tag(o)],['送考批次号',`<a class="batch-link" href="${role==='platform'?'送考进度详情.html':'送考批次详情.html'}">${o.batch}</a>`],['工种',o.trade],['培训机构',o.training],['评价机构',o.evaluation],['缴费人数',o.count+'人'],['收费标准',money(o.price)+'/人'],['应缴金额',money(o.amount)],['创建时间',o.created]];
    if(role==='platform') basic.push(['实缴金额',money(o.paid)],['缴费提交时间',o.submitted]);
    const rows=people.map((p,i)=>`<tr><td>${i+1}</td><td>${p[0]}</td><td>${p[1]}</td><td>${p[2]}</td><td>${o.trade}</td>${role==='training'?'<td><span class="tag tag-green"><span class="status-dot"></span>已通过</span></td>':''}</tr>`).join('');
    const candidates=`<section class="section-card"><div class="section-head"><h2>缴费考生</h2><span class="candidate-count">共 ${o.count} 人</span></div>${role==='training'?'<p class="section-note">缴费人员来源于已审核通过的送考批次，进入缴费阶段后人员名单不可调整。</p>':''}<div class="standard-table-shell"><table class="standard-table" style="min-width:760px"><thead><tr><th>序号</th><th>姓名</th><th>身份证号</th><th>手机号</th><th>工种</th>${role==='training'?'<th>资格审核结果</th>':''}</tr></thead><tbody>${rows}</tbody></table></div></section>`;
    let extra='';
    if(role==='training') extra=trainingDetail(o);
    if(role==='evaluation') extra=evaluationDetail(o);
    if(role==='platform') extra=platformDetail(o);
    return `${nav()}<main class="app-main payment-page"><div class="page-wrap"><section class="content-card">${header(title,list)}<section class="section-card"><div class="section-head"><h2>订单基本信息</h2></div><div class="detail-grid">${basic.map(x=>`<div class="detail-item"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join('')}</div></section>${candidates}${extra}</section></div></main>${modalHtml()}<div class="toast-stack"></div>`;
  }
function receiver(o){return `<section class="section-card"><div class="section-head"><h2>评价机构收款信息</h2><button class="btn" id="copyReceiver">复制收款信息</button></div><div class="copy-grid"><div><span>收款单位名称</span><strong>${o.evaluation}</strong></div><div><span>开户银行</span><strong>中国建设银行武汉光谷支行</strong></div><div><span>银行账号</span><strong>4200 1666 8888 0128</strong></div><div><span>考试收费标准</span><strong>${money(o.price)}/人</strong></div><div><span>应缴金额</span><strong>${money(o.amount)}</strong></div><div><span>转账附言</span><strong>${o.training}｜${o.batch}｜${o.trade}考试费</strong></div></div></section>`}
  function paymentInfo(o,editable){
    if(role==='platform'&&o.state==='unpaid')return `<section class="section-card"><div class="section-head"><h2>缴费凭证</h2></div><div class="readonly-empty">培训机构暂未提交缴费信息</div></section>`;
    if(!editable)return `<section class="section-card"><div class="section-head"><h2>${role==='evaluation'?'培训机构付款信息':'缴费凭证'}</h2></div><div class="detail-grid"><div class="detail-item"><span>付款单位</span><strong>${o.training}</strong></div><div class="detail-item"><span>付款账号</span><strong>4200 **** 8896</strong></div><div class="detail-item"><span>实缴金额</span><strong>${money(o.paid||o.amount)}</strong></div><div class="detail-item"><span>转账日期</span><strong>${o.date||'2026-09-10'}</strong></div><div class="detail-item"><span>银行流水号</span><strong>${o.serial||'HB202609100004'}</strong></div><div class="detail-item"><span>转账凭证</span><strong><button class="link" data-preview>查看凭证</button></strong></div><div class="detail-item"><span>培训机构备注</span><strong>送考批次考试费</strong></div><div class="detail-item"><span>提交时间</span><strong>${o.submitted}</strong></div></div></section>`;
    return `<section class="section-card"><div class="section-head"><h2>培训机构缴费信息</h2></div><div class="form-grid"><div class="field"><label class="required">付款单位</label><input id="payer" class="control" value="${o.training}"></div><div class="field"><label>付款账号</label><input id="payerAccount" class="control" value="4200166888900128"></div><div class="field"><label class="required">实缴金额</label><input id="paidAmount" type="number" class="control" value="${o.paid||o.amount}"></div><div class="field"><label class="required">转账日期</label><input id="transferDate" type="date" class="control" value="${o.date||'2026-09-10'}"></div><div class="field"><label class="required">银行流水号</label><input id="serial" class="control" value="${o.serial}"></div><div class="field"><label class="required">转账凭证</label><div class="upload-box"><input id="proof" type="file" accept="image/*,.pdf"><span id="fileName">${o.proof||'未选择文件'}</span></div></div><div class="field" style="grid-column:1/-1"><label>备注</label><textarea id="remark" class="control textarea">${o.remark||''}</textarea></div></div></section>`;
  }
  function result(o){
    if(o.state==='pending')return `<section class="section-card"><div class="section-head"><h2>核款结果</h2></div><div class="result-box"><h3>等待评价机构确认到账</h3><p>培训机构已提交缴费信息，评价机构正在核对。</p></div></section>`;
    if(o.state==='confirmed')return `<section class="section-card"><div class="section-head"><h2>核款结果</h2></div><div class="result-box success"><h3>核款结果：已确认</h3><p>核款人员：王审核　核款时间：${o.checked||'2026-09-11 09:15'}　核款意见：款项已到账，信息一致。</p></div></section>`;
    if(o.state==='failed')return `<section class="section-card"><div class="section-head"><h2>核款结果</h2></div><div class="result-box danger"><h3>核款结果：未通过</h3><p>核款人员：王审核　核款时间：${o.checked||'2026-09-11 09:15'}</p><p>不通过原因：${o.reason||'转账信息无法核实，请修改后重新提交。'}</p></div></section>`;
    return '';
  }
  function trainingDetail(o){return `${receiver(o)}${paymentInfo(o,o.state==='unpaid'||o.state==='failed')}${result(o)}`}
function evaluationDetail(o){return `${paymentInfo(o,false)}${o.state==='pending'?'':result(o)}${timeline(o)}`}
  function platformDetail(o){
    const parties=`<section class="section-card"><div class="section-head"><h2>收付款信息</h2></div><div class="detail-grid"><div class="detail-item"><span>培训机构名称</span><strong>${o.training}</strong></div><div class="detail-item"><span>付款账户</span><strong>${o.state==='unpaid'?'—':'4200 **** 8896'}</strong></div><div class="detail-item"><span>评价机构名称</span><strong>${o.evaluation}</strong></div><div class="detail-item"><span>开户银行</span><strong>中国建设银行武汉光谷支行</strong></div><div class="detail-item"><span>收款账号</span><strong>4200 **** 0128</strong></div></div></section>`;
    const check=o.state==='unpaid'?'<div class="readonly-empty">尚未提交缴费，无核款信息</div>':o.state==='pending'?'<div class="result-box"><h3>等待评价机构确认到账</h3></div>':result(o).replace(/^<section[^>]*>|<\/section>$/g,'');
    return `${parties}${paymentInfo(o,false)}<section class="section-card"><div class="section-head"><h2>评价机构核款信息</h2></div>${check}</section>${timeline(o)}`;
  }
  function timeline(o){
    const items=[['2026-09-10 09:30','送考批次审核通过'],['2026-09-10 09:31','系统生成缴费单']];
    if(o.state!=='unpaid')items.push([o.submitted==='—'?'2026-09-10 15:20':o.submitted,'培训机构提交缴费信息']);
    if(o.state==='confirmed')items.push([o.checked||'2026-09-11 09:15','评价机构确认到账']);
    if(o.state==='failed')items.push([o.checked||'2026-09-11 09:15','评价机构核款未通过']);
    return `<section class="section-card"><div class="section-head"><h2>流转记录</h2></div><ul class="timeline">${items.map(x=>`<li><time>${x[0]}</time>${x[1]}</li>`).join('')}</ul></section>`;
  }
  function modalHtml(){return `<div id="paymentModal" class="modal-mask"><section class="modal"><header class="modal-head"><h2 id="modalTitle">确认操作</h2><button class="icon-btn" type="button" data-modal-close><span data-icon="close"></span></button></header><div class="modal-body"><p id="modalText"></p><label id="reasonWrap" class="field" hidden><span class="required">不通过原因</span><textarea id="rejectReason" class="control textarea" placeholder="请填写不通过原因"></textarea></label><div id="modalError" class="error"></div></div><footer class="modal-foot"><button class="btn" data-modal-close>取消</button><button id="modalConfirm" class="btn btn-primary">确认</button></footer></section></div>`}
  function setupList(){
    const head={training:['缴费单号','送考批次号','工种','评价机构','缴费人数','收费标准','应缴金额','创建时间','缴费状态','操作'],evaluation:['缴费单号','送考批次号','培训机构','工种','缴费人数','应缴金额','实缴金额','转账日期','提交时间','状态','操作'],platform:['缴费单号','送考批次号','培训机构','评价机构','工种','缴费人数','应缴金额','实缴金额','当前状态','创建时间','缴费提交时间','操作']}[role];
    document.getElementById('paymentHead').innerHTML='<tr>'+head.map((h,i)=>`<th class="${i===head.length-1?'sticky-op':''}">${h}</th>`).join('')+'</tr>';
    let selected='全部';
    function render(){
      const key=document.getElementById('keyword').value.trim().toLowerCase(); const sf=document.getElementById('stateFilter').value; const org=document.getElementById('orgFilter').value;
      let data=all(); if(role==='evaluation')data=data.filter(o=>o.state!=='unpaid');
      data=data.filter(o=>(selected==='全部'||status(o)===selected)&&(!sf||status(o)===sf)&&(!org||(role==='evaluation'?o.training:o.evaluation)===org)&&(!key||[o.id,o.batch,o.trade,o.training].join(' ').toLowerCase().includes(key)));
      document.getElementById('paymentRows').innerHTML=data.map(rowHtml).join('')||`<tr class="empty-row"><td colspan="${head.length}">未找到符合条件的记录</td></tr>`;
      document.getElementById('totalText').textContent=`共 ${data.length} 条`;
      document.querySelectorAll('#paymentTabs .tab').forEach(t=>{const label=t.dataset.state;const count=all().filter(o=>(role!=='evaluation'||o.state!=='unpaid')&&(label==='全部'||status(o)===label)).length;t.querySelector('.tab-count').textContent=count});
    }
    function rowHtml(o){
      const href=`${role==='training'?'送考缴费详情.html':'送考订单详情.html'}?id=${o.id}`;
      const op=role==='training'?(o.state==='unpaid'?'去缴费':o.state==='failed'?'重新提交':'查看'):role==='evaluation'&&o.state==='pending'?'核款':'查看';
      const common=`<td><a class="link" href="${href}">${o.id}</a></td><td>${o.batch}</td>`;
      if(role==='training')return `<tr>${common}<td>${o.trade}</td><td>${o.evaluation}</td><td>${o.count}人</td><td>${money(o.price)}/人</td><td class="money">${money(o.amount)}</td><td>${o.created}</td><td>${tag(o)}</td><td class="sticky-op"><a class="link" href="${href}">${op}</a></td></tr>`;
      if(role==='evaluation')return `<tr>${common}<td>${o.training}</td><td>${o.trade}</td><td>${o.count}人</td><td>${money(o.amount)}</td><td class="money">${money(o.paid||o.amount)}</td><td>${o.date||'—'}</td><td>${o.submitted}</td><td>${tag(o)}</td><td class="sticky-op"><a class="link" href="${href}">${op}</a></td></tr>`;
      return `<tr>${common}<td>${o.training}</td><td>${o.evaluation}</td><td>${o.trade}</td><td>${o.count}人</td><td>${money(o.amount)}</td><td>${money(o.paid)}</td><td>${tag(o)}</td><td>${o.created}</td><td>${o.submitted}</td><td class="sticky-op"><a class="link" href="${href}">查看</a></td></tr>`;
    }
    document.querySelectorAll('#paymentTabs .tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('#paymentTabs .tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');selected=t.dataset.state;document.getElementById('stateFilter').value='';render()}));
    document.getElementById('searchBtn').onclick=render; document.getElementById('resetBtn').onclick=()=>{document.getElementById('keyword').value='';document.getElementById('orgFilter').value='';document.getElementById('stateFilter').value='';selected='全部';document.querySelectorAll('#paymentTabs .tab').forEach((x,i)=>x.classList.toggle('active',i===0));render()}; render();
  }
  function setupDetail(){
    const id=new URLSearchParams(location.search).get('id')||dynamicId; const o=all().find(x=>x.id===id)||current();
    const headerActions=document.getElementById('headerActions');
    headerActions.innerHTML=`<a class="btn" href="${role==='training'?'送考缴费.html':'送考订单.html'}"><span data-icon="arrowLeft"></span>返回列表</a>`;
    if(role==='training'&&(o.state==='unpaid'||o.state==='failed')) headerActions.insertAdjacentHTML('beforeend',`<button class="btn btn-primary" data-action="submit">${o.state==='failed'?'重新提交':'提交缴费信息'}</button>`);
    if(role==='evaluation'&&o.state==='pending') headerActions.insertAdjacentHTML('beforeend','<button class="btn btn-primary" data-action="confirm">确认到账</button><button class="btn btn-danger" data-action="reject">核款不通过</button>');
    document.getElementById('proof')?.addEventListener('change',e=>document.getElementById('fileName').textContent=e.target.files[0]?.name||'未选择文件');
    document.getElementById('copyReceiver')?.addEventListener('click',()=>{navigator.clipboard?.writeText(`${o.evaluation}\n中国建设银行武汉光谷支行\n4200166688880128\n${o.amount}元`);toast('收款信息已复制')});
    document.querySelectorAll('[data-preview]').forEach(b=>b.onclick=()=>toast('已打开转账凭证预览（模拟）'));
    document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>openModal(b.dataset.action,o));
  }
  function openModal(action,o){
    const m=document.getElementById('paymentModal'), reason=document.getElementById('reasonWrap'); m.dataset.action=action; reason.hidden=action!=='reject';
    const cfg={submit:['确认提交缴费信息？','提交后将由评价机构进行到账确认。','确认提交'],confirm:['确认已到账？','确认后，本订单对应考生将进入待排考考生名单。','确认到账'],reject:['核款不通过','请填写本次核款不通过原因。','确认不通过']}[action];
    document.getElementById('modalTitle').textContent=cfg[0];document.getElementById('modalText').textContent=cfg[1];document.getElementById('modalConfirm').textContent=cfg[2];document.getElementById('modalError').textContent='';m.classList.add('open');
    document.getElementById('modalConfirm').onclick=()=>applyAction(action,o);
  }
  function applyAction(action,o){
    const state=read(); let next=Object.assign({},o); const err=document.getElementById('modalError');
    if(action==='submit'){
      const required=[['payer','付款单位'],['paidAmount','实缴金额'],['transferDate','转账日期'],['serial','银行流水号']]; const missing=required.find(x=>!document.getElementById(x[0])?.value.trim()); if(missing){err.textContent=`请填写${missing[1]}`;return} if(!document.getElementById('proof')?.files[0]&&!o.proof){err.textContent='请上传转账凭证';return}
      next=Object.assign(next,{state:'pending',submitted:'2026-09-11 10:20',paid:Number(document.getElementById('paidAmount').value),date:document.getElementById('transferDate').value,serial:document.getElementById('serial').value,proof:document.getElementById('proof').files[0]?.name||o.proof,remark:document.getElementById('remark').value,reason:''});
    }
    if(action==='confirm'){next=Object.assign(next,{state:'confirmed',checked:'2026-09-11 10:30',reason:''});localStorage.setItem('sendPaymentAdmittedV1','1')}
    if(action==='reject'){const r=document.getElementById('rejectReason').value.trim();if(!r){err.textContent='请填写不通过原因';return}next=Object.assign(next,{state:'failed',checked:'2026-09-11 10:30',reason:r})}
    state[dynamicId]=next;write(state);location.href=(role==='training'?'送考缴费详情.html':'送考订单详情.html')+'?id='+dynamicId;
  }
  function toast(text){const stack=document.querySelector('.toast-stack');const el=document.createElement('div');el.className='toast';el.textContent=text;stack.appendChild(el);setTimeout(()=>el.remove(),2200)}
  document.body.innerHTML=(detail?detailPage():listPage());
  if(detail)setupDetail();else setupList();
  document.querySelectorAll('[data-modal-close]').forEach(b=>b.onclick=()=>document.getElementById('paymentModal').classList.remove('open'));
})();
