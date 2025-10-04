import logo from "../assets/logotipo.jpg";
import { Link } from "react-router-dom";
import "../styles/index.css";

export function Header({ to, isCategoryPage = false, title }) {
  return (
    <header>
      <div className="return-box">
        {!isCategoryPage && (
          <Link to={to} className="material-symbols-outlined">
            arrow_back_ios
          </Link>
        )}
      </div>
      <img src={logo} alt="Logotipo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      {!isCategoryPage && <h1>{title}</h1>}
    </header>
  );
}
