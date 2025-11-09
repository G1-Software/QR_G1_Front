import { useState } from "react";

export function RequestTable({ requests, onUpdateStatus }) {
  const [updatingId, setUpdatingId] = useState(null);

  if (!requests || requests.length === 0) {
    return <p>No hay solicitudes registradas.</p>;
  }

  const handleClick = async (id, status) => {
    setUpdatingId(id);
    await onUpdateStatus(id, status);
    setUpdatingId(null);
  };

  return (
    <div className="table-container">
      <table className="request-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Área</th>
            <th>Subárea</th>
            <th>Descripción</th>
            <th>Solicitante</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Creada</th>
            <th>Actualizada</th>
            <th>Acciones</th>
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
              <td>{req.status}</td>
              <td>{new Date(req.created_at).toLocaleString()}</td>
              <td>{new Date(req.updated_at).toLocaleString()}</td>
              <td className="actions">
                <button
                  onClick={() => handleClick(req.id, "Pendiente")}
                  disabled={updatingId === req.id}
                >
                  <span className="material-symbols-outlined">
                    pending_actions
                  </span>
                </button>
                <button
                  onClick={() => handleClick(req.id, "En Proceso")}
                  disabled={updatingId === req.id}
                >
                  <span className="material-symbols-outlined">
                    manufacturing
                  </span>
                </button>
                <button
                  onClick={() => handleClick(req.id, "Completado")}
                  disabled={updatingId === req.id}
                >
                  <span className="material-symbols-outlined">check</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
