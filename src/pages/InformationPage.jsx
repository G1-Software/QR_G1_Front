import { useState, useEffect } from "react";
import axios from "axios";
import { HeaderInfoPage } from "../components/HeaderInfoPage";
import { useQrStore } from "../stores/QRStore.js";
import { Footer } from "../components/Footer";
import { useLocation } from "react-router-dom";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { apiUrl } from "../config/api.js";

export function InformationPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const page = query.get("page");
  const { qrData, setQrData } = useQrStore();
  const [contentHtml, setContentHtml] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        let qr = qrData;
        if (!qr) {
          const qrResponse = await axios.get(`${apiUrl}/qr/${token}`);
          qr = qrResponse.data.data;
          setQrData(qr);
        }

        const pageResponse = await axios.get(
          `${apiUrl}/page/${page}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setContentHtml(pageResponse.data.data.content_html);
        
        const page_id = pageResponse.data.data.id;
        const qr_id = qr.id;
        const key = `pv:${page_id}:qr:${qr_id}`;
        const payload = {
          page_id: page_id, 
          qr_id: qr_id,
        };

        
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, "1");
         try {
          await axios.post(
              `${apiUrl}/page_view_log`,
              payload,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
          
          } catch (error) {
            console.error("Error registrando vista de página:", error?.response?.data || error);
          }
        }


      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token, page, qrData, setQrData, accessToken]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className="container">
      <HeaderInfoPage to={`/?token=${token}`} />

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