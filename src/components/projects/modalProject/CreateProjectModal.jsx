import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useProfileStudent, useProjects } from '../../../hooks/useAuth';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile?.id) {
      alert("Debes crear tu perfil antes de registrar proyectos.");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        perfilEstudianteId: profile.id, // ✅ vincula el proyecto con el perfil
      };

      await addProject(dataToSend);
      alert("Proyecto creado correctamente ✅");

      // Limpia el formulario
      setFormData({
        titulo: "",
        descripcion: "",
        url: "",
        tecnologias: "",
      });

      // Refresca la lista de proyectos del perfil
      await fetchProjectsByProfile(profile.id);

      handleClose(); // Cierra el modal
    } catch (error) {
      alert("Error al crear el proyecto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Proyecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título del proyecto</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej. Sistema de gestión estudiantil"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Breve descripción del proyecto debe tener entre 10 y 100 caracteres"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL del Proyecto</Form.Label>
            <Form.Control
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://github.com/usuario/proyecto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tecnologías</Form.Label>
            <Form.Control
              type="text"
              name="tecnologias"
              value={formData.tecnologias}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB..."
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
              className="me-2"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              style={{
                backgroundColor: "#198754",
                borderColor: "#198754",
              }}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
