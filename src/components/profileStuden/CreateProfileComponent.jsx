// // import React from "react";

// // export const CreateProfileComponent = ({
// //   handleSubmit,
// //   handleChange,
// //   formData,
// //   loading,
// // }) => {
// //   return (
// //     <div className="container py-4">
// //       <div className="card shadow-lg rounded-4 p-4 bg-light">
// //         <h2 className="fw-bold text-primary mb-4">Crear Perfil Estudiantil</h2>

// //         <form onSubmit={handleSubmit}>
// //           {/* Resumen */}
// //           <div className="mb-3">
// //             <label htmlFor="resumen" className="form-label">
// //               Resumen
// //             </label>
// //             <textarea
// //               id="resumen"
// //               className="form-control"
// //               rows="3"
// //               value={formData.resumen || ""}
// //               onChange={handleChange}
// //               name="resumen"
// //             />
// //           </div>

// //           {/* Intereses */}
// //           <div className="mb-3">
// //             <label htmlFor="intereses" className="form-label">
// //               Intereses
// //             </label>
// //             <textarea
// //               id="intereses"
// //               className="form-control"
// //               rows="2"
// //               value={formData.intereses || ""}
// //               onChange={handleChange}
// //               name="intereses"
// //             />
// //           </div>

// //           {/* Experiencia */}
// //           <div className="mb-3">
// //             <label htmlFor="experiencia" className="form-label">
// //               Experiencia
// //             </label>
// //             <textarea
// //               id="experiencia"
// //               className="form-control"
// //               rows="3"
// //               value={formData.experiencia || ""}
// //               onChange={handleChange}
// //               name="experiencia"
// //             />
// //           </div>

// //           {/* Programa */}
// //           <div className="mb-3">
// //             <label htmlFor="programa" className="form-label">
// //               Programa
// //             </label>
// //             <input
// //               type="text"
// //               id="programa"
// //               className="form-control"
// //               value={formData.programa || ""}
// //               onChange={handleChange}
// //               name="programa"
// //             />
// //           </div>

// //           {/* Semestre */}
// //           <div className="mb-3">
// //             <label htmlFor="semestre" className="form-label">
// //               Semestre
// //             </label>
// //             <input
// //               type="text"
// //               id="semestre"
// //               className="form-control"
// //               value={formData.semestre || ""}
// //               onChange={handleChange}
// //               name="semestre"
// //             />
// //           </div>

// //           {/* Botón */}
// //           <button
// //             type="submit"
// //             className="btn btn-primary w-100"
// //             disabled={loading}
// //           >
// //             {loading ? "Creando..." : "Crear Perfil"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// import React from "react";

// export const CreateProfileComponent = ({
//   handleSubmit,
//   handleChange,
//   formData,
//   loading,
// }) => {
//   return (
//     <div className="container py-5" style={{ maxWidth: "800px" }}>
//       <div
//         className="card p-5 rounded-4 shadow"
//         style={{
//           backgroundColor: "#f8f9fa", // gris muy claro
//           borderLeft: "6px solid #003366", // azul universitario
//         }}
//       >
//         <h2 className="mb-4" style={{ color: "#003366", fontFamily: "Playfair Display, serif" }}>
//           Crear Perfil Estudiantil
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* Resumen */}
//           <div className="mb-4">
//             <label htmlFor="resumen" className="form-label fw-semibold">
//               Resumen
//             </label>
//             <textarea
//               id="resumen"
//               className="form-control"
//               rows="3"
//               value={formData.resumen || ""}
//               onChange={handleChange}
//               name="resumen"
//               style={{ borderColor: "#003366" }}
//             />
//           </div>

//           {/* Intereses */}
//           <div className="mb-4">
//             <label htmlFor="intereses" className="form-label fw-semibold">
//               Intereses
//             </label>
//             <textarea
//               id="intereses"
//               className="form-control"
//               rows="2"
//               value={formData.intereses || ""}
//               onChange={handleChange}
//               name="intereses"
//               style={{ borderColor: "#003366" }}
//             />
//           </div>

//           {/* Experiencia */}
//           <div className="mb-4">
//             <label htmlFor="experiencia" className="form-label fw-semibold">
//               Experiencia
//             </label>
//             <textarea
//               id="experiencia"
//               className="form-control"
//               rows="3"
//               value={formData.experiencia || ""}
//               onChange={handleChange}
//               name="experiencia"
//               style={{ borderColor: "#003366" }}
//             />
//           </div>

//           {/* Programa */}
//           <div className="mb-4">
//             <label htmlFor="programa" className="form-label fw-semibold">
//               Programa
//             </label>
//             <input
//               type="text"
//               id="programa"
//               className="form-control"
//               value={formData.programa || ""}
//               onChange={handleChange}
//               name="programa"
//               style={{ borderColor: "#003366" }}
//             />
//           </div>

//           {/* Semestre */}
//           <div className="mb-4">
//             <label htmlFor="semestre" className="form-label fw-semibold">
//               Semestre
//             </label>
//             <input
//               type="text"
//               id="semestre"
//               className="form-control"
//               value={formData.semestre || ""}
//               onChange={handleChange}
//               name="semestre"
//               style={{ borderColor: "#003366" }}
//             />
//           </div>

//           {/* Botón */}
//           <button
//             type="submit"
//             className="btn w-100"
//             style={{
//               backgroundColor: "#003366",
//               color: "#fff",
//               fontWeight: "600",
//               padding: "10px",
//             }}
//             disabled={loading}
//           >
//             {loading ? "Creando..." : "Crear Perfil"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

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
