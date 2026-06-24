import React from 'react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const handleNavClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="main-header">
      <nav className="nav-container">
        <a 
          href="#" 
          className="logo-wrapper"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <span className="logo-text">島嶼旅跡</span>
        </a>
        <ul className="nav-menu">
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'products' ? 'opacity-100 font-bold' : ''}`}
              onClick={(e) => handleNavClick(e, 'products')}
            >
              探索體驗
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'about' ? 'opacity-100 font-bold' : ''}`}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              關於我們
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'qa' ? 'opacity-100 font-bold' : ''}`}
              onClick={(e) => handleNavClick(e, 'qa')}
            >
              常見問題
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'profile' ? 'opacity-100 font-bold' : ''}`}
              onClick={(e) => handleNavClick(e, 'profile')}
            >
              我的訂單
            </a>
          </li>
          <li>
            <button 
              className="btn-cta cursor-pointer"
              onClick={(e) => handleNavClick(e, 'login')}
            >
              登入 / 註冊
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
