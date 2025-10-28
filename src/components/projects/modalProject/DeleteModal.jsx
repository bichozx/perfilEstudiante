import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

export const DeleteProjectModal = ({ show, handleClose, onDelete, project }) => {
  
  if (!show) return null; // importante: renderiza solo si show=true

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border border-primary">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Eliminar Proyecto</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              ¿Estás seguro de que deseas eliminar el proyecto{" "}
              <strong>{project?.titulo}</strong>?
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (project?.id) onDelete(project);
                handleClose();
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
