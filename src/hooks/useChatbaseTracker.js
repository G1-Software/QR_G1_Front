import { useEffect, useRef } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";
import { useQrStore } from "../stores/QRStore";

export function useChatbaseTracker() {
  const lastQuestionRef = useRef(null);
  const { qrData } = useQrStore();
  const qr_id = qrData?.id;

  useEffect(() => {
    if (!qr_id) return;
    let attempts = 0;
    let initialized = false;

    const SESSION_EXPIRATION_MIN = 15;

    const registerChatEntry = async () => {
      try {
        await axios.post(`${apiUrl}/chatbot_entry_log/`, { qr_id });
        console.log("Log registrado en backend");
      } catch (err) {
        console.error("Error registrando log:", err);
      }
    };

    const shouldResetSession = () => {
      const timestamp = sessionStorage.getItem("chat_timestamp");
      if (!timestamp) return true;

      const elapsedMs = Date.now() - Number(timestamp);
      const elapsedMin = elapsedMs / 1000 / 60;

      return elapsedMin > SESSION_EXPIRATION_MIN;
    };

    const startSession = () => {
      sessionStorage.setItem("chat_started", "true");
      sessionStorage.setItem("chat_timestamp", Date.now().toString());
    };

    const resetSession = () => {
      sessionStorage.removeItem("chat_started");
      sessionStorage.removeItem("chat_timestamp");
    };

    const handleUser = () => {
      if (shouldResetSession()) {
        console.log("Sesión expirada — iniciando una nueva");
        resetSession();
      }
      if (!sessionStorage.getItem("chat_started")) {
        console.log("Primera pregunta (sesión nueva)");
        startSession();
        registerChatEntry();
      } else {
        sessionStorage.setItem("chat_timestamp", Date.now().toString());
      }
    };

    const handleAssistant = async (event) => {
      const reply = event.data.content;
      const question = lastQuestionRef.current;

      if (!question) return;

      const genericResponses = [
        "Lo siento, no encontré información oficial sobre tu pregunta. ¿Te puedo ayudar en algo más?",
      ];

      const is_answered = !genericResponses.some((txt) => reply.includes(txt));

      try {
        await axios.post(`${apiUrl}/chatbot_questions/question`, {
          question,
          qr_id,
          is_answered,
        });
      } catch (error) {
        console.error("Error enviando pregunta al backend:", error);
      }
    };

    const initListeners = () => {
      if (initialized) return;
      initialized = true;

      window.chatbase.addEventListener("user-message", (event) => {
        const msg = event.data.content || "";

        if (msg.length > 500) {
          console.warn(
            "Mensaje demasiado largo, no se enviará al backend:",
            msg.length
          );
          lastQuestionRef.current = null;
          return;
        }

        lastQuestionRef.current = msg;
        handleUser(event);
      });

      window.chatbase.addEventListener("assistant-message", handleAssistant);
    };

    const interval = setInterval(() => {
      if (window.chatbase) {
        clearInterval(interval);
        initListeners();
      } else if (attempts > 10) {
        clearInterval(interval);
      }
      attempts++;
    }, 100);

    return () => {
      clearInterval(interval);
      if (window.chatbase) {
        window.chatbase.removeEventListener("user-message", handleUser);
        window.chatbase.removeEventListener(
          "assistant-message",
          handleAssistant
        );
      }
    };
  }, [qr_id]);
}
