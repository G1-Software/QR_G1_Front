import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { apiUrl } from "../config/api.js";

const SUBAREAS = {
  Mantención: [
    "Aire Acondicionado",
    "Cama",
    "Baño",
    "WC - Ducha - Lavamanos",
    "Iluminación - Enchufes",
    "Televisor y Control Remoto",
    "Mobiliario",
    "Superficies y/o Pared",
    "Timbre Defectuoso",
    "Otro",
  ],
  Nutrición: [
    "Demora Entrega Alimento",
    "Alimentos que No son Según mi Condición de Salud",
    "Necesito Visita Nutricionista",
    "Otro",
  ],
  "Apoyo Espiritual": [
    "Solicitar Visita de Apoyo Espiritual",
    "Solicita Oraciones para su Salud",
    "Solicita Sacramento, Comunión y Confesión",
    "Solicita Apoyo Espiritual de un Externo",
    "Otro",
  ],
  "Limpieza de Habitación": [
    "Baño",
    "Retirar Basura",
    "Limpieza Diaria",
    "Derrame de Líquidos",
    "Ropería",
    "Reposición de Insumos",
    "Horario de Aseo",
    "Otro",
  ],
  "Asistencia Social": [
    "Solicita Contacto Familiar",
    "Apoyo con Documentación",
    "Acompañamiento",
    "Otro",
  ],
};

export function RequestFilters({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [qrOptions, setQrOptions] = useState({
    institution: [],
    building: [],
    floor: [],
    service: [],
    room: [],
    bed: [],
  });

  useEffect(() => {
    const fetchQrOptions = async () => {
      try {
        const res = await axios.get(`${apiUrl}/request/filters/qr-options`);
        setQrOptions(res.data.data);
      } catch (err) {
        console.error("Error obteniendo opciones de QR:", err);
      }
    };
    fetchQrOptions();
  }, []);

  const availableSubareas = useMemo(
    () => SUBAREAS[localFilters.area] ?? [],
    [localFilters.area]
  );

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "area") updated.subarea = "";
      return updated;
    });
  };

  useEffect(() => {
    onFilterChange(localFilters);
  }, [localFilters, onFilterChange]);

  return (
    <div>
      <h2 className="filters-title">Filtros</h2>

      <div className="filters-row">
        <label>
          Institución
          <select
            name="institution"
            value={localFilters.institution || ""}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            {qrOptions.institution.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>

        <label>
          Edificio
          <select
            name="building"
            value={localFilters.building || ""}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            {qrOptions.building.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label>
          Piso
          <select
            name="floor"
            value={localFilters.floor || ""}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            {qrOptions.floor.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>

        <label>
          Servicio
          <select
            name="service"
            value={localFilters.service || ""}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            {qrOptions.service.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label>
          Habitación
          <select
            name="room"
            value={localFilters.room || ""}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            {qrOptions.room.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cama
          <select
            name="bed"
            value={localFilters.bed || ""}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            {qrOptions.bed.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filters-row">
        <label>
          Área
          <select name="area" value={localFilters.area} onChange={handleChange}>
            <option value="">Todas</option>
            {Object.keys(SUBAREAS).map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </label>

        <label>
          Subárea
          <select
            name="subarea"
            value={localFilters.subarea}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            {availableSubareas.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </label>

        <label>
          Estado
          <select
            name="status"
            value={localFilters.status}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Completado">Completado</option>
          </select>
        </label>
      </div>

      <label className="label-creation-date">Rango de creación</label>
      <div className="filters-row filters-dates">
        <label>
          Inicio
          <input
            type="date"
            name="startDate"
            value={localFilters.startDate || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Término
          <input
            type="date"
            name="endDate"
            value={localFilters.endDate || ""}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}
