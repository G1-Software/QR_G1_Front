import { useAuth0 } from "@auth0/auth0-react";
import "../styles/index.css";


export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>  
  );
};
