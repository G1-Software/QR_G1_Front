// src/components/TokenProtectedRoute.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function TokenProtectedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/scanqrnotice");
    }
  }, [token, navigate]);

  if (!token) return null;

  return children;
}
