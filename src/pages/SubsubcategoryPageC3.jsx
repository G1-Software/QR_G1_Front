import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";

export function SubsubategoryPageC3() {
  const { qrData } = useQrStore();
  return (
    <div className="container">
      <Header title={"SERVICIOS PARA VISITAS"}></Header>

      <main>
        <Button
          text={"CAFETERÍAS, MARKETPLACES, MÁQUINAS EXPENDEDORAS, ETC"}
        ></Button>
        <Button text={"CAPILLAS O ESPACIOS DE REFLEXIÓN"}></Button>
        <Button text={"ESTACIONAMIENTO, CAJERO AUTOMÁTICO, WIFI"}></Button>
        <Button text={"OTRO"}></Button>
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
