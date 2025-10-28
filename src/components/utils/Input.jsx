export default function Input({ label, register, name, type = 'text', placeholder, required, error }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        className="form-control"
        {...register(name)}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="text-danger small">{error}</p>}
    </div>
  );
}


