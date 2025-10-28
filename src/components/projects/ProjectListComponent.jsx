import { Button, Card, Col, Row } from "react-bootstrap";

import React from "react";

export const ProjectListComponent = ({ projects, onView, onEdit, onDelete }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No tienes proyectos registrados todavía</h5>
        <p>Agrega uno nuevo desde la opción “Crear Proyecto”.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 fw-bold" style={{ color: "#003366" }}>
        Mis Proyectos
      </h3>

      <Row xs={1} md={2} lg={3} className="g-4">
        {projects.map((project) => (
          <Col key={project.id}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{
                borderRadius: "10px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold text-primary">
                  {project.titulo}
                </Card.Title>
                <Card.Text className="text-secondary">
                  {project.descripcion?.length > 100
                    ? project.descripcion.substring(0, 100) + "..."
                    : project.descripcion || "Sin descripción"}
                </Card.Text>
                <Card.Text>
                  <strong>Tecnologías:</strong>{" "}
                  {project.tecnologias || "No especificadas"}
                </Card.Text>
                {project.url && (
                  <Card.Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    🔗 Ver enlace
                  </Card.Link>
                )}
              </Card.Body>

              <Card.Footer
                className="d-flex justify-content-between"
                style={{ backgroundColor: "#fff" }}
              >
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => onView(project)}
                >
                  Ver
                </Button>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => onEdit(project)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(project)}
                >
                  Eliminar
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
