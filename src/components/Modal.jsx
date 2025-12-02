import React from "react";

export function Modal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="modal-actions">
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
