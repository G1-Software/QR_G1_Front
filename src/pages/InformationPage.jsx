import { useState, useEffect } from "react";
import axios from "axios"; // Importa Axios
import { HeaderInfoPage } from "../components/HeaderInfoPage";
import { useQrStore } from "../stores/QRStore.js";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";

export function InformationPage() {
  const { qrData } = useQrStore();
  const { id } = useParams();
  const [contentHtml, setContentHtml] = useState(null); // Estado para almacenar el contenido HTML
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          `https://qr-g1-software-back.onrender.com/page/${id}`
        );
        setContentHtml(response.data.data.content_html); // Almacenar el contenido HTML
      } catch (error) {
        setError("Error al cargar el contenido.");
      } finally {
        setLoading(false); // Terminar de cargar
      }
    };

    fetchContent();
  }, [id]); // Ejecutar efecto cuando el ID cambie

  if (loading) {
    return <Loader></Loader>; // Mostrar mensaje de carga
  }

  if (error) {
    return <ErrorPage></ErrorPage>; // Mostrar mensaje de error si algo falla
  }

  return (
    <div className="container">
      <HeaderInfoPage to={`/`} />

      {/* Mostrar el contenido HTML recuperado de la API */}
      <div
        className="visualizer-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }} // Renderiza el HTML de forma segura
      />

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
