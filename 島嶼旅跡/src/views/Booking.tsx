import React, { useState, useEffect, useRef } from 'react';
import { Product, Order } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface BookingProps {
  bookingDetails: { productId: number; quantity: number; totalPrice: number };
  setCurrentPage: (page: string) => void;
  setProfileTab: (tab: string) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function Booking({
  bookingDetails,
  setCurrentPage,
  setProfileTab,
  orders,
  setOrders
}: BookingProps) {
  const [step, setStep] = useState(1); // 1, 2, 3
  
  // 取得當前商品
  const product = SAMPLE_PRODUCTS.find(p => p.id === bookingDetails.productId) || SAMPLE_PRODUCTS[0];

  // 預訂狀態 State
  const [selectedDate, setSelectedDate] = useState('2026/06/25');
  const [selectedSlot, setSelectedSlot] = useState('下午場 14:00');
  const [activePayment, setActivePayment] = useState('card');

  // 聯絡人 State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMemo, setContactMemo] = useState('');

  // 信用卡 State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // 隨機產生的 10 碼訂單號
  const [orderId, setOrderId] = useState('');

  // Canvas Ref 用於紙屑特效
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 欄位防呆解禁
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // 檢查表單格式
    const isContactOk = contactName.trim() !== '' && contactPhone.trim() !== '' && contactEmail.trim() !== '';
    let isPaymentOk = false;

    if (activePayment === 'card') {
      const cardClean = cardNumber.replace(/\s/g, '');
      isPaymentOk = cardClean.length === 16 && cardExpiry.length === 5 && cardCvv.length === 3;
    } else {
      isPaymentOk = true;
    }

    setIsFormValid(isContactOk && isPaymentOk);
  }, [contactName, contactPhone, contactEmail, activePayment, cardNumber, cardExpiry, cardCvv]);

  // 月曆點選
  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  // 信用卡卡號每 4 位補空白
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^0-9]/g, '');
    let matches = v.match(/\d{1,16}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    setCardNumber(parts.length > 0 ? parts.join(' ') : v);
  };

  // 信用卡效期 MM/YY 自動補斜線
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^0-9]/g, '');
    if (v.length >= 2) {
      setCardExpiry(v.substring(0, 2) + '/' + v.substring(2, 4));
    } else {
      setCardExpiry(v);
    }
  };

  // 完成付款並寫入訂單紀錄
  const handleCompletePayment = () => {
    const generatedId = 'IT' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setOrderId(generatedId);

    // 新增訂單
    const newOrder: Order = {
      id: generatedId,
      productId: product.id,
      title: product.name,
      location: product.region,
      date: selectedDate,
      timeSlot: selectedSlot,
      amount: bookingDetails.totalPrice,
      status: '未出發',
      image: product.images[0],
      contactName,
      contactPhone,
      contactEmail,
      contactMemo,
      paymentMethod: activePayment
    };

    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));

    // 跳轉到 Step 3
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 五彩紙屑（Confetti）爆炸動畫效果
  useEffect(() => {
    if (step !== 3 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      angle: number;
      speed: number;
      radius: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const colors = ["#e06343", "#4b7754", "#2563eb", "#f59e0b", "#ec4899"];

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: 0,
        y: canvas.height * 0.8,
        angle: -Math.PI / 4 + (Math.random() * 0.4 - 0.2),
        speed: 15 + Math.random() * 12,
        radius: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotSpeed: Math.random() * 0.2 - 0.1,
        opacity: 1
      });
      particles.push({
        x: canvas.width,
        y: canvas.height * 0.8,
        angle: -Math.PI * 0.75 + (Math.random() * 0.4 - 0.2),
        speed: 15 + Math.random() * 12,
        radius: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotSpeed: Math.random() * 0.2 - 0.1,
        opacity: 1
      });
    }

    let animationFrameId: number;

    const runAnimation = () => {
      let active = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        if (p.opacity <= 0) return;
        active = true;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.speed *= 0.96;
        p.y += 0.4;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.008;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.radius, -p.radius * 1.5, p.radius * 2, p.radius * 3);
        ctx.restore();
      });

      if (active) {
        animationFrameId = requestAnimationFrame(runAnimation);
      } else {
        canvas.style.display = 'none';
      }
    };

    runAnimation();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [step]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-6 mt-4">
      {/* Confetti Canvas */}
      <canvas id="confetti-canvas" ref={canvasRef}></canvas>

      {/* 步驟進度條 */}
      <div className="steps-container">
        <div className={`step-item ${step === 1 ? 'active' : step > 1 ? 'completed' : 'inactive'}`}>
          <div className="step-number">{step > 1 ? '✓' : '1'}</div>
          <div className="step-label">選擇日期</div>
        </div>
        <div className={`step-line ${step > 1 ? 'active' : 'inactive'}`}></div>
        <div className={`step-item ${step === 2 ? 'active' : step > 2 ? 'completed' : 'inactive'}`}>
          <div className="step-number">{step > 2 ? '✓' : '2'}</div>
          <div className="step-label">填寫資料</div>
        </div>
        <div className={`step-line ${step > 2 ? 'active' : 'inactive'}`}></div>
        <div className={`step-item ${step === 3 ? 'active' : 'inactive'}`}>
          <div className="step-number">3</div>
          <div className="step-label">預訂完成</div>
        </div>
      </div>

      {/* Step 1: 選擇日期與場次 */}
      {step === 1 && (
        <div className="main-layout animate-fade-in text-left">
          <div className="left-column-flow">
            <div className="card">
              <div className="calendar-header-row">
                <button type="button" className="calendar-arrow-btn" onClick={() => alert('僅開放當月預訂服務！')}>&lt;</button>
                <div className="calendar-month-title">2026 年 六月</div>
                <button type="button" className="calendar-arrow-btn" onClick={() => alert('僅開放當月預訂服務！')}>&gt;</button>
              </div>
              <div className="calendar-grid">
                <div className="calendar-day-header">日</div>
                <div className="calendar-day-header">一</div>
                <div className="calendar-day-header">二</div>
                <div className="calendar-day-header">三</div>
                <div className="calendar-day-header">四</div>
                <div className="calendar-day-header">五</div>
                <div className="calendar-day-header">六</div>
              </div>
              <div className="calendar-grid mt-3">
                <div></div><div></div><div></div><div></div><div></div><div></div>
                {[...Array(17)].map((_, i) => (
                  <div key={i} className="calendar-day muted">{i + 1}</div>
                ))}
                <div 
                  className={`calendar-day today-highlight cursor-pointer ${selectedDate === '2026/06/18' ? 'selected-active' : ''}`}
                  onClick={() => handleDateSelect('2026/06/18')}
                >
                  18
                </div>
                {[19, 20, 21, 22, 23, 24].map(d => (
                  <div 
                    key={d} 
                    className={`calendar-day cursor-pointer ${selectedDate === `2026/06/${d}` ? 'selected-active' : ''}`}
                    onClick={() => handleDateSelect(`2026/06/${d}`)}
                  >
                    {d}
                  </div>
                ))}
                <div 
                  className={`calendar-day cursor-pointer ${selectedDate === '2026/06/25' ? 'selected-active' : ''}`}
                  onClick={() => handleDateSelect('2026/06/25')}
                >
                  25
                </div>
                {[26, 27, 28, 29, 30].map(d => (
                  <div 
                    key={d} 
                    className={`calendar-day cursor-pointer ${selectedDate === `2026/06/${d}` ? 'selected-active' : ''}`}
                    onClick={() => handleDateSelect(`2026/06/${d}`)}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="section-title">選擇場次</div>
              <div className="slots-grid mb-8">
                <div 
                  className={`slot-box ${selectedSlot === '上午場 09:00' ? 'selected' : ''}`} 
                  onClick={() => setSelectedSlot('上午場 09:00')}
                >
                  <div className="time-text">09:00</div>
                  <div className="meta-text">🌅 上午場</div>
                </div>
                <div 
                  className={`slot-box ${selectedSlot === '下午場 14:00' ? 'selected' : ''}`} 
                  onClick={() => setSelectedSlot('下午場 14:00')}
                >
                  <div className="time-text">14:00</div>
                  <div className="meta-text">🙃 下午場</div>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-action cursor-pointer"
                onClick={() => setStep(2)}
              >
                下一步：填寫旅客資料 ➔
              </button>
            </div>
          </div>

          {/* 預訂摘要 */}
          <div className="card">
            <div className="section-title mb-5">預訂摘要</div>
            <div className="activity-img-wrapper">
              <img src={product.images[0]} alt={product.name} className="activity-img" />
            </div>
            <div className="text-lg font-bold mb-4.5 text-[#1a2649]">{product.name}</div>
            <div className="detail-row"><span className="detail-label">目的地</span><span className="detail-value">{product.region}</span></div>
            <div className="detail-row"><span class="detail-label">時間長度</span><span className="detail-value">{product.duration}</span></div>
            <div className="detail-row"><span className="detail-label">選擇日期</span><span className="detail-value highlight">{selectedDate}</span></div>
            <div className="detail-row"><span className="detail-label">選擇場次</span><span className="detail-value highlight">{selectedSlot}</span></div>
            <div className="detail-row border-0 mt-2">
              <span className="detail-label">價格</span>
              <span className="text-lg font-bold text-[#e06343]">NT$ {product.price.toLocaleString()} / 人</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: 填寫資料與付款 */}
      {step === 2 && (
        <div className="main-layout animate-fade-in text-left">
          <div className="left-column-flow">
            <div className="card">
              <div className="section-title">👤 聯絡人資料</div>
              <div className="form-grid">
                <div className="form-row-2col max-sm:grid-cols-1">
                  <div className="form-group">
                    <label>姓名 *</label>
                    <input 
                      type="text" 
                      placeholder="請輸入真實姓名" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>手機號碼 *</label>
                    <input 
                      type="tel" 
                      placeholder="09XX-XXX-XXX" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>電子信箱 *</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>備註 (選填)</label>
                  <textarea 
                    rows={3} 
                    placeholder="有任何特殊需求或問題，請在此告知嚮導..."
                    value={contactMemo}
                    onChange={(e) => setContactMemo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-title">💳 付款方式</div>
              <div className="payment-options-group">
                <div 
                  className={`payment-option ${activePayment === 'card' ? 'selected' : ''}`}
                  onClick={() => setActivePayment('card')}
                >
                  <div className="payment-icon">💳</div>
                  <div>
                    <div className="payment-text-main">信用卡 / 金融卡</div>
                    <div className="payment-text-sub">VISA、MasterCard、JCB</div>
                  </div>
                </div>
                <div 
                  className={`payment-option ${activePayment === 'line' ? 'selected' : ''}`}
                  onClick={() => setActivePayment('line')}
                >
                  <div className="payment-icon">
                    <div className="icon-line">L</div>
                  </div>
                  <div>
                    <div className="payment-text-main">LINE Pay</div>
                    <div className="payment-text-sub">快速、安全的行動支付</div>
                  </div>
                </div>
                <div 
                  className={`payment-option ${activePayment === 'apple' ? 'selected' : ''}`}
                  onClick={() => setActivePayment('apple')}
                >
                  <div className="payment-icon icon-apple"></div>
                  <div>
                    <div className="payment-text-main">Apple Pay</div>
                    <div className="payment-text-sub">Face ID / Touch ID 快速付款</div>
                  </div>
                </div>
              </div>

              {activePayment === 'card' && (
                <div className="form-grid border-t border-slate-100 pt-5 animate-fade-in">
                  <div className="form-group">
                    <label>卡號 *</label>
                    <input 
                      type="tel" 
                      maxLength={19} 
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                  <div className="form-row-2col max-sm:grid-cols-1">
                    <div className="form-group">
                      <label>有效期限 *</label>
                      <input 
                        type="tel" 
                        maxLength={5} 
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>安全碼 *</label>
                      <input 
                        type="tel" 
                        maxLength={3} 
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button 
              type="button" 
              className="btn-action cursor-pointer" 
              disabled={!isFormValid}
              onClick={handleCompletePayment}
            >
              確認預訂並付款 🔒
            </button>
          </div>

          {/* 預訂摘要 */}
          <div className="card">
            <div className="section-title">訂單摘要</div>
            <div className="activity-img-wrapper">
              <img src={product.images[0]} alt={product.name} className="activity-img" />
            </div>
            <div className="text-base font-bold mb-4">{product.name}</div>
            <div className="detail-row"><span className="detail-label">日期</span><span className="detail-value">{selectedDate}</span></div>
            <div className="detail-row"><span className="detail-label">場次</span><span className="detail-value">{selectedSlot}</span></div>
            <div className="detail-row"><span className="detail-label">人數</span><span className="detail-value">{bookingDetails.quantity} 人</span></div>
            <div className="detail-row border-0">
              <span className="detail-label font-bold">總金額</span>
              <span className="text-xl font-bold text-[#e06343]">NT$ {bookingDetails.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: 預訂完成 */}
      {step === 3 && (
        <div className="success-layout animate-fade-in text-center">
          <div className="success-checkmark-circle pop-effect">
            <svg className="success-checkmark-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 className="success-title">預訂成功！出發準備好了嗎？</h1>
          <p className="success-sub">確認信已寄送至 <span className="font-bold text-[#ff5b22]">{contactEmail}</span>，請記得在出發前查閱。</p>

          <div className="receipt-card">
            <div className="receipt-header">
              <span className="font-bold text-[#1a2b49]">訂單詳情</span>
              <span className="chip-id">{orderId}</span>
            </div>
            <div className="detail-row"><span className="detail-label">體驗名稱</span><span className="detail-value">{product.name}</span></div>
            <div className="detail-row"><span className="detail-label">目的地</span><span className="detail-value">{product.region}</span></div>
            <div className="detail-row"><span className="detail-label">體驗日期</span><span className="detail-value">{selectedDate}</span></div>
            <div className="detail-row"><span className="detail-label">場次</span><span className="detail-value">{selectedSlot}</span></div>
            <div className="detail-row"><span className="detail-label">聯絡人</span><span className="detail-value">{contactName}</span></div>
            <div className="detail-row border-0 mt-2">
              <span className="detail-label font-medium">已付總金額</span>
              <span className="detail-value text-xl text-[#e06343]">NT$ {bookingDetails.totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="btn-group-row max-sm:flex-col">
            <button 
              className="btn-outline-back cursor-pointer" 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ← 返回首頁
            </button>
            <button 
              className="btn-solid-orange cursor-pointer" 
              onClick={() => {
                setProfileTab('orders');
                setCurrentPage('profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              查看我的訂單
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
