import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";

export function SubsubategoryPageC2() {
  const { qrData } = useQrStore();
  return (
    <div className="container">
      <Header title={"HORARIOS Y CONDICIONES"}></Header>

      <main>
        <Button
          to={`/information-page/21`}
          text={"HORARIO VISITAS Y BANCO DE SANGRE"}
        ></Button>
        <Button
          to={`/information-page/22`}
          text={"CONDICIONES DE ENTRADA DE VISITAS AL HOSPITAL"}
        ></Button>
        <Button
          to={`/information-page/23`}
          text={"ELEMENTOS PERMITIDOS Y NO PERMITIDOS AL INGRESO AL HOSPITAL"}
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
