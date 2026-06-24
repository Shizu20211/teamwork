import React, { useState } from 'react';

interface Teammate {
  name: string;
  role: string;
  image: string;
  brief: string;
  story: string;
}

interface AboutProps {
  setCurrentPage: (page: string) => void;
}

const TEAMMATES: Teammate[] = [
  {
    name: '陳建峰',
    role: '共同創辦人 · 執行長',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=400&q=80',
    brief: '在台灣踢壞了三雙登山鞋，走過300條秘境步道。相信每一條小路都藏著一個故事。',
    story: '「只要用心引路，處處都是動人的島嶼秘境。2019年，我划著獨木舟探索太平洋東岸。如今，我們帶著對海洋環境的無限敬意，守護每一個旅人的感動瞬間。」'
  },
  {
    name: '林芷瑄',
    role: '共同創辦人 · 體驗總監',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=400&q=80',
    brief: '前旅遊雜誌主編，走訪超過40個國家後，回到台灣發現家鄉才是最神奇的地方。',
    story: '「深信真正的奢華不取決於床鋪多軟，而取決於故事多深。每一碗藍染、一瓣香茗、一隻在地陶杯，都編織著地方傳承。我期許島跡能搭建一座橋樑，讓即將被遺忘的人文再次綻放。」'
  },
  {
    name: '黃俊宏',
    role: '技術長',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=400&q=80',
    brief: '熱愛跑步與程式碼，用技術讓每個旅人與嚮導之間的連結更流暢、更溫暖。',
    story: '「我用代碼在大地圖上點亮星星。透過智慧引導系統與完全數位化的保險預警連線，讓深海探險與古道步行皆能安全無虞。科技應該為永續土地服務，這是我的堅持。」'
  },
  {
    name: '許雅婷',
    role: '嚮導關係經理',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=533&q=80',
    brief: '負責發掘與培訓台灣各地的在地嚮導，讓每個在地達人的故事都能被旅人聽見。',
    story: '「深信每個鄉村角落都有不可多得的活歷史。我陪伴在地耆老，將傳統染布、手作竹藝編織化為永續工藝課，也支持原民導師重啟部落涉溪徑。守護在地的溫度，是島跡無可取代的靈魂。」'
  }
];

export default function About({ setCurrentPage }: AboutProps) {
  const [selectedMember, setSelectedMember] = useState<Teammate | null>(null);

  const handleExploreClick = () => {
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* ================= 第一區塊：OUR STORY ================= */}
      <section
        className="w-full bg-[#1B2A4A] text-white py-26 sm:py-28 overflow-hidden relative"
        id="our-story-banner"
      >
        <div className="w-full relative z-10">
          <div className="flex flex-col items-start space-y-5 relative z-20 max-w-2xl mt-4 sm:mt-6 pl-4 sm:pl-8 lg:pl-12 text-left">
            {/* 分類標籤 */}
            <div className="flex items-center gap-3">
              <span className="w-7 h-[2px] bg-[#FF5B22]"></span>
              <span className="text-[#FF5B22] text-sm sm:text-lg font-bold tracking-widest uppercase">
                OUR STORY
              </span>
            </div>

            {/* 核心宣示大標題 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.4] font-display">
              我們相信，
              <span className="block mt-5">
                旅行是一種<span className="text-[#FF5B22]">真實相遇</span>
              </span>
            </h1>

            {/* 精緻段落導言 */}
            <p className="text-[#C6CAD2] text-sm sm:text-base leading-[1.8] sm:leading-[2] tracking-wide font-normal max-w-xl">
              從一次花蓮的獨木舟之旅開始，我們看見了台灣每一個角落裡，都有值得被看見的人與故事。島嶼旅跡，就從這裡出發。
            </p>
          </div>
        </div>

        {/* 圓形背景裝飾 */}
        <div className="absolute right-4 sm:right-8 lg:right-16 top-[50%] -translate-y-[50%] flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-[#f75f23] opacity-10 flex-shrink-0"></div>
        </div>
      </section>

      {/* ===== 第二區塊：BRAND STORY ===== */}
      <section
        className="w-full max-w-6xl mx-auto px-8 sm:px-16 py-16 sm:py-24"
        id="brand-story-section"
      >
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8">
          {/* 左側：圖片 */}
          <div className="relative w-full md:w-1/2 h-[360px] rounded-[24px] overflow-hidden shadow-2xl shadow-slate-200/60 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&h=800&q=80"
              alt="島跡故事探險美景"
              className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent h-24"></div>
          </div>

          {/* 右側：文字 */}
          <div className="w-full md:w-1/2 min-h-[360px] flex flex-col items-start py-1 mt-8 md:mt-0 text-left">
            <span className="text-[#FF5B22] text-xs font-bold tracking-widest uppercase flex items-center gap-1 mb-2">
              <span className="w-5 h-[1.5px] bg-[#FF5B22]"></span> BRAND STORY
            </span>
            <h1 className="text-2xl sm:text-[25px] font-bold text-[#132A55] tracking-tight leading-tight mt-2">
              從一次迷路開始的創業
            </h1>
            <div className="space-y-3 text-sm sm:text-[15px] text-[#556575] leading-[2] font-normal mt-4">
              <p>
                2019 年，創辦人阿峰在花蓮租了一艘獨木舟，卻意外劃進一條沒有標示的峽灣。當地的漁民老伯帶著他，用台語講述這片海的故事。那一刻，他明白了：最珍貴的旅行體驗，不在景點冊上。
              </p>
              <p>
                島嶼旅跡於 2020 年成立，致力於連結在地嚮導與每一位渴望深度旅遊的旅人。我們的嚮導不只是帶路人，他們是故事的守護者。
              </p>
              <p>
                今天，我們在台灣 22 個縣市有超過 150 位認證嚮導，服務超過三萬名來自世界各地的旅客，讓每一段旅程都成為值得述說的故事。
              </p>
            </div>
            <div className="mt-auto pt-5 w-full">
              <button
                id="explore-btn"
                onClick={handleExploreClick}
                className="bg-[#FF5B22] hover:bg-[#e04a18] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-[0_6px_18px_-4px_rgba(234,88,12,0.45)] hover:shadow-[0_10px_28px_-4px_rgba(234,88,12,0.65)] hover:-translate-y-1 active:scale-95 cursor-pointer"
              >
                探索所有體驗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 第三區塊：CORE VALUES ===== */}
      <section className="w-full bg-[#FAF6F0] py-16 sm:py-24 border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-8 sm:px-16 text-left">
          <div className="flex flex-col items-start gap-2 w-full mb-6">
            <span className="text-[#FF5B22] text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#FF5B22]"></span> CORE VALUES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a2649] tracking-tight">
              我們的三個承諾
            </h2>
          </div>

          {/* 卡片區 */}
          <div className="flex flex-wrap justify-start items-stretch gap-6">
            {/* 卡片 1 */}
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-2xl p-7 sm:p-8 border-t-4 border-[#FF5B22] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="mb-4 text-3xl">🌱</div>
                <h3 className="text-[#1a2649] font-extrabold text-base sm:text-lg mb-3">
                  在地深度，不走馬看花
                </h3>
                <p className="text-[#556575] text-xs sm:text-[13.5px] leading-relaxed font-light">
                  每一個體驗都由在地嚮導精心設計，帶你走入觀光客找不到的台灣。我們把精彩留在貼土上，只想欣賞正深入在地生活的感動。
                </p>
              </div>
            </div>

            {/* 卡片 2 */}
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-2xl p-7 sm:p-8 border-t-4 border-[#FF5B22] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="mb-4 text-3xl">🛡</div>
                <h3 className="text-[#1a2649] font-extrabold text-base sm:text-lg mb-3">
                  安全保障，放心出發
                </h3>
                <p className="text-[#556575] text-xs sm:text-[13.5px] leading-relaxed font-light">
                  所有嚮導皆通過嚴格篩選與培訓，並持有執照與相關證件。我們提供全險保護，讓你的心亦都踩在土地上，不用擔心任何意外。
                </p>
              </div>
            </div>

            {/* 卡片 3 */}
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-2xl p-7 sm:p-8 border-t-4 border-[#FF5B22] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="mb-4 text-3xl">🌿</div>
                <h3 className="text-[#1a2649] font-extrabold text-base sm:text-lg mb-3">
                  綠色永續，守護這片土地
                </h3>
                <p className="text-[#556575] text-xs sm:text-[13.5px] leading-relaxed font-light">
                  每筆訂單的 5% 將捐入台灣環境保育基金。我們的體驗設計以低衝擊為原則，與自然和共存，留下下一代與人依然看世界最美麗的微笑。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 第四區塊：MEET THE TEAM ===== */}
      <section
        className="w-full max-w-6xl mx-auto px-8 sm:px-16 py-16 sm:py-24 flex flex-col items-center md:items-start"
        id="team-section"
      >
        <div className="mb-[46px] flex flex-col items-start gap-2 w-full text-left">
          <span className="text-[#FF5B22] text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-[#FF5B22]"></span> MEET THE TEAM
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a2649] tracking-tight">
            讓旅行成真的人們
          </h2>
        </div>

        {/* 團隊成員 */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 w-full text-left">
          {TEAMMATES.map((member, index) => (
            <div
              key={index}
              className="group relative w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] aspect-[225/272] rounded-[18px] overflow-hidden shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl bg-slate-900"
              onClick={() => setSelectedMember(member)}
            >
              <div class="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-black/0 z-10"></div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 pt-10 flex flex-col justify-end transition-all duration-500 z-20">
                <p className="text-[#FF5B22] text-[10.5px] font-bold tracking-wide mb-0.5">
                  {member.role}
                </p>
                <h3 className="text-white font-extrabold text-base mb-1">{member.name}</h3>
                <p className="text-slate-300 text-[11px] leading-[1.6] font-light opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[85px] transition-all duration-500 overflow-hidden transform translate-y-2 group-hover:translate-y-0">
                  {member.brief}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Modal（彈出視窗） ================= */}
      {selectedMember && (
        <div
          id="bio-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-2xl font-extrabold text-[#132A55]">
              {selectedMember.name}
            </h3>
            <p className="text-[#FF5B22] font-bold text-sm mt-0.5">
              {selectedMember.role}
            </p>
            <p className="text-[#556575] text-sm leading-relaxed mt-4">
              {selectedMember.story}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
