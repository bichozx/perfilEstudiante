import React from "react";

export const CreateProfileComponent = ({
  handleSubmit,
  handleChange,
  formData,
  loading,
}) => {
  const programas = [
    "Ingeniería de Sistemas",
    "Ingeniería Industrial",
    "Administración de Empresas",
    "Contaduría Pública",
    "Derecho",
    "Psicología",
    "Diseño Gráfico",
    "Medicina",
    "Comunicación Social",
    "Educación Infantil",
  ];

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="create-profile-card rounded-4 p-5 shadow-lg">
        <h2 className="text-center mb-4 create-profile-title">
          <i className="bi bi-person-badge-fill text-warning me-2"></i>
          Crear Perfil Estudiantil
        </h2>

        <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn">
          {/* === Información general === */}
          <div className="mb-4">
            <h5 className="fw-semibold text-warning mb-3 text-uppercase">
              Información general
            </h5>

            {/* Resumen */}
            <div className="mb-3">
              <label htmlFor="resumen" className="form-label text-light fw-semibold">
                Resumen personal
              </label>
              <textarea
                id="resumen"
                name="resumen"
                className="form-control glass-input"
                rows="3"
                placeholder="Describe quién eres, tus fortalezas o intereses académicos."
                value={formData.resumen}
                onChange={handleChange}
              />
            </div>

            {/* Intereses */}
            <div className="mb-3">
              <label htmlFor="intereses" className="form-label text-light fw-semibold">
                Habilidades o intereses
              </label>
              <textarea
                id="intereses"
                name="intereses"
                className="form-control glass-input"
                rows="2"
                placeholder="Ejemplo: programación, liderazgo, comunicación, diseño..."
                value={formData.intereses}
                onChange={handleChange}
              />
            </div>

            {/* Experiencia */}
            <div className="mb-3">
              <label htmlFor="experiencia" className="form-label text-light fw-semibold">
                Experiencia o proyectos académicos
              </label>
              <textarea
                id="experiencia"
                name="experiencia"
                className="form-control glass-input"
                rows="3"
                placeholder="Ejemplo: proyectos universitarios, voluntariados, monitorías, etc."
                value={formData.experiencia}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* === Información académica === */}
          <div className="mb-4">
            <h5 className="fw-semibold text-warning mb-3 text-uppercase">
              Información académica
            </h5>

            {/* Programa */}
            <div className="mb-3">
              <label htmlFor="programa" className="form-label text-light fw-semibold">
                Programa académico
              </label>
              <select
                id="programa"
                name="programa"
                className="form-select glass-input"
                value={formData.programa || ""}
                onChange={handleChange}
              >
                <option value="">Selecciona tu programa</option>
                {programas.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            {/* Semestre */}
            <div className="mb-3">
              <label htmlFor="semestre" className="form-label text-light fw-semibold">
                Semestre actual
              </label>
              <input
                type="number"
                id="semestre"
                name="semestre"
                className="form-control glass-input"
                placeholder="Ejemplo: 3, 5, 8..."
                value={formData.semestre}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* === Botón === */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn-gold-glow fw-semibold py-2"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Perfil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
