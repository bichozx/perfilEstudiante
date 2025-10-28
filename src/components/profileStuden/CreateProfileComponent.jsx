import React from "react";

export const CreateProfileComponent = ({
  handleSubmit,
  handleChange,
  formData,
  loading,
}) => {
  return (
    <div className='container-fluid'>
    <div
      className="row d-flex justify-content-center align-items-start py-4 w-100"
      
    >
      <div
        className="col-12 col-md-8 card p-4 p-md-5 rounded-4 shadow w-100"
        style={{
          maxWidth: "800px",
          backgroundColor: "#f8f9fa", // gris muy claro
          borderLeft: "6px solid #003366", // azul universitario
        }}
      >
        <h2
          className="mb-4"
          style={{ color: "#003366", fontFamily: "Playfair Display, serif" }}
        >
          Crear Perfil Estudiantil
        </h2>

        <form onSubmit={handleSubmit}>
          {["resumen", "intereses", "experiencia"].map((field) => (
            <div className="mb-4" key={field}>
              <label htmlFor={field} className="form-label fw-semibold text-dark">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <textarea
                id={field}
                className="form-control"
                rows={field === "intereses" ? 2 : 3}
                value={formData[field] || ""}
                onChange={handleChange}
                name={field}
                style={{ borderColor: "#003366" }}
              />
            </div>
          ))}

          {["programa", "semestre"].map((field) => (
            <div className="mb-4" key={field}>
              <label htmlFor={field} className="form-label fw-semibold text-dark">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                className="form-control"
                value={formData[field] || ""}
                onChange={handleChange}
                name={field}
                style={{ borderColor: "#003366" }}
              />
            </div>
          ))}

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#003366",
              color: "#fff",
              fontWeight: "600",
              padding: "10px",
            }}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Perfil"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};
