import React, { useState } from "react";
import { useProfileStudent, useProjects } from "../../../hooks/useAuth";

import { ModalComponent } from '../../utils/ModalComponent';

export const CreateProjectModal = ({ show, handleClose }) => {
  const { addProject, fetchProjectsByProfile } = useProjects();
  const { profile } = useProfileStudent();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    url: "",
    tecnologias: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile?.id) {
      setErrorMsg("⚠️ Debes crear tu perfil antes de registrar proyectos.");
      return;
    }

    setLoading(true);
    try {
      await addProject({ ...formData, perfilEstudianteId: profile.id });
      await fetchProjectsByProfile(profile.id);
      setFormData({ titulo: "", descripcion: "", url: "", tecnologias: "" });
      handleClose();
    } catch (err) {
      setErrorMsg("❌ Error al crear el proyecto.",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalComponent
      show={show}
      title="💻 Crear Nuevo Proyecto"
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitting={loading}
      submitText="Guardar Proyecto"
    >
      {errorMsg && (
        <p className="text-danger text-center fw-semibold mb-3">{errorMsg}</p>
      )}
      <div className="mb-3">
        <label className="form-label fw-semibold">Título</label>
        <input
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="form-control rounded-3"
          placeholder="Ej: Sistema de gestión estudiantil"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Descripción</label>
        <textarea
          name="descripcion"
          rows="3"
          value={formData.descripcion}
          onChange={handleChange}
          className="form-control rounded-3"
          placeholder="Describe brevemente tu proyecto"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">URL</label>
        <input
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="form-control rounded-3"
          placeholder="https://github.com/usuario/proyecto"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Tecnologías</label>
        <input
          name="tecnologias"
          value={formData.tecnologias}
          onChange={handleChange}
          className="form-control rounded-3"
          placeholder="React, Node.js, MongoDB..."
        />
      </div>
    </ModalComponent>
  );
};
