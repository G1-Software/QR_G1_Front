// src/PrivateRoute.jsx
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export function PrivateRoute({ children }) {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return <div>Cargando...</div>;

  if (!isAuthenticated) {
    loginWithRedirect();
    return <div>Redirigiendo al login...</div>;
  }

  return children;
}
