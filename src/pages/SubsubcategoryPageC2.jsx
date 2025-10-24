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
        <Button text={"HORARIOS VISITAS"}></Button>
        <Button text={"CONDICIONES DE ENTRADA DE VISITAS AL HOSPITAL"}></Button>
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
