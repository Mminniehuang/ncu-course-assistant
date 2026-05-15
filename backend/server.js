const express = require("express");
const cors = require("cors");
const session = require("express-session");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:31080"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// server.js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");

  // 處理瀏覽器的 Preflight (OPTIONS) 詢問
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// 設定 Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // 只有登入才存
  cookie: { 
    secure: false, // 開發環境用 HTTP
    httpOnly: true // 增加安全性，防止前端腳本讀取 cookie
  }
}));

// Portal 登入路由
app.get("/auth/login", (req, res) => {
  const redirectUri = "http://localhost:31080/auth/callback";
  const url = `https://portal.ncu.edu.tw/oauth2/authorization?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identifier chinese-name student-id academy-records`;
  res.redirect(url);
});

// Portal 回傳處理
app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  try {
    // 換取 Token
    const tokenRes = await axios.post("https://portal.ncu.edu.tw/oauth2/token", 
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:3000/auth/callback"
      }), {
      auth: { username: process.env.CLIENT_ID, password: process.env.CLIENT_SECRET }
    });

    // 換取使用者資訊
    const userRes = await axios.get("https://portal.ncu.edu.tw/apis/oauth/v1/info", {
      headers: { Authorization: `Bearer ${tokenRes.data.access_token}` }
    });

    console.log("=== Portal User Data ===");
    console.log(userRes.data);

    // 存入 Session
    req.session.user = userRes.data; 

    console.log("=== Session Saved ===");
    console.log(req.session.user);
    
    // 導向前端
    res.redirect("http://localhost:5173/?login=success");
  } catch (err) {
    console.error("登入流程出錯:", err.response?.data || err.message);
    res.send("Portal 登入失敗");
  }
});

// Chatbot
app.post("/api/chatbot", async (req, res) => {
  try {
    const userInput = req.body.query;

    // 從 Session 取得 Portal 抓回來的學生資料
    const user = req.session.user || {};
    const name = user.chineseName || "訪客";
    const dept = user.academyRecords?.name || "未提供系所";

    const rawGrad = user.academyRecords?.grad; 
    const gradeNumber = rawGrad ? Number(rawGrad.toString().charAt(0)) : 0;

    const inputs = {
      name: name,
      dept: dept,
      grade: gradeNumber, 
      query: userInput,
    };

    console.log("發送給 Dify 的資料:", inputs); // 調試用

    const response = await axios.post("https://api.dify.ai/v1/workflows/run", {
      inputs: inputs,
      response_mode: "blocking",
      user: user.identifier || "guest-123",
    }, {
      headers: {
        // 從 .env 讀取 API Key
        "Authorization": `Bearer ${process.env.DIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      timeout: 90000
    });

    const text = response.data?.data?.outputs?.text || "🤖 抱歉，我暫時無法回答。";
    res.json({ text });

  } catch (err) {
    console.error("Dify 呼叫失敗:", err.response?.data || err.message);
    res.status(500).json({ text: "伺服器忙碌中，請稍後再試 🤖" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});