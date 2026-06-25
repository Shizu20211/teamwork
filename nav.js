document.addEventListener("DOMContentLoaded", () => {
  // ─── 1. Logo wrapper（header 的 a.logo-wrapper）→ index.html ───
  const logoLinks = document.querySelectorAll(".logo-wrapper, .logo-link");
  logoLinks.forEach(logoLink => {
    logoLink.setAttribute("href", "index.html");
  });

  // ─── 2. Footer logo（h3.footer-logo）→ index.html（包成可點連結）───
  const footerLogos = document.querySelectorAll(".footer-logo");
  footerLogos.forEach(el => {
    // 避免重複包裹
    if (el.parentElement && el.parentElement.tagName !== "A") {
      const a = document.createElement("a");
      a.href = "index.html";
      a.style.textDecoration = "none";
      a.style.color = "inherit";
      a.style.cursor = "pointer";
      el.parentNode.insertBefore(a, el);
      a.appendChild(el);
    }
  });

  // ─── 3. Header nav-link 設定 ───
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    const text = link.textContent.trim();
    if (text === "探索體驗") {
      link.setAttribute("href", "products.html");
    } else if (text === "關於我們") {
      link.setAttribute("href", "about.html");
    } else if (text === "常見問題") {
      link.setAttribute("href", "Q&A.html");
    } else if (text === "我的訂單") {
      link.setAttribute("href", "#");
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          window.location.href = "profile.html";
        } else {
          window.location.href = "login.html?redirect=profile.html";
        }
      });
    }
  });

  // ─── 4. Header 登入 / 註冊按鈕 → 固定連結 login.html ───
  const ctaBtn = document.querySelector(".btn-cta");
  if (ctaBtn) {
    ctaBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // ─── 5. Footer menu-item 設定 ───
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => {
    const text = item.textContent.trim();

    // 探索類 → products.html（含分類篩選）
    if (text === "所有體驗") {
      item.setAttribute("href", "products.html");
    } else if (text === "戶外冒險") {
      item.setAttribute("href", "products.html?category=戶外冒險");
    } else if (text === "手作工藝") {
      item.setAttribute("href", "products.html?category=手作工藝");
    } else if (text === "美食料理") {
      item.setAttribute("href", "products.html?category=美食料理");
    } else if (text === "文化歷史") {
      item.setAttribute("href", "products.html?category=文化歷史");
    } else if (text === "自然探索") {
      item.setAttribute("href", "products.html?category=自然探索");

    // 公司類
    } else if (text === "關於我們") {
      item.setAttribute("href", "about.html");
    } else if (text === "常見問題") {
      item.setAttribute("href", "Q&A.html");

    // 支援類 → Q&A.html
    } else if (text === "退款政策" || text === "隱私政策" || text === "服務條款") {
      item.setAttribute("href", "Q&A.html");

    // 查看訂單 → profile（需登入）
    } else if (text === "查看訂單" || text === "我的訂單") {
      item.setAttribute("href", "#");
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          window.location.href = "profile.html";
        } else {
          window.location.href = "login.html?redirect=profile.html";
        }
      });
    }
  });
});
