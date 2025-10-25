import logo from "../assets/logotipo.jpg";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

export function HeaderInfoPage() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="return-box">
        <button
          onClick={() => navigate(-1)} // 🔙 Regresa a la página anterior
          className="material-symbols-outlined"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          arrow_back_ios
        </button>
      </div>
      <img className="logo-header-info-page" src={logo} alt="Logotipo" />
    </header>
  );
}
