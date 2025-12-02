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
    message,
    maxMessageLength,
    handleInputChange,
    handleMessageKey,
    sendMessage,
  } = useChatbotLogic();

  const remainingChars = maxMessageLength - message.length;

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbotContainer">
      <button
        id="openChatBtn"
        aria-haspopup="dialog"
        aria-controls="chatModal"
        onClick={() => setOpen(true)}
      >
        <span className="material-symbols-outlined">smart_toy</span>
      </button>

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
          <header className="chat-header">
            <button
              id="closeChatBtn"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>

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
                className={`chat-message ${
                  m.author === "Tú" ? "from-user" : "from-bot"
                }`}
                role="listitem"
                tabIndex={i === messages.length - 1 ? 0 : -1}
              >
                <strong>{m.author}:</strong>
                <p>{m.text}</p>
                <time dateTime={m.datetime}>{m.time}</time>
              </div>
            ))}
          </div>

          <footer className="chat-footer">
            <div className="chat-input-wrapper">
              <label htmlFor="chatInput">Mensaje:</label>
              <div className="chat-input-field">
                <textarea
                  id="chatInput"
                  ref={inputRef}
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleTextareaKeyDown}
                  maxLength={maxMessageLength}
                  aria-describedby="chatCharInfo"
                  rows={1}
                />
                <span id="chatCharInfo" className="chat-char-info">
                  *Caracteres restantes para realizar la pregunta:{" "}
                  {remainingChars}
                </span>
              </div>
            </div>
            <button id="sendBtn" onClick={sendMessage}>
              Enviar
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
