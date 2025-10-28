import { useState, useEffect } from "react";
import axios from "axios";
import { HeaderInfoPage } from "../components/HeaderInfoPage";
import { useQrStore } from "../stores/QRStore.js";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";

export function InformationPage() {
  const { qrData, setQrData } = useQrStore();
  const { idQR, idPage } = useParams();
  const [contentHtml, setContentHtml] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        let qr = qrData;
        if (!qr) {
          const qrResponse = await axios.get(
            `https://qr-g1-software-back.onrender.com/qr/${idQR}`
          );
          qr = qrResponse.data.data;
          setQrData(qr);
        }

        const pageResponse = await axios.get(
          `https://qr-g1-software-back.onrender.com/page/${idPage}`
        );
        setContentHtml(pageResponse.data.data.content_html);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [idQR, idPage, qrData, setQrData]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

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
