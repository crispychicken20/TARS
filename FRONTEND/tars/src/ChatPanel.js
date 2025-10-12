// src/ChatPanel.js
import React, { useState, useEffect, useRef } from "react";

function ChatPanel({ containerStyle = {} }) {
  // State for chat messages
  const [messages, setMessages] = useState([]);
  // State for current input
  const [input, setInput] = useState("");
  // Reference for auto-scrolling
  const messagesEndRef = useRef(null);

  // Function to handle sending a message
  const sendMessage = () => {
    if (!input.trim()) return;  // Ignore empty messages
    // Add new message from user with timestamp
    const newMessage = {
      sender: "You",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Simulate TARS response after a short delay
    setTimeout(() => {
      const tarsResponse = {
        sender: "TARS",
        text: "I'm TARS, your AI assistant. How can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, tarsResponse]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const base = {
    maxWidth: 800,
    margin: "auto",
    marginTop: 500,                  // default center layout
    padding: 20,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 191, 255, 0.3)",
    boxShadow: "0 0 20px rgba(0, 191, 255, 0.2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
    zIndex: 10,
    color: "white",
    ...containerStyle,               // <-- allow overrides
  };

  return (
    <div style={base}>
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 15,
        borderBottom: "1px solid rgba(0, 191, 255, 0.3)",
        paddingBottom: 10
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          backgroundColor: "rgba(9, 10, 10, 0.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: "bold", marginRight: 10,
          boxShadow: "0 0 10px rgba(0, 191, 255, 0.5)"
        }}>T</div>
        <h2 style={{ margin: 0, color: "rgba(0, 191, 255, 1)" }}>TARS Chat</h2>
      </div>

      <div style={{
        height: 400,
        padding: 15,
        marginBottom: 15,
        overflowY: "auto",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 8,
        border: "1px solid rgba(0, 191, 255, 0.2)"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: msg.sender === "You" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              backgroundColor: msg.sender === "You" ? "rgba(0, 191, 255, 0.8)" : "rgba(30, 30, 30, 0.8)",
              color: "white",
              padding: "10px 15px",
              borderRadius: msg.sender === "You" ? "18px 18px 0 18px" : "18px 18px 18px 0",
              maxWidth: "70%",
              wordBreak: "break-word",
              boxShadow: msg.sender === "You"
                ? "0 0 8px rgba(0, 191, 255, 0.3)"
                : "0 0 8px rgba(255, 255, 255, 0.1)"
            }}>
              {msg.text}
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)", marginTop: 4 }}>
              {msg.sender} • {msg.timestamp}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          style={{
            flex: 1, padding: "12px 15px", borderRadius: "24px",
            border: "1px solid rgba(0, 191, 255, 0.5)", marginRight: 10, fontSize: "1rem",
            outline: "none", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px", backgroundColor: "rgba(0, 191, 255, 0.8)",
            color: "white", border: "none", borderRadius: "24px",
            cursor: "pointer", fontWeight: "bold", fontSize: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 10px rgba(0, 191, 255, 0.3)"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
