import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { buildErrorState } from "../utils/error.js";


export function usePagesAPI() {
  const [pages, setPages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        setError(null);

        const accessToken = await getAccessTokenSilently({
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        });
        const res = await axios.get(`${apiUrl}/page`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPages(res.data.data || []);
      } catch (err) {
        console.error("Error al obtener páginas:", err);
        setError(buildErrorState(err, "Error al obtener las páginas."));
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [getAccessTokenSilently]);

  const savePage = async (page) => {
    setIsSaving(true);
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });
      await axios.put(`${apiUrl}/page/${page.id}`, page, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setPages((prev) => prev.map((p) => (p.id === page.id ? page : p)));
      console.log("Cambios guardados con éxito.");
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
      setError(buildErrorState(err, "Error al guardar los cambios."));
    } finally {
      setIsSaving(false);
    }
  };

  return { pages, setPages, isSaving, savePage, loading, error };
}
