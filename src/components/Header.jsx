import logo from "../assets/logotipo.jpg";
import { Link, useNavigate } from "react-router-dom";
import "../styles/index.css";

export function Header({ id, isCategoryPage = false, title, subtitle }) {
  const navigate = useNavigate();
  return (
    <header>
      <div className="return-box">
        {!isCategoryPage && (
          <button
            onClick={() => navigate(-1)}
            className="material-symbols-outlined"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            arrow_back_ios
          </button>
        )}

        {!isCategoryPage && (
          <Link className="material-symbols-outlined" to={`/${id}`}>
            Home
          </Link>
        )}
      </div>

      <img src={logo} alt="Logotipo" />
      <p>{subtitle || "Por favor indíquenos de qué área es su consulta"}</p>
      {!isCategoryPage && <h1>{title}</h1>}
    </header>
  );
}
