import React from 'react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  // 為了頁面間更豐富的互動，我們還可以接收引導至特定標籤的選項
  setQaCategory?: (category: string) => void;
  setProfileTab?: (tab: string) => void;
}

export default function Footer({ setCurrentPage, setQaCategory, setProfileTab }: FooterProps) {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductsLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQaClick = (e: React.MouseEvent, category?: string) => {
    e.preventDefault();
    if (category && setQaCategory) {
      setQaCategory(category);
    }
    setCurrentPage('qa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileClick = (e: React.MouseEvent, tab?: string) => {
    e.preventDefault();
    if (tab && setProfileTab) {
      setProfileTab(tab);
    }
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer">
      <div className="container-normal">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo select-none" onClick={handleLogoClick}>
              島嶼旅跡
            </h3>
            <p className="brand-desc">
              深入台灣每一條小徑，<br />
              遇見最在地的感動體驗。<br />
              我們相信，旅行不只是到達目的地，<br />
              而是與這片土地真實相遇。
            </p>
          </div>

          <div className="footer-menu">
            <ul className="menu-group">
              <li className="menu-title">探索</li>
              <li>
                <a href="#" className="menu-item" onClick={handleProductsLinkClick}>
                  所有體驗
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={handleProductsLinkClick}>
                  戶外冒險
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={handleProductsLinkClick}>
                  手作工藝
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={handleProductsLinkClick}>
                  美食料理
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={handleProductsLinkClick}>
                  文化歷史
                </a>
              </li>
            </ul>
            <ul className="menu-group">
              <li className="menu-title">公司</li>
              <li>
                <a href="#" className="menu-item" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  關於我們
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={(e) => handleQaClick(e, 'booking')}>
                  常見問題
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={handleProductsLinkClick}>
                  旅遊嚮導招募
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={handleProductsLinkClick}>
                  媒體合作
                </a>
              </li>
            </ul>
            <ul className="menu-group">
              <li className="menu-title">支援</li>
              <li>
                <a href="#" className="menu-item" onClick={(e) => handleQaClick(e, 'refund')}>
                  退款政策
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={(e) => handleQaClick(e, 'refund')}>
                  隱私政策
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={(e) => handleQaClick(e, 'refund')}>
                  服務條款
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={(e) => handleProfileClick(e, 'orders')}>
                  查看訂單
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <div className="copyright">
            © 2025 島嶼旅跡 IslandTrace. All rights reserved.
          </div>
          <div className="slogan">用心丈量台灣每一寸土地</div>
        </div>
      </div>
    </footer>
  );
}
