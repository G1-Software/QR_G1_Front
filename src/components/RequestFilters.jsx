import { useState, useEffect, useMemo } from "react";

const subareaMaintenance = [
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
];

const subareaNutrition = [
  "Demora Entrega Alimento",
  "Alimentos que No son Según mi Condición de Salud",
  "Necesito Visita Nutricionista",
  "Otro",
];

const subareaSpiritual = [
  "Solicitar Visita de Apoyo Espiritual",
  "Solicita Oraciones para su Salud",
  "Solicita Sacramento, Comunión y Confesión",
  "Solicita Apoyo Espiritual de un Externo",
  "Otro",
];

const subareaCleaning = [
  "Baño",
  "Retirar Basura",
  "Limpieza Diaria",
  "Derrame de Líquidos",
  "Ropería",
  "Reposición de Insumos",
  "Horario de Aseo",
  "Otro",
];

const subareaSocial = [
  "Solicita Contacto Familiar",
  "Apoyo con Documentación",
  "Acompañamiento",
  "Otro",
];

export function RequestFilters({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const availableSubareas = useMemo(() => {
    switch (localFilters.area) {
      case "Mantención":
        return subareaMaintenance;
      case "Nutrición":
        return subareaNutrition;
      case "Apoyo Espiritual":
        return subareaSpiritual;
      case "Limpieza de Habitación":
        return subareaCleaning;
      case "Asistencia Social":
        return subareaSocial;
      default:
        return [];
    }
  }, [localFilters.area]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...localFilters, [name]: value };
    if (name === "area") updated.subarea = "";
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="filters-container">
      <select name="area" value={localFilters.area} onChange={handleChange}>
        <option value="">Todas las áreas</option>
        <option value="Nutrición">Nutrición</option>
        <option value="Mantención">Mantención</option>
        <option value="Asistencia Social">Asistencia Social</option>
        <option value="Limpieza de Habitación">Limpieza de Habitación</option>
        <option value="Apoyo Espiritual">Apoyo Espiritual</option>
      </select>

      <select
        name="subarea"
        value={localFilters.subarea}
        onChange={handleChange}
        disabled={!localFilters.area}
      >
        <option value="">Todas las subáreas</option>
        {availableSubareas.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      <select name="status" value={localFilters.status} onChange={handleChange}>
        <option value="">Todos los estados</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En Proceso">En Proceso</option>
        <option value="Completado">Completado</option>
      </select>

      <label>
        Desde:
        <input
          type="date"
          name="startDate"
          value={localFilters.startDate}
          onChange={handleChange}
        />
      </label>

      <label>
        Hasta:
        <input
          type="date"
          name="endDate"
          value={localFilters.endDate}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
