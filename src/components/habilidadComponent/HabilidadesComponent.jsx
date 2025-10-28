import { Button, Card, Col, Row } from "react-bootstrap";

import React from "react";

// 🔹 Evita renders innecesarios con React.memo
export const HabilidadesComponent = React.memo(({ habilidades = [], onEdit, onDelete }) => {
  if (!Array.isArray(habilidades) || habilidades.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No tienes habilidades registradas todavía</h5>
        <p>Agrega una nueva desde la opción “Crear Habilidad”.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {habilidades.map((hab) => (
          <Col key={hab.id || hab._id}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}
            >
              <Card.Body>
                <Card.Title className="fw-bold text-primary">{hab.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {hab.tipo || "No especificado"}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Nivel:</strong> {hab.nivel || "No especificado"}
                </Card.Text>
              </Card.Body>

              <Card.Footer className="d-flex justify-content-end bg-white">
                {onEdit && (
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => onEdit(hab)}
                  >
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(hab)}
                  >
                    Eliminar
                  </Button>
                )}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}, areEqual);

// 🔸 Compara props para evitar re-render si las habilidades no cambiaron
function areEqual(prevProps, nextProps) {
  if (prevProps.habilidades.length !== nextProps.habilidades.length) return false;

  const prevIds = prevProps.habilidades.map((h) => h.id || h._id).join(",");
  const nextIds = nextProps.habilidades.map((h) => h.id || h._id).join(",");

  return prevIds === nextIds;
}
