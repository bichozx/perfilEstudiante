import { Button, Modal } from "react-bootstrap";

import React from "react";

export const ViewProjectModal = ({ show, handleClose, project }) => {
  if (!project) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#003366", color: "#fff" }}>
        <Modal.Title>Detalles del Proyecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nombre:</strong> {project.nombre}</p>
        <p><strong>Descripción:</strong> {project.descripcion || "Sin descripción"}</p>
        <p><strong>Tecnologías:</strong> {project.tecnologias || "No especificadas"}</p>
        <p><strong>URL:</strong>{" "}
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.url}
            </a>
          ) : (
            "Sin enlace"
          )}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          style={{ backgroundColor: "#8B2323", border: "none" }}
          onClick={handleClose}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
