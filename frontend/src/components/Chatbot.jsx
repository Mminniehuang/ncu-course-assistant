// src/components/Chatbot.jsx
import { useState } from "react";

function Chatbot({ isLogin }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "你好！我是選課助手 🤖" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isLogin) return null; // 🔥 未登入不顯示

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.dify.ai/v1/workflows/run", {
        method: "POST",
        headers: {
          "Authorization": "Bearer app-0znIavUUtdzbiS2Rmknyg7pF", // ⚠️ 換成你的 Dify API key
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            name: "王小明",        // 🔹 預設值
            dept: "資訊管理學系",       // 🔹 預設值
            grade: "三",   // 🔹 預設值
            query: input              // 🔹 使用者輸入
          }, // ⚠️ 依你的 workflow 設計調整 key
          response_mode: "blocking",
          user: "user-123", // 可以用登入者 ID
        }),
      });

      const data = await response.json();

      // ⚠️ workflow 回傳欄位可能是 data.output.answer
      const aiText = data.text || "🤖 沒有取得回覆";

      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "發生錯誤，請稍後再試 🤖" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 右下角按鈕 */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
        }}
        className="btn btn-primary"
      >
        💬
      </button>

      {/* 聊天視窗 */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="p-2 border-bottom">選課助手 🤖</div>

          <div
            style={{ flex: 1, overflowY: "auto" }}
            className="p-2"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{ textAlign: msg.role === "user" ? "right" : "left" }}
              >
                <span
                  className={`badge ${
                    msg.role === "user" ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && (
              <div style={{ textAlign: "left" }}>
                <span className="badge bg-secondary">🤖 回覆中...</span>
              </div>
            )}
          </div>

          <div className="p-2 d-flex">
            <input
              className="form-control me-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="輸入你的問題..."
            />
            <button className="btn btn-primary" onClick={handleSend}>
              送出
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;