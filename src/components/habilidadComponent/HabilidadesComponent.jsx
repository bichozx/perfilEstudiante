import { Button, Card, Col, Row } from "react-bootstrap";

import React from "react";

export const HabilidadesComponent = ({ habilidades }) => {
  if (!habilidades || habilidades.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No tienes habilidades registradas todavía</h5>
        <p>Agrega una nueva desde la opción “Crear Habilidad”.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 fw-bold text-primary">Mis Habilidades</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {habilidades.map((hab) => (
          <Col key={hab.id}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}
            >
              <Card.Body>
                <Card.Title className="fw-bold text-primary">{hab.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{hab.tipo || "No especificado"}</Card.Subtitle>
                <Card.Text>
                  <strong>Nivel:</strong> {hab.nivel || "No especificado"}
                </Card.Text>
              </Card.Body>

              {/* Opcional: botones de acción */}
              {hab.id && (
                <Card.Footer className="d-flex justify-content-end" style={{ backgroundColor: "#fff" }}>
                  <Button size="sm" variant="warning" className="me-2">
                    Editar
                  </Button>
                  <Button size="sm" variant="danger">
                    Eliminar
                  </Button>
                </Card.Footer>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
