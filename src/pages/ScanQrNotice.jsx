import scan from "../assets/scan.gif";
export function ScanQrNotice() {
  return (
    <div className="scan-notice">
      <p>Ups! parece que intentas acceder sin haber escaneado el código QR.</p>
      <img src={scan} alt="Escanea el código QR" className="scan-gif" />
      <p>
        Escanea el código QR ubicado junto a tu cama para acceder a la
        información.
      </p>
    </div>
  );
}
