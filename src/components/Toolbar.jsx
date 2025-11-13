import React from "react";
import "../styles/index.css";

export function Toolbar({
  onUndo,
  onRedo,
  onFormat,
  onSave,
  pages = [],
  selectedPageId = "",
  onSelectChange,
  isSaving = false,
  isInstructive = false,
}) {
  const insertBold = () => onFormat("**", "**");
  const insertItalic = () => onFormat("_", "_");
  const insertH1 = () => onFormat("# ", "", true);
  const insertH2 = () => onFormat("## ", "", true);
  const insertH3 = () => onFormat("### ", "", true);
  const insertBullet = () => onFormat("- ", "", true);
  const insertNumbered = () => onFormat("1. ", "", true);
  const insertLink = () => onFormat("[", "](url)");
  const insertImage = () => onFormat("![alt](url)");
  const insertIframe = () =>
    onFormat(
      '<iframe width="300" height="180" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>',
      "",
      true
    );
  const insertPhone = () => onFormat("[Teléfono]", "(tel:+569XXXXXXXX)");

  return (
    <nav className="toolbar">
      <div className="tools" role="toolbar" aria-label="Editor toolbar">
        <button
          type="button"
          onClick={onUndo}
          title="Deshacer"
          aria-label="Deshacer"
        >
          <span className="material-symbols-outlined">undo</span>
        </button>

        <button
          type="button"
          onClick={onRedo}
          title="Rehacer"
          aria-label="Rehacer"
        >
          <span className="material-symbols-outlined">redo</span>
        </button>

        <span className="separator" />

        <button
          type="button"
          onClick={insertBold}
          title="Negrita (Ctrl+B)"
          aria-label="Negrita"
        >
          <span className="material-symbols-outlined">format_bold</span>
        </button>

        <button
          type="button"
          onClick={insertItalic}
          title="Cursiva"
          aria-label="Cursiva"
        >
          <span className="material-symbols-outlined">format_italic</span>
        </button>

        <button
          type="button"
          onClick={insertH1}
          title="Encabezado 1"
          aria-label="Encabezado 1"
        >
          <span className="material-symbols-outlined">format_h1</span>
        </button>

        <button
          type="button"
          onClick={insertH2}
          title="Encabezado 2"
          aria-label="Encabezado 2"
        >
          <span className="material-symbols-outlined">format_h2</span>
        </button>

        <button
          type="button"
          onClick={insertH3}
          title="Encabezado 3"
          aria-label="Encabezado 3"
        >
          <span className="material-symbols-outlined">format_h3</span>
        </button>

        <button
          type="button"
          onClick={insertBullet}
          title="Lista con viñetas"
          aria-label="Lista con viñetas"
        >
          <span className="material-symbols-outlined">
            format_list_bulleted_add
          </span>
        </button>

        <button
          type="button"
          onClick={insertNumbered}
          title="Lista numerada"
          aria-label="Lista numerada"
        >
          <span className="material-symbols-outlined">
            format_list_numbered
          </span>
        </button>

        <button
          type="button"
          onClick={insertLink}
          title="Insertar enlace"
          aria-label="Insertar enlace"
        >
          <span className="material-symbols-outlined">link</span>
        </button>

        <button
          type="button"
          onClick={insertImage}
          title="Insertar imagen"
          aria-label="Insertar imagen"
        >
          <span className="material-symbols-outlined">image</span>
        </button>

        <button
          type="button"
          onClick={insertIframe}
          title="Insertar video (iframe)"
          aria-label="Insertar video"
        >
          <span className="material-symbols-outlined">smart_display</span>
        </button>

        <button
          type="button"
          onClick={insertPhone}
          title="Insertar teléfono"
          aria-label="Insertar teléfono"
        >
          <span className="material-symbols-outlined">call</span>
        </button>
      </div>

      {!isInstructive && (
        <div className="select-and-save">
          <select
            onChange={onSelectChange}
            value={selectedPageId || ""}
            aria-label="Seleccionar página"
            title="Selecciona una página"
          >
            <option value="">SELECCIONA UNA PÁGINA</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            aria-label="Guardar cambios"
            title={isSaving ? "Guardando..." : "Guardar cambios"}
          >
            <span className="material-symbols-outlined">
              {isSaving ? "hourglass_empty" : "save"}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
