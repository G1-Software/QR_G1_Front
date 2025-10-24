import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";

export function SubCategoryPageA() {
  const { qrData } = useQrStore();
  return (
    <div className="container">
      <Header title={"INFORMACIÓN CLÍNICA"}></Header>

      <main>
        <Button
          to={`/information-page/1`}
          text={"RESULTADOS DE EXÁMENES (LABORATORIOS E IMÁGENES)"}
        ></Button>
        <Button
          to={`/information-page/2`}
          text={"DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, ETC)"}
        ></Button>
        <Button
          to={`/information-page/3`}
          text={"INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO"}
        ></Button>
        <Button
          to={`/information-page/4`}
          text={"¿DÓNDE AGENDO UNA CITA POST HOSPITALIZACIÓN?"}
        ></Button>
        <Button
          to={`/information-page/5`}
          text={"HORARIO VISITAS  Y BANCO SANGRE"}
        ></Button>
        <Button to={`/information-page/6`} text={"PROCESO DE ALTA"}></Button>
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
