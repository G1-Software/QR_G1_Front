import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";
import { useParams } from "react-router-dom";

export function SubCategoryPageA() {
  const { id } = useParams();
  const { qrData } = useQrStore();
  return (
    <div className="container">
      <Header to={`/${id}`} title={"INFORMACIÓN CLÍNICA"}></Header>

      <main>
        <Button
          text={"RESULTADOS DE EXÁMENES (LABORATORIOS E IMÁGENES)"}
        ></Button>
        <Button
          text={"DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, ETC)"}
        ></Button>
        <Button
          text={"INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO"}
        ></Button>
        <Button text={"¿DÓNDE AGENDO UNA CITA POST HOSPITALIZACIÓN?"}></Button>
        <Button text={"HORARIO VISITAS  Y BANCO SANGRE"}></Button>
        <Button text={"PROCESO DE ALTA"}></Button>
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
