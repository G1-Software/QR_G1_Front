import "../styles/App.css";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQrStore } from "../stores/QRStore.js";
import { Loader } from "./Loader.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { apiUrl } from "../config/api.js";
import axios from "axios";

export function CategoryPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const { qrData, setQrData } = useQrStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQrData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${apiUrl}/qr/${token}`);

        setQrData(response.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error al obtener el QR");
      } finally {
        setLoading(false);
      }
    };

    fetchQrData();
  }, [token, setQrData]);

  if (loading) return <Loader></Loader>;
  if (error) return <ErrorPage></ErrorPage>;

  return (
    <div className="container">
      <Header isCategoryPage={true} />

      <main>
        <Button
          to={`/informacion_clinica?token=${token}`}
          isCategoryPage={true}
          text={"INFORMACIÓN CLINICA AL PACIENTE"}
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
