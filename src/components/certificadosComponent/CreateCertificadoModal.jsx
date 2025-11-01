import { ModalComponent } from '../../components/utils/ModalComponent';
import React from "react";
import { useCertificados } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
export const CreateCertificadoModal = ({ show, handleClose, perfilId }) => {
  const { crearCertificado } = useCertificados();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      await crearCertificado(perfilId, { ...data, perfilEstudianteId: perfilId });
      reset();
      handleClose();
    } catch (err) {
      console.error("Error al crear certificado:", err);
    }
  };

  return (
    <ModalComponent
      show={show}
      title="📜 Crear Certificado"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      submitText="Crear"
    >
      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre</label>
        <input
          className={`form-control rounded-3 ${
            errors.nombre ? "is-invalid" : ""
          }`}
          placeholder="Ej: Certificado en React"
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {errors.nombre && (
          <div className="invalid-feedback">{errors.nombre.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Institución</label>
        <input
          className={`form-control rounded-3 ${
            errors.institucion ? "is-invalid" : ""
          }`}
          placeholder="Ej: Universidad Nacional"
          {...register("institucion", { required: "La institución es obligatoria" })}
        />
        {errors.institucion && (
          <div className="invalid-feedback">{errors.institucion.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Fecha</label>
        <input
          type="date"
          className={`form-control rounded-3 ${
            errors.fecha ? "is-invalid" : ""
          }`}
          {...register("fecha", { required: "La fecha es obligatoria" })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">URL del archivo</label>
        <input
          className="form-control rounded-3"
          placeholder="https://drive.google.com/..."
          {...register("urlArchivo")}
        />
      </div>
    </ModalComponent>
  );
};
