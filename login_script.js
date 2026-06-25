document.addEventListener('DOMContentLoaded', () => {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const submitBtn = document.getElementById('submit-btn');
  const form = document.getElementById('auth-form');
  
  // 密碼切換元件
  const togglePwd = document.getElementById('toggle-password');
  const togglePwdIcon = document.getElementById('toggle-password-icon');
  const passwordInput = document.getElementById('password');
  
  // 表單輸入欄位
  const emailInput = document.getElementById('email');
  const usernameInput = document.getElementById('username');
  const phoneInput = document.getElementById('phone');
  
  // 錯誤提示
  const emailError = document.getElementById('email-error');
  const pwdError = document.getElementById('password-error');
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  
  // 畫面切換控制項
  const nameField = document.getElementById('name-field');
  const phoneField = document.getElementById('phone-field');
  const socialLoginWrap = document.getElementById('social-login-wrap');
  const authHeading = document.getElementById('auth-heading');
  const authSubText = document.getElementById('auth-sub-text');
  const forgotPasswordRow = document.getElementById('forgot-password-row');
  const switchPrompt = document.getElementById('switch-prompt');

  // 切換登入 / 註冊頁面狀態
  function setActiveTab(isLogin) {
    tabLogin.classList.toggle('active', isLogin);
    tabRegister.classList.toggle('active', !isLogin);
    tabLogin.setAttribute('aria-selected', isLogin);
    tabRegister.setAttribute('aria-selected', !isLogin);
    
    // 清除切換時的錯誤提示
    [emailError, pwdError, nameError, phoneError].forEach(el => el.textContent = '');

    if (isLogin) {
      authHeading.textContent = '歡迎回來 👋';
      authSubText.textContent = '登入帳號以管理你的旅行體驗';
      submitBtn.textContent = '登入';
      forgotPasswordRow.style.display = 'flex';
      
      nameField.style.display = 'none';
      phoneField.style.display = 'none';
      socialLoginWrap.style.display = 'block'; // 登入頁：展示統一外觀的社群登入
      
      switchPrompt.innerHTML = '還沒有帳號？ <a href="#" id="go-register">點此免費註冊</a>';
      document.getElementById('go-register').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveTab(false);
      });
    } else {
      authHeading.textContent = '加入我們 ✨';
      authSubText.textContent = '立即註冊，開啟你的台灣深度之旅';
      submitBtn.textContent = '註冊';
      forgotPasswordRow.style.display = 'none';
      
      nameField.style.display = 'block';
      phoneField.style.display = 'block';
      socialLoginWrap.style.display = 'none'; // 註冊頁：關閉社群按鈕，挪出高度給姓名/電話欄位，完美避開捲軸
      
      switchPrompt.innerHTML = '已經有帳號了？ <a href="#" id="go-login">點此登入</a>';
      document.getElementById('go-login').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveTab(true);
      });
    }
  }

  // 綁定頁籤點擊事件
  tabLogin.addEventListener('click', () => setActiveTab(true));
  tabRegister.addEventListener('click', () => setActiveTab(false));
  document.getElementById('go-register').addEventListener('click', (e) => {
    e.preventDefault();
    setActiveTab(false);
  });

  // 密碼眼睛轉換修正
  togglePwd.addEventListener('click', (e) => {
    e.preventDefault();
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    
    if (isPassword) {
      togglePwdIcon.className = 'fas fa-eye-slash';
      togglePwd.setAttribute('aria-label', '隱藏密碼');
    } else {
      togglePwdIcon.className = 'fas fa-eye';
      togglePwd.setAttribute('aria-label', '顯示密碼');
    }
  });

  // 欄位前端防呆驗證
  function validate() {
    let isValid = true;
    const isLoginMode = tabLogin.classList.contains('active');
    
    [emailError, pwdError, nameError, phoneError].forEach(el => el.textContent = '');

    // Email 格式驗證
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValue) {
      emailError.textContent = '電子信箱不能為空';
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      emailError.textContent = '請輸入正確的電子信箱格式';
      isValid = false;
    }

    // 密碼驗證
    if (!passwordInput.value) {
      pwdError.textContent = '密碼不能為空';
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      pwdError.textContent = '密碼至少需要 6 個字元';
      isValid = false;
    }

    // 註冊模式加強欄位防呆
    if (!isLoginMode) {
      if (!usernameInput.value.trim()) {
        nameError.textContent = '請輸入您的姓名';
        isValid = false;
      }
      
      const phoneValue = phoneInput.value.trim();
      const phonePattern = /^09\d{8}$/;
      if (!phoneValue) {
        phoneError.textContent = '行動電話不能為空';
        isValid = false;
      } else if (!phonePattern.test(phoneValue)) {
        phoneError.textContent = '請輸入正確的手機號碼格式';
        isValid = false;
      }
    }

    return isValid;
  }

  // 表單發送監聽
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isLoginMode = tabLogin.classList.contains('active');
    const mode = isLoginMode ? '登入' : '註冊';
    submitBtn.disabled = true;
    submitBtn.textContent = '處理中...';

    setTimeout(() => {
      // 取得欄位值
      const email = emailInput.value.trim();
      const name = isLoginMode
        ? (email.split('@')[0]) // 登入時以 email 前綴作為暫定名稱
        : (usernameInput.value.trim());
      const phone = isLoginMode ? '' : (phoneInput.value.trim());

      // 儲存使用者資訊到 LocalStorage
      const userData = {
        name: name,
        email: email,
        phone: phone,
        birthday: '',
        preferences: []
      };

      // 若已有舊資料（例如已登入再次登入），合併保留 birthday / preferences
      const existing = localStorage.getItem('currentUser');
      if (existing) {
        const existingData = JSON.parse(existing);
        userData.birthday = existingData.birthday || '';
        userData.preferences = existingData.preferences || [];
        // 只有 email 相同才覆蓋名字，否則用新輸入的
        if (existingData.email === email) {
          userData.name = existingData.name || name;
          userData.phone = existingData.phone || phone;
        }
      }

      localStorage.setItem('currentUser', JSON.stringify(userData));

      // 重置表單
      form.reset();
      passwordInput.type = 'password';
      togglePwdIcon.className = 'fas fa-eye';
      submitBtn.disabled = false;
      submitBtn.textContent = mode;

      // 讀取來源頁面，決定跳轉目標
      const params = new URLSearchParams(window.location.search);
      const redirectTarget = params.get('redirect') || 'index.html';
      window.location.href = redirectTarget;
    }, 800);
  });
});