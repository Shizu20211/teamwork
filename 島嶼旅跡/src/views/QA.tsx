import React, { useState, useEffect } from 'react';

interface QAItem {
  id: number;
  question: string;
  answer: string;
}

interface QAGroup {
  category: string;
  title: string;
  icon: string;
  items: QAItem[];
}

interface QAProps {
  qaCategory: string;
  setQaCategory: (category: string) => void;
}

const QA_GROUPS: QAGroup[] = [
  {
    category: 'booking',
    title: '預訂問題',
    icon: '📅',
    items: [
      { id: 101, question: '如何預訂體驗？', answer: '在體驗詳情頁選擇日期與人數，點擊「立刻預訂」後，填寫聯絡資料並完成付款即可。完成後系統會自動寄送確認 Email 到您的信箱，請注意查收。' },
      { id: 102, question: '最少需要幾人才能成團？', answer: '不同體驗的成團人數不同，一般最少 1 人即可報名。部分特殊體驗可能需要最少 2 人，詳細資訊請查看體驗頁面的說明。若人數不足，我們會提前 48 小時通知您並全額退款。' },
      { id: 103, question: '可以幫朋友代訂體驗行程嗎？', answer: '可以！在填寫旅客資料時，請填入實際參與體驗的旅客資訊（姓名、電話），並在備註欄說明是代訂。確認通知將同時寄送給訂購人。' },
      { id: 104, question: '預訂後可以修改日期嗎？', answer: '體驗開始前 72 小時內可免費修改日期（視嚮導檔期而定）。請登入個人中心，在「訂單紀錄」中找到對應訂單，點選「修改」或聯繫客服即可申請。' }
    ]
  },
  {
    category: 'refund',
    title: '退款政策',
    icon: '💰',
    items: [
      { id: 201, question: '如何申請退款？', answer: '登入後至「個人中心 → 訂單紀錄」，點擊對應訂單的「取消訂單」按鈕後依照流程操作。退款金額將於 5-7 個工作日退回您原先付款使用的信用卡或支付帳戶。' },
      { id: 202, question: '退款的時間規定是什麼？', answer: '我們採用彈性的退款政策：\n\n• 體驗前 7 天以上取消：全額退款\n• 體驗前 3–7 天取消：退款 70%\n• 體驗前 24–72 小時取消：退款 50%\n• 體驗前 24 小時內取消：不予退款\n\n若因不可抗力因素或嚮導原因取消，無論何時皆全額退款，並另補贈優惠券。' },
      { id: 203, question: '遇到天氣不佳或不可抗力因素如何處理？', answer: '若因惡劣天氣、天然災害等不可抗力因素，嚮導有權取消或延期體驗。旅客將可獲得全額退款或免費改期。我們建議您在出發前密切確認是否有發出通知。' }
    ]
  },
  {
    category: 'dayof',
    title: '體驗當日',
    icon: '🎒',
    items: [
      { id: 301, question: '當天需要攜帶什麼物品呢？', answer: '每個體驗的建議攜帶物品都列在詳情頁「費用不包含」區塊中，請仔細確認。一般建議攜帶：舒適的服裝、換洗衣物（戶外體驗）、防曬用品、個人水壺，以及預訂確認 Email 的截圖。' },
      { id: 302, question: '要如何找到當天行程的集合地點？', answer: '預訂成功憑證中將會附上精準的 Google Map 集合點連結與現場嚮導的聯絡電話。建議您提前 15 分鐘抵達指定地點，並攜帶手機方便導師聯繫。' },
      { id: 303, question: '體驗過程中發生意外怎麼辦？', answer: '所有體驗均已投保旅遊責任險，每位旅客均有基本意外保障。嚮導皆接受過緊急急救訓練，並備有基本隨行急救包。若發生任何狀況，請立即告知教練或撥打客服專線。' },
      { id: 304, question: '可以帶小孩或銀髮族參加嗎？', answer: '各體驗有不同的年齡建議，請查看體驗詳情頁的「適合對象」說明。部分戶外冒險型體驗有年齡限制，而文化、手作、美食類體驗通常全年齡均可參加。' }
    ]
  },
  {
    category: 'account',
    title: '帳號與付款',
    icon: '🔒',
    items: [
      { id: 401, question: '目前支援哪些付款方式？', answer: '我們目前支援各大銀行信用卡（Visa, MasterCard, JCB）、LINE Pay、Apple Pay 及街口支付，提供您安全便捷的付款環境。' },
      { id: 402, question: '如何找回忘記的密碼？', answer: '在登入頁面點選「忘記密碼」，輸入註冊時使用的 Email，系統將發送密碼重設連結到您的信箱。若未收到請確認垃圾郵件匣，或聯絡客服協助處理。' }
    ]
  }
];

export default function QA({ qaCategory, setQaCategory }: QAProps) {
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  // 當分類切換時，收合原本展開的問答
  const handleCategoryChange = (category: string) => {
    setQaCategory(category);
    setExpandedItemId(null);
  };

  const handleItemToggle = (itemId: number) => {
    // 【手風琴機制】：一次只能展開一個
    if (expandedItemId === itemId) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(itemId);
    }
  };

  // 取得當前選中的分類
  const currentGroup = QA_GROUPS.find(g => g.category === qaCategory) || QA_GROUPS[0];

  return (
    <div className="w-full">
      {/* 獨立的頁面標題區 */}
      <section className="it-faq-header-section">
        <div className="it-faq-header-inside text-center">
          <span className="it-faq-subtitle">—FAQ</span>
          <h1 className="it-faq-title">常見問題解答</h1>
          <p className="it-faq-desc">找不到答案？歡迎直接聯絡我們的客服團隊。</p>
        </div>
      </section>

      {/* 下方限制寬度的核心互動區 */}
      <div className="it-faq-wrapper">
        {/* 分類標籤切換區 */}
        <section className="it-faq-categories">
          <div className="it-category-grid max-md:grid-cols-2">
            {QA_GROUPS.map(g => (
              <button 
                key={g.category}
                type="button" 
                className={`it-faq-cat-btn ${qaCategory === g.category ? 'is-active' : ''}`}
                onClick={() => handleCategoryChange(g.category)}
              >
                {g.title}
              </button>
            ))}
          </div>
        </section>

        {/* 常見問題列表區 */}
        <section className="it-faq-list-container">
          <div className="it-faq-group is-active">
            <div className="it-faq-group-header">
              <h2>{currentGroup.icon} {currentGroup.title}</h2>
            </div>
            
            {currentGroup.items.map(item => (
              <div 
                key={item.id} 
                className={`it-faq-item ${expandedItemId === item.id ? 'is-expanded' : ''}`}
              >
                <div 
                  className="it-faq-question-row"
                  onClick={() => handleItemToggle(item.id)}
                >
                  <span className="it-question-text">{item.question}</span>
                  <button type="button" className="it-faq-toggle-btn" aria-label="展開問題">
                    <span>+</span>
                  </button>
                </div>
                <div 
                  className="it-faq-answer-row"
                  style={{ maxHeight: expandedItemId === item.id ? '200px' : '0' }}
                >
                  <p className="it-answer-text whitespace-pre-line">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 底部諮詢客服區 */}
        <section className="it-faq-support-box">
          <div className="it-support-card">
            <h2 className="it-support-title">還有其他問題？</h2>
            <p className="it-support-desc">我們的客服團隊週一至週五 09:00 - 18:00 線上為您解答</p>
            <div className="it-support-actions max-md:flex-col max-md:items-center">
              <a 
                href="mailto:support@islandtraces.com?subject=島嶼旅跡-旅客常見問題諮詢" 
                className="it-btn-support-mail max-md:w-full max-md:justify-center"
              >
                ✉ 寄信給我們
              </a>
              <button 
                type="button" 
                id="it-btn-live-chat" 
                className="it-btn-support-chat max-md:w-full max-md:justify-center cursor-pointer"
                onClick={() => alert("【島嶼旅跡】即時客服對話視窗發動！\n我們已經為您建立好即時客服連接口，未來此處可直接呼叫第三方線上客服插件視窗。")}
              >
                💬 即時客服
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
