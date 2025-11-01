
export default function Input({
  label,
  name,
  type = "text",
  register,
  error,
  ...rest
}) {
  const registerOptions =
    type === "number"
      ? { valueAsNumber: true } // convierte el string a número
      : {};

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        {...register(name, registerOptions)}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
