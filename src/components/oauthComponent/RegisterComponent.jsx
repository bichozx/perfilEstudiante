// src/components/oauthComponent/RegisterComponent.jsx
import Input from "../utils/Input";
import React from "react";
import Spinner from "../utils/Spinner";

export const RegisterComponent = ({
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
        className="card shadow-lg p-4 position-relative animate__animated animate__fadeInUp"
        style={{
          maxWidth: "750px",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.97)",
          borderTop: "6px solid #FFD700",
          zIndex: 2,
        }}
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Logo Universidad"
            width="80"
            className="mb-3"
          />
          <h3 className="fw-bold text-primary">Registro de Estudiante</h3>
          <p className="text-muted small">
            Crea tu cuenta para acceder al portal académico universitario
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-md-6">
              <Input
                label="Nombre completo"
                name="nombre"
                placeholder="Ej: Juan Pérez"
                register={register}
                error={errors.nombre?.message}
              />
            </div>

            <div className="col-md-6">
              <Input
                label="Correo institucional"
                name="correo"
                type="email"
                placeholder="tu@universidad.edu.co"
                register={register}
                error={errors.correo?.message}
              />
            </div>

            <div className="col-md-6">
              <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder="********"
                register={register}
                error={errors.password?.message}
              />
            </div>

            <div className="col-md-6">
              <Input
                label="Programa académico"
                name="programa"
                placeholder="Ej: Ingeniería de Software"
                register={register}
                error={errors.programa?.message}
              />
            </div>

            <div className="col-md-6">
              <Input
                label="Semestre actual"
                name="semestre"
                placeholder="Ej: 5"
                register={register}
                error={errors.semestre?.message}
              />
            </div>

            <div className="col-md-6">
              <Input
                label="Promedio"
                name="promedio"
                type="number"
                step="0.1"
                placeholder="Ej: 4.5"
                register={register}
                error={errors.promedio?.message}
              />
            </div>

            <div className="col-md-12">
              <Input
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                type="date"
                register={register}
                error={errors.fechaNacimiento?.message}
              />
            </div>
          </div>

          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg fw-semibold"
              disabled={isSubmitting}
              style={{ backgroundColor: "#002855", border: "none" }}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin me-2"></i> Registrando...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus me-2"></i> Registrar
                </>
              )}
            </button>
          </div>
        </form>

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
