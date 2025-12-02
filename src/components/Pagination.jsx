export function Pagination({ pagination, onPageChange }) {
  if (!pagination) return null;

  const { page, totalPages } = pagination;

  const handleClick = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div className="pagination-container">
      <button disabled={page <= 1} onClick={() => handleClick(page - 1)}>
        ← Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => handleClick(page + 1)}
      >
        Siguiente →
      </button>
    </div>
  );
}
