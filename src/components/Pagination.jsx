export function Pagination({ pagination, onPageChange }) {
  if (!pagination) return null;

  const { page, totalPages } = pagination;

  return (
    <div className="pagination-container">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        ← Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente →
      </button>
    </div>
  );
}
