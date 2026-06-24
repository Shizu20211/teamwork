import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: number) => void;
  setSelectedRegion: (region: string) => void;
  setSelectedCategory: (category: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

const REVIEWS_MOCK = [
  { name: "陳佳穎", origin: "台北", date: "2026.03", rating: 5, comment: "清水斷崖的獨木舟體驗讓我終生難忘！嚮導非常專業且幽默，安全措施完善。看著日出從太平洋升起，這絕對是我在台灣最美的一天！", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { name: "林大偉", origin: "高雄", date: "2026.04", rating: 5, comment: "台南府城古蹟導覽非常精彩，特別是私廚料理的安排很有特色。聽著帶路達人講述那些課本沒寫的歷史故事，身心靈都獲得了極大的滿足！", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { name: "佐藤明香", origin: "日本", date: "2026.05", rating: 4, comment: "九份老街的手捏陶藝工作坊非常療癒。雖然英文溝通有限，但指導老師極其耐心，用手勢引導我做出了專屬的手捏杯。這是一份很棒的紀念品。", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" }
];

export default function Home({
  setCurrentPage,
  setSelectedProductId,
  setSelectedRegion,
  setSelectedCategory,
  favorites,
  toggleFavorite
}: HomeProps) {
  const [searchRegion, setSearchRegion] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [activeTheme, setActiveTheme] = useState('');

  // 本週熱門體驗：依 rating 降冪排列，取前 8 筆
  const trendingProducts = [...SAMPLE_PRODUCTS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const handleSearch = () => {
    if (!searchRegion) {
      alert("請先選擇您想去的目的地縣市唷！");
      return;
    }
    setSelectedRegion(searchRegion);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleThemeClick = (theme: string) => {
    setActiveTheme(theme);
    // 依據選擇的主題，設定對應的 category 篩選並跳轉
    setSelectedCategory(theme);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductCardClick = (id: number) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="it-home-wrapper">
      {/* Hero 主視覺區塊 */}
      <section className="it-hero-section">
        <div className="it-hero-content">
          <span className="it-hero-subtitle">——TAIWAN EXPERIENCES</span>
          <h1 className="it-hero-title">與台灣這片土地，<br /><span className="it-highlight">真實相遇</span></h1>
          <p className="it-hero-desc">超過 200 個在地嚮導帶路的深度體驗，從山頂到海岸，從廚房到工坊，找到屬於你的那一場旅途。</p>

          {/* 搜尋列卡片 */}
          <div className="it-search-bar-card max-md:flex-col max-md:rounded-2xl max-md:p-5">
            <div className="it-search-field max-md:w-full max-md:border-b max-md:border-slate-100 max-md:pb-2">
              <label htmlFor="it-home-location" className="it-field-label">🗺 選擇目的地</label>
              <select 
                id="it-home-location" 
                className="it-home-select"
                value={searchRegion}
                onChange={(e) => setSearchRegion(e.target.value)}
              >
                <option value="" disabled>請選擇縣市...</option>
                <option value="台北">台北</option>
                <option value="新北">新北</option>
                <option value="台中">台中</option>
                <option value="台南">台南</option>
                <option value="高雄">高雄</option>
                <option value="宜蘭">宜蘭</option>
                <option value="花蓮">花蓮</option>
                <option value="嘉義">嘉義</option>
                <option value="屏東">屏東</option>
                <option value="彰化">彰化</option>
              </select>
            </div>
            <div className="it-search-divider max-md:hidden"></div>
            <div className="it-search-field max-md:w-full max-md:border-b max-md:border-slate-100 max-md:pb-2">
              <label htmlFor="it-home-date" className="it-field-label">📅 選擇日期</label>
              <input 
                type="date" 
                id="it-home-date" 
                className="it-home-date-input"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
            <button 
              type="button" 
              id="it-home-search-btn" 
              className="it-btn-search max-md:w-full max-md:rounded-xl cursor-pointer"
              onClick={handleSearch}
            >
              搜尋體驗
            </button>
          </div>
        </div>
      </section>

      {/* 橫欄廣告數據統計區 */}
      <section className="it-stats-bar">
        <div className="it-stats-grid max-md:grid-cols-2 max-md:gap-6">
          <div className="it-stat-item"><span className="it-stat-num">200<span className="highlight">+</span></span><span className="it-stat-text">精選在地體驗</span></div>
          <div className="it-stat-item"><span className="it-stat-num">98<span class="highlight">%</span></span><span className="it-stat-text">旅客好評率</span></div>
          <div className="it-stat-item"><span class="it-stat-num">150<span className="highlight">+</span></span><span className="it-stat-text">認證在地嚮導</span></div>
          <div className="it-stat-item"><span className="it-stat-num">22</span><span className="it-stat-text">縣市全台覆蓋</span></div>
        </div>
      </section>

      {/* 尋找體驗類型區塊 */}
      <section className="it-theme-section">
        <span className="it-section-subtitle">EXPLORE BY THEME</span>
        <h2 className="it-section-title">找到你的體驗類型</h2>
        <div className="it-theme-grid max-lg:grid-cols-4 max-md:grid-cols-2">
          <button type="button" className={`it-theme-btn ${activeTheme === '戶外冒險' ? 'is-active' : ''}`} onClick={() => handleThemeClick('戶外冒險')}><span className="it-theme-emoji">🏔</span><span className="it-theme-text">戶外冒險</span></button>
          <button type="button" className={`it-theme-btn ${activeTheme === '手作工藝' ? 'is-active' : ''}`} onClick={() => handleThemeClick('手作工藝')}><span className="it-theme-emoji">🎨</span><span className="it-theme-text">手作工藝</span></button>
          <button type="button" className={`it-theme-btn ${activeTheme === '美食料理' ? 'is-active' : ''}`} onClick={() => handleThemeClick('美食料理')}><span className="it-theme-emoji">🍜</span><span className="it-theme-text">美食料理</span></button>
          <button type="button" className={`it-theme-btn ${activeTheme === '文化歷史' ? 'is-active' : ''}`} onClick={() => handleThemeClick('文化歷史')}><span className="it-theme-emoji">🏛</span><span className="it-theme-text">文化歷史</span></button>
          <button type="button" className={`it-theme-btn ${activeTheme === '水上活動' ? 'is-active' : ''}`} onClick={() => handleThemeClick('戶外冒險')}><span className="it-theme-emoji">🌊</span><span className="it-theme-text">水上活動</span></button>
          <button type="button" className={`it-theme-btn ${activeTheme === '農村生活' ? 'is-active' : ''}`} onClick={() => handleThemeClick('農村生活')}><span className="it-theme-emoji">🌿</span><span className="it-theme-text">農村生活</span></button>
          <button type="button" className={`it-theme-btn ${activeTheme === '傳統藝術' ? 'is-active' : ''}`} onClick={() => handleThemeClick('手作工藝')}><span className="it-theme-emoji">🎭</span><span className="it-theme-text">傳統藝術</span></button>
          <button type="button" className={`it-theme-btn ${activeTheme === '攝影旅拍' ? 'is-active' : ''}`} onClick={() => handleThemeClick('戶外冒險')}><span className="it-theme-emoji">📸</span><span className="it-theme-text">攝影旅拍</span></button>
        </div>
      </section>

      {/* 本週熱門體驗區塊 */}
      <section className="it-trending-section">
        <div className="it-section-header">
          <div>
            <span className="it-section-subtitle">HOT THIS WEEK</span>
            <h2 className="it-section-title">本週熱門體驗</h2>
          </div>
          <a href="#" className="it-view-all-link" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>查看全部 →</a>
        </div>
        
        {/* 商品卡片網格 */}
        <div className="it-trending-grid max-lg:grid-cols-2 max-sm:grid-cols-1">
          {trendingProducts.map(p => (
            <article key={p.id} className="it-product-card cursor-pointer" onClick={() => handleProductCardClick(p.id)}>
              <div className="it-card-image-wrapper">
                <img className="it-card-img" src={p.images[0]} alt={p.name} loading="lazy" />
                <button 
                  type="button" 
                  className={`it-heart-btn ${favorites.includes(p.id) ? 'is-active' : ''}`} 
                  aria-label="收藏"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(p.id);
                  }}
                >
                  ❤
                </button>
              </div>
              <div className="it-card-content">
                <span className="it-card-tag">{p.category}</span>
                <h4 className="it-card-title">{p.name}</h4>
                <div className="it-card-meta">
                  <span>📍 {p.region}</span>
                  <span>⏱ {p.duration}</span>
                </div>
                <div className="it-card-footer">
                  <div className="it-card-price">NT$ {p.price.toLocaleString()} <span>/ 人起</span></div>
                  <div className="it-card-rating">
                    ★ {p.rating.toFixed(1)} <span className="it-card-reviews">({p.reviewCount})</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 在地嚮導文字宣告區塊 */}
      <section className="it-guide-banner">
        <div className="it-guide-banner-content max-md:flex-col max-md:text-center max-md:gap-6">
          <div className="it-guide-text-group max-md:max-w-full">
            <h2 className="it-guide-title max-md:text-center">成為在地嚮導，<br />分享你的台灣故事</h2>
            <p className="it-guide-desc max-md:text-center">你是本地達人嗎？無論是山林秘徑、漁村廚藝還是傳統技藝，都可以化為獨一無二的體驗，與來自世界各地的旅人分享。</p>
          </div>
          <div className="it-guide-actions max-md:flex-col max-md:w-full">
            <button type="button" className="it-btn-guide-orange max-md:w-full text-center cursor-pointer" onClick={() => alert('嚮導申請表單正在準備中，敬請期待！')}>立即申請嚮導</button>
            <button type="button" className="it-btn-guide-white max-md:w-full text-center cursor-pointer" onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>了解更多</button>
          </div>
        </div>
      </section>

      {/* 旅客回饋區 */}
      <section className="it-reviews-section">
        <span className="it-section-subtitle">TRAVELER REVIEWS</span>
        <h2 className="it-section-title">旅人的真實心聲</h2>
        <div className="it-reviews-grid max-lg:grid-cols-1">
          {REVIEWS_MOCK.map((r, index) => (
            <div key={index} className="it-review-card">
              <div>
                <div className="it-review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                <p className="it-review-comment">「{r.comment}」</p>
              </div>
              <div className="it-review-user">
                <img className="it-user-avatar" src={r.avatar} alt={r.name} />
                <div className="it-user-info">
                  <span className="it-user-name">{r.name}</span>
                  <span className="it-user-meta">來自 {r.origin} · {r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
