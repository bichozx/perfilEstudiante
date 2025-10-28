import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";

import { useHabilidad } from "../../hooks/useAuth";

export const CreateHabilidadModal = ({ show, handleClose, perfilId }) => {
  const { crearHabilidad } = useHabilidad();

  const [nombre, setNombre] = useState("");
  const [nivel, setNivel] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre de la habilidad es obligatorio");
      return;
    }

    try {
      // Se envía el perfilEstudianteId correctamente en el payload
      await crearHabilidad(perfilId, {
        nombre,
        nivel,
        tipo,
        perfilEstudianteId: perfilId,
      });

      // Limpiar los campos
      setNombre("");
      setNivel("");
      setTipo("");
      setError("");

      handleClose();
    } catch (err) {
      setError("Error al crear la habilidad");
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear Habilidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}

          <Form.Group className="mb-3">
            <Form.Label>Nombre de la habilidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: JavaScript, React"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Tecnológica, Deportiva"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nivel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Básico, Intermedio, Avanzado"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button type="submit" variant="success">
              Crear
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
