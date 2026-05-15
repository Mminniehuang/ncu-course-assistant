// src/components/Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

function Chatbot({ isLogin }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "你好！我是選課助手 🤖" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // 🔥 自動滾動到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isLogin) return null;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;

    // 顯示使用者訊息
    setMessages((prev) => [...prev, { role: "user", text: userInput }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:31080/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          query: userInput,
        }),
      });

      const data = await response.json();
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

          {/* 訊息區 */}
          <div style={{ flex: 1, overflowY: "auto" }} className="p-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.role === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                {msg.role === "user" ? (
                  <span className="badge bg-primary">{msg.text}</span>
                ) : (
                  <div
                    className="bg-light p-2 rounded"
                    style={{
                      display: "inline-block",
                      maxWidth: "100%",
                      overflowX: "auto", // 🔥 表格可滑動
                    }}
                  >
                    <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}

            {/* loading */}
            {loading && (
              <div style={{ textAlign: "left" }}>
                <span className="badge bg-secondary">🤖 回覆中...</span>
              </div>
            )}

            {/* 🔥 滾動定位點 */}
            <div ref={messagesEndRef} />
          </div>

          {/* 輸入區 */}
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