(function () {
  const page = document.body.dataset.pageId;
  const card = document.querySelector('.content-card');
  if (!card) return;

  const breadcrumb = (current, href) => `
    <div class="breadcrumb">
      <a href="工作台.html">工作台</a><span class="muted">/</span>
      <a href="${href}">业务档案</a><span class="muted">/</span>
      <span class="muted">${current}</span>
    </div>`;

  if (page === '一人一档.html') {
    card.innerHTML = `
      <header class="page-header">
        <div class="page-head-row">
          <div><h1 class="page-title">一人一档</h1>${breadcrumb('一人一档', '一人一档.html')}</div>
        </div>
      </header>
      <section class="filter-panel dossier-filter-panel">
        <div class="filter-row">
          <div class="field dossier-keyword-field">
            <label>关键词</label>
            <div class="input-wrap"><span data-icon="search"></span><input id="dossier-keyword" class="control has-icon" placeholder="姓名 / 身份证号 / 手机号 / 所属企业"></div>
          </div>
          <div class="field"><label>所属企业</label><div class="select-wrap"><select id="dossier-company" class="control"><option value="">全部</option><option>中建三局二公司</option><option>湖北建造科技有限公司</option><option>武汉数字建设有限公司</option></select></div></div>
          <div class="field"><label>涉及工种</label><div class="select-wrap"><select id="dossier-trade" class="control"><option value="">全部</option><option>建筑机器人操作员</option><option>建筑信息模型技术员</option><option>装配式建筑施工员</option></select></div></div>
          <div class="filter-actions"><button id="dossier-search" class="btn btn-primary"><span data-icon="search"></span>搜索</button><button id="dossier-reset" class="btn"><span data-icon="rotate"></span>重置</button></div>
        </div>
      </section>
      <div class="standard-table-shell"><table class="standard-table dossier-list-table" style="min-width:1180px">
        <thead><tr><th>姓名</th><th>身份证号</th><th>手机号</th><th>所属企业</th><th>涉及工种</th><th>培训考试档案</th><th>证书数量</th><th>最新取证日期</th><th class="sticky-op">操作</th></tr></thead>
        <tbody>
          <tr data-dossier-row><td>张三</td><td>420106********2412</td><td>138****6726</td><td>中建三局二公司</td><td>建筑机器人操作员、建筑信息模型技术员</td><td>3份</td><td><strong class="number-emphasis">2本</strong></td><td>2026-06-03</td><td class="sticky-op"><a class="link" href="一人一档详情.html">查看档案</a></td></tr>
          <tr data-dossier-row><td>李建国</td><td>420111********1187</td><td>137****3085</td><td>湖北建造科技有限公司</td><td>装配式建筑施工员</td><td>2份</td><td><strong class="number-emphasis">1本</strong></td><td>2025-11-18</td><td class="sticky-op"><a class="link" href="一人一档详情.html?person=li">查看档案</a></td></tr>
          <tr data-dossier-row><td>周志强</td><td>420105********0038</td><td>136****7291</td><td>武汉数字建设有限公司</td><td>建筑信息模型技术员</td><td>2份</td><td><strong class="number-emphasis">1本</strong></td><td>2025-08-26</td><td class="sticky-op"><a class="link" href="一人一档详情.html?person=zhou">查看档案</a></td></tr>
          <tr id="dossier-empty" class="empty-row hidden"><td colspan="9">未找到符合条件的个人档案</td></tr>
        </tbody>
      </table></div>
      <div class="pagination"><span>共 286 份个人档案</span><button class="page-btn" disabled><span data-icon="chevronLeft"></span></button><button class="page-btn active">1</button><button class="page-btn" data-toast="已切换到第2页">2</button><button class="page-btn"><span data-icon="chevronRight"></span></button><select class="page-size"><option>10 条/页</option><option>20 条/页</option></select></div>`;

    const search = () => {
      const keyword = document.querySelector('#dossier-keyword').value.trim().toLowerCase();
      const company = document.querySelector('#dossier-company').value;
      const trade = document.querySelector('#dossier-trade').value;
      let visible = 0;
      document.querySelectorAll('[data-dossier-row]').forEach((row) => {
        const text = row.textContent.toLowerCase();
        const show = (!keyword || text.includes(keyword)) && (!company || text.includes(company)) && (!trade || text.includes(trade));
        row.classList.toggle('hidden', !show);
        if (show) visible += 1;
      });
      document.querySelector('#dossier-empty').classList.toggle('hidden', visible !== 0);
    };
    document.querySelector('#dossier-search').addEventListener('click', search);
    document.querySelector('#dossier-keyword').addEventListener('keydown', (event) => { if (event.key === 'Enter') search(); });
    document.querySelector('#dossier-reset').addEventListener('click', () => {
      document.querySelector('#dossier-keyword').value = '';
      document.querySelector('#dossier-company').value = '';
      document.querySelector('#dossier-trade').value = '';
      search();
    });
  }

  if (page === '一人一档详情.html') {
    card.innerHTML = `
      <header class="page-header"><div class="page-head-row"><div><a class="back-link" href="一人一档.html"><span data-icon="arrowLeft"></span>返回个人档案</a><h1 class="page-title">个人档案详情</h1>${breadcrumb('个人档案详情', '一人一档.html')}</div></div></header>
      <div class="detail-body dossier-detail-body">
        <div class="record-banner dossier-person-banner"><div class="record-banner-main"><span class="record-symbol"><span data-icon="user"></span></span><div><h2>张三 · 个人档案</h2><p>个人档案编号：GRDA-2026-000128</p></div></div></div>
        <section class="dossier-section">
          <div class="block-head"><h2>基本信息</h2></div>
          <div class="detail-grid dossier-basic-grid">
            <div class="detail-item"><span class="detail-label">身份证号</span><span class="detail-value">420106********2412</span></div>
            <div class="detail-item"><span class="detail-label">手机号</span><span class="detail-value">138****6726</span></div>
            <div class="detail-item"><span class="detail-label">所属企业</span><span class="detail-value">中建三局二公司</span></div>
            <div class="detail-item"><span class="detail-label">主要工种</span><span class="detail-value">建筑机器人操作员、建筑信息模型技术员</span></div>
          </div>
        </section>
        <section class="dossier-section">
          <div class="block-head"><h2>档案总览</h2></div>
          <div class="dossier-overview-metrics">
            <div><span>报名</span><strong>3</strong><small>次</small></div><div><span>培训</span><strong>3</strong><small>次</small></div><div><span>考试</span><strong>4</strong><small>次</small></div><div><span>证书</span><strong>2</strong><small>本</small></div>
          </div>
        </section>
        <section class="dossier-section">
          <div class="block-head"><h2>培训考试取证档案</h2></div>
          <div class="dossier-record-list">
            <article class="dossier-record-card"><div class="dossier-record-year">2026</div><div class="dossier-record-main"><div class="dossier-record-title"><h3>建筑机器人操作员</h3><span class="tag tag-green"><span class="status-dot"></span>已取证</span></div><div class="dossier-stage-flow"><span class="done">报名</span><i></i><span class="done">培训</span><i></i><span class="done">考试</span><i></i><span class="done">发证</span></div></div><a class="dossier-record-link" href="证书档案详情.html">查看档案 <span>›</span></a></article>
            <article class="dossier-record-card"><div class="dossier-record-year">2025</div><div class="dossier-record-main"><div class="dossier-record-title"><h3>BIM技术员三级</h3><span class="tag tag-orange"><span class="status-dot"></span>未取证</span></div><div class="dossier-stage-flow"><span class="done">报名</span><i></i><span class="done">培训</span><i></i><span class="failed">考试不合格</span></div></div><a class="dossier-record-link" href="考试档案详情.html">查看档案 <span>›</span></a></article>
            <article class="dossier-record-card"><div class="dossier-record-year">2024</div><div class="dossier-record-main"><div class="dossier-record-title"><h3>BIM技术员四级</h3><span class="tag tag-green"><span class="status-dot"></span>已取证</span></div><div class="dossier-stage-flow"><span class="done">报名</span><i></i><span class="done">培训</span><i></i><span class="done">考试</span><i></i><span class="done">发证</span></div></div><a class="dossier-record-link" href="证书档案详情.html#2024">查看档案 <span>›</span></a></article>
          </div>
        </section>
        <section class="dossier-section"><div class="block-head"><h2>证书档案</h2></div><div class="certificate-mini-grid"><a href="证书档案详情.html"><span data-icon="file"></span><div><strong>建筑机器人操作员职业技能证书</strong><small>HBCERT-2026-000128 · 2026-06-03</small></div><em>查看 ›</em></a><a href="证书档案详情.html#2024"><span data-icon="file"></span><div><strong>BIM技术员四级职业技能证书</strong><small>HBCERT-2024-000096 · 2024-09-18</small></div><em>查看 ›</em></a></div></section>
        <section class="dossier-section"><div class="block-head"><h2>档案材料</h2></div><div class="archive-material-grid"><a href="#" data-toast="正在预览身份证材料"><span data-icon="file"></span><div><strong>身份证材料</strong><small>身份证正反面.jpg</small></div></a><a href="#" data-toast="正在预览报名材料"><span data-icon="file"></span><div><strong>报名材料</strong><small>学历及工作证明.pdf</small></div></a><a href="#" data-toast="正在预览成绩材料"><span data-icon="file"></span><div><strong>成绩材料</strong><small>理论与实操成绩单.pdf</small></div></a><a href="#" data-toast="正在预览证书材料"><span data-icon="file"></span><div><strong>证书材料</strong><small>电子证书.pdf</small></div></a></div></section>
      </div>`;
  }

  if (page === '证书档案详情.html') {
    card.innerHTML = `
      <header class="page-header"><div class="page-head-row"><div><a class="back-link" href="一人一档详情.html"><span data-icon="arrowLeft"></span>返回个人档案</a><h1 class="page-title">培训考试取证档案详情</h1>${breadcrumb('档案详情', '一人一档.html')}</div></div></header>
      <div class="detail-body dossier-record-detail">
        <div class="record-banner"><div class="record-banner-main"><span class="record-symbol"><span data-icon="file"></span></span><div><h2>张三 · 建筑机器人操作员</h2><p>档案编号：KQDA-2026-000128　·　证书编号：HBCERT-2026-000128</p></div></div><div class="record-banner-side"><span class="tag tag-green"><span class="status-dot"></span>已取证</span></div></div>
        <div class="two-column dossier-record-layout"><div class="main-stack">
          <section class="plain-card"><div class="block-head"><h2>培训考试取证时间轴</h2></div><div class="plain-card-body"><div class="dossier-timeline dossier-full-timeline">
            <div class="dossier-event"><div class="dossier-date">2026-05-06</div><span class="dossier-dot"></span><div class="dossier-content"><strong>报名</strong><p>提交建筑机器人操作员培训报名，生成平台报名编号 HBIC-2026-000128。</p></div></div>
            <div class="dossier-event"><div class="dossier-date">2026-05-07</div><span class="dossier-dot"></span><div class="dossier-content"><strong>审核通过</strong><p>培训机构完成报名材料审核并受理。</p></div></div>
            <div class="dossier-event"><div class="dossier-date">2026-05-07</div><span class="dossier-dot"></span><div class="dossier-content"><strong>缴费完成</strong><p>报名订单 BMDD-20260507-00128 支付完成，金额¥1,580。</p></div></div>
            <div class="dossier-event"><div class="dossier-date">05-10 ～ 05-20</div><span class="dossier-dot"></span><div class="dossier-content"><strong>培训</strong><p>完成线上理论学习和线下实操培训，过程记录已归档。</p></div></div>
            <div class="dossier-event"><div class="dossier-date">2026-05-20</div><span class="dossier-dot"></span><div class="dossier-content"><strong>培训完成</strong><p>培训机构确认达到规定学时和实操要求。</p></div></div>
            <div class="dossier-event"><div class="dossier-date">2026-05-22</div><span class="dossier-dot"></span><div class="dossier-content"><strong>统一送考</strong><p>培训机构纳入送考批次 SKPC-20260522-0006。</p></div></div>
            <div class="dossier-event"><div class="dossier-date">2026-05-28</div><span class="dossier-dot"></span><div class="dossier-content"><strong>考试</strong><p>参加理论考试与实操考试。</p></div></div>
            <div class="dossier-event"><div class="dossier-date">2026-05-30</div><span class="dossier-dot"></span><div class="dossier-content"><strong>考试合格</strong><p>理论成绩82分，实操成绩86分，两项均合格。</p></div></div>
            <div class="dossier-event"><div class="dossier-date">2026-06-03</div><span class="dossier-dot dossier-dot-complete"></span><div class="dossier-content"><strong>证书发放</strong><p>第三方赋码成功，电子证书已生成并发放。</p></div></div>
          </div></div></section>
        </div><aside class="side-stack"><section class="plain-card"><div class="block-head"><h2>档案信息</h2></div><div class="plain-card-body"><dl class="description"><dt>持证人</dt><dd>张三</dd><dt>工种</dt><dd>建筑机器人操作员</dd><dt>培训机构</dt><dd>湖北数字建造培训中心</dd><dt>评价机构</dt><dd>湖北省智能建造评价中心</dd><dt>证书编号</dt><dd>HBCERT-2026-000128</dd><dt>发证日期</dt><dd>2026-06-03</dd></dl></div></section><section class="plain-card"><div class="block-head"><h2>归档材料</h2></div><div class="plain-card-body archive-side-files"><a href="#" data-toast="正在预览报名材料">报名材料 <span>预览</span></a><a href="#" data-toast="正在预览培训记录">培训记录 <span>预览</span></a><a href="#" data-toast="正在预览成绩单">考试成绩单 <span>预览</span></a><a href="#" data-toast="正在预览电子证书">电子证书 <span>预览</span></a></div></section></aside></div>
      </div>`;
  }

  if (window.renderIcons) window.renderIcons();
})();
