(function(){
  const trainingRecords={
    zhang:{archiveNo:'PXDA-2026-00128',registrationNo:'HBIC-2026-000128',name:'张明',idNo:'420106********2412',phone:'138****6726',company:'中建三局二公司',job:'建筑信息模型技术员',project:'建筑信息模型技术员实务培训',org:'湖北数字建造培训中心',className:'建筑信息模型技术员实务班',mode:'混合培训',start:'2026-05-10',end:'2026-05-20',hours:'40 / 40学时',online:'32学时',offline:'8学时',attendance:'4 / 4次',practice:'2项',status:'已完成',sendStatus:'已送考',completeTime:'2026-05-20 17:30',completeBy:'王老师',resultNote:'规定学时、出勤及实训记录均已达标。',exams:['zhang'],certificate:'zhang'},
    li:{archiveNo:'PXDA-2026-00129',registrationNo:'HBIC-2026-000129',name:'李建国',idNo:'420106********1187',phone:'137****3085',company:'湖北建造产业发展有限公司',job:'装配式建筑施工员',project:'装配式建筑施工员强化培训',org:'湖北建造产业技能培训学校',className:'装配式建筑施工员强化班',mode:'混合培训',start:'2026-06-02',end:'2026-06-15',hours:'48 / 48学时',online:'32学时',offline:'16学时',attendance:'6 / 6次',practice:'3项',status:'已完成',sendStatus:'已送考',completeTime:'2026-06-15 16:40',completeBy:'刘老师',resultNote:'线上学习、线下实训和出勤均已完成。',exams:['li-first','li-retake'],certificate:'li'},
    zhou:{archiveNo:'PXDA-2026-00130',registrationNo:'HBIC-2026-000130',name:'周志强',idNo:'420111********0038',phone:'136****7291',company:'荆楚智能建造工程有限公司',job:'智能装备操作员',project:'智能装备操作员实训',org:'荆楚智能建造人才培训基地',className:'智能装备操作员实训班',mode:'线下培训',start:'2026-07-08',end:'2026-07-22',hours:'56 / 56学时',online:'0学时',offline:'56学时',attendance:'8 / 8次',practice:'5项',status:'已完成',sendStatus:'已送考',completeTime:'2026-07-22 17:10',completeBy:'陈老师',resultNote:'线下课程、实训项目和考勤记录均已完成。',exams:['zhou'],certificate:null}
  };
  const examRecords={
    zhang:{archiveNo:'KSD-2026-000201',registrationNo:'HBIC-2026-000128',name:'张明',idNo:'420106********2412',phone:'138****6726',company:'中建三局二公司',job:'建筑信息模型技术员',project:'建筑信息模型技术员职业技能评价',org:'湖北省智能建造评价中心',batch:'KS-20260528-01',date:'2026-05-28 09:00',type:'初考',theory:'86',practice:'90',result:'合格',room:'武汉市洪山区智能建造评价基地A201',admission:'ZK-20260528-0128',sendBatch:'SKPC-20260522-0001',sendTime:'2026-05-22 14:20',training:'zhang',previous:null,next:null,certificate:'zhang'},
    'li-first':{archiveNo:'KSD-2026-000202',registrationNo:'HBIC-2026-000129',name:'李建国',idNo:'420106********1187',phone:'137****3085',company:'湖北建造产业发展有限公司',job:'装配式建筑施工员',project:'装配式建筑施工员职业技能评价',org:'湖北省智能建造评价中心',batch:'KS-20260622-02',date:'2026-06-22 09:00',type:'初考',theory:'58',practice:'76',result:'不合格',room:'武汉市洪山区智能建造评价基地B102',admission:'ZK-20260622-0118',sendBatch:'SKPC-20260618-0003',sendTime:'2026-06-18 15:10',training:'li',previous:null,next:'li-retake',certificate:null},
    'li-retake':{archiveNo:'KSD-2026-000203',registrationNo:'HBIC-2026-000129',name:'李建国',idNo:'420106********1187',phone:'137****3085',company:'湖北建造产业发展有限公司',job:'装配式建筑施工员',project:'装配式建筑施工员职业技能评价',org:'湖北省智能建造评价中心',batch:'KS-20260706-01',date:'2026-07-06 09:00',type:'补考',theory:'82',practice:'78',result:'合格',room:'武汉市洪山区智能建造评价基地B103',admission:'ZK-20260706-0118',sendBatch:'SKPC-20260618-0003',sendTime:'2026-06-18 15:10',training:'li',previous:'li-first',next:null,certificate:'li'},
    zhou:{archiveNo:'KSD-2026-000204',registrationNo:'HBIC-2026-000130',name:'周志强',idNo:'420111********0038',phone:'136****7291',company:'荆楚智能建造工程有限公司',job:'智能装备操作员',project:'智能装备操作员职业技能评价',org:'湖北省智能建造评价中心',batch:'KS-20260730-03',date:'2026-07-30 09:00',type:'初考',theory:'72',practice:'55',result:'不合格',room:'武汉市洪山区智能建造评价基地实操场C1',admission:'ZK-20260730-0038',sendBatch:'SKPC-20260725-0005',sendTime:'2026-07-25 11:00',training:'zhou',previous:null,next:null,certificate:null}
  };
  const certificateRecords={
    zhang:{archiveNo:'ZSDA-2026-000128',certificateNo:'HBCERT-2026-000128',verifyNo:'HBVERIFY-000128',name:'张明',idNo:'420106********2412',phone:'138****6726',company:'中建三局二公司',job:'建筑信息模型技术员',certificateName:'建筑信息模型技术员职业技能证书',level:'—',issuer:'湖北省智能建造评价中心',issueDate:'2026-06-03',validity:'长期有效',status:'有效',exam:'zhang',training:'zhang',codeTime:'2026-06-02 16:20',codeResult:'第三方赋码成功'},
    li:{archiveNo:'ZSDA-2026-000129',certificateNo:'HBCERT-2026-000129',verifyNo:'HBVERIFY-000129',name:'李建国',idNo:'420106********1187',phone:'137****3085',company:'湖北建造产业发展有限公司',job:'装配式建筑施工员',certificateName:'装配式建筑施工员职业技能证书',level:'—',issuer:'湖北省智能建造评价中心',issueDate:'2026-07-10',validity:'长期有效',status:'有效',exam:'li-retake',training:'li',codeTime:'2026-07-09 15:35',codeResult:'第三方赋码成功'}
  };

  function queryRecord(fallback){const value=new URLSearchParams(location.search).get('record');return value||fallback}
  function status(value){const color=value==='合格'||value==='已完成'||value==='已送考'||value==='有效'?'green':value==='不合格'?'red':value==='补考'?'orange':'blue';return '<span class="archive-status '+color+'">'+value+'</span>'}
  function item(label,value,span){return '<div class="archive-detail-item '+(span?'span-'+span:'')+'"><span class="label">'+label+'</span><span class="value">'+value+'</span></div>'}
  function section(title,body,action){return '<section class="archive-section"><header class="archive-section-head"><h2>'+title+'</h2>'+(action||'')+'</header><div class="archive-section-body">'+body+'</div></section>'}
  function hero(icon,title,sub,result,badge){return '<div class="archive-hero"><div class="archive-hero-main"><div class="archive-hero-icon"><span data-icon="'+icon+'"></span></div><div><h2>'+title+'</h2><p>'+sub+'</p></div></div><div class="archive-hero-side"><span class="hero-result">'+result+'</span>'+badge+'</div></div>'}
  function related(title,meta,href,label){return '<article class="archive-related-card"><div><h3>'+title+'</h3><p>'+meta+'</p></div><div class="actions"><a class="link" href="'+href+'">'+(label||'查看档案')+'</a></div></article>'}

  function renderTrainingDetail(){
    const key=queryRecord('zhang'),r=trainingRecords[key]||trainingRecords.zhang;
    let examCards=r.exams.map(function(examKey){const e=examRecords[examKey];return related(e.type+'｜'+e.project,e.archiveNo+' · '+e.date+' · '+e.result,'考试档案详情.html?record='+examKey)}).join('');
    const certCard=r.certificate?related(certificateRecords[r.certificate].certificateName,certificateRecords[r.certificate].certificateNo+' · '+certificateRecords[r.certificate].issueDate,'证书档案详情.html?record='+r.certificate):'<article class="archive-related-card"><div><h3>证书档案</h3><p>当前培训关联考试未合格，暂无证书记录</p></div></article>';
    document.getElementById('archive-detail-root').innerHTML=
      hero('book',r.name+'｜'+r.project,'培训档案编号：'+r.archiveNo+' · 平台报名编号：'+r.registrationNo,r.status,status(r.sendStatus))+
      section('报名与人员信息','<div class="archive-detail-grid">'+item('姓名',r.name)+item('证件号码',r.idNo)+item('联系电话',r.phone)+item('所属企业',r.company)+item('平台报名编号',r.registrationNo)+item('培训工种',r.job)+item('培训项目',r.project,2)+'</div>')+
      section('培训基本信息','<div class="archive-detail-grid">'+item('培训机构',r.org)+item('培训班次',r.className)+item('培训方式',r.mode)+item('培训周期',r.start+' 至 '+r.end)+item('培训学时',r.hours)+item('线上学时',r.online)+item('线下学时',r.offline)+item('线下出勤',r.attendance)+'</div>')+
      section('培训过程记录','<div class="archive-kpi-grid"><div class="archive-kpi"><span>规定学时</span><strong>'+r.hours.split(' / ')[1]+'</strong></div><div class="archive-kpi"><span>已完成学时</span><strong>'+r.hours.split(' / ')[0]+'学时</strong></div><div class="archive-kpi"><span>线下出勤</span><strong>'+r.attendance+'</strong></div><div class="archive-kpi"><span>实训记录</span><strong>'+r.practice+'</strong></div></div>')+
      section('培训完成信息','<div class="archive-detail-grid">'+item('完成状态',status(r.status))+item('确认时间',r.completeTime)+item('确认人',r.completeBy)+item('送考状态',status(r.sendStatus))+item('完成结论',r.resultNote,4)+'</div>')+
      section('关联考试与证书','<div class="archive-related-grid">'+examCards+certCard+'</div>');
  }

  function renderExamDetail(){
    const key=queryRecord('zhang'),r=examRecords[key]||examRecords.zhang,t=trainingRecords[r.training];
    let relation='';
    if(r.previous){const p=examRecords[r.previous];relation+=related('关联初考',p.archiveNo+' · '+p.date+' · '+p.result,'考试档案详情.html?record='+r.previous)}
    if(r.next){const n=examRecords[r.next];relation+=related('后续补考',n.archiveNo+' · '+n.date+' · '+n.result,'考试档案详情.html?record='+r.next)}
    relation+=related('来源培训档案',t.archiveNo+' · '+t.className,'培训档案详情.html?record='+r.training);
    if(r.certificate){const c=certificateRecords[r.certificate];relation+=related('关联证书档案',c.certificateNo+' · '+c.issueDate,'证书档案详情.html?record='+r.certificate)}
    else if(r.result==='不合格'&&!r.next){relation+='<article class="archive-related-card"><div><h3>证书档案</h3><p>本次考试不合格，未生成证书</p></div></article>'}
    document.getElementById('archive-detail-root').innerHTML=
      hero('shield',r.name+'｜'+r.project,'考试档案编号：'+r.archiveNo+' · 平台报名编号：'+r.registrationNo,r.result,status(r.type))+
      section('人员与来源培训','<div class="archive-detail-grid">'+item('姓名',r.name)+item('证件号码',r.idNo)+item('联系电话',r.phone)+item('所属企业',r.company)+item('培训工种',r.job)+item('来源培训档案','<a class="link" href="培训档案详情.html?record='+r.training+'">'+t.archiveNo+'</a>')+item('来源培训班次',t.className,2)+'</div>')+
      section('考试安排','<div class="archive-detail-grid">'+item('评价项目',r.project,2)+item('评价机构',r.org,2)+item('考试批次',r.batch)+item('考试类型',r.type)+item('考试时间',r.date)+item('准考证号',r.admission)+item('考场',r.room,2)+item('送考批次',r.sendBatch)+item('送考时间',r.sendTime)+'</div>')+
      section('考试成绩','<div class="archive-score-grid"><div class="archive-score"><span>理论成绩</span><strong>'+r.theory+'分</strong></div><div class="archive-score"><span>实操成绩</span><strong>'+r.practice+'分</strong></div><div class="archive-score"><span>考试结论</span><strong>'+r.result+'</strong></div></div>')+
      section('关联档案','<div class="archive-related-grid">'+relation+'</div>');
  }

  function renderCertificateDetail(){
    const key=queryRecord('zhang'),r=certificateRecords[key]||certificateRecords.zhang,e=examRecords[r.exam],t=trainingRecords[r.training];
    document.getElementById('archive-detail-root').innerHTML=
      hero('graduation',r.name+'｜'+r.certificateName,'证书档案编号：'+r.archiveNo+' · 证书编号：'+r.certificateNo,r.status,status(r.status))+
      section('持证人信息','<div class="archive-detail-grid">'+item('姓名',r.name)+item('证件号码',r.idNo)+item('联系电话',r.phone)+item('所属企业',r.company)+item('工种',r.job)+item('技能等级',r.level)+item('平台报名编号',e.registrationNo,2)+'</div>')+
      section('证书信息','<div class="archive-detail-grid">'+item('证书名称',r.certificateName,2)+item('证书编号',r.certificateNo)+item('证书状态',status(r.status))+item('发证机构',r.issuer,2)+item('发证日期',r.issueDate)+item('有效期',r.validity)+item('第三方赋码结果',r.codeResult,2)+item('赋码时间',r.codeTime)+item('查验码',r.verifyNo)+'</div>')+
      section('来源考试与培训','<div class="archive-related-grid">'+related('来源考试档案',e.archiveNo+' · '+e.type+' · '+e.date+' · '+e.result,'考试档案详情.html?record='+r.exam)+related('来源培训档案',t.archiveNo+' · '+t.className,'培训档案详情.html?record='+r.training)+'</div>')+
      section('证书查验结果','<div id="verify" class="archive-detail-grid">'+item('证书编号',r.certificateNo)+item('持证人',r.name)+item('发证机构',r.issuer)+item('查验结论',status('有效'))+item('查验码',r.verifyNo,2)+item('最近查验时间','2026-08-24 10:18',2)+'</div>');
  }

  function bindFilters(){
    const page=document.querySelector('[data-archive-list]');if(!page)return;
    const rows=[].slice.call(page.querySelectorAll('tbody tr[data-record-row]'));
    const fields=[].slice.call(page.querySelectorAll('[data-archive-filter]'));
    const empty=page.querySelector('.archive-empty-row');
    function run(){let shown=0;rows.forEach(function(row){const ok=fields.every(function(field){const v=(field.value||'').trim().toLowerCase();if(!v)return true;const name=field.getAttribute('data-field');const source=name==='keyword'?row.textContent:(row.getAttribute('data-'+name)||'');return source.toLowerCase().indexOf(v)>-1});row.classList.toggle('hidden',!ok);if(ok)shown++});if(empty)empty.classList.toggle('hidden',shown!==0);const count=page.querySelector('[data-visible-count]');if(count)count.textContent=shown}
    const search=page.querySelector('[data-archive-search]');if(search)search.addEventListener('click',run);
    const reset=page.querySelector('[data-archive-reset]');if(reset)reset.addEventListener('click',function(){fields.forEach(function(f){f.value=''});run()});
    fields.forEach(function(f){f.addEventListener('change',run);if(f.tagName==='INPUT')f.addEventListener('keydown',function(e){if(e.key==='Enter')run()})});
  }

  document.addEventListener('DOMContentLoaded',function(){
    const type=document.body.getAttribute('data-archive-detail');
    if(type==='training')renderTrainingDetail();
    if(type==='exam')renderExamDetail();
    if(type==='certificate')renderCertificateDetail();
    bindFilters();
  });
})();
