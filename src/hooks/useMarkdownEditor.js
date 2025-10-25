import { useState, useRef } from "react";
import showdown from "showdown";

export function useMarkdownEditor(initialText = "") {
  const [text, setText] = useState(initialText);
  const [history, setHistory] = useState([initialText]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const converter = new showdown.Converter();
  const textareaRef = useRef(null);

  const handleTextChange = (newText) => {
    setText(newText);
    setHistory((prev) => {
      const updated = [...prev.slice(0, historyIndex + 1), newText];
      if (updated.length > 50) updated.shift();
      return updated;
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setText(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setText(history[newIndex]);
    }
  };

  const applyMarkdown = (syntaxStart, syntaxEnd = "", block = false) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.substring(start, end);
    let newText;

    if (block) {
      newText =
        text.substring(0, start) + syntaxStart + selected + text.substring(end);
    } else {
      newText =
        text.substring(0, start) +
        syntaxStart +
        selected +
        syntaxEnd +
        text.substring(end);
    }

    handleTextChange(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + syntaxStart.length,
        end + syntaxStart.length
      );
    }, 0);
  };

  const html = converter.makeHtml(text);

  return {
    text,
    setText,
    html,
    handleTextChange,
    handleUndo,
    handleRedo,
    applyMarkdown,
    textareaRef,
  };
}
