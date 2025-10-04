import error from "../assets/error.png";
export function ErrorPage() {
  return (
    <div className="scan-notice">
      <p>Ups! parece que ha ocurrido un problema</p>
      <img src={error} alt="Escanea el código QR" className="error-img" />
      <p>
        Escanea de nuevo el código QR ubicado junto a tu cama para acceder a la
        información.
      </p>
    </div>
  );
}
