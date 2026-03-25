import { useState } from "react";

function Chatbot({ isLogin }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "你好！我是選課助手 🤖" },
  ]);
  const [input, setInput] = useState("");

  if (!isLogin) return null; // 🔥 未登入不顯示

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", text: input },
      { role: "ai", text: "（這裡之後會接 Dify 🤖）" },
    ];

    setMessages(newMessages);
    setInput("");
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

          <div style={{ flex: 1, overflowY: "auto" }} className="p-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.role === "user" ? "right" : "left",
                }}
              >
                <span
                  className={`badge ${
                    msg.role === "user"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="p-2 d-flex">
            <input
              className="form-control me-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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