import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";
import { useParams } from "react-router-dom";

export function SubCategoryPageB() {
  const { qrData } = useQrStore();
  const { id } = useParams();
  return (
    <div className="container">
      <Header title={"INFORMACIÓN ADMINISTRATIVA"}></Header>

      <main>
        <Button
          to={`/subsubcategoryB1/${id}`}
          text={"INFORMACIÓN GES - CAEC - LEY DE URGENCIA"}
        ></Button>
        <Button
          to={`/information-page/10`}
          text={"COSTO DE PRESTACIONES"}
        ></Button>
        <Button
          to={`/subsubcategoryB3/${id}`}
          text={"PRESUPUESTOS, CUENTA HOSPITALARIA, PAGOS"}
        ></Button>
        <Button text={"BENEFICIOS SOCIALES / ASISTENCIA SOCIAL"}></Button>
        <Button text={"SUGERENCIAS, RECLAMOS Y FELICITACIONES"}></Button>
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
