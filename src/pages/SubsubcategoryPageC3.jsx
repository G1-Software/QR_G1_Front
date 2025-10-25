import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";

export function SubsubategoryPageC3() {
  const { qrData } = useQrStore();
  return (
    <div className="container">
      <Header title={"SERVICIOS Y APOYO DISPONIBLES PARA VISITAS"}></Header>

      <main>
        <Button
          to={`/information-page/24`}
          text={"CAFETERÍAS, MARKETPLACES, MÁQUINAS EXPENDEDORAS, ETC"}
        ></Button>
        <Button
          to={`/information-page/25`}
          text={"ESPACIOS DE ORACIÓN Y REFLEXIÓN ESPIRITUAL"}
        ></Button>
        <Button
          to={`/information-page/26`}
          text={"CAJERO AUTOMÁTICO, WIFI Y ESTACIONAMIENTOS"}
        ></Button>
      </main>
      {qrData && (
        <Footer
          bed={qrData.bed}
          building={qrData.building}
          floor={qrData.floor}
          room={qrData.room}
          service={qrData.service}
          institution={qrData.institution}
        />
      )}
    </div>
  );
}
