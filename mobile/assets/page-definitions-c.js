(function () {
  window.H5_PAGES = Object.assign(window.H5_PAGES || {}, {
    H25: {
      title: '我的订单', back: '06-我的.html', nav: 'my', help: '个人报名和团队报名订单可统一查询。',
      body: `<div id="h5-order-list-root"></div>`
    },
    H24: {
      title: '培训机构详情', back: '03-课程详情.html?course=bim', help: '查看承训机构资质、服务范围和在招课程。',
      body: `
        <section class="mobile-card institution-profile-card"><div class="institution-profile-head"><span><i data-lucide="landmark"></i></span><div><h2>武汉绿色建造职业培训中心</h2><p>服务状态正常</p></div><em class="status-chip green">正常服务</em></div><p class="institution-summary">面向绿色建造、数字设计和智能施工相关岗位提供职业技能培训服务。</p><div class="field-display-list"><div class="field-display-row"><span>所在地区</span><b>武汉市洪山区</b><i data-lucide="map-pin"></i></div><div class="field-display-row"><span>联系电话</span><b>027-8888 6600</b><i data-lucide="phone"></i></div></div></section>
        <details class="mobile-card compact-details" open><summary><span><b>资质与服务范围</b><small>当前有效培训服务</small></span><i data-lucide="chevron-down"></i></summary><ul class="info-list"><li><i data-lucide="badge-check"></i><span><b>职业技能培训服务</b><small>机构资料和服务状态已通过平台审核。</small></span></li><li><i data-lucide="shapes"></i><span><b>数字设计与智能施工</b><small>覆盖建筑信息模型、装配式施工等相关培训。</small></span></li></ul></details>
        <section class="mobile-card"><div class="card-title-row"><h2>近期在招课程</h2><span>报名中</span></div><a class="business-row" href="03-课程详情.html?course=bim"><span class="business-icon"><i data-lucide="cuboid"></i></span><span class="business-copy"><b>建筑信息模型技术员实务班</b><small>查看课程、班次和报名要求</small></span><i data-lucide="chevron-right"></i></a><a class="business-row" href="03-课程详情.html?course=construction"><span class="business-icon"><i data-lucide="blocks"></i></span><span class="business-copy"><b>装配式建筑施工员混合培训班</b><small>查看课程、班次和报名要求</small></span><i data-lucide="chevron-right"></i></a></section>`
    },
    H27: {
      title: '评价项目详情', back: '04-考试信息.html', help: '公开查看评价项目、考试方式与报名条件。',
      body: `
        <section class="mobile-card evaluation-project-hero"><h2 id="evaluationProjectTitle">建筑信息模型技术员职业技能评价</h2><p id="evaluationProjectOrg">湖北绿色建造职业技能评价中心（模拟）</p><div class="evaluation-project-meta"><span><i data-lucide="monitor-check"></i><b id="evaluationProjectMode">理论在线考试＋实操评价</b></span><span><i data-lucide="calendar-range"></i><b id="evaluationProjectValidity">有效期至2026-12-31</b></span></div></section>
        <section class="mobile-card evaluation-detail-card"><h2>评价项目说明</h2><p class="institution-summary" id="evaluationProjectIntro">本项目面向已完成相应培训并由培训机构统一送考的人员。资格审核结论由评价机构独立作出。</p><div class="evaluation-info-grid"><div><span>适用工种</span><b id="evaluationProjectOccupation">建筑信息模型技术员</b></div><div><span>评价等级</span><b>对应职业技能等级</b></div><div><span>理论考试</span><b id="evaluationProjectTheory">在线考试，100分钟</b></div><div><span>实操评价</span><b>线下考场，按批次安排</b></div><div><span>考试费用</span><b id="evaluationProjectFee">¥680／人</b></div><div><span>成绩规则</span><b>理论与实操均达到合格线</b></div></div></section>
        <section class="mobile-card evaluation-detail-card"><h2>参试条件与材料</h2><div class="evaluation-condition-list"><div><span>必备记录</span><b>平台培训完成记录</b></div><div><span>身份材料</span><b>身份证明、近期证件照</b></div><div><span>条件材料</span><b>学历或从业证明（按项目要求）</b></div></div></section>
        <section class="mobile-card evaluation-detail-card"><h2>办理流程</h2><ol class="evaluation-process-list"><li><span>1</span><div><b>完成培训</b><small>培训机构确认完成</small></div></li><li><span>2</span><div><b>提交机构送考</b><small>选择项目并补充材料</small></div></li><li><span>3</span><div><b>资格审核</b><small>评价机构审核考试资格</small></div></li><li><span>4</span><div><b>等待正式排考</b><small>查看准考信息</small></div></li></ol></section>`
    },
    H26: {
      title: '我的证书', back: '06-我的.html', nav: 'my', help: '仅展示已生成或办理中的本人证书记录。',
      body: `
        <section class="certificate-list-card"><div class="certificate-list-mark"><i data-lucide="award"></i></div><div class="certificate-list-copy"><div><small>绿色智能建造产业职业技能评价证书</small><em class="status-chip green">有效</em></div><h2>建筑信息模型技术员（中级）</h2><p>证书编号 HBCERT-2026-000128</p><p>湖北绿色建造职业技能评价中心 · 2026-12-26</p></div><a href="23-电子证书与档案.html" aria-label="查看证书详情"><i data-lucide="chevron-right"></i></a></section>`
    },
    H29: {
      title: '个人资料编辑', back: '07-个人资料与材料.html', nav: 'my', help: '请按实名信息、从业与联系信息、基础材料分组维护个人资料。',
      body: `
        <section class="mobile-card profile-edit-section"><div class="section-number-title"><span>1</span><div><h2>实名信息</h2><p>关键身份字段与本人证件一致</p></div></div><div class="form-grid"><div class="form-field"><label>姓名 <em>*</em></label><input value="张明"></div><div class="form-field"><label>证件类型 <em>*</em></label><select><option>居民身份证</option></select></div><div class="form-field"><label>证件号码 <em>*</em></label><input value="420106********3215"></div><div class="form-field"><label>手机号码 <em>*</em></label><input value="138****6608"></div><div class="form-field"><label>性别 <em>*</em></label><select><option>男</option></select></div><div class="form-field"><label>出生日期 <em>*</em></label><input value="1992/08/16"></div></div></section>
        <section class="mobile-card profile-edit-section"><div class="section-number-title"><span>2</span><div><h2>从业与联系信息</h2><p>用于培训和考试资格材料复用</p></div></div><div class="form-grid"><div class="form-field"><label>所在单位</label><input value="湖北智建工程有限公司"></div><div class="form-field"><label>从业年限</label><input value="6年"></div><div class="form-field"><label>最高学历</label><select><option>本科</option></select></div><div class="form-field"><label>联系地址</label><input value="武汉市洪山区光谷大道"></div></div></section>
        <section class="mobile-card profile-edit-section"><div class="section-number-title"><span>3</span><div><h2>基础材料</h2><p>支持后续报名直接引用</p></div></div><div class="profile-edit-materials"><button class="upload-tile is-uploaded" type="button" data-upload="近期证件照"><span><i data-lucide="image"></i></span><span><b>近期证件照</b><small>JPG或PNG，已上传 photo.jpg</small></span><em>已上传</em></button><button class="upload-tile is-uploaded" type="button" data-upload="身份证明"><span><i data-lucide="id-card"></i></span><span><b>身份证明</b><small>正反面图片，已完成校验</small></span><em>已上传</em></button><button class="upload-tile" type="button" data-upload="学历或从业证明"><span><i data-lucide="file-check-2"></i></span><span><b>学历或从业证明</b><small>按报名项目要求补充</small></span><em>上传</em></button></div></section>`,
      sticky: `<button class="primary-button" type="button" data-toast="个人资料已保存（演示）">保存资料</button>`
    }
  });
})();
