import { useState } from "react";
import logotipo from "../assets/logotipo.jpg";
import editor from "../assets/editor.md?raw";

import { Toolbar } from "../components/Toolbar";
import { Sidebar } from "../components/Sidebar";
import { useMarkdownEditor } from "../hooks/useMarkdownEditor";
import { usePagesAPI } from "../hooks/usePagesAPI";
import { Modal } from "../components/Modal";
import { Loader } from "./Loader.jsx";
import { ErrorPage } from "./ErrorPage.jsx";

export function EditorPage() {
  const { pages, savePage, isSaving, loading, error } = usePagesAPI();

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  if (loading) return <Loader />;
  if (error) return <ErrorPage message={error} />;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const handleSelectChange = (e) => {
    const pageId = parseInt(e.target.value);
    if (!pageId) {
      setSelectedPage(null);
      setText(editor);
      return;
    }
    const page = pages.find((p) => p.id === pageId);
    setSelectedPage(page || null);
    setText(page?.content_markdown || "");
  };

  const handleSave = () => {
    if (!selectedPage) {
      setShowErrorModal(true);
      return;
    }
    const updatedPage = {
      ...selectedPage,
      content_markdown: text,
      content_html: html,
      updated_at: new Date().toISOString(),
    };
    savePage(updatedPage);
    setIsSaved(true);
  };

  const handleCloseModal = () => setIsSaved(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  return (
    <div className="editor-container">
      <Toolbar
        onToggleSidebar={toggleSidebar}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onFormat={applyMarkdown}
        onSave={handleSave}
        pages={pages}
        selectedPageId={selectedPage?.id}
        onSelectChange={handleSelectChange}
        isSaving={isSaving}
      />

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

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

      <Modal
        isOpen={isSaved}
        onClose={handleCloseModal}
        message="Se guardaron los cambios"
      />

      <Modal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        message="Selecciona una página antes de guardar."
      />
    </div>
  );
}
