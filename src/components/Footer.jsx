import "../styles/index.css";

export function Footer({ bed, building, floor, room, service, institution }) {
  return (
    <footer>
      <p>
        Habitación {room} {building} - {floor} / Cama {bed}
      </p>
      <p>
        {institution} - {service}
      </p>
    </footer>
  );
}
