import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface ProductDetailProps {
  productId: number;
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: number) => void;
  // 連動到 Booking State 的 props
  setBookingDetails: (details: { productId: number; quantity: number; totalPrice: number }) => void;
}

export default function ProductDetail({
  productId,
  setCurrentPage,
  setSelectedProductId,
  setBookingDetails
}: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // 取得商品
  const product = SAMPLE_PRODUCTS.find(p => p.id === productId) || SAMPLE_PRODUCTS[0];

  useEffect(() => {
    // 當商品 ID 改變時，重設狀態
    setCurrentImageIndex(0);
    setQuantity(1);
  }, [productId]);

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "★" : "") + "☆".repeat(empty);
  };

  const handleQuantityChange = (delta: number) => {
    let newVal = quantity + delta;
    if (newVal < 1) newVal = 1;
    if (newVal > 20) newVal = 20;
    setQuantity(newVal);
  };

  const handleBookingClick = () => {
    // 設定 Booking State 詳細資訊，並切換至 booking 頁面
    setBookingDetails({
      productId: product.id,
      quantity: quantity,
      totalPrice: product.price * quantity
    });
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentImages = product.images.length > 0 ? product.images : [product.images[0]];

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-6xl px-6 sm:px-12 lg:px-16 py-4 mt-6 text-left">
        {/* 麵包屑 */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap font-medium">
          <a href="#" className="hover:text-[#ff5b22] transition" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>首頁</a>
          <span className="text-gray-400">›</span>
          <a href="#" className="hover:text-[#ff5b22] transition" onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}>探索體驗</a>
          <span className="text-gray-400">›</span>
          <span className="text-slate-400 font-normal">{product.name}</span>
        </nav>

        {/* 圖片展示區 */}
        <div className="mb-6">
          <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
            <img 
              id="main-product-image" 
              src={currentImages[currentImageIndex]} 
              alt={product.name} 
              className="w-full h-[240px] sm:h-[420px] object-cover transition-all duration-300" 
            />
          </div>
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
            {currentImages.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`縮圖 ${idx + 1}`}
                className={`thumb-img w-[70px] h-[50px] sm:w-[90px] sm:h-[60px] object-cover rounded-lg cursor-pointer transition ${idx === currentImageIndex ? 'active scale-102 border-2 border-[#ff5b22]' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setCurrentImageIndex(idx)} 
              />
            ))}
          </div>
        </div>

        {/* 標題欄 */}
        <div className="mb-6 border-b border-slate-100 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a2649] font-display leading-tight">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-semibold text-[#1a2649]">
            <span className="bg-[#FAF6F0] px-3 py-1 rounded-full text-xs">📍 {product.region}</span>
            <span className="bg-[#FAF6F0] px-3 py-1 rounded-full text-xs">⏱ {product.duration}</span>
            <span className="bg-[#FAF6F0] px-3 py-1 rounded-full text-xs">🏷 {product.category}</span>
            <span className="text-yellow-500 font-bold text-base flex items-center gap-1">
              {renderStars(product.rating)}
              <span className="text-slate-700 text-sm font-medium ml-1">({product.reviewCount} 則評論)</span>
            </span>
          </div>
        </div>

        {/* 雙欄排版 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 體驗介紹 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a2649] mb-3">體驗介紹</h2>
              <hr className="divider-2px mb-4 border-slate-100" />
              <p className="text-[#556575] text-sm leading-[1.8] font-normal">{product.intro}</p>
            </section>

            {/* 行程亮點 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a2649] mb-3 flex items-center gap-1.5">
                <span className="text-[#ff5b22]">✦</span> 行程亮點
              </h2>
              <hr className="divider-2px mb-4 border-slate-100" />
              <ul className="space-y-3">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-sm">
                    <span className="text-[#ff5b22] text-xs mt-1">✦</span>
                    <span className="text-[#556575] leading-relaxed font-normal">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 費用說明 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a2649] mb-3">費用說明</h2>
              <hr className="divider-2px mb-4 border-slate-100" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAF6F0] rounded-2xl p-5 border border-[#F5EFE6]">
                  <h3 className="font-bold text-[#1a2649] mb-3 text-sm flex items-center gap-2">
                    <span className="text-green-600">✅</span> 費用包含
                  </h3>
                  <ul className="space-y-2">
                    {product.includes.map((inc, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[#556575] list-disc ml-5 font-light leading-relaxed">{inc}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#FAF6F0] rounded-2xl p-5 border border-[#F5EFE6]">
                  <h3 className="font-bold text-[#1a2649] mb-3 text-sm flex items-center gap-2">
                    <span className="text-red-500">❌</span> 費用不包含
                  </h3>
                  <ul className="space-y-2">
                    {product.excludes.map((exc, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[#556575] list-disc ml-5 font-light leading-relaxed">{exc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 旅客評論 */}
            <section>
              <h2 className="text-xl font-bold text-[#1a2649] mb-3">旅客評論</h2>
              <hr className="divider-2px mb-4 border-slate-100" />
              <div className="space-y-4">
                {product.reviews.map((r, idx) => (
                  <div key={idx} className={`pb-5 ${idx < product.reviews.length - 1 ? "border-b border-[#FAF6F0]" : ""}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-9 h-9 rounded-full bg-[#ff5b22]/10 flex items-center justify-center text-[#ff5b22] font-bold text-sm">
                        {r.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#1a2649] text-sm">{r.name}</span>
                        <span className="text-slate-400 text-[10px] font-medium">{r.date}</span>
                      </div>
                    </div>
                    <div className="text-yellow-400 text-xs mt-1.5">{renderStars(r.rating || 5)}</div>
                    <p className="text-[#556575] text-sm leading-relaxed mt-2 font-normal">{r.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky 預訂卡片 */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <div className="text-3xl font-extrabold text-[#ff5b22]">NT$ {product.price.toLocaleString()}</div>
              <div className="text-slate-400 text-xs font-semibold mb-5">/ 人起</div>
              <div className="flex items-center gap-2 text-sm text-[#556575] mb-6">
                <span className="text-yellow-400 text-base">{renderStars(product.rating)}</span>
                <span className="font-bold text-slate-700">{product.rating}</span>
                <span>({product.reviewCount} 則評價)</span>
              </div>
              
              {/* 選擇人數 */}
              <div className="flex items-center justify-between mb-6">
                <label className="text-sm font-bold text-[#1a2649]">參加人數</label>
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:border-[#ff5b22] hover:text-[#ff5b22] flex items-center justify-center text-lg font-bold transition cursor-pointer select-none"
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    id="quantity-input" 
                    value={quantity} 
                    readOnly
                    className="w-12 text-center border-0 focus:ring-0 text-lg font-extrabold text-[#1a2649] bg-transparent" 
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:border-[#ff5b22] hover:text-[#ff5b22] flex items-center justify-center text-lg font-bold transition cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 總金額 */}
              <div className="flex justify-between items-center border-t-2 border-[#FAF6F0] pt-4 mb-6">
                <span className="text-[#556575] text-sm font-bold">總金額</span>
                <span id="total-price" className="text-2xl font-black text-[#ff5b22]">
                  NT$ {(product.price * quantity).toLocaleString()}
                </span>
              </div>

              {/* 預訂按動 */}
              <button 
                onClick={handleBookingClick}
                className="w-full bg-[#ff5b22] hover:bg-[#e04a18] text-white font-bold text-sm px-6 py-4 rounded-full transition-all duration-300 shadow-[0_6px_18px_-4px_rgba(255,91,34,0.45)] hover:shadow-[0_10px_28px_-4px_rgba(255,91,34,0.65)] hover:-translate-y-1 active:scale-95 cursor-pointer"
              >
                立即預訂
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400 mt-4 font-semibold">
                <span>🔒</span><span>安全付款 · 免費取消（7天前）</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
