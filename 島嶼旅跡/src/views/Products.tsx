import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface ProductsProps {
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: number) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export default function Products({
  setCurrentPage,
  setSelectedProductId,
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  favorites,
  toggleFavorite
}: ProductsProps) {
  // 篩選 State
  const [regions, setRegions] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<string>('default');

  // 連動機制：如果從首頁帶過來了目的地或主題分類，直接套用
  useEffect(() => {
    if (selectedRegion) {
      setRegions([selectedRegion]);
      setSelectedRegion(''); // 消耗掉，防止重複套用
    }
  }, [selectedRegion, setSelectedRegion]);

  useEffect(() => {
    if (selectedCategory) {
      setCategories([selectedCategory]);
      setSelectedCategory(''); // 消耗掉，防止重複套用
    }
  }, [selectedCategory, setSelectedCategory]);

  // 切換多選 Tag
  const handleTagToggle = (value: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // 清除全部篩選
  const handleClearAll = () => {
    setRegions([]);
    setCategories([]);
    setDurations([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('default');
  };

  // 過濾與排序邏輯
  let filteredProducts = [...SAMPLE_PRODUCTS];

  // 地區過濾
  if (regions.length > 0) {
    filteredProducts = filteredProducts.filter(p => regions.includes(p.region));
  }

  // 主題分類過濾
  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter(p => categories.includes(p.category));
  }

  // 時間長度過濾
  if (durations.length > 0) {
    filteredProducts = filteredProducts.filter(p => durations.includes(p.duration));
  }

  // 最低價格
  if (minPrice !== '') {
    filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
  }

  // 最高價格
  if (maxPrice !== '') {
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
  }

  // 排序
  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating-desc') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'reviews-desc') {
    filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  const handleCardClick = (id: number) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="it-explore-container max-lg:flex-col">
      {/* 側邊篩選條件區 */}
      <aside className="it-filter-sidebar max-lg:w-full">
        <div className="it-filter-header">
          <h2 className="it-filter-title">篩選條件</h2>
          <button type="button" id="it-clear-all" className="it-btn-clear" onClick={handleClearAll}>清除全部</button>
        </div>

        {/* 地區篩選 */}
        <div className="it-filter-group">
          <h3 className="it-filter-group-title">地區</h3>
          <div className="it-filter-tags">
            {["台北", "新北", "台中", "台南", "高雄", "宜蘭", "花蓮", "嘉義", "屏東", "彰化"].map(r => (
              <button 
                key={r}
                type="button" 
                className={`it-tag-btn ${regions.includes(r) ? 'is-active' : ''}`}
                onClick={() => handleTagToggle(r, regions, setRegions)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* 主題分類篩選 */}
        <div className="it-filter-group">
          <h3 className="it-filter-group-title">主題分類</h3>
          <div className="it-filter-tags">
            {["戶外冒險", "手作工藝", "美食料理", "文化歷史", "農村生活"].map(c => (
              <button 
                key={c}
                type="button" 
                className={`it-tag-btn ${categories.includes(c) ? 'is-active' : ''}`}
                onClick={() => handleTagToggle(c, categories, setCategories)}
              >
                {c === "戶外冒險" ? "🏔 戶外" : c === "手作工藝" ? "🎨 手作" : c === "美食料理" ? "🍜 美食" : c === "文化歷史" ? "🏛 文化" : "🌿 農村"}
              </button>
            ))}
          </div>
        </div>

        {/* 時間篩選 */}
        <div className="it-filter-group">
          <h3 className="it-filter-group-title">時間</h3>
          <div className="it-filter-tags">
            {["2小時", "3小時", "4小時", "半天", "全天"].map(d => (
              <button 
                key={d}
                type="button" 
                className={`it-tag-btn ${durations.includes(d) ? 'is-active' : ''}`}
                onClick={() => handleTagToggle(d, durations, setDurations)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 價格區間篩選 */}
        <div className="it-filter-group">
          <h3 className="it-filter-group-title">價格區間（NT$）</h3>
          <div className="it-price-range-inputs">
            <input 
              type="number" 
              placeholder="最低" 
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value !== '' ? Number(e.target.value) : '')}
            />
            <span className="it-price-separator">—</span>
            <input 
              type="number" 
              placeholder="最高" 
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value !== '' ? Number(e.target.value) : '')}
            />
          </div>
        </div>
      </aside>

      {/* 右側商品列表與排序區 */}
      <main className="it-products-main">
        {/* 麵包屑與排序工具列 */}
        <div className="it-products-toolbar max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <div className="it-breadcrumb">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>首頁</a> › <span className="it-current-page">探索體驗</span>
            <span className="it-products-count">共找到 {filteredProducts.length} 個體驗</span>
          </div>

          {/* 排序下拉選單 */}
          <div className="it-sort-wrapper max-sm:w-full">
            <select 
              id="it-sort-select" 
              className="it-select max-sm:w-full"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">預設排序</option>
              <option value="price-asc">價格由低到高</option>
              <option value="price-desc">價格由高到低</option>
              <option value="rating-desc">評分最高</option>
              <option value="reviews-desc">最多評論</option>
            </select>
          </div>
        </div>

        {/* 產品卡片容器 */}
        <div className="it-products-grid">
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', padding: '40px 0' }}>
              沒有符合條件的體驗，請重新篩選
            </div>
          ) : (
            filteredProducts.map(product => (
              <article 
                key={product.id} 
                className="it-product-card cursor-pointer"
                onClick={() => handleCardClick(product.id)}
              >
                <div className="it-card-image-wrapper">
                  <img className="it-card-img" src={product.images[0]} alt={product.name} loading="lazy" />
                  <button 
                    type="button" 
                    className={`it-heart-btn ${favorites.includes(product.id) ? 'is-active' : ''}`} 
                    aria-label="收藏"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    ❤
                  </button>
                </div>
                <div className="it-card-content">
                  <span className="it-card-tag">{product.category}</span>
                  <h4 className="it-card-title">{product.name}</h4>
                  <div className="it-card-meta">
                    <span>📍 {product.region}</span>
                    <span>⏱ {product.duration}</span>
                  </div>
                  <div className="it-card-footer">
                    <div className="it-card-price">NT$ {product.price.toLocaleString()} <span>/ 人起</span></div>
                    <div className="it-card-rating">
                      ★ {product.rating.toFixed(1)} <span className="it-card-reviews">({product.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
