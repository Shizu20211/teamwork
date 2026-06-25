# 旅遊行程訂購網站串接實作計畫

本計畫旨在將現有的各個網頁進行串接，透過 `a` 標籤實現基本連結，並使用 JavaScript 進行資料傳遞（利用 URL 參數及 LocalStorage），打造完整的訂購與會員體驗。同時，**完全保留您原有的視覺設計**，僅針對程式邏輯與連結進行補強。

## 1. 導覽列與頁尾統一化 (Navigation & Footer)
為維持所有頁面的一致性，我們將在所有頁面引入相同的 `css/nav.css` 與新建立的 `nav.js`，並確保 `index.html`、`products.html`、`Q&A.html`、`booking Step1~3.html` 皆包含統一的導覽列與頁尾。

### 導覽列連結規劃：
* **島嶼旅跡 Logo** -> `index.html`
* **探索體驗** -> `products.html`
* **關於我們** -> `about.html`
* **常見問題** -> `Q&A.html`
* **我的訂單** -> 點擊時，若已登入則導向 `profile.html`；若未登入則導向 `login.html` 並於登入後返回。
* **登入 / 註冊 按鈕** -> 
  * 未登入狀態：顯示「登入 / 註冊」並導向 `login.html`
  * 已登入狀態：顯示「會員中心」並導向 `profile.html`

---

## 2. 各頁面串接與資料傳遞邏輯

### A. 首頁 (`index.html`)
1. **主題分類按鈕 (Explore by Theme)**：
   * 點擊分類時（如：戶外冒險），使用 JavaScript 導向 `products.html?category=戶外冒險`。
2. **頂部搜尋列 (Search Bar)**：
   * 點擊「搜尋體驗」時，獲取目的地與日期，導向 `products.html?region=地區&date=日期`。
3. **熱門體驗卡片 (Trending Products)**：
   * 移除原本包住整個 Grid 的 `<a>` 標籤，改為在動態渲染時，讓每張卡片獨立包覆 `href="product-detail.html?id=ID"`。
   * 點擊收藏愛心時，阻止冒泡以防止觸發跳轉，並同步更新 LocalStorage 的收藏清單。

### B. 探索體驗頁 (`products.html`)
1. **讀取 URL 參數自動篩選**：
   * 頁面載入時，JavaScript 讀取 URL 中的 `region` 或 `category` 參數，自動激活對應的篩選標籤，並執行過濾。
2. **產品卡片跳轉**：
   * 卡片點擊時導向 `product-detail.html?id=ID`。
3. **收藏同步**：
   * 點擊愛心時，將商品 ID 存入 LocalStorage `user_favorites`。

### C. 體驗詳細頁 (`product-detail.html`)
1. **「立即預訂」按鈕**：
   * 點擊時，獲取當前商品 ID 與選擇的人數（`quantity`），導向 `booking Step1~3.html?id=ID&quantity=QTY`。
2. **麵包屑連結**：
   * 「首頁」連結至 `index.html`，「探索體驗」連結至 `products.html`。

### D. 活動預訂系統 (`booking Step1~3.html`)
1. **動態渲染預訂項目**：
   * 依據 URL 參數 `id`，從 12 筆商品資料中讀取對應的名稱、圖片、地區、售價等。
   * 依據 URL 參數 `quantity`，動態計算總金額與人數。
2. **預訂完成存檔 (Step 3)**：
   * 點擊「確認預訂並付款」成功後，將本筆訂單資料（包含訂單編號、體驗名稱、日期、場次、金額、聯絡人）存入 LocalStorage `user_orders`。
3. **返回按鈕**：
   * 成功頁面的「返回首頁」連結至 `index.html`。
   * 「查看我的訂單」導向 `profile.html`。

### E. 會員中心 (`profile.html`)
1. **個人資料同步**：
   * 載入時讀取 LocalStorage 中的 `currentUser`，顯示姓名、Email、電話。
   * 點擊「儲存」時更新 LocalStorage `currentUser`。
2. **訂單紀錄動態化**：
   * 讀取 LocalStorage `user_orders`，將使用者新訂購的行程動態呈現在訂單列表中（置於預設模擬訂單之前）。
