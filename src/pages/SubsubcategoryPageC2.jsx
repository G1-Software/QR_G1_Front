import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { useQrStore } from "../stores/QRStore.js";
import { useLocation } from "react-router-dom";

export function SubsubategoryPageC2() {
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
      <Header to={`/?token=${token}`} title={"HORARIOS Y CONDICIONES"} />

      <main>
        <Button
          to={`/pagina_informacion?token=${token}&page=${21}`}
          text={"HORARIO VISITAS Y BANCO DE SANGRE"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${22}`}
          text={"CONDICIONES DE ENTRADA DE VISITAS AL HOSPITAL"}
        />
        <Button
          to={`/pagina_informacion?token=${token}&page=${23}`}
          text={"ELEMENTOS PERMITIDOS Y NO PERMITIDOS AL INGRESO AL HOSPITAL"}
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
