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
        <Button
          to={`/information-page/14`}
          text={"DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA"}
        ></Button>
        <Button
          to={`/information-page/15`}
          text={"ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE RESPONSABLE"}
        ></Button>
        <Button
          to={`/information-page/16`}
          text={"ROL DEL RESPONSABLE DEL PAGARÉ"}
        ></Button>
        <Button
          to={`/information-page/17`}
          text={"CUIDADOR DE EMPRESA EXTERNA"}
        ></Button>
        <Button to={`/information-page/18`} text={"LEY MILA N°21.372"}></Button>
        <Button
          to={`/information-page/19`}
          text={"INGRESO DE PERROS DE ASISTENCIA"}
        ></Button>
        <Button
          to={`/information-page/20`}
          text={"INGRESO DE MASCOTAS"}
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
