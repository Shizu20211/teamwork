// Basic tab switching, show/hide password, and simple validation
document.addEventListener('DOMContentLoaded', () => {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const submitBtn = document.getElementById('submit-btn');
  const form = document.getElementById('auth-form');
  const togglePwd = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const pwdError = document.getElementById('password-error');
  const goRegister = document.getElementById('go-register');

  function setActiveTab(isLogin){
    tabLogin.classList.toggle('active', isLogin);
    tabRegister.classList.toggle('active', !isLogin);
    tabLogin.setAttribute('aria-selected', isLogin);
    tabRegister.setAttribute('aria-selected', !isLogin);
    submitBtn.textContent = isLogin ? '登入' : '註冊';
  }

  tabLogin.addEventListener('click', () => setActiveTab(true));
  tabRegister.addEventListener('click', () => setActiveTab(false));
  goRegister.addEventListener('click', (e) => { e.preventDefault(); setActiveTab(false); });

  togglePwd.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePwd.textContent = type === 'password' ? '顯示' : '隱藏';
    togglePwd.setAttribute('aria-pressed', type === 'text');
  });

  function validate(){
    let ok = true;
    emailError.textContent = '';
    pwdError.textContent = '';

    if(!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)){
      emailError.textContent = '請輸入有效的電子信箱';
      ok = false;
    }
    if(!passwordInput.value || passwordInput.value.length < 6){
      pwdError.textContent = '密碼至少 6 個字元';
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!validate()) return;
    submitBtn.disabled = true;
    submitBtn.textContent = '處理中...';

    // 模擬非同步請求
    setTimeout(() => {
      alert('表單驗證通過（示範）');
      submitBtn.disabled = false;
      submitBtn.textContent = tabLogin.classList.contains('active') ? '登入' : '註冊';
      form.reset();
    }, 900);
  });
});
