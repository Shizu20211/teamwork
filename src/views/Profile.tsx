import React, { useState, useEffect } from 'react';
import { Product, Order, UserProfile } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface ProfileProps {
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: number) => void;
  loggedInUser: string;
  setLoggedInUser: (name: string) => void;
  profileTab: string;
  setProfileTab: (tab: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function Profile({
  setCurrentPage,
  setSelectedProductId,
  loggedInUser,
  setLoggedInUser,
  profileTab,
  setProfileTab,
  favorites,
  toggleFavorite,
  orders,
  setOrders
}: ProfileProps) {
  // Modal 狀態
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderTitle, setSelectedOrderTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // 個人資料 State
  const [profile, setProfile] = useState<UserProfile>({
    name: loggedInUser || '旅遊達人',
    email: 'demo@islandtrace.tw',
    phone: '0912-345-678',
    birthday: '1995-10-24',
    preferences: ['戶外冒險', '手作工藝', '美食料理', '文化歷史']
  });

  useEffect(() => {
    if (loggedInUser) {
      setProfile(prev => ({ ...prev, name: loggedInUser }));
    }
  }, [loggedInUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedInUser(profile.name);
    localStorage.setItem('loggedInUser', profile.name);
    showToast('個人資料已成功儲存！');
  };

  const handleLogout = () => {
    setLoggedInUser('');
    localStorage.removeItem('loggedInUser');
    showToast('已成功安全登出！');
    setTimeout(() => {
      setCurrentPage('home');
    }, 1000);
  };

  const cmdCancelOrder = (id: string, title: string) => {
    setSelectedOrderId(id);
    setSelectedOrderTitle(title);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (!selectedOrderId) return;
    const updatedOrders = orders.map(o => 
      o.id === selectedOrderId ? { ...o, status: '已取消' as const } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setShowCancelModal(false);
    showToast(`已成功取消「${selectedOrderTitle}」的預訂`);
  };

  // 我的收藏：篩選出實際有加入 favorites 的商品
  const favoriteProducts = SAMPLE_PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <main className="main-content">
      <div className="main-wrapper">
        <div className="content-container">
          {/* 左側 Sidebar */}
          <div className="sidebar-narrow flex flex-col gap-3">
            <div className="bg-white rounded-[20px] p-5 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100">
              <div className="relative w-16 h-16 mb-2">
                <div className="absolute inset-0 rounded-full border-[3px] border-[#FF5B22]"></div>
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80"
                  alt="頭像"
                  className="w-full h-full object-cover rounded-full p-1"
                />
              </div>
              <h3 className="text-[#1a2649] font-bold text-base mb-0.5 tracking-tight text-center">
                {profile.name}
              </h3>
              <p className="text-slate-400 text-[10px] mb-1.5 font-mono text-center">
                {profile.email}
              </p>
              <span className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] text-[9px] font-semibold px-3 py-0.5 rounded-full shadow-sm">
                <span className="text-amber-500">★</span> 探險會員
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setProfileTab('orders')}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 transition-all duration-300 text-sm cursor-pointer ${profileTab === 'orders' ? 'bg-[#FEF0EB] text-[#FF5B22] font-bold rounded-[14px]' : 'text-[#4A5568] hover:text-[#FF5B22] hover:bg-[#FAF6F0] rounded-[14px]'}`}
              >
                <span className="text-base">📋</span>
                <span className="font-bold">訂單紀錄</span>
              </button>
              <button
                onClick={() => setProfileTab('favorites')}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 transition-all duration-300 text-sm cursor-pointer ${profileTab === 'favorites' ? 'bg-[#FEF0EB] text-[#FF5B22] font-bold rounded-[14px]' : 'text-[#4A5568] hover:text-[#FF5B22] hover:bg-[#FAF6F0] rounded-[14px]'}`}
              >
                <span className="text-base">🩷</span>
                <span className="font-bold">我的收藏</span>
              </button>
              <button
                onClick={() => setProfileTab('profile')}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 transition-all duration-300 text-sm cursor-pointer ${profileTab === 'profile' ? 'bg-[#FEF0EB] text-[#FF5B22] font-bold rounded-[14px]' : 'text-[#4A5568] hover:text-[#FF5B22] hover:bg-[#FAF6F0] rounded-[14px]'}`}
              >
                <span className="text-base">👤</span>
                <span className="font-bold">個人資料</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-rose-600 hover:bg-[#FAF6F0] rounded-[14px] transition-all text-sm cursor-pointer font-bold"
              >
                <span className="text-base">🚪</span>
                <span>登出</span>
              </button>
            </nav>
          </div>

          {/* 右側內容區 */}
          <div className="right-panel">
            {/* 訂單紀錄 */}
            {profileTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h2 className="text-[#132A55] font-extrabold text-xl mb-4 tracking-tight text-left">
                  訂單紀錄
                </h2>
                {orders.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="text-5xl mb-3 select-none">📋</div>
                    <h3 className="text-slate-800 font-bold text-lg mb-1">您尚未有預訂訂單唷</h3>
                    <p className="text-slate-500 text-sm max-w-sm mb-4">快去預訂您的第一個台灣深度旅程吧！</p>
                    <button 
                      onClick={() => { setCurrentPage('products'); }}
                      className="bg-[#ff5b22] hover:bg-[#e04a18] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition cursor-pointer"
                    >
                      去探索體驗
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] border-collapse order-table text-left">
                      <thead>
                        <tr className="border-b border-slate-200 text-[#4A5568] text-xs">
                          <th className="font-bold w-[40%]">體驗</th>
                          <th className="font-bold w-[25%]">日期 / 場次</th>
                          <th className="font-bold w-[15%]">金額</th>
                          <th className="font-bold w-[20%] text-center">狀態</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map(order => (
                          <tr key={order.id} className="order-row-hover transition-colors">
                            <td className="py-3 pr-2">
                              <div className="flex items-center gap-3">
                                <img
                                  src={order.image}
                                  className="w-12 h-9 rounded object-cover border border-slate-100 flex-shrink-0"
                                  alt={order.title}
                                />
                                <div className="min-w-0">
                                  <h4 
                                    className="text-slate-800 font-bold text-sm truncate leading-tight hover:text-[#ff5b22] cursor-pointer"
                                    onClick={() => {
                                      setSelectedProductId(order.productId);
                                      setCurrentPage('product-detail');
                                    }}
                                  >
                                    {order.title}
                                  </h4>
                                  <span className="location-tag mt-0.5">
                                    📍 <span>{order.location}</span>
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 pr-2">
                              <div className="flex flex-col text-sm text-slate-600 font-mono leading-tight">
                                <span className="font-bold text-slate-800">{order.date}</span>
                                <span className="text-slate-400 text-[10px]">{order.timeSlot}</span>
                              </div>
                            </td>
                            <td className="py-3 pr-2">
                              <span className="text-[#FF5B22] font-bold text-sm font-mono">
                                NT$ {order.amount.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-3 text-center">
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                <span
                                  className={`status-badge px-3 py-1 text-xs rounded-full font-bold ${
                                    order.status === '未出發' 
                                      ? 'bg-[#FEF0EB] text-[#FF5B22]' 
                                      : order.status === '已完成' 
                                        ? 'bg-[#E8F5E9] text-[#2E7D32]' 
                                        : 'bg-slate-100 text-slate-400'
                                  }`}
                                >
                                  {order.status}
                                </span>
                                {order.status === '未出發' && (
                                  <button
                                    onClick={() => cmdCancelOrder(order.id, order.title)}
                                    className="btn-outline-orange text-[10px] px-2 py-0.5 rounded cursor-pointer"
                                  >
                                    取消
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 我的收藏 */}
            {profileTab === 'favorites' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h2 className="text-[#132A55] font-extrabold text-xl mb-4 tracking-tight text-left">
                  我的收藏
                </h2>
                {favoriteProducts.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="text-5xl mb-3 select-none">💔</div>
                    <h3 className="text-slate-800 font-bold text-lg mb-1">
                      收藏清單是空的
                    </h3>
                    <p className="text-slate-500 text-sm max-w-sm mb-4 leading-relaxed">
                      在體驗列表頁點選愛心圖示，即可加入收藏
                    </p>
                    <button
                      onClick={() => { setCurrentPage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_6px_18px_-4px_rgba(234,88,12,0.45)] hover:shadow-[0_10px_28px_-4px_rgba(234,88,12,0.65)] hover:-translate-y-1 active:scale-95 cursor-pointer"
                    >
                      去探索體驗
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {favoriteProducts.map(p => (
                      <div 
                        key={p.id}
                        className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer"
                        onClick={() => {
                          setSelectedProductId(p.id);
                          setCurrentPage('product-detail');
                        }}
                      >
                        <div className="relative aspect-[16/10] bg-slate-100">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            className="it-heart-btn is-active"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(p.id);
                            }}
                          >
                            ❤
                          </button>
                        </div>
                        <div className="p-4 flex-grow flex flex-col justify-between">
                          <div>
                            <span className="text-xs text-[#FF5B22] font-bold">{p.category}</span>
                            <h4 className="font-bold text-sm text-slate-800 line-clamp-1 mt-1">{p.name}</h4>
                            <p className="text-[11px] text-slate-400 mt-1">📍 {p.region} · ⏱ {p.duration}</p>
                          </div>
                          <div className="flex justify-between items-center border-t border-slate-50 pt-2.5 mt-3">
                            <span className="font-bold text-sm text-slate-800">NT$ {p.price.toLocaleString()}</span>
                            <span className="text-xs text-amber-500 font-bold">★ {p.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 個人資料 */}
            {profileTab === 'profile' && (
              <div className="profile-white-bg text-left">
                <h2 className="text-[#132A55] font-extrabold text-xl mb-4 tracking-tight">
                  個人資料
                </h2>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-700 font-bold text-sm">
                        姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B22] text-sm text-slate-800 font-medium"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-700 font-bold text-sm">手機號碼</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B22] text-sm text-slate-800 font-medium"
                      />
                    </div>
                    <div class="flex flex-col gap-0.5">
                      <label class="text-slate-700 font-bold text-sm">電子信箱</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B22] text-sm text-slate-800"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-700 font-bold text-sm">出生日期</label>
                      <input
                        type="date"
                        value={profile.birthday}
                        onChange={(e) => setProfile({...profile, birthday: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B22] text-sm text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <label className="text-slate-700 font-bold text-sm">旅遊偏好</label>
                    <div className="flex flex-wrap gap-2">
                      {['戶外冒險', '手作工藝', '美食料理', '文化歷史'].map(pref => {
                        const isSelected = profile.preferences.includes(pref);
                        return (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setProfile({ ...profile, preferences: profile.preferences.filter(p => p !== pref) });
                              } else {
                                setProfile({ ...profile, preferences: [...profile.preferences, pref] });
                              }
                            }}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer select-none ${isSelected ? 'bg-[#FEF0EB] border-[#FF5B22] text-[#FF5B22]' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                          >
                            {pref === '戶外冒險' ? '🏕️' : pref === '手作工藝' ? '🎨' : pref === '美食料理' ? '🍜' : '🏛️'} {pref}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-start">
                    <button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_6px_18px_-4px_rgba(234,88,12,0.45)] hover:shadow-[0_10px_28px_-4px_rgba(234,88,12,0.65)] hover:-translate-y-1 active:scale-95 cursor-pointer"
                    >
                      儲存更改
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 整合原生確認取消訂單 */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] p-6 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-fade-in">
            <span className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4">⚠️</span>
            <h3 className="text-slate-800 font-bold text-lg mb-2">確認取消訂單？</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              確定要取消「<strong className="text-slate-800">{selectedOrderTitle}</strong>」嗎？取消後將依退款政策處理退款。
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition cursor-pointer"
              >
                再想想
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-xl transition shadow-md shadow-rose-200 cursor-pointer"
              >
                確定取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast 提示 */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border bg-[#E8F5E9] text-[#1B5E20] border-emerald-100 animate-fade-in">
          <span className="text-emerald-600 font-bold">✓</span>
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}
    </main>
  );
}
