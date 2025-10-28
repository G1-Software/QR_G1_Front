import logo from "../assets/logotipo.jpg";
import { useNavigate, Link } from "react-router-dom";
import "../styles/index.css";

export function HeaderInfoPage({ id }) {
  const navigate = useNavigate();

  return (
    <header>
      <div className="return-box">
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

        <Link className="material-symbols-outlined" to={`/${id}`}>
          Home
        </Link>
      </div>
      <img className="logo-header-info-page" src={logo} alt="Logotipo" />
    </header>
  );
}
