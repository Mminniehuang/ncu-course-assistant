# ncu-course-assistant

利用 **digiRunner** 作為 API 閘道管理，並串接 **Dify** AI 平台，打造一個能協助學生查詢課綱與選課資訊的智慧助手。

---

## 開發環境需求
確保電腦已安裝以下工具：
* **Docker Desktop** (用於執行 digiRunner 與 Dify)
* **Git** (用於版本控制)
* **VS Code** (建議開發環境)

---

## 快速啟動指引
請按照以下步驟在你的電腦上建立相同的開發環境：
### 1. 下載專案 (Clone)
開啟終端機，執行：
```bash
git clone [https://github.com/Mminniehuang/ncu-course-assistant.git](https://github.com/Mminniehuang/ncu-course-assistant.git)
cd ncu-course-assistant
```
### 2. 啟動 Docker 服務
執行以下指令一鍵啟動 digiRunner：
```bash
docker-compose up -d
```
### 3. 進入管理後台
- URL: http://localhost:31080/dgrv4/login
- 帳號: manager
- 密碼: manager123