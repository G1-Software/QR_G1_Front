import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { useQrStore } from "../stores/QRStore.js";
import { useParams } from "react-router-dom";

export function SubCategoryPageB() {
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
      <Header id={id} title={"INFORMACIÓN ADMINISTRATIVA"} />

      <main>
        <Button
          to={`/subsubcategoryB1/${id}`}
          text={"INFORMACIÓN GES - CAEC - LEY DE URGENCIA"}
        />
        <Button
          to={`/information-page/${id}/10`}
          text={"COSTO DE PRESTACIONES"}
        />
        <Button
          to={`/subsubcategoryB3/${id}`}
          text={"PRESUPUESTOS, CUENTA HOSPITALARIA, PAGOS"}
        />
        <Button
          to={`/information-page/${id}/13`}
          text={"SUGERENCIAS, RECLAMOS Y FELICITACIONES"}
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
