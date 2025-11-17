import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../config/api";
import axios from "axios";

const API_URL = `${apiUrl}/chatbot/message`;
const QR_ID = 4;

export function useChatbotLogic() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      author: "Chatbot UCChristus",
      time: "10:05",
      datetime: "2025-10-16T10:05",
      text: "Hola! ¿Cómo puedo ayudarte?",
    },
  ]);

  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const messagesRef = useRef(null);

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
    const value = inputRef.current.value.trim();
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
        author: "You",
        time,
        datetime: now.toISOString(),
        text: value,
      },
    ]);

    const userMessage = value;
    inputRef.current.value = "";
    scrollToBottom();

    try {
      // ⬇️ Enviar al backend
      const response = await axios.post(API_URL, {
        message: userMessage,
        qr_id: QR_ID,
      });

      const botReply = response.data.reply || "No tengo respuesta disponible.";

      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // ⬇️ Añadir mensaje del chatbot real
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

      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // ⬇️ Mensaje de error
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
    handleMessageKey,
    sendMessage,
  };
}
