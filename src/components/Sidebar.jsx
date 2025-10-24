import { Link } from "react-router-dom";

export function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${!isOpen ? "close" : ""}`}>
      <div className="close-container">
        <button
          onClick={onClose}
          className="material-symbols-outlined text-gray-600 hover:text-black"
        >
          close
        </button>
      </div>

      <div className="links-container">
        <Link className="link">Inicio</Link>
        <Link className="link">Dashboards</Link>
        <Link to="/editor" className="link">
          Editor
        </Link>
        <Link to="/instructive" className="link">
          Instructivo
        </Link>
      </div>
    </aside>
  );
}
