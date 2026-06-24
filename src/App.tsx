import React, { useState, useEffect } from 'react';
import { Order } from './types';

// 引入元件與視圖
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import About from './views/About';
import Products from './views/Products';
import ProductDetail from './views/ProductDetail';
import QA from './views/QA';
import Login from './views/Login';
import Profile from './views/Profile';
import Booking from './views/Booking';

const INITIAL_ORDERS: Order[] = [
  { 
    id: 'ord_1', 
    productId: 1, 
    title: '清水斷崖獨木舟探險', 
    location: '花蓮', 
    date: '2026/07/15', 
    timeSlot: '上午場 09:00', 
    amount: 1800, 
    status: '未出發', 
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=150&h=100&q=80',
    contactName: '旅遊達人',
    contactPhone: '0912-345-678',
    contactEmail: 'demo@islandtrace.tw',
    paymentMethod: 'card'
  },
  { 
    id: 'ord_2', 
    productId: 5, 
    title: '淡水老街藍染拼布工作坊', 
    location: '新北', 
    date: '2026/05/20', 
    timeSlot: '下午場 14:00', 
    amount: 1200, 
    status: '已完成', 
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=150&h=100&q=80',
    contactName: '旅遊達人',
    contactPhone: '0912-345-678',
    contactEmail: 'demo@islandtrace.tw',
    paymentMethod: 'card'
  }
];

export default function App() {
  // 分頁狀態 (從 localStorage 初始化或預設為 'home')
  const [currentPage, setCurrentPageState] = useState<string>(() => {
    return localStorage.getItem('currentPage') || 'home';
  });

  const setCurrentPage = (page: string) => {
    setCurrentPageState(page);
    localStorage.setItem('currentPage', page);
  };

  // 登入使用者狀態
  const [loggedInUser, setLoggedInUser] = useState<string>(() => {
    return localStorage.getItem('loggedInUser') || '';
  });

  // 收藏清單
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [1, 2]; // 預設加入一兩筆以利展示
  });

  // 訂單清單
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // 跨分頁傳遞參數 State
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // QA 與 Profile 分頁選卡設定，利於 Footer 快速連動
  const [qaCategory, setQaCategory] = useState<string>('booking');
  const [profileTab, setProfileTab] = useState<string>('orders');

  // Booking 細節傳遞
  const [bookingDetails, setBookingDetails] = useState<{ productId: number; quantity: number; totalPrice: number }>({
    productId: 1,
    quantity: 1,
    totalPrice: 1800
  });

  // 同步 favorites 變更至 localStorage
  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // 監聽 localStorage 改變（為符合 user「localStorage A標籤方式跳轉」需求，亦加入 storage 事件監聽）
  useEffect(() => {
    const handleStorageChange = () => {
      const page = localStorage.getItem('currentPage');
      if (page && page !== currentPage) {
        setCurrentPageState(page);
      }
      const user = localStorage.getItem('loggedInUser');
      if (user !== null && user !== loggedInUser) {
        setLoggedInUser(user);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentPage, loggedInUser]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#333333]">
      {/* 共通導覽列 Header */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* 主要內容渲染區 */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <Home 
            setCurrentPage={setCurrentPage} 
            setSelectedProductId={setSelectedProductId}
            setSelectedRegion={setSelectedRegion}
            setSelectedCategory={setSelectedCategory}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}

        {currentPage === 'about' && (
          <About setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'products' && (
          <Products 
            setCurrentPage={setCurrentPage}
            setSelectedProductId={setSelectedProductId}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetail 
            productId={selectedProductId}
            setCurrentPage={setCurrentPage}
            setSelectedProductId={setSelectedProductId}
            setBookingDetails={setBookingDetails}
          />
        )}

        {currentPage === 'qa' && (
          <QA 
            qaCategory={qaCategory} 
            setQaCategory={setQaCategory} 
          />
        )}

        {currentPage === 'login' && (
          <Login 
            setCurrentPage={setCurrentPage} 
            setLoggedInUser={setLoggedInUser}
          />
        )}

        {currentPage === 'profile' && (
          <Profile 
            setCurrentPage={setCurrentPage}
            setSelectedProductId={setSelectedProductId}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
            profileTab={profileTab}
            setProfileTab={setProfileTab}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            orders={orders}
            setOrders={setOrders}
          />
        )}

        {currentPage === 'booking' && (
          <Booking 
            bookingDetails={bookingDetails}
            setCurrentPage={setCurrentPage}
            setProfileTab={setProfileTab}
            orders={orders}
            setOrders={setOrders}
          />
        )}
      </main>

      {/* 共通頁尾 Footer */}
      <Footer 
        setCurrentPage={setCurrentPage} 
        setQaCategory={setQaCategory}
        setProfileTab={setProfileTab}
      />
    </div>
  );
}
