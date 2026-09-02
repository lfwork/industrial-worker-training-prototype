(function () {
  function link(active, key, href, label) {
    return '<a class="nav-link ' + (active === key ? 'active' : '') + '" href="' + href + '">' + label + '</a>';
  }

  function group(icon, label, children, open, activeParent) {
    return '<div class="nav-group' + (open ? ' open' : '') + '">' +
      '<button class="nav-group-title' + (activeParent ? ' active-parent' : '') + '" type="button">' +
        '<span data-icon="' + icon + '"></span><span>' + label + '</span><span class="chev" data-icon="chevronRight"></span>' +
      '</button><div class="nav-children">' + children + '</div></div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var active = document.body.getAttribute('data-active-archive') || 'training';
    var showWorkbench = active === 'person';
    var shell = '' +
      '<header class="topbar">' +
        '<button class="mobile-menu-trigger" type="button" aria-label="打开菜单"><span data-icon="menu"></span></button>' +
        '<a class="brand" href="工作台.html"><img src="assets/platform-logo.svg" alt="湖北省智能建造产业互联网平台"></a>' +
        '<div class="topbar-right"><button class="top-action" type="button" data-toast="当前有11项待办"><span data-icon="bell"></span><span class="notice-dot"></span></button>' +
          '<div class="user"><div class="avatar"><span data-icon="user"></span></div><div class="user-copy"><strong>平台运营管理员</strong><span>产业培育运营中心</span></div><button type="button"><span data-icon="chevronDown"></span></button></div>' +
        '</div>' +
      '</header>' +
      '<aside class="sidebar"><button class="sidebar-toggle" type="button" aria-label="收起菜单"><span data-icon="menu"></span></button><nav class="nav-section">' +
        (showWorkbench ? '<a class="nav-group-title" href="工作台.html"><span data-icon="home"></span><span>工作台</span></a>' : '') +
        group('file', '专区内容管理', '<a class="nav-link" href="Banner管理.html">Banner管理</a><a class="nav-link" href="通知公告管理.html">通知公告管理</a><a class="nav-link" href="政策管理.html">政策管理</a>', false, false) +
        group('book', '培训课程管理', '<a class="nav-link" href="课程发布审核.html">课程发布审核</a><a class="nav-link" href="课程管理.html">课程管理</a><a class="nav-link" href="班次管理.html">班次管理</a>', false, false) +
        group('shield', '考试项目管理', '<a class="nav-link" href="考试项目审核.html">考试项目审核</a><a class="nav-link" href="考试管理.html">考试管理</a>', false, false) +
        group('building', '机构管理', '<a class="nav-link" href="培训机构管理.html">培训机构管理</a><a class="nav-link" href="评价机构管理.html">评价机构管理</a>', false, false) +
        group('receipt', '报名管理', '<a class="nav-link" href="报名记录.html">报名记录</a><a class="nav-link" href="报名订单.html">报名订单</a>', false, false) +
        group('clipboard', '送考管理', '<a class="nav-link" href="送考进度.html">送考进度</a>', false, false) +
        group('graduation', '业务档案',
          link(active, 'person', '一人一档.html', '个人档案') +
          link(active, 'training', '培训档案.html', '培训档案') +
          link(active, 'exam', '考试档案.html', '考试档案') +
          link(active, 'certificate', '证书档案.html', '证书档案'), true, true) +
      '</nav></aside>';
    document.body.insertAdjacentHTML('afterbegin', shell);
  });
})();
