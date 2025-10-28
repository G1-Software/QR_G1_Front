import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { useQrStore } from "../stores/QRStore.js";
import { useParams } from "react-router-dom";

export function SubsubategoryPageC1() {
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
      <Header title={"INFORMACIÓN GENERAL DE ACOMPAÑANTES \nY VISITAS"} />

      <main>
        <Button
          to={`/information-page/${id}/14`}
          text={"DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA"}
        />
        <Button
          to={`/information-page/${id}/15`}
          text={"ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE RESPONSABLE"}
        />
        <Button
          to={`/information-page/${id}/16`}
          text={"ROL DEL RESPONSABLE DEL PAGARÉ"}
        />
        <Button
          to={`/information-page/${id}/17`}
          text={"CUIDADOR DE EMPRESA EXTERNA"}
        />
        <Button to={`/information-page/${id}/18`} text={"LEY MILA N°21.372"} />
        <Button
          to={`/information-page/${id}/19`}
          text={"INGRESO DE PERROS DE ASISTENCIA"}
        />
        <Button
          to={`/information-page/${id}/20`}
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
