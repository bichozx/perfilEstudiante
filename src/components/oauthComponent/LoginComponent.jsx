// // src/components/oauthComponent/LoginComponent.jsx
// import Input from "../utils/Input";
// import React from "react";
// import Spinner from "../utils/Spinner";

// export const LoginComponent = ({
//   onSubmit,
//   handleSubmit,
//   register,
//   errors,
//   isSubmitting,
//   //toast,
// }) => {
//   return (
//     <div
//       className="d-flex justify-content-center align-items-center min-vh-100"
//       style={{
//         background:
//           "linear-gradient(135deg, #002855 0%, #004080 50%, #0059b3 100%)",
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay semitransparente */}
//       <div
//         className="position-absolute top-0 start-0 w-100 h-100"
//         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//       ></div>

//       <div
//         className="card p-4 shadow-lg position-relative"
//         style={{
//           width: "400px",
//           zIndex: 2,
//           backgroundColor: "rgba(255, 255, 255, 0.95)",
//           borderRadius: "15px",
//         }}
//       >
//         <div className="text-center mb-4">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
//             alt="Logo universidad"
//             width="70"
//             className="mb-3"
//           />
//           <h4 className="fw-bold text-primary">Iniciar Sesión</h4>
//           <p className="text-muted small">
//             Bienvenido al portal académico universitario
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Input
//             label="Correo institucional"
//             name="correo"
//             type="email"
//             placeholder="usuario@universidad.edu.co"
//             register={register}
//             error={errors.correo?.message}
//           />

//           <Input
//             label="Contraseña"
//             name="password"
//             type="password"
//             placeholder="********"
//             register={register}
//             error={errors.password?.message}
//           />

//           <div className="d-grid mt-4">
//             <button
//               className="btn btn-primary btn-lg fw-semibold"
//               type="submit"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <i className="fas fa-spinner fa-spin me-2"></i> Ingresando...
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-sign-in-alt me-2"></i> Ingresar
//                 </>
//               )}
//             </button>
//           </div>
//         </form>

//         <div className="text-center mt-3">
//           <a href="/register" className="text-decoration-none text-primary">
//             ¿No tienes cuenta? <strong>Regístrate aquí</strong>
//           </a>
//         </div>

//         {/* Spinner en pantalla completa cuando isSubmitting */}
//         {isSubmitting && (
//           <div
//             className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//             style={{
//               backgroundColor: "rgba(255, 255, 255, 0.8)",
//               borderRadius: "15px",
//               zIndex: 3,
//             }}
//           >
//             <Spinner />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// src/components/oauthComponent/LoginComponent.jsx
import Input from "../utils/Input";
import React from "react";
import Spinner from "../utils/Spinner";

export const LoginComponent = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  isSubmitting,
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 40, 85, 0.85), rgba(0, 40, 85, 0.85)), url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 shadow-lg position-relative animate__animated animate__fadeInDown"
        style={{
          width: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.97)",
          borderRadius: "15px",
          borderTop: "6px solid #FFD700",
          zIndex: 2,
        }}
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Logo universidad"
            width="70"
            className="mb-3"
          />
          <h3 className="fw-bold text-primary">Portal Universitario</h3>
          <p className="text-muted small">
            Inicia sesión con tu cuenta institucional
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Correo institucional"
            name="correo"
            type="email"
            placeholder="usuario@universidad.edu.co"
            register={register}
            error={errors.correo?.message}
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            placeholder="********"
            register={register}
            error={errors.password?.message}
          />

          <div className="d-grid mt-4">
            <button
              className="btn btn-primary btn-lg fw-semibold"
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: "#002855", border: "none" }}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin me-2"></i> Ingresando...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i> Ingresar
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <a
            href="/register"
            className="text-decoration-none fw-semibold"
            style={{ color: "#002855" }}
          >
            ¿No tienes cuenta? <span className="text-warning">Regístrate aquí</span>
          </a>
        </div>

        {isSubmitting && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "15px",
              zIndex: 3,
            }}
          >
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

