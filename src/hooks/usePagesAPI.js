import { useEffect, useState } from "react";
import axios from "axios";

export function usePagesAPI() {
  const [pages, setPages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios
      .get("https://qr-g1-software-back.onrender.com/page")
      .then((res) => setPages(res.data.data || []))
      .catch((err) => console.error("Error al obtener páginas:", err));
  }, []);

  const savePage = async (page) => {
    setIsSaving(true);
    try {
      await axios.put(
        `https://qr-g1-software-back.onrender.com/page/${page.id}`,
        page,
        { headers: { "Content-Type": "application/json" } }
      );
      setPages((prev) => prev.map((p) => (p.id === page.id ? page : p)));
      console.log("Cambios guardados con éxito.");
    } catch (err) {
      alert("Error al guardar los cambios.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return { pages, setPages, isSaving, savePage };
}
