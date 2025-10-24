import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";
import { useParams } from "react-router-dom";

export function SubCategoryPageC() {
  const { id } = useParams();
  const { qrData } = useQrStore();
  return (
    <div className="container">
      <Header title={"ACOMPAÑANTES Y VISITAS"}></Header>

      <main>
        <Button
          to={`/subsubcategoryC1/${id}`}
          text={"INFORMACIÓN GENERAL DE ACOMPAÑANTES Y VISITAS"}
        ></Button>
        <Button
          to={`/subsubcategoryC2/${id}`}
          text={"HORARIOS Y CONDICIONES"}
        ></Button>

        <Button
          to={`/subsubcategoryC3/${id}`}
          text={"SERVICIOS Y APOYO DISPONIBLES PARA VISITAS"}
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
