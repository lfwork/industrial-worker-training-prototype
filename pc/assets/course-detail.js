(function(){
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  let role=localStorage.getItem("trainingZone.role")||"visitor";
  function icons(){window.lucide?.createIcons({attrs:{"stroke-width":1.8}})}
  function toast(message){const region=$("#toast-region"),n=document.createElement("div");n.className="toast";n.textContent=message;region.appendChild(n);requestAnimationFrame(()=>n.classList.add("show"));setTimeout(()=>{n.classList.remove("show");setTimeout(()=>n.remove(),200)},2800)}
  function modal(content){$("#modal-content").innerHTML=content;$("#modal-backdrop").classList.add("show");$("#modal-backdrop").setAttribute("aria-hidden","false");icons()}
  function closeModal(){$("#modal-backdrop").classList.remove("show");$("#modal-backdrop").setAttribute("aria-hidden","true")}
  function updateAccount(){const b=$("#login-button");b.textContent=role==="visitor"?"登录/注册":role==="personal"?"张明（个人）":"王工（团队）"}
  function loginModal(){modal(`<h2 id="modal-title">培训考试统一登录</h2><p>登录后继续办理所选课程报名。</p><form class="login-form" id="login-form"><label>手机号码<input name="mobile" value="13800000000" required maxlength="11"></label><label>验证码<input name="code" value="123456" required maxlength="6"></label><button class="button primary full" type="submit">模拟登录</button><p class="login-hint">固定模拟验证码：123456</p></form>`)}
  function roleModal(){modal(`<h2 id="modal-title">切换原型演示身份</h2><p>课程详情支持个人报名和团队报名两种正常流程入口。</p><div class="modal-options"><button type="button" data-set-role="visitor"><span><strong>游客公众</strong><br><small>浏览课程，办理时登录</small></span><span class="role-badge">免登录</span></button><button type="button" data-set-role="personal"><span><strong>个人学员</strong><br><small>办理个人培训报名</small></span><span class="role-badge">模拟登录</span></button><button type="button" data-set-role="team"><span><strong>团队负责人</strong><br><small>创建任务并导入成员</small></span><span class="role-badge">模拟登录</span></button></div>`)}
  $$("[data-target]").forEach(button=>button.addEventListener("click",()=>{$$("[data-target]").forEach(b=>b.classList.toggle("active",b===button));$("#"+button.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})}));
  $("#login-button").addEventListener("click",()=>role==="visitor"?loginModal():roleModal());
  $("#my-center-button").addEventListener("click",()=>role==="visitor"?loginModal():(window.location.href="我的培训考试.html"));
  $("#platform-search").addEventListener("submit",e=>{e.preventDefault();toast(`平台搜索：${$("#global-keyword").value||"请输入搜索内容"}`)});
  document.addEventListener("click",e=>{
    const enroll=e.target.closest("[data-enroll]");if(enroll){window.location.href=enroll.dataset.enroll==="team"?"团队报名任务编辑.html":"个人培训报名.html";return}
    const set=e.target.closest("[data-set-role]");if(set){role=set.dataset.setRole;localStorage.setItem("trainingZone.role",role);closeModal();updateAccount();toast("已切换演示身份");return}
    const demo=e.target.closest("[data-demo]");if(demo){e.preventDefault();toast(`${demo.dataset.demo}：不在本次视觉样板范围`);return}
    const future=e.target.closest("[data-future]");if(future){toast(`${future.dataset.future}将在后续页面中实现`);return}
    if(e.target.closest("[data-close]")||e.target.id==="modal-backdrop"||e.target.closest(".modal-close"))closeModal();
  });
  document.addEventListener("submit",e=>{if(e.target.id!=="login-form")return;e.preventDefault();const d=new FormData(e.target);if(!/^1\d{10}$/.test(d.get("mobile"))||d.get("code")!=="123456"){toast("请输入正确模拟手机号和验证码");return}role="personal";localStorage.setItem("trainingZone.role",role);closeModal();updateAccount();toast("模拟登录成功")});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
  updateAccount();icons();
})();

/* 四端原型共用：可拖动页面导航与功能说明。 */
(() => {
  if (window.__prototypeFloatToolsBootstrapped) return;
  window.__prototypeFloatToolsBootstrapped = true;
  const script = document.createElement('script');
  script.src = new URL('../prototype-float-tools.js', location.href).href;
  document.head.appendChild(script);
})();
