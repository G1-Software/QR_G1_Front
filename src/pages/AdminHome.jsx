import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import logo from "../assets/logotipo.jpg";
import "../styles/adminHome.css";

export const AdminHome = () => {
  const { logout } = useAuth0();

  return (
    <div className="admin-home">
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="brand">
            <img src={logo} alt="UC CHRISTUS" className="brand__logo" />
          </div>
          <div className="spacer"    /> 
         
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

      <main>
        <h2>Bienvenido Admin 👋</h2>
        <p>Seleccione una acción para comenzar</p>

        <div className="admin-links">
          <Link to="/admin/contenido" className="admin-card">Editar Información</Link>
          <Link to="/admin/metricas" className="admin-card">Dashboard de Métricas</Link>
        </div>
      </main>
    </div>
  );
};
