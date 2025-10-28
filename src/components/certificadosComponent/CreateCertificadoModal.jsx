import React from "react";
import { useCertificados } from '../../hooks/useAuth';
import { useForm } from "react-hook-form";

export const CreateCertificadoModal = ({ show, handleClose, perfilId }) => {
  const { crearCertificado } = useCertificados();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await crearCertificado(perfilId, {
        ...data,
        perfilEstudianteId: perfilId,
        fecha: data.fecha, // Asegúrate de que sea tipo string en formato YYYY-MM-DD
      });
      reset();
      handleClose();
    } catch (err) {
      console.error("Error al crear certificado:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border border-primary">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Crear Certificado</h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                  {...register("nombre", { required: "Nombre es obligatorio", minLength: 3 })}
                />
                <div className="invalid-feedback">{errors.nombre?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Institución</label>
                <input
                  type="text"
                  className={`form-control ${errors.institucion ? "is-invalid" : ""}`}
                  {...register("institucion", { required: "Institución es obligatoria", minLength: 3 })}
                />
                <div className="invalid-feedback">{errors.institucion?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
                  {...register("fecha", { required: "Fecha es obligatoria" })}
                />
                <div className="invalid-feedback">{errors.fecha?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">URL Archivo</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("urlArchivo")}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
