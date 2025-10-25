import "../styles/App.css";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQrStore } from "../stores/QRStore.js";
import { Loader } from "./Loader.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import axios from "axios";

export function CategoryPage() {
  const { id } = useParams();
  const { qrData, setQrData } = useQrStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQrData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://qr-g1-software-back.onrender.com/qr/${id}`
        );

        setQrData(response.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error al obtener el QR");
      } finally {
        setLoading(false);
      }
    };

    fetchQrData();
  }, [id, setQrData]);

  if (loading) return <Loader></Loader>;
  if (error) return <ErrorPage></ErrorPage>;

  return (
    <div className="container">
      <Header to={`/${id}`} isCategoryPage={true} />

      <main>
        <Button
          to={`/subcategoryA/${id}`}
          isCategoryPage={true}
          text={"INFORMACIÓN CLINICA AL PACIENTE"}
        />
        <Button
          to={`/subcategoryB/${id}`}
          isCategoryPage={true}
          text={"INFORMACIÓN ADMINISTRATIVA Y PAGOS"}
        />
        <Button
          to={`/subcategoryC/${id}`}
          isCategoryPage={true}
          text={"ACOMPAÑANTES, VISITAS Y SERVICIOS DISPONIBLES"}
        />
        <Button
          to={`/requests/${id}`}
          isCategoryPage={true}
          text={"SOLICITUDES"}
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
