import React, { useState } from 'react';

interface LoginProps {
  setCurrentPage: (page: string) => void;
  setLoggedInUser: (name: string) => void;
}

export default function Login({ setCurrentPage, setLoggedInUser }: LoginProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // 欄位 State
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 錯誤提示
  const [errors, setErrors] = useState({
    username: '',
    phone: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 前端欄位驗證
  const validate = () => {
    let isValid = true;
    const newErrors = { username: '', phone: '', email: '', password: '' };

    // Email 驗證
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = '電子信箱不能為空';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = '請輸入正確的電子信箱格式';
      isValid = false;
    }

    // 密碼驗證
    if (!password) {
      newErrors.password = '密碼不能為空';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = '密碼至少需要 6 個字元';
      isValid = false;
    }

    // 註冊欄位驗證
    if (!isLoginMode) {
      if (!username.trim()) {
        newErrors.username = '請輸入您的姓名';
        isValid = false;
      }

      const phonePattern = /^09\d{8}$/;
      if (!phone) {
        newErrors.phone = '行動電話不能為空';
        isValid = false;
      } else if (!phonePattern.test(phone)) {
        newErrors.phone = '請輸入正確的手機號碼格式（如 0912345678）';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const modeText = isLoginMode ? '登入' : '註冊';
      alert(`${modeText}驗證成功！歡迎加入島嶼旅跡！`);
      
      // 模擬成功登入
      const userNameToSet = isLoginMode ? (email.split('@')[0] || '旅遊達人') : username;
      setLoggedInUser(userNameToSet);

      // 保存至 localStorage
      localStorage.setItem('loggedInUser', userNameToSet);

      // 跳轉至個人中心
      setCurrentPage('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const handleTabSwitch = (isLogin: boolean) => {
    setIsLoginMode(isLogin);
    setErrors({ username: '', phone: '', email: '', password: '' });
  };

  return (
    <div className="auth">
      <main className="app flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100 max-lg:flex-col">
        {/* 左側：Hero 滿版主視覺 */}
        <section className="hero flex-1 flex flex-col justify-end p-12 text-left max-lg:hidden">
          <div className="hero-overlay z-10">
            <h1 className="brand text-4xl font-extrabold mb-3">島嶼旅跡</h1>
            <p className="tagline text-xl font-medium opacity-95">每一趟旅程，都是全新的自己</p>
            <p className="cta text-sm opacity-90 mt-3">加入島嶼旅跡，開啟你的台灣深度之旅</p>
          </div>
        </section>

        {/* 右側：登入 / 註冊卡片 */}
        <section className="auth-card-wrapper flex-1 flex items-center justify-center p-8 max-sm:p-4">
          <div className="auth-card max-sm:p-2 shadow-none border-0">
            <div className="tabs" role="tablist">
              <button 
                type="button"
                className={`tab cursor-pointer ${isLoginMode ? 'active' : ''}`} 
                onClick={() => handleTabSwitch(true)}
              >
                登入
              </button>
              <button 
                type="button"
                className={`tab cursor-pointer ${!isLoginMode ? 'active' : ''}`} 
                onClick={() => handleTabSwitch(false)}
              >
                註冊
              </button>
            </div>

            <h2 className="auth-title">
              {isLoginMode ? '歡迎回來 👋' : '加入我們 ✨'}
            </h2>
            <p className="auth-sub">
              {isLoginMode ? '登入帳號以管理你的旅行體驗' : '立即註冊，開啟你的台灣深度之旅'}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* 註冊專屬欄位：姓名 */}
              {!isLoginMode && (
                <label className="field">
                  <span className="label-text">姓名</span>
                  <input 
                    type="text" 
                    placeholder="請輸入您的真實姓名" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="error">{errors.username}</span>
                </label>
              )}

              {/* 註冊專屬欄位：電話 */}
              {!isLoginMode && (
                <label className="field">
                  <span className="label-text">行動電話</span>
                  <input 
                    type="tel" 
                    placeholder="0912345678" 
                    maxLength={10} 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span className="error">{errors.phone}</span>
                </label>
              )}

              <label className="field">
                <span className="label-text">電子信箱</span>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="error">{errors.email}</span>
              </label>

              <label className="field">
                <span className="label-text">密碼</span>
                <div className="password-wrap">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="輸入密碼" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    id="toggle-password" 
                    className="icon-btn cursor-pointer" 
                    aria-label="顯示密碼"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} id="toggle-password-icon"></i>
                  </button>
                </div>
                <span className="error">{errors.password}</span>
              </label>

              {isLoginMode && (
                <div className="row between">
                  <a href="#" className="link small" onClick={(e) => { e.preventDefault(); alert('忘記密碼功能即將推出，請聯繫系統管理員！'); }}>忘記密碼？</a>
                </div>
              )}

              <button 
                type="submit" 
                className="btn primary cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? '處理中...' : (isLoginMode ? '登入' : '註冊')}
              </button>

              {/* 第三方登入區塊：僅在登入模式下顯示，註冊時隱藏以釋放垂直高度，完美抗捲軸！ */}
              {isLoginMode && (
                <div id="social-login-wrap">
                  <div className="divider">或使用</div>
                  <div className="socials">
                    <button 
                      type="button" 
                      className="btn social google cursor-pointer"
                      onClick={() => alert('Google 模擬登入中...')}
                    >
                      <i className="fab fa-google" style={{ marginRight: '8px', color: '#ea4335' }}></i>使用 Google 帳號登入
                    </button>
                    <button 
                      type="button" 
                      className="btn social facebook cursor-pointer"
                      onClick={() => alert('Facebook 模擬登入中...')}
                    >
                      <i className="fab fa-facebook-f" style={{ marginRight: '8px', color: '#1877f2' }}></i>使用 Facebook 帳號登入
                    </button>
                  </div>
                </div>
              )}

              <p className="muted">
                {isLoginMode ? (
                  <>還沒有帳號？ <a href="#" className="link" onClick={(e) => { e.preventDefault(); handleTabSwitch(false); }}>點此免費註冊</a></>
                ) : (
                  <>已經有帳號了？ <a href="#" className="link" onClick={(e) => { e.preventDefault(); handleTabSwitch(true); }}>點此登入</a></>
                )}
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
