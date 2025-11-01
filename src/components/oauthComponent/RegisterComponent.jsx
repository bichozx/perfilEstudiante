import Input from '../utils/Input';
import React from 'react';
import Spinner from '../utils/Spinner';

export const RegisterComponent = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  isSubmitting,
}) => {
  const programas = [
    'Ingeniería de Software',
    'Administración de Empresas',
    'Derecho',
    'Psicología',
    'Diseño Gráfico',
    'Medicina',
    'Arquitectura',
    'Contaduría Pública',
    'Comunicación Social',
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(0, 40, 85, 0.85), rgba(0, 20, 60, 0.9)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="card shadow-lg p-4 position-relative animate__animated animate__fadeInUp"
        style={{
          maxWidth: '800px',
          width: '100%',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          color: '#fff',
        }}
      >
        {/* Encabezado */}
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Logo Universidad"
            width="85"
            className="mb-3"
          />
          <h3 className="fw-bold text-warning">Registro de Estudiante</h3>
          <p className="text-light small mb-0">
            Crea tu cuenta para acceder al portal académico universitario
          </p>
        </div>

        {/* Formulario */}
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

            {/* Selector de programa */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-light">
                Programa académico
              </label>
              <select
                className={`form-select ${errors.programa ? 'is-invalid' : ''}`}
                {...register('programa')}
              >
                <option value="">Selecciona tu programa</option>
                {programas.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
              {errors.programa && (
                <div className="invalid-feedback">
                  {errors.programa?.message}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <Input
                label="Semestre actual"
                name="semestre"
                type="number"
                min="1"
                max="12"
                placeholder="Ej: 5"
                register={register}
                error={errors.semestre?.message}
              />
            </div>

            <div className="col-md-6">
              <Input
                label="Promedio general"
                name="promedio"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Ej: 4.3"
                register={(name, options) =>
                  register(name, { valueAsNumber: true, ...options })
                }
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

          {/* Botón */}
          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-warning btn-lg fw-semibold text-dark shadow-sm"
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                border: 'none',
                letterSpacing: '0.5px',
              }}
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

        {/* Overlay con spinner */}
        {isSubmitting && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
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
