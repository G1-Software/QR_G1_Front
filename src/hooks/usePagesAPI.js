import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";
import axios from "axios";

export function usePagesAPI() {
  const [pages, setPages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${apiUrl}/page`);
        setPages(res.data.data || []);
      } catch (err) {
        console.error("Error al obtener páginas:", err);
        setError(
          err.response?.data?.message || "Error al obtener las páginas."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const savePage = async (page) => {
    setIsSaving(true);
    try {
      await axios.put(`${apiUrl}/page/${page.id}`, page, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setPages((prev) => prev.map((p) => (p.id === page.id ? page : p)));
      console.log("Cambios guardados con éxito.");
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
      setError("Error al guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  return { pages, setPages, isSaving, savePage, loading, error };
}
