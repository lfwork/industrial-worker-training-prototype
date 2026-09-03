(function () {
  window.H5_PAGES = Object.assign(window.H5_PAGES || {}, {
    H25: {
      title: '我的订单', back: '06-我的.html', nav: 'my', help: '个人报名和团体报名订单可统一查询。',
      body: `<div id="h5-order-list-root"></div>`
    },
    H26: {
      title: '我的证书', back: '06-我的.html', nav: 'my', help: '仅展示已生成或办理中的本人证书记录。',
      body: `
        <section class="certificate-list-card"><div class="certificate-list-mark"><i data-lucide="award"></i></div><div class="certificate-list-copy"><div><small>绿色智能建造产业职业技能评价证书</small><em class="status-chip green">有效</em></div><h2>建筑信息模型技术员（中级）</h2><p>证书编号 HBPJ-2026-00918</p><p>湖北智能建造评价中心（模拟） · 2026-11-18</p></div><a href="23-电子证书与档案.html" aria-label="查看证书详情"><i data-lucide="chevron-right"></i></a></section>
        <section class="mobile-card"><div class="card-title-row"><h2>证书办理中</h2><span>1条</span></div><div class="business-row"><span class="business-icon"><i data-lucide="badge-check"></i></span><span class="business-copy"><b>装配式建筑施工员</b><small>成绩已锁定，等待第三方赋码</small></span><em class="status-chip orange">办理中</em><i data-lucide="chevron-right"></i></div></section>
        <div class="notice-strip"><i data-lucide="shield-check"></i><span>证书须经第三方赋码成功并由评价机构确认发放后，才会显示为有效。</span></div>`
    }
  });
})();
