import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Dropdown } from "../components/Dropdown";
import { Input } from "../components/Input";
import { useQrStore } from "../stores/QRStore.js";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/index.css";

export function RequestPage() {
  const { id } = useParams();
  const { qrData } = useQrStore();

  const areas = ["Asistencia Social", "Apoyo Espiritual", "Nutrición", "Aseo", "Mantención"];
  const subareaMaintenance = ["Aire Acondicionado","Cama", "Baño", "WC - Ducha - Lavamanos","Iluminación - Enchufes","Televisor y Control Remoto","Mobiliario","Superficies y/o Pared","Timbre Defectuoso","Otro"];
  const subareaNutrition = ["Demora Entrega Alimento", "Alimentos que No son Según mi Condición de Salud", "Necesito Visita Nutricionista", "Otro"];
  const subareaSpiritual = ["Solicitar Visita de Apoyo Espiritual", "Solicita Oraciones para su Salud", "Solicita Sacramento, Comunión y Confesión", "Otro"];
  const subareaCleaning = ["Baño", "Retirar Basura", "Limpieza Diaria", "Derrame de Líquidos", "Ropería", "Reposición de Insumos", "Horario de Aseo", "Otro"];

  const [areaSelected, setAreaSelected] = useState("");
  const [subareaSelected, setSubareaSelected] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [areaError, setAreaError] = useState("");
  const [subareaError, setSubareaError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const getSubareasByArea = () => {
    if (areaSelected === "Mantención") return subareaMaintenance;
    if (areaSelected === "Aseo") return subareaCleaning;
    if (areaSelected === "Apoyo Espiritual") return subareaSpiritual;
    if (areaSelected === "Nutrición") return subareaNutrition;
    return [];
  };

  const resetErrors = () => {
    setAreaError("");
    setSubareaError("");
    setFullNameError("");
    setEmailError("");
    setDescriptionError("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(String(email).trim());
  };

  const handleCreateRequest = async () => {
    resetErrors();
    let ok = true;

    if (!areaSelected) { setAreaError("Selecciona un área."); ok = false; }
    const subareas = getSubareasByArea();
    if (subareas.length > 0 && !subareaSelected) { setSubareaError("Selecciona una subárea."); ok = false; }
    if (!fullName.trim()) { setFullNameError("Ingresa tu nombre."); ok = false; }
    if (!email.trim()) {
      setEmailError("Ingresa tu correo."); ok = false;
    } else if (!validateEmail(email)) {
      setEmailError("Formato de correo inválido (ej: nombre@dominio.com)."); ok = false;
    }
    if (!description.trim()) { setDescriptionError("Describe tu solicitud."); ok = false; }

    if (!ok) return;

    const payload = {
      qr_id: Number(id),
      area: areaSelected,
      subarea: subareas.length ? subareaSelected : null,
      description,
      requester_full_name: fullName,
      requester_email: email,
    };

    try {
      const response = await axios.post(
        `https://qr-g1-software-back.onrender.com/request`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.error) throw new Error(response.data.error);

      alert("✅ Solicitud enviada correctamente");
      setAreaSelected(""); setSubareaSelected(""); setFullName(""); setEmail(""); setDescription("");

    } catch (error) {
      console.error(error);
      alert("❌ Error al enviar la solicitud. Intente nuevamente.");
    }
  };

  return (
    <div className="container">
    <Header to={`/${id}`} title={"ENVÍO DE SOLICITUD"} subtitle={"Complete todos los campos para enviar su solicitud"} />

      <main>
        <div>
          <Input label="NOMBRE Y APELLIDO" value={fullName} onChange={setFullName} />
          {fullNameError && <div className="form-error">{fullNameError}</div>}
        </div>

        <div>
          <Input label="CORREO ELECTRÓNICO" type="email" value={email} onChange={setEmail} />
          {emailError && <div className="form-error">{emailError}</div>}
        </div>

        <div>
          <Dropdown
            label="ÁREA DE LA SOLICITUD"
            options={areas}
            value={areaSelected}
            onChange={(v) => {
              setAreaSelected(v);
              setSubareaSelected("");
            }}
          />
          {areaError && <div className="form-error">{areaError}</div>}
        </div>

        {getSubareasByArea().length > 0 && (
          <div>
            <Dropdown label="Subárea" options={getSubareasByArea()} value={subareaSelected} onChange={setSubareaSelected} />
            {subareaError && <div className="form-error">{subareaError}</div>}
          </div>
        )}

        <div>
          <Input label="DETALLE DE LA SOLICITUD" textarea value={description} onChange={setDescription} />
          {descriptionError && <div className="form-error">{descriptionError}</div>}
        </div>

        <button type="button" className="button purple" onClick={handleCreateRequest}>
          Enviar Solicitud
        </button>
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
