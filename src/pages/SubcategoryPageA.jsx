import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useQrStore } from "../stores/QRStore.js";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { useParams } from "react-router-dom";

export function SubCategoryPageA() {
  const { qrData, setQrData } = useQrStore();
  const { id } = useParams();
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
          `https://qr-g1-software-back.onrender.com/qr/${id}`
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
  }, [id, qrData, setQrData]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className="container">
      <Header title={"INFORMACIÓN CLÍNICA"} />

      <main>
        <Button
          to={`/information-page/${id}/1`}
          text={"RESULTADOS DE EXÁMENES (LABORATORIOS E IMÁGENES)"}
        />
        <Button
          to={`/information-page/${id}/2`}
          text={"DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, ETC)"}
        />
        <Button
          to={`/information-page/${id}/3`}
          text={"INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO"}
        />
        <Button
          to={`/information-page/${id}/4`}
          text={"¿DÓNDE AGENDO UNA CITA POST HOSPITALIZACIÓN?"}
        />
        <Button
          to={`/information-page/${id}/5`}
          text={"HORARIO VISITAS  Y BANCO SANGRE"}
        />
        <Button to={`/information-page/${id}/6`} text={"CUIDADOS EN EL ALTA"} />
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
