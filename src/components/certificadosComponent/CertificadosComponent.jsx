import { Button, Card, Col, Row } from "react-bootstrap";

import React from "react";

export const CertificadoListComponent = ({ certificados }) => {
  
  if (!certificados || certificados.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No tienes certificados registrados todavía</h5>
        <p>Agrega uno nuevo desde la opción “Crear Certificado”.</p>
      </div>
    );
  }

  return (
      <div className="container mt-4">
      <h3 className="text-center mb-4 fw-bold text-primary">Mis Certificados</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {certificados.map((cert) => (
          <Col key={cert.id}>
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
              <Card.Body>
                <Card.Title className="fw-bold text-primary">{cert.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{cert.institucion}</Card.Subtitle>
                <Card.Text>
                  <strong>Fecha:</strong>{" "}
                  {cert.fecha ? new Date(cert.fecha).toLocaleDateString() : "No registrada"}
                </Card.Text>
                {cert.urlArchivo && (
                  <Card.Link href={cert.urlArchivo} target="_blank" rel="noopener noreferrer">
                    🔗 Ver archivo
                  </Card.Link>
                )}
              </Card.Body>
            
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};