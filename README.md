# NEON CITY

城市探索 AR App 官方落地頁 — 以賽博龐克霓虹美學呈現產品願景，包含 Hero、功能介紹、互動地圖、任務系統、社群與 App 預覽等完整行銷區塊。

![NEON CITY](public/icon.svg)

## 功能特色

- **霓虹視覺主題**：深色背景、青色／洋紅／電黃霓虹色、文字光暈與掃描線效果
- **滾動動畫**：使用 GSAP + ScrollTrigger 實作進場與區塊動效
- **響應式版面**：導覽列、Hero、卡片網格與手機 mockup 適配桌機與行動裝置
- **錨點導覽**：功能、地圖、任務、社群等區塊一鍵捲動
- **Docker 部署**：多階段建置，以 Nginx 提供靜態檔

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | React 19、Vite 8 |
| 樣式 | Tailwind CSS 4、PostCSS |
| 動畫 | GSAP、ScrollTrigger |
| 圖示 | Lucide React |
| 字型 | Orbitron、Rajdhani（Google Fonts） |
| 部署 | Docker、Nginx |

## 環境需求

- Node.js 20+（建議 22）
- npm 10+
- Docker Desktop（選用，用於容器部署）

## 快速開始

### 本機開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（預設 http://localhost:5173）
npm run dev
```

### 建置與預覽

```bash
npm run build
npm run preview
```

### 程式碼檢查

```bash
npm run lint
```

## 部署至 Zeabur

本專案 Dockerfile 已依 [Zeabur 官方建議](https://zeabur.com/docs/en-US/deploy/methods/dockerfile) 設定：

- Nginx 監聽環境變數 **`PORT`**（Zeabur 預設 **8080**，非 80）
- 啟動時以 `envsubst` 產生設定檔

### 使用 Dockerfile（建議）

1. 將專案連結至 Zeabur，選擇 **Dockerfile** 部署
2. 確認服務已暴露 **8080**（或與 `PORT` 一致）
3. 重新部署（Redeploy）

若仍出現 **502 SERVICE_UNAVAILABLE**，請檢查：

| 檢查項目 | 說明 |
|----------|------|
| 建置日誌 | `npm run build` 是否成功 |
| 執行日誌 | 容器是否啟動、Nginx 是否報錯 |
| `PORT` | 勿手動設成 80；留空讓 Zeabur 注入，或設為 `8080` |
| 健康檢查 | 服務需在數秒內開始監聽 `PORT` |

### 不使用 Dockerfile（靜態部署）

若希望由 Zeabur 自動以 Caddy 托管 `dist`，可在環境變數設定：

```bash
ZBPACK_IGNORE_DOCKERFILE=true
```

並確認建置指令為 `npm run build`、輸出目錄為 `dist`。

## Docker 部署（本機）

請先啟動 Docker Desktop，再執行：

```bash
# 建置映像
npm run docker:build

# 背景啟動（對外 http://localhost:8080）
npm run docker:up

# 停止並移除容器
npm run docker:down
```

等同於手動執行：

```bash
docker compose build
docker compose up -d
```

## 專案結構

```
NeonCity/
├── public/              # 靜態資源（favicon 等）
├── src/
│   ├── components/      # 頁面區塊元件
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── MapVisualization.jsx
│   │   ├── TaskCards.jsx
│   │   ├── SocialSection.jsx
│   │   ├── AppShowcase.jsx
│   │   └── Footer.jsx
│   ├── content/         # 文案資料（避免編碼問題）
│   │   ├── hero.js
│   │   └── features.js
│   ├── lib/
│   │   └── neon-colors.js   # 霓虹色 Tailwind class 對照
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css        # 主題變數與自訂 utility
├── Dockerfile
├── docker-compose.yml
├── nginx.conf.template
└── vite.config.js
```

## 頁面區塊說明

| 區塊 | 錨點 | 說明 |
|------|------|------|
| Navbar | — | 固定頂部導覽、行動版選單 |
| Hero | — | 主視覺、CTA、數據指標 |
| Features | `#features` | AR 街景、地圖、任務、社群四大功能 |
| Map | `#map` | 台北熱點互動地圖示意 |
| Tasks | `#tasks` | 任務卡片與進度條 |
| Community | `#community` | 社群功能與排行榜 |
| App Showcase | — | 手機 mockup 與下載按鈕 |
| Footer | — | 連結與版權 |

## 設計備註

- 視覺原型參考 [V0](https://v0.app) 產出，並移植至 Vite + React 專案結構。
- 動態 Tailwind 色票需使用完整 class 名稱，見 `src/lib/neon-colors.js`。
- 繁中文案集中於 `src/content/`，建議維持 UTF-8 編輯。

## 授權

本專案為個人作品展示用途。若需商用或再散布，請自行確認字型與素材授權。
