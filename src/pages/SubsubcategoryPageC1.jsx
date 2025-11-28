import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { useQrStore } from "../stores/QRStore.js";
import { useLocation } from "react-router-dom";
import { buildErrorState } from "../utils/error.js";
import { apiUrl } from "../config/api.js";

export function SubsubategoryPageC1() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const { qrData, setQrData } = useQrStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchQrIfNeeded = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      setLoading(true);
      try {
        if (qrData) {
          setLoading(false);
          return;
        }

        const qrResponse = await axios.get(
          `${apiUrl}/qr/${token}`
        );
        const qr = qrResponse.data.data;
        setQrData(qr);
      } catch (err) {
        console.error("Error al cargar QR:", err);
        setError(buildErrorState(err, "Error al cargar los datos del QR."));
      } finally {
        setLoading(false);
      }
    };

    fetchQrIfNeeded();
  }, [token, qrData, setQrData]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage status={error.status} message={error.message} />;

  return (
    <div className="container">
      <Header
        to={`/?token=${token}`}
        title={"INFORMACIÓN GENERAL DE ACOMPAÑANTES \nY VISITAS"}
      />

      <main>
        <Button
          to={`/pagina_informacion?token=${token}&page=${14}`}
          text={"DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${15}`}
          text={"ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE RESPONSABLE"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${16}`}
          text={"ROL DEL RESPONSABLE DEL PAGARÉ"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${17}`}
          text={"CUIDADOR DE EMPRESA EXTERNA"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${18}`}
          text={"LEY MILA N°21.372"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${19}`}
          text={"INGRESO DE PERROS DE ASISTENCIA"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${20}`}
          text={"INGRESO DE MASCOTAS"}
        />
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
