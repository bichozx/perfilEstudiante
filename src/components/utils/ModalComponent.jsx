import { Modal } from "react-bootstrap";
import React from "react";

export const ModalComponent = ({
    show,
  title,
  onClose,
  onSubmit,
  children,
  isSubmitting,
  submitText = "Guardar",
}) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-flex align-items-center justify-content-center"
      tabIndex="-1"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(6px)",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "600px" }}
      >
        <div
          className="modal-content shadow-lg border-0 rounded-4 text-dark animate__animated animate__fadeInDown"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* === HEADER === */}
          <div
            className="modal-header border-0 rounded-top-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,123,255,0.85), rgba(0,89,178,0.85))",
              color: "#fff",
            }}
          >
            <h5 className="modal-title fw-bold">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          {/* === BODY === */}
          <form onSubmit={onSubmit}>
            <div className="modal-body px-4 py-3">{children}</div>

            {/* === FOOTER === */}
            <div className="modal-footer border-0 d-flex justify-content-between px-4 pb-4">
              <button
                type="button"
                className="btn btn-outline-light text-dark px-4 rounded-3"
                style={{
                  background: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(8px)",
                }}
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4 rounded-3 shadow-sm"
                disabled={isSubmitting}
                style={{
                  background: "linear-gradient(135deg, #007bff, #0056b3)",
                  border: "none",
                }}
              >
                {isSubmitting ? "Guardando..." : submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};