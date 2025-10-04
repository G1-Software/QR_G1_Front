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
      <Header
        to={`/subcategoryB/${id}`}
        title={"INFORMACIÓN GES - CAEC - LEY DE URGENCIA"}
      ></Header>

      <main>
        <Button text={"GES"}></Button>
        <Button text={"CAEC"}></Button>
        <Button text={"LEY DE URGENCIA"}></Button>
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
