export interface Review {
  name: string;
  date: string;
  rating: number;
  content: string;
}

export interface Product {
  id: number;
  name: string; // 也是 title
  region: string; // 地區
  category: string; // 分類
  duration: string; // 時間長度 (如 半天, 全天, 3小時)
  price: number;
  rating: number;
  reviewCount: number; // reviews 總數
  images: string[];
  intro: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  reviews: Review[];
}

export interface Order {
  id: string;
  productId: number;
  title: string;
  location: string;
  date: string;
  timeSlot: string;
  amount: number;
  status: '未出發' | '已完成' | '已取消';
  image: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactMemo?: string;
  paymentMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  preferences: string[];
}
