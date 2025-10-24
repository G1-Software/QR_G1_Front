import { useState } from "react";
import logotipo from "../assets/logotipo.jpg";
import instructivo from "../assets/instructivo.md?raw";

import { Toolbar } from "../components/Toolbar";
import { Sidebar } from "../components/Sidebar"; // Importa la Sidebar
import { useMarkdownEditor } from "../hooks/useMarkdownEditor";

export function Instructive() {
  const {
    text,
    setText,
    html,
    handleTextChange,
    handleUndo,
    handleRedo,
    applyMarkdown,
    textareaRef,
  } = useMarkdownEditor(instructivo);

  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para la sidebar

  // Función para abrir/cerrar la sidebar
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="editor-container">
      {/* 🧭 Barra de herramientas */}
      <Toolbar
        onToggleSidebar={toggleSidebar} // Cambié el nombre del prop aquí
        onUndo={handleUndo}
        onRedo={handleRedo}
        onFormat={applyMarkdown}
        isInstructive={true}
      />

      {/* 🧱 Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* 📝 Editor + vista previa */}
      <main className="editor-main">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="editor-textarea"
          spellCheck="false"
        />
        <div className="vizualizer-container">
          <div className="visualizer">
            <img
              src={logotipo}
              alt="Logotipo"
              width={143}
              className="logotipo"
            />
            <div
              className="visualizer-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
