import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { useQrStore } from "../stores/QRStore.js";
import { useLocation } from "react-router-dom";

export function SubsubategoryPageC3() {
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
      <Header
        to={`/?token=${token}`}
        title={"SERVICIOS Y APOYO DISPONIBLES PARA VISITAS"}
      />

      <main>
        <Button
          to={`/pagina_informacion?token=${token}&page=${24}`}
          text={"CAFETERÍAS, MARKETPLACES, MÁQUINAS EXPENDEDORAS, ETC"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${25}`}
          text={"ESPACIOS DE ORACIÓN Y REFLEXIÓN ESPIRITUAL"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${26}`}
          text={"CAJERO AUTOMÁTICO, WIFI Y ESTACIONAMIENTOS"}
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
