(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  if (window.lucide) window.lucide.createIcons();

  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2300);
  }

  $$('[data-toast]').forEach((element) => {
    element.addEventListener('click', () => showToast(element.dataset.toast));
  });

  function openSheet(sheet, backdrop) {
    sheet.hidden = false;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeSheet(sheet, backdrop) {
    sheet.hidden = true;
    backdrop.hidden = true;
    document.body.style.overflow = '';
  }

  const loginSheet = $('#loginSheet');
  const loginBackdrop = $('#loginBackdrop');
  if (loginSheet && loginBackdrop) {
    $$('[data-auth-required]').forEach((element) => {
      element.addEventListener('click', () => {
        const service = element.dataset.authRequired;
        $('#loginMessage').textContent = `登录后可继续使用“${service}”并查看个人办理进度。`;
        openSheet(loginSheet, loginBackdrop);
      });
    });
    $$('[data-close-sheet]').forEach((element) => element.addEventListener('click', () => closeSheet(loginSheet, loginBackdrop)));
    loginBackdrop.addEventListener('click', () => closeSheet(loginSheet, loginBackdrop));
    $('[data-demo-login]').addEventListener('click', () => {
      closeSheet(loginSheet, loginBackdrop);
      showToast('演示登录成功，个人服务已解锁');
    });
  }

  const occupationTabs = $$('.occupation-tabs button');
  if (occupationTabs.length) {
    occupationTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        occupationTabs.forEach((item) => item.classList.toggle('is-active', item === tab));
        const category = tab.dataset.category;
        let visibleCount = 0;
        $$('.course-card').forEach((card) => {
          const visible = category === 'all' || card.dataset.category === category;
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        });
        if (!visibleCount) {
          showToast('该工种课程正在筹备，敬请关注');
          $$('.course-card').forEach((card) => { card.hidden = false; });
        } else {
          $('#courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  $$('[data-course-link]').forEach((card) => {
    const openDetail = (event) => {
      if (event.target.closest('a,button,input,label')) return;
      window.location.href = card.dataset.courseLink;
    };
    card.addEventListener('click', openDetail);
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      window.location.href = card.dataset.courseLink;
    });
  });

  const courseSearch = $('#courseSearch');
  if (courseSearch) {
    courseSearch.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      const keyword = courseSearch.value.trim();
      showToast(keyword ? `已为你查找“${keyword}”相关课程（演示）` : '请输入课程、工种或培训班名称');
      if (keyword) $('#courses').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const heroSlides = [
    {
      image: 'assets/images/banner-nine-occupations.png',
      title: '绿色智能建造<br>九大新工种培训启动',
      text: '覆盖数字设计、智能生产、智能施工、智慧运维四大领域，可报名课程持续更新。'
    },
    {
      image: 'assets/images/banner-career-growth.png',
      title: '从技能提升<br>走向职业能力认证',
      text: '培训、考试、成绩与证书服务统一入口，让每一步办理清晰可查。'
    }
  ];
  $$('.hero-dots button').forEach((dot) => {
    dot.addEventListener('click', () => {
      const slide = heroSlides[Number(dot.dataset.slide)];
      $('#heroImage').src = slide.image;
      $('#heroTitle').innerHTML = slide.title;
      $('#heroText').textContent = slide.text;
      $$('.hero-dots button').forEach((item) => item.classList.toggle('is-active', item === dot));
    });
  });

  const registerPage = $('.page-register');
  if (!registerPage) return;

  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') === 'team') {
    window.location.replace('08-团队服务.html?source=course');
    return;
  }

  const uploaded = new Set(['近期证件照', '学历或从业证明']);

  $$('[data-edit-field]').forEach((field) => field.addEventListener('click', () => showToast(`${field.dataset.editField}编辑功能为原型演示`)));

  $$('[data-upload]').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.upload;
      uploaded.add(name);
      button.classList.add('is-uploaded');
      const action = $('.upload-action', button);
      if (action) action.innerHTML = '<i data-lucide="check"></i><b>已更新</b>';
      $('#materialCount').textContent = `${uploaded.size}/2 已上传`;
      if (window.lucide) window.lucide.createIcons();
      showToast(`${name}已上传（演示）`);
    });
  });

  const confirmSheet = $('#confirmSheet');
  const confirmBackdrop = $('#confirmBackdrop');
  const closeConfirm = () => closeSheet(confirmSheet, confirmBackdrop);
  $$('[data-close-confirm]').forEach((element) => element.addEventListener('click', closeConfirm));
  confirmBackdrop.addEventListener('click', closeConfirm);

  $('#nextStep').addEventListener('click', () => {
    if (uploaded.size < 2) return showToast('请先补齐两项报名材料');
    if (!$('#agreement').checked) return showToast('请阅读并同意个人报名声明');
    openSheet(confirmSheet, confirmBackdrop);
  });

  $('#confirmSubmit').addEventListener('click', () => {
    closeConfirm();
    $('.register-shell').setAttribute('aria-hidden', 'true');
    $('#successView').hidden = false;
    if (window.lucide) window.lucide.createIcons();
  });
})();
