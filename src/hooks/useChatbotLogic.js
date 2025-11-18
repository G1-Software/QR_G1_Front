import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../config/api";
import axios from "axios";
import { useQrStore } from "../stores/QRStore";

const API_URL = `${apiUrl}/chatbot_questions/question`;
const MAX_MESSAGE_LENGTH = 500;
const MAX_TEXTAREA_HEIGHT = 96; 

export function useChatbotLogic() {
  const { qrData } = useQrStore();
  const QR_ID = qrData.id;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      author: "Chatbot UCChristus",
      time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit",}),
      datetime: new Date().toISOString(),
      text: "Hola! ¿Cómo puedo ayudarte?",
    },
  ]);

  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const messagesRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT);
    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  };

  const handleInputChange = (event) => {
    const limitedValue = event.target.value.slice(0, MAX_MESSAGE_LENGTH);
    if (limitedValue !== event.target.value) {
      event.target.value = limitedValue;
    }
    setMessage(limitedValue);
    requestAnimationFrame(adjustTextareaHeight);
  };

  // === FOCUS TRAP ===
  useEffect(() => {
    if (!open) return;

    const modal = modalRef.current;
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    modal.addEventListener("keydown", trap);
    setTimeout(() => inputRef.current?.focus(), 20);

    return () => modal.removeEventListener("keydown", trap);
  }, [open]);

  // === SCROLL ===
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    });
  };

  // === SEND MESSAGE (conexión al backend) ===
  const sendMessage = async () => {
    const value = message.trim();
    if (!value) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Añadir mensaje del usuario
    setMessages((prev) => [
      ...prev,
      {
        author: "Tú",
        time,
        datetime: now.toISOString(),
        text: value,
      },
    ]);

    const userMessage = value;
    setMessage("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.style.height = "";
      inputRef.current.style.overflowY = "hidden";
    }
    scrollToBottom();
    const botTime = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit",});

    try {
      const response = await axios.post(API_URL, {question: userMessage, qr_id: QR_ID,});
      const botReply = response.data.reply || "No tengo respuesta disponible.";
      setMessages((prev) => [
        ...prev,
        {
          author: "Chatbot UCChristus",
          time: botTime,
          datetime: new Date().toISOString(),
          text: botReply,
        },
      ]);
    } catch (error) {
      console.error("Error en backend:", error);

      setMessages((prev) => [
        ...prev,
        {
          author: "Chatbot UCChristus",
          time: botTime,
          datetime: new Date().toISOString(),
          text: "Hubo un problema al procesar tu mensaje.",
        },
      ]);
    }

    scrollToBottom();
  };

  // === KEYBOARD NAVIGATION ===
  const handleMessageKey = (e) => {
    const items = Array.from(
      messagesRef.current.querySelectorAll(
        '[role="listitem"], .chat-section-title'
      )
    );

    const index = items.findIndex((el) => el === document.activeElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (index < items.length - 1) {
        focusItem(items, index + 1);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index > 0) {
        focusItem(items, index - 1);
      }
    }
    if (e.key === "Home") {
      e.preventDefault();
      focusItem(items, 0);
    }
    if (e.key === "End") {
      e.preventDefault();
      focusItem(items, items.length - 1);
    }
  };

  const focusItem = (items, idx) => {
    items.forEach((el, i) => {
      el.setAttribute("tabindex", i === idx ? "0" : "-1");
      el.classList.toggle("focused", i === idx);
    });
    items[idx].focus();
    items[idx].scrollIntoView({ block: "center" });
  };

  return {
    open,
    setOpen,
    inputRef,
    modalRef,
    messagesRef,
    messages,
    message,
    maxMessageLength: MAX_MESSAGE_LENGTH,
    handleInputChange,
    handleMessageKey,
    sendMessage,
  };
}
