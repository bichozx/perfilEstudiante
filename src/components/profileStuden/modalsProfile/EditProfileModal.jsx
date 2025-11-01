import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export const EditProfileModal = ({ show, handleClose, profile, updateProfile }) => {
  const [formData, setFormData] = useState({
    resumen: "",
    intereses: "",
    experiencia: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({
        resumen: profile.resumen || "",
        intereses: profile.intereses || "",
        experiencia: profile.experiencia || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await updateProfile(profile.id, formData);
      handleClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Error al actualizar el perfil. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-flex align-items-center justify-content-center"
      tabIndex="-1"
      style={{
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(6px)",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered animate__animated animate__fadeInDown"
        style={{ maxWidth: "650px" }}
      >
        <div
          className="modal-content border-0 rounded-4 shadow-lg position-relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          {/* === EFECTO SHINE === */}
          <div
            className="shine-effect"
            style={{
              position: "absolute",
              top: 0,
              left: "-75%",
              width: "50%",
              height: "100%",
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 100%)",
              transform: "skewX(-25deg)",
              animation: "shine 3s infinite",
            }}
          />

          {/* === HEADER === */}
          <div
            className="modal-header border-0 rounded-top-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,123,255,0.9), rgba(0,89,178,0.9))",
              color: "#fff",
            }}
          >
            <h5 className="modal-title fw-bold">🧩 Editar Perfil</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
            ></button>
          </div>

          {/* === BODY === */}
          <Modal.Body className="px-4 py-3">
            {errorMsg && (
              <p className="text-danger text-center fw-semibold mb-3">
                {errorMsg}
              </p>
            )}
            <Form onSubmit={handleSubmit}>
              {["resumen", "intereses", "experiencia"].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label
                    className="fw-semibold"
                    style={{ color: "#003366" }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={field === "resumen" ? 3 : 2}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Escribe tu ${field}`}
                    className="rounded-3"
                    style={{
                      border: "1px solid rgba(0,123,255,0.4)",
                      background: "rgba(255,255,255,0.6)",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 8px rgba(0,123,255,0.4)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </Form.Group>
              ))}

              {/* === FOOTER === */}
              <div className="d-flex justify-content-between mt-4">
                <Button
                  type="button"
                  onClick={handleClose}
                  className="px-4 rounded-3"
                  style={{
                    background: "rgba(255,255,255,0.3)",
                    color: "#003366",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-4 rounded-3 shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #007bff, #0056b3)",
                    border: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,123,255,0.4)",
                  }}
                >
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </div>

      {/* === ANIMACIÓN SHINE === */}
      <style>
        {`
          @keyframes shine {
            0% { left: -75%; }
            50% { left: 125%; }
            100% { left: 125%; }
          }
        `}
      </style>
    </div>
  );
};
