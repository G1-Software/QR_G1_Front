import "../styles/App.css";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useQrStore } from "../stores/QRStore.js";
import { Loader } from "./Loader.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { apiUrl } from "../config/api.js";
import { buildErrorState } from "../utils/error.js";
import axios from "axios";

export function CategoryPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const { qrData, setQrData } = useQrStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchQrData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${apiUrl}/qr/${token}`);

        const qrInfo = response.data.data;
        setQrData(qrInfo);

        if (qrInfo?.id) {
          const scanKey = `qr_scan_${qrInfo.id}`;

          if (!sessionStorage.getItem(scanKey)) {
            sessionStorage.setItem(scanKey, "1");

            try {
              await axios.post(
                "https://qr-g1-software-back.onrender.com/qr_scan_log",
                { qr_id: qrInfo.id },
                { headers: { "Content-Type": "application/json" } }
              );
            } catch (postError) {
              console.error("Error al registrar QR scan log:", postError);
            }
          }
        }
      } catch (err) {
        console.error(err);
        setError(buildErrorState(err, "Escanea de nuevo el código QR ubicado junto a tu cama para acceder a la información."));
      } finally {
        setLoading(false);
      }
    };

    fetchQrData();
  }, [token, setQrData]);

  if (loading) return <Loader></Loader>;
  if (error) return <ErrorPage status={error.status} message={error.message}></ErrorPage>;

  return (
    <div className="container">
      <Header isCategoryPage={true} />

      <main>
        <Button
          to={`/informacion_clinica?token=${token}`}
          isCategoryPage={true}
          text={"INFORMACIÓN CLÍNICA AL PACIENTE"}
        />
        <Button
          to={`/informacion_administrativa?token=${token}`}
          isCategoryPage={true}
          text={"INFORMACIÓN ADMINISTRATIVA Y PAGOS"}
        />
        <Button
          to={`/informacion_acompanantes_visitas?token=${token}`}
          isCategoryPage={true}
          text={"ACOMPAÑANTES, VISITAS Y SERVICIOS DISPONIBLES"}
        />
        <Button
          to={`/solicitudes/?token=${token}`}
          isCategoryPage={true}
          text={"SOLICITUDES (LIMPIEZA, MANTENCIÓN, NUTRICIÓN, ETC)"}
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
