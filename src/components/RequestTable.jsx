import { useState } from "react";

export function RequestTable({ requests, onUpdateStatus }) {
  const [updatingId, setUpdatingId] = useState(null);

  if (!requests || requests.length === 0) {
    return <p>No hay solicitudes registradas.</p>;
  }

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    await onUpdateStatus(id, newStatus);
    setUpdatingId(null);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Área</th>
            <th>Subárea</th>
            <th>Descripción</th>
            <th>Nombre del Solicitante</th>
            <th>Correo Electrónico del Solicitante</th>
            <th>Institución</th>
            <th>Edificio</th>
            <th>Piso</th>
            <th>Servicio</th>
            <th>Habitación</th>
            <th>Cama</th>
            <th>Estado</th>
            <th>Creación</th>
            <th>Última Actualización</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.area}</td>
              <td>{req.subarea}</td>
              <td>{req.description}</td>
              <td>{req.requester_full_name}</td>
              <td>{req.requester_email}</td>

              <td>{req.institution || "-"}</td>
              <td>{req.building || "-"}</td>
              <td>{req.floor ?? "-"}</td>
              <td>{req.service || "-"}</td>
              <td>{req.room ?? "-"}</td>
              <td>{req.bed ?? "-"}</td>

              <td>
                <select
                  value={req.status}
                  onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  disabled={updatingId === req.id}
                  className={`status-select ${req.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Completado">Completado</option>
                </select>
              </td>

              <td>{new Date(req.created_at).toLocaleString()}</td>
              <td>{new Date(req.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
