import "../styles/Chatbot.css";
import { useChatbotLogic } from "../hooks/useChatbotLogic";

export default function Chatbot() {
  const {
    open,
    setOpen,
    inputRef,
    modalRef,
    messagesRef,
    messages,
    handleMessageKey,
    sendMessage,
  } = useChatbotLogic();

  return (
    <div className="chatbotContainer">
      {/* OPEN BUTTON */}
      <button
        id="openChatBtn"
        aria-haspopup="dialog"
        aria-controls="chatModal"
        onClick={() => setOpen(true)}
      >
        <span class="material-symbols-outlined">smart_toy</span>
      </button>

      {/* MODAL */}
      <div
        id="chatModal"
        ref={modalRef}
        className={`chat-modal ${open ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatTitle"
        aria-describedby="chatInstructions"
      >
        <div className="chat-window">
          {/* HEADER */}
          <header className="chat-header">
            <button
              id="closeChatBtn"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>

          <p id="chatInstructions" className="sr-only">
            Use Arrow keys to navigate, Home to jump to the top, End to jump to
            the bottom, and Escape to close the chat.
          </p>

          {/* MESSAGES */}
          <div
            id="chatDesc"
            className="chat-messages"
            role="log"
            ref={messagesRef}
            onKeyDown={handleMessageKey}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className="chat-message"
                role="listitem"
                tabIndex={i === messages.length - 1 ? 0 : -1}
              >
                <strong>{m.author}:</strong>
                <time dateTime={m.datetime}>{m.time}</time>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <footer className="chat-footer">
            <label htmlFor="chatInput">Message:</label>
            <input
              id="chatInput"
              type="text"
              ref={inputRef}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button id="sendBtn" onClick={sendMessage}>
              Send
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
