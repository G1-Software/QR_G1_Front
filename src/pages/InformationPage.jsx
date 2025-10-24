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
  const [contentHtml, setContentHtml] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          `https://qr-g1-software-back.onrender.com/page/${id}`
        );
        setContentHtml(response.data.data.content_html);
      } catch (error) {
        setError("Error al cargar el contenido.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className="container">
      <HeaderInfoPage to={`/`} />

      <div
        className="visualizer-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
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
