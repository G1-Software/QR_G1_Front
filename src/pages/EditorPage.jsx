import { useState } from "react";
import logotipo from "../assets/logotipo.jpg";
import editor from "../assets/editor.md?raw";

import { Toolbar } from "../components/Toolbar";
import { Sidebar } from "../components/Sidebar";
import { useMarkdownEditor } from "../hooks/useMarkdownEditor";
import { usePagesAPI } from "../hooks/usePagesAPI";
import { Modal } from "../components/Modal";

export function EditorPage() {
  const { pages, savePage, isSaving } = usePagesAPI();
  const {
    text,
    setText,
    html,
    handleTextChange,
    handleUndo,
    handleRedo,
    applyMarkdown,
    textareaRef,
  } = useMarkdownEditor(editor);

  const [selectedPage, setSelectedPage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para la sidebar
  const [isSaved, setIsSaved] = useState(false); // Estado para mostrar la modal de guardado
  const [showErrorModal, setShowErrorModal] = useState(false); // Estado para la modal de error

  // Función para abrir/cerrar la sidebar
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Manejo de selección de página
  const handleSelectChange = (e) => {
    const pageId = parseInt(e.target.value);
    if (!pageId) {
      setSelectedPage(null);
      setText(editor); // Aquí lo cambio por "editor" en lugar de "instructivo"
      return;
    }
    const page = pages.find((p) => p.id === pageId);
    setSelectedPage(page || null);
    setText(page?.content_markdown || "");
  };

  // Función para manejar el guardado
  const handleSave = () => {
    if (!selectedPage) {
      setShowErrorModal(true); // Mostrar la modal de error si no hay página seleccionada
      return;
    }
    const updatedPage = {
      ...selectedPage,
      content_markdown: text,
      content_html: html,
      updated_at: new Date().toISOString(),
    };
    savePage(updatedPage);
    setIsSaved(true); // Mostrar la modal de "Se guardaron los cambios"
  };

  // Función para cerrar la modal de éxito
  const handleCloseModal = () => {
    setIsSaved(false); // Cerrar la modal de "Se guardaron los cambios"
  };

  // Función para cerrar la modal de error
  const handleCloseErrorModal = () => {
    setShowErrorModal(false); // Cerrar la modal de error
  };

  return (
    <div className="editor-container">
      {/* 🧭 Barra de herramientas */}
      <Toolbar
        onToggleSidebar={toggleSidebar} // Cambié el nombre del prop aquí
        onUndo={handleUndo}
        onRedo={handleRedo}
        onFormat={applyMarkdown}
        onSave={handleSave}
        pages={pages}
        selectedPageId={selectedPage?.id}
        onSelectChange={handleSelectChange}
        isSaving={isSaving}
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

      {/* Modal de confirmación de guardado */}
      <Modal
        isOpen={isSaved}
        onClose={handleCloseModal}
        message="Se guardaron los cambios"
      />

      {/* Modal de error si no hay página seleccionada */}
      <Modal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        message="Selecciona una página antes de guardar."
      />
    </div>
  );
}
