import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";

export function SubsubategoryPageC1() {
  const { qrData } = useQrStore();
  return (
    <div className="container">
      <Header
        title={"INFORMACIÓN GENERAL DE ACOMPAÑANTES \nY VISITAS"}
      ></Header>

      <main>
        <Button text={"DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA"}></Button>
        <Button
          text={"ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE RESPONSABLE"}
        ></Button>
        <Button
          text={"DIFERENCIA ENTRE RESPONSABLE DE PAGARÉ Y ACOMPAÑANTE"}
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
