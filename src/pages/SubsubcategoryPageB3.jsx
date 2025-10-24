import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";

export function SubsubategoryPageB3() {
  const { qrData } = useQrStore();
  return (
    <div className="container">
      <Header title={"PRESUPUESTOS, CUENTA HOSPITALARIA, PAGOS"}></Header>

      <main>
        <Button to={`/information-page/11`} text={"PRESUPUESTOS"}></Button>
        <Button
          to={`/information-page/12`}
          text={"CUENTA HOSPITALARIA Y PAGOS"}
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
