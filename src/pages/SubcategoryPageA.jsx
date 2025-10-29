import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { useLocation } from "react-router-dom";

export function SubCategoryPageA() {
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
          `https://qr-g1-software-back.onrender.com/qr/${token}`
        );
        const qr = qrResponse.data.data;
        setQrData(qr);
      } catch (err) {
        console.error("Error al cargar QR:", err);
        setError("Error al cargar los datos del QR.");
      } finally {
        setLoading(false);
      }
    };

    fetchQrIfNeeded();
  }, [token, qrData, setQrData]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className="container">
      <Header to={`/?token=${token}`} title={"INFORMACIÓN CLÍNICA"} />

      <main>
        <Button
          to={`/pagina_informacion?token=${token}&page=${1}`}
          text={"RESULTADOS DE EXÁMENES (LABORATORIOS E IMÁGENES)"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${2}`}
          text={"DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, ETC)"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${3}`}
          text={"INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${4}`}
          text={"¿DÓNDE AGENDO UNA CITA POST HOSPITALIZACIÓN?"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${5}`}
          text={"HORARIO VISITAS  Y BANCO SANGRE"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${6}`}
          text={"PROCESOS Y CUIDADOS EN EL ALTA"}
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
