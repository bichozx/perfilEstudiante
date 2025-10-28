import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export const EditProjectModal = ({ show, handleClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tecnologias: "",
    url: "",
  });

  // Llenar formulario cuando cambia el proyecto
  useEffect(() => {
    if (project) {
      setFormData({
        titulo: project.titulo || "",
        descripcion: project.descripcion || "",
        tecnologias: project.tecnologias || "",
        url: project.url || "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!project?.perfilEstudianteId) {
    console.error("No se encontró perfilEstudianteId");
    return;
  }

  // ✅ Enviar al handler exactamente lo que espera el backend
  const payload = { ...formData, perfilEstudianteId: project.perfilEstudianteId };

  await onSave(project.id, payload);

  handleClose();
};


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#003366", color: "#fff" }}>
        <Modal.Title>Editar Proyecto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Título del proyecto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              placeholder="Describe brevemente el proyecto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tecnologías</Form.Label>
            <Form.Control
              type="text"
              name="tecnologias"
              value={formData.tecnologias}
              onChange={handleChange}
              placeholder="Ej: React, Node.js, MongoDB"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://ejemplo.com"
            />
          </Form.Group>

          <div className="text-end">
            <Button
              variant="secondary"
              style={{ backgroundColor: "#8B2323", border: "none", marginRight: "0.5rem" }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: "#198754", border: "none" }}
            >
              Guardar Cambios
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
