import React, { useState } from "react";
import "./App.css";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const suggestions = [
  "What is the event schedule?",
  "Who are the speakers?",
  "Where is the venue?",
  "How do I register?",
  "Is there a registration fee?"
];

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: "I can help you with all event-related details." }
    ]);

    setInput("");
    setStarted(true);
  };

  return (
    <div className="app">
      {/* Neural Network Background */}
      <div className={`animated-bg ${started ? "" : "fade-in"}`}>
        <div className="neural-bg"></div>
      </div>

      {!started ? (
        <div className="prompt-screen fade-in">
          <h1 className="title">Event Assistant</h1>

          <div className="input-wrapper">
            <input
              className="prompt-input"
              placeholder="Ask anything about the event..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="send-inside"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              ➤
            </button>
          </div>

          <div className="suggestions-wrapper">
            <div className="suggestions-track">
              {[...suggestions, ...suggestions].map((q, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => setInput(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-container slide-up">
          <div className="chat-header">Event Assistant</div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <div className="input-wrapper">
              <input
                placeholder="Message Event Assistant..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="send-inside"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
