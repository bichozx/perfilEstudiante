import React, { useState } from "react";

import { CreateCertificadoModal } from "../certificadosComponent/CreateCertificadoModal";
import { CreateHabilidadModal } from "../habilidadComponent/CreateHabilidadModal";
import { CreateProjectModal } from "../projects/modalProject/CreateProjectModal";
import { DeleteProfileModal } from "./modalsProfile/DeleteProfileModal";
import { EditProfileModal } from "./modalsProfile/EditProfileModal";
import { useProfileStudent } from "../../hooks/useAuth";

export const PerfilEstudiante = ({ profile,  }) => {
  console.log("🚀 ~ PerfilEstudiante ~ profile:", profile);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [showHabilidad, setShowHabilidad] = useState(false);

  const [profileImage, setProfileImage] = useState(
    profile?.foto ||
      "https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
  );
  const [imageInfo, setImageInfo] = useState(null);

  const { deleteProfile, updateProfile } = useProfileStudent();

  // 📸 Manejar carga de imagen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSizeMB = 1;
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > maxSizeMB) {
      alert("El archivo es demasiado grande. Máximo 1 MB permitido.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target.result);
      const img = new Image();
      img.onload = () => {
        setImageInfo({
          width: img.width,
          height: img.height,
          sizeKB: Math.round(file.size / 1024),
          name: file.name,
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="container py-4">
        <div
          className="card shadow-lg rounded-4 p-4"
          style={{
            backgroundColor: "#f8f9fa",
            borderLeft: "6px solid #003366",
            fontFamily: "Source Sans Pro, sans-serif",
          }}
        >
          {/* Encabezado */}
          <div className="d-flex align-items-center mb-4">
            <div className="position-relative me-3">
              <img
                src={profileImage}
                alt="Perfil"
                className="rounded-circle border border-2 border-primary"
                width="100"
                height="100"
                style={{ objectFit: "cover" }}
              />
              <label
                htmlFor="upload-photo"
                className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle"
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i className="fas fa-camera"></i>
              </label>
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                className="d-none"
                onChange={handleImageUpload}
              />
            </div>

            <div>
              <h3
                className="fw-bold mb-1"
                style={{ color: "#003366", fontFamily: "Playfair Display, serif" }}
              >
                Mi Perfil
              </h3>
              <p className="text-secondary mb-0" style={{ fontFamily: "Lora, serif" }}>
                Información personal del estudiante
              </p>
            </div>
          </div>

          {/* Info de imagen */}
          {imageInfo && (
            <div className="alert alert-info p-2 mb-3">
              <small>
                <strong>Imagen:</strong> {imageInfo.name} |{" "}
                {imageInfo.width}x{imageInfo.height}px | {imageInfo.sizeKB} KB
              </small>
            </div>
          )}

          {/* Información principal */}
          <div className="row mt-3">
            {[
              { label: "ID Estudiante", value: profile.estudianteId },
              { label: "Nombre", value: profile.nombre },
              { label: "Experiencia", value: profile.experiencia },
              { label: "Intereses", value: profile.intereses },
              { label: "Resumen", value: profile.resumen },
              { label: "Rol", value: profile.rol || "Estudiante" },
              { label: "Estado", value: profile.estado || "Activo" },
            ].map(
              (item, idx) =>
                item.value && (
                  <div className="col-md-6 mb-3" key={idx}>
                    <strong className="text-dark">{item.label}:</strong>
                    <p className="mb-0">{item.value}</p>
                  </div>
                )
            )}
          </div>

          {/* 🔹 Listas de relaciones */}
          <div className="mt-4">
            {profile.proyectos?.length > 0 && (
              <div className="mb-3">
                <h5 className="text-primary fw-bold">Proyectos</h5>
                <ul className="list-group list-group-flush">
                  {profile.proyectos.map((p) => (
                    <li key={p.id} className="list-group-item">
                      <strong>{p.nombre}</strong> — {p.descripcion || "Sin descripción"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.certificados?.length > 0 && (
              <div className="mb-3">
                <h5 className="text-primary fw-bold">Certificados</h5>
                <ul className="list-group list-group-flush">
                  {profile.certificados.map((c) => (
                    <li key={c.id} className="list-group-item">
                      <strong>{c.nombre}</strong> — {c.institucion || "No especificado"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.habilidades?.length > 0 && (
              <div className="mb-3">
                <h5 className="text-primary fw-bold">Habilidades</h5>
                <ul className="list-group list-group-flush">
                  {profile.habilidades.map((h) => (
                    <li key={h.id} className="list-group-item">
                      <strong>{h.nombre}</strong> — Nivel: {h.nivel || "No indicado"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="d-flex flex-wrap gap-2 mt-4">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setShowEdit(true)}
            >
              <i className="fas fa-edit me-1"></i> Editar
            </button>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => setShowDelete(true)}
            >
              <i className="fas fa-trash me-1"></i> Eliminar
            </button>

            {/* <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleView(profile)}
            >
              <i className="fas fa-eye me-1"></i> Ver
            </button> */}

            <button
              className="btn btn-sm btn-success"
              onClick={() => setShowProject(true)}
            >
              <i className="fas fa-plus me-1"></i> Crear Proyecto
            </button>

            <button
              className="btn btn-sm btn-success"
              onClick={() => setShowCertificado(true)}
            >
              <i className="fas fa-plus me-1"></i> Crear Certificado
            </button>

            <button
              className="btn btn-sm btn-success"
              onClick={() => setShowHabilidad(true)}
            >
              <i className="fas fa-plus me-1"></i> Crear Habilidad
            </button>
          </div>
        </div>
      </div>

      {/* Modales */}
      <EditProfileModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        profile={profile}
        updateProfile={updateProfile}
      />

      <DeleteProfileModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        handleDelete={async () => {
          try {
            await deleteProfile(profile.id);
            setShowDelete(false);
          } catch (err) {
            console.error(err);
            alert("Error al eliminar el perfil");
          }
        }}
      />

      <CreateProjectModal
        show={showProject}
        handleClose={() => setShowProject(false)}
        profile={profile}
      />

      <CreateCertificadoModal
        show={showCertificado}
        handleClose={() => setShowCertificado(false)}
        perfilId={profile.id}
      />

      <CreateHabilidadModal
        show={showHabilidad}
        handleClose={() => setShowHabilidad(false)}
        perfilId={profile.id}
      />
    </>
  );
};

