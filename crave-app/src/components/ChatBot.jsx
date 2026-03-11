import { useState, useRef, useEffect } from "react";

// ============================================
// 🔧 PASTE YOUR N8N WEBHOOK URL HERE
// ============================================

const N8N_WEBHOOK_URL = "https://vignesss.app.n8n.cloud/webhook/food-chat-webhook-gemini-001/chat";


// ============================================

const suggestions = [
  "🍔 What burgers do you have?",
  "🌱 Any vegan options?",
  "💰 Cheapest combo meal?",
  "🚚 How long is delivery?",
  "🌶️ What's spicy?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey there! 👋 I'm Crave AI — ask me anything about our menu, prices, or delivery! 🍔🍕",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput: userText }),
      });
      const data = await res.json();
      const botReply = data.output || data.text || "Sorry, I couldn't get a response 😕";
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Connection error. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "62px",
          height: "62px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ff6b35, #f7c59f)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(255,107,53,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          zIndex: 9999,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,107,53,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,107,53,0.45)";
        }}
      >
        {isOpen ? "✕" : "🍔"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "105px",
            right: "28px",
            width: "370px",
            height: "540px",
            background: "#1a1a2e",
            borderRadius: "24px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9998,
            border: "1px solid rgba(255,107,53,0.2)",
            animation: "slideUp 0.3s ease",
          }}
        >
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
              40% { transform: scale(1); opacity: 1; }
            }
            .chat-scroll::-webkit-scrollbar { width: 4px; }
            .chat-scroll::-webkit-scrollbar-track { background: transparent; }
            .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,107,53,0.3); border-radius: 4px; }
            .send-btn:hover { background: linear-gradient(135deg, #ff8c5a, #ffb347) !important; }
            .suggestion-btn:hover { background: rgba(255,107,53,0.2) !important; border-color: #ff6b35 !important; }
          `}</style>

          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #ff6b35, #c0392b)",
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              🍔
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px", letterSpacing: "0.3px" }}>
                Crave AI Assistant
              </div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Online • Answers instantly
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="chat-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "11px 15px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #ff6b35, #c0392b)"
                      : "rgba(255,255,255,0.07)",
                    color: "#fff",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    border: msg.role === "bot" ? "1px solid rgba(255,255,255,0.08)" : "none",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "12px 18px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#ff6b35",
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div
              style={{
                padding: "0 12px 8px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-btn"
                  onClick={() => sendMessage(s)}
                  style={{
                    background: "rgba(255,107,53,0.1)",
                    border: "1px solid rgba(255,107,53,0.25)",
                    borderRadius: "20px",
                    color: "#f7c59f",
                    fontSize: "11.5px",
                    padding: "5px 11px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              gap: "8px",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about our menu..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                padding: "10px 14px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={loading}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ff6b35, #c0392b)",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                transition: "all 0.2s",
                opacity: loading ? 0.6 : 1,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}