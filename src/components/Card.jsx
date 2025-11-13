import { Link } from "react-router-dom";
import "../styles/Card.css";

const Card = ({ image, title, description, linkText, linkHref }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={linkHref} className="button">
          {linkText}
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