3. **我的收藏動態化**：
   * 讀取 LocalStorage `user_favorites`，顯示使用者收藏的體驗卡片。若點擊卡片可跳轉至詳細頁；點擊心碎或取消收藏時，同步移除並重新渲染。
4. **登出功能**：
   * 點擊「登出」時，清除 LocalStorage 中的 `currentUser`，並導向 `index.html`。

### F. 登入 / 註冊頁 (`login.html` & `login_script.js`)
1. **登入狀態存檔**：
   * 驗證成功後，將使用者資料寫入 LocalStorage `currentUser`。
2. **跳轉回來源頁**：
   * 檢查 URL 是否有 `redirect` 參數，若有則跳轉回該網頁，否則預設跳轉回 `index.html`。

---

## 3. 預期新增與修改檔案列表

### [NEW] `nav.js`
* 放置於根目錄，處理所有頁面的導覽列狀態、登入判斷及高亮 active 狀態。

### [MODIFY] `index.html` ( file:///Users/yung/Desktop/JavaScript/teamwork/index.html )
* 引入 `css/nav.css` 與 `nav.js`。
* 加入 `<header class="main-header">` 導覽列與 `<footer class="main-footer">` 頁尾。
* 修正熱門體驗外層的連結，並綁定搜尋、分類按鈕的跳轉邏輯。

### [MODIFY] `products.html` ( file:///Users/yung/Desktop/JavaScript/teamwork/products.html )
* 引入 `css/nav.css` 與 `nav.js`。
* 加入 `<header class="main-header">` 與 `<footer>`。
* 修正產品卡片的跳轉連結，以及讀取 URL 參數做預先篩選的邏輯。

### [MODIFY] `Q&A.html` ( file:///Users/yung/Desktop/JavaScript/teamwork/Q&A.html )
* 引入 `css/nav.css` 與 `nav.js`。
* 加入 `<header class="main-header">` 與 `<footer>`。

### [MODIFY] `booking Step1~3.html` ( file:///Users/yung/Desktop/JavaScript/teamwork/booking%20Step1~3.html )
* 引入 `css/nav.css` 與 `nav.js`。
* 加入 `<header class="main-header">`。
* 改寫 JS，使其能依據 `id` 與 `quantity` 參數動態渲染商品資料，並於下訂成功時寫入 LocalStorage。

### [MODIFY] `product-detail.html` ( file:///Users/yung/Desktop/JavaScript/teamwork/product-detail.html )
* 引入 `nav.js`。
* 更新導覽列與頁尾連結，修正立即預訂按鈕的 click 事件，使其攜帶參數跳轉。

### [MODIFY] `profile.html` ( file:///Users/yung/Desktop/JavaScript/teamwork/profile.html )
* 引入 `nav.js`。
* 整合 Alpine.js 資料模型，使其能與 LocalStorage 中的 `currentUser`、`user_orders`、`user_favorites` 進行同步與動態渲染。

### [MODIFY] `login_script.js` ( file:///Users/yung/Desktop/JavaScript/teamwork/login_script.js )
* 登入/註冊成功後，寫入 LocalStorage 並跳轉回主頁或來源頁面。

---

## 4. 驗證計畫
### 手動驗證：
1. **登入流程**：於登入頁輸入資料登入 -> 檢查導覽列是否變為「會員中心」 -> 進入會員中心確認資料是否正確。
2. **搜尋與篩選**：於首頁搜尋「宜蘭」，檢查是否跳轉到 `products.html` 且自動篩選出「宜蘭」的體驗項目。
3. **收藏同步**：於 `products.html` 將某體驗點擊愛心收藏 -> 前往會員中心「我的收藏」查看是否出現該卡片。
4. **訂購流程**：進入詳細頁 -> 調整人數為 3 人 -> 點選「立即預訂」 -> 檢查預訂摘要是否顯示正確的體驗、人數及總金額 -> 完成預訂 -> 進入會員中心「訂單紀錄」檢查是否新增了這筆 3 人的預訂紀錄。
