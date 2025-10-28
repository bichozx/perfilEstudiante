// src/components/profileStuden/modalsProfile/DeleteProfileModal.jsx
import { Button, Modal } from "react-bootstrap";

import React from "react";

export const DeleteProfileModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#003366",
          color: "#fff",
          fontFamily: "Playfair Display, serif",
        }}
      >
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          fontFamily: "Lora, serif",
          fontSize: "1rem",
          color: "#333",
        }}
      >
        ¿Estás seguro de que deseas <strong>eliminar tu perfil de estudiante</strong>? Esta acción no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#5E2612",
            border: "none",
            fontWeight: 600,
            fontFamily: "Source Sans Pro, sans-serif",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          style={{
            backgroundColor: "#8B2323",
            border: "none",
            fontWeight: 600,
            fontFamily: "Source Sans Pro, sans-serif",
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
