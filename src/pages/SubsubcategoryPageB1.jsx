import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";
import { useParams } from "react-router-dom";

export function SubsubategoryPageB1() {
  const { qrData } = useQrStore();
  const { id } = useParams();
  return (
    <div className="container">
      <Header title={"INFORMACIÓN GES - CAEC - LEY DE URGENCIA"}></Header>

      <main>
        <Button to={`/information-page/7`} text={"GES"}></Button>
        <Button to={`/information-page/8`} text={"CAEC"}></Button>
        <Button to={`/information-page/9`} text={"LEY DE URGENCIA"}></Button>
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
