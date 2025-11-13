import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logotipo.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/adminHome.css";

export function AdminNavbar() {
  const { logout } = useAuth0();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "close"}`}>
        <div className="close-container">
          <button
            onClick={closeSidebar}
            className="material-symbols-outlined text-gray-600 hover:text-black"
          >
            close
          </button>
        </div>

        <div className="links-container">
          <Link to="/admin" className="link" onClick={closeSidebar}>
            Inicio
          </Link>
          <Link to="/admin/editor" className="link" onClick={closeSidebar}>
            Editor
          </Link>
          <Link to="/admin/instructivo" className="link" onClick={closeSidebar}>
            Instructivo
          </Link>
          <Link
            to="/dashboard/listado_solicitudes"
            className="link"
            onClick={closeSidebar}
          >
            Listado de solicitudes
          </Link>
          <Link
            to="/dashboard/metricas_solicitudes"
            className="link"
            onClick={closeSidebar}
          >
            Dashboard de solicitudes
          </Link>
          <Link to="#" className="link" onClick={closeSidebar}>
            Dashboard de métricas QR
          </Link>
          <Link to="#" className="link" onClick={closeSidebar}>
            Dashboard de métricas Chatbot
          </Link>
        </div>
      </aside>

      {/* HEADER */}
      <header className="admin-header" ref={headerRef}>
        <div className="admin-header__inner">
          <div className="header-left">
            <button
              className="material-symbols-outlined menu-button"
              onClick={toggleSidebar}
            >
              menu
            </button>

            <div className="brand">
              <img src={logo} alt="UC CHRISTUS" className="brand__logo" />
            </div>
          </div>

          <div className="logout-container">
            <button
              className="btn-logout"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.href } })
              }
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
