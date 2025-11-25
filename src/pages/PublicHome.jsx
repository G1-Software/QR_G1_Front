import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logotipo.jpg";
import "../styles/adminHome.css";

export const PublicHome = () => {
    const { loginWithRedirect } = useAuth0();

  return (
    <div className="admin-home">
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="brand">
            <img src={logo} alt="UC CHRISTUS" className="brand__logo" />
          </div>
          <div className="logout-container">
            <button
              className="btn-logout"
              onClick={() => loginWithRedirect({ appState: { targetUrl: "/admin" } })}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      <main>
        <h2>Bienvenido a Panel de Administración QR UC CHRISTUS</h2>
        <p>
            Acceda al panel administrativo utilizando tu cuenta corporativa
        </p>

        <button
          className="btn-logout"
          onClick={() => loginWithRedirect({ appState: { targetUrl: "/admin" } })}
        >
          Iniciar sesión
        </button>
        
      </main>
    </div>
  );
};
