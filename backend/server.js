const express = require("express");
const cors = require("cors");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chatbot", async (req, res) => {
  try {
    const userInput = req.body.query;

    const response = await fetch("https://api.dify.ai/v1/workflows/run", {
      method: "POST",
      headers: {
        "Authorization": "Bearer app-s9zXOHet6HhMMsfEejBAlNzL", // 🔥 放這裡（不要放前端！）
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          name: "王小明",
          dept: "資訊管理學系",
          grade: 3,
          query: userInput,
        },
        response_mode: "blocking",
        user: "user-123",
      }),
    });

    const data = await response.json();
    console.log("Dify 回傳:", data);

    const text = data.data?.outputs?.text || "🤖 沒有取得回覆";

    res.json({ text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "伺服器錯誤 🤖" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});