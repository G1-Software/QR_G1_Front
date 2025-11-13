import logotipo from "../assets/logotipo.jpg";
import instructivo from "../assets/instructivo.md?raw";
import { AdminNavbar } from "../components/AdminNavbar";
import { Toolbar } from "../components/Toolbar";
import { useMarkdownEditor } from "../hooks/useMarkdownEditor";

export function Instructive() {
  const {
    text,
    html,
    handleTextChange,
    handleUndo,
    handleRedo,
    applyMarkdown,
    textareaRef,
  } = useMarkdownEditor(instructivo);

  return (
    <div className="editor-container">
      <AdminNavbar/>
      <Toolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onFormat={applyMarkdown}
        isInstructive={true}
      />

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
