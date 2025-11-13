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
    <div>
      <h2 className="filters-title">Filtros</h2>
      <div className="filters-row">
        <label>Área
        <select name="area" value={localFilters.area} onChange={handleChange}>
          <option value="">Todas</option>
          <option value="Nutrición">Nutrición</option>
          <option value="Mantención">Mantención</option>
          <option value="Asistencia Social">Asistencia Social</option>
          <option value="Limpieza de Habitación">Limpieza de Habitación</option>
          <option value="Apoyo Espiritual">Apoyo Espiritual</option>
        </select>
        </label>

        <label>Subárea
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

        <label>Estado
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

      <div className="filters-row filters-dates">
        <label>Inicio
          <input
            type="date"
            name="startDate"
            value={localFilters.startDate}
            onChange={handleChange}
          />
        </label>

        <label>Término
          <input
            type="date"
            name="endDate"
            value={localFilters.endDate}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}
