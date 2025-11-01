import React, { useRef, useState } from "react";
import { useAuth, useProfileStudent } from "../../hooks/useAuth";

import { CreateCertificadoModal } from "../certificadosComponent/CreateCertificadoModal";
import { CreateHabilidadModal } from "../habilidadComponent/CreateHabilidadModal";
import { CreateProjectModal } from "../projects/modalProject/CreateProjectModal";
import { DeleteProfileModal } from "./modalsProfile/DeleteProfileModal";
import { EditProfileModal } from "./modalsProfile/EditProfileModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PerfilEstudiante = ({ profile }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [showHabilidad, setShowHabilidad] = useState(false);

  const { deleteProfile, updateProfile } = useProfileStudent();
  const { logout } = useAuth();

  const [profileImage, setProfileImage] = useState(() => {
    const saved = localStorage.getItem("profileImage");
    return (
      saved ||
      profile?.foto ||
      "https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
    );
  });

  const [imageInfo, setImageInfo] = useState(null);

  const profileRef = useRef(null); // ✅ Referencia para exportar a PDF

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSizeMB = 1;
    if (file.size / 1024 / 1024 > maxSizeMB) {
      alert("El archivo es demasiado grande. Máximo 1 MB permitido.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      setProfileImage(imageData);
      localStorage.setItem("profileImage", imageData);
      window.dispatchEvent(new Event("profileImageUpdated"));

      const img = new Image();
      img.onload = () => {
        setImageInfo({
          width: img.width,
          height: img.height,
          sizeKB: Math.round(file.size / 1024),
          name: file.name,
        });
      };
      img.src = imageData;
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("profileImage");
    logout();
  };

  const handleDownloadPDF = async () => {
    const element = profileRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${profile?.nombre || "perfil"}_estudiante.pdf`);
    } catch (error) {
      console.error("❌ Error al generar el PDF:", error);
      alert("Ocurrió un error al generar el PDF");
    }
  };

  return (
    <div
      className="container py-5"
      style={{ fontFamily: "Source Sans Variable, sans-serif" }}
    >
      <div
        ref={profileRef} // ✅ Referencia agregada
        className="rounded-4 shadow-lg border-0 overflow-hidden mx-auto p-0"
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          maxWidth: "900px",
        }}
      >
        {/* 🔹 Encabezado */}
        <div
          className="d-flex flex-column flex-md-row align-items-center justify-content-between p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,51,102,0.95) 0%, rgba(44,44,44,0.95) 100%)",
            color: "white",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <img
                src={profileImage}
                alt="Perfil"
                className="rounded-circle border border-3 border-light shadow"
                width="110"
                height="110"
                style={{ objectFit: "cover" }}
              />
              <label
                htmlFor="upload-photo"
                className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle shadow-sm"
                style={{
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-camera text-dark"></i>
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
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {profile.nombre || "Nombre del Estudiante"}
              </h3>
              <p className="mb-0" style={{ fontFamily: "Lora, serif" }}>
                {profile.rol || "Estudiante Universitario"}
              </p>
            </div>
          </div>

          <button
            className="btn btn-outline-light mt-3 mt-md-0 fw-semibold px-4"
            style={{
              borderRadius: "25px",
              borderWidth: "2px",
              transition: "all 0.3s ease",
            }}
            onClick={handleDownloadPDF} // ✅ Corregido
          >
            <i className="fas fa-file-pdf me-2"></i> Descargar PDF
          </button>
        </div>

        {/* 🔹 Contenido principal */}
        <div className="card-body px-4 py-5">
          {imageInfo && (
            <div
              className="alert alert-info p-2 mb-4 rounded-3 shadow-sm"
              style={{ backgroundColor: "rgba(0,51,102,0.05)" }}
            >
              <small>
                <strong>Imagen:</strong> {imageInfo.name} | {imageInfo.width}x
                {imageInfo.height}px | {imageInfo.sizeKB} KB
              </small>
            </div>
          )}

          {/* 🔹 Información general */}
          <div className="row g-3 mb-4">
            {[
              { label: "ID Estudiante", value: profile.estudianteId },
              { label: "Experiencia", value: profile.experiencia },
              { label: "Intereses", value: profile.intereses },
              { label: "Resumen", value: profile.resumen },
              { label: "Estado", value: profile.estado || "Activo" },
            ].map(
              (item, idx) =>
                item.value && (
                  <div className="col-md-6" key={idx}>
                    <div
                      className="p-3 rounded-3 shadow-sm"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <strong className="text-primary d-block mb-1">
                        {item.label}:
                      </strong>
                      <p className="mb-0 text-dark">{item.value}</p>
                    </div>
                  </div>
                )
            )}
          </div>

          {/* 🔹 Secciones adicionales */}
          {[
            {
              title: "Proyectos",
              data: profile.proyectos,
              render: (p) => (
                <>
                  <strong>{p.nombre}</strong> — {p.descripcion || "Sin descripción"}
                </>
              ),
            },
            {
              title: "Certificados",
              data: profile.certificados,
              render: (c) => (
                <>
                  <strong>{c.nombre}</strong> — {c.institucion || "No especificado"}
                </>
              ),
            },
            {
              title: "Habilidades",
              data: profile.habilidades,
              render: (h) => (
                <>
                  <strong>{h.nombre}</strong> — Nivel: {h.nivel || "No indicado"}
                </>
              ),
            },
          ].map(
            (section, i) =>
              section.data?.length > 0 && (
                <div className="mb-4" key={i}>
                  <h5
                    className="fw-bold mb-3"
                    style={{
                      color: "#003366",
                      fontFamily: "Playfair Display, serif",
                      borderBottom: "2px solid #003366",
                      display: "inline-block",
                      paddingBottom: "4px",
                    }}
                  >
                    {section.title}
                  </h5>
                  <ul className="list-group list-group-flush shadow-sm rounded-3">
                    {section.data.map((item, idx) => (
                      <li
                        key={idx}
                        className="list-group-item bg-transparent"
                        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                      >
                        {section.render(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}

          {/* 🔹 Botones de acción */}
          <div className="d-flex flex-wrap gap-2 mt-4">
            <button className="btn btn-primary btn-sm" onClick={() => setShowEdit(true)}>
              <i className="fas fa-edit me-1"></i> Editar
            </button>

            <button className="btn btn-danger btn-sm" onClick={() => setShowDelete(true)}>
              <i className="fas fa-trash me-1"></i> Eliminar
            </button>

            <button className="btn btn-outline-success btn-sm" onClick={() => setShowProject(true)}>
              <i className="fas fa-plus me-1"></i> Proyecto
            </button>

            <button className="btn btn-outline-success btn-sm" onClick={() => setShowCertificado(true)}>
              <i className="fas fa-plus me-1"></i> Certificado
            </button>

            <button className="btn btn-outline-success btn-sm" onClick={() => setShowHabilidad(true)}>
              <i className="fas fa-plus me-1"></i> Habilidad
            </button>

            <button className="btn btn-outline-dark btn-sm ms-auto" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i> Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Modales */}
      <EditProfileModal show={showEdit} handleClose={() => setShowEdit(false)} profile={profile} updateProfile={updateProfile} />
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
      <CreateProjectModal show={showProject} handleClose={() => setShowProject(false)} profile={profile} />
      <CreateCertificadoModal show={showCertificado} handleClose={() => setShowCertificado(false)} perfilId={profile.id} />
      <CreateHabilidadModal show={showHabilidad} handleClose={() => setShowHabilidad(false)} perfilId={profile.id} />
    </div>
  );
};
