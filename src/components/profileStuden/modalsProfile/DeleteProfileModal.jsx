import { ModalComponent } from "../../utils/ModalComponent";
// src/components/profileStuden/modalsProfile/DeleteProfileModal.jsx
import React from "react";

export const DeleteProfileModal = ({ show, handleClose, handleDelete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete();
  };

  return (
    <ModalComponent
      show={show}
      title="⚠️ Confirmar Eliminación"
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText="Eliminar Perfil"
      isSubmitting={false}
      submitVariant="danger"
    >
      <div className="text-center px-2">
        <p className="fw-semibold text-dark mb-3">
          ¿Estás seguro de que deseas{" "}
          <span className="text-danger">eliminar tu perfil de estudiante</span>?
        </p>
        <p className="text-muted small">
          Esta acción no se puede deshacer y se eliminarán tus proyectos,
          certificados y demás información asociada.
        </p>
      </div>
    </ModalComponent>
  );
};
