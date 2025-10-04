import { Link } from "react-router-dom";
import "../styles/index.css";

export function Button({ text, to, isCategoryPage = false }) {
  return (
    <Link to={to} className={`button ${isCategoryPage ? "blue" : "purple"}`}>
      {text}
    </Link>
  );
}
