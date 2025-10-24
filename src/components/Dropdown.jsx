export function Dropdown({ label, options, value, onChange, disabled = false }) {
  return (
    <div className="form-field-container">
      <label className="form-field-label">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required
        className="form-field-input"
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
