export function Input({ label, type = "text", value, onChange, textarea = false }) {
  return (
    <div className="form-field-container">
      <label className="form-field-label">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="form-field-input textarea"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="form-field-input"
        />
      )}
    </div>
  );
}
