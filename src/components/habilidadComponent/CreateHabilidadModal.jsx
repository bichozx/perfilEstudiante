import React, { useState } from "react";

import { ModalComponent } from '../utils/ModalComponent';
import { useHabilidad } from "../../hooks/useAuth";

export const CreateHabilidadModal = ({ show, handleClose, perfilId }) => {
  const { crearHabilidad } = useHabilidad();
  const [data, setData] = useState({ nombre: "", nivel: "", tipo: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.nombre.trim()) {
      setError("El nombre de la habilidad es obligatorio");
      return;
    }
    setLoading(true);
    try {
      await crearHabilidad(perfilId, { ...data, perfilEstudianteId: perfilId });
      setData({ nombre: "", nivel: "", tipo: "" });
      handleClose();
    } catch {
      setError("Error al crear la habilidad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalComponent
      show={show}
      title="🧠 Crear Habilidad"
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitting={loading}
      submitText="Crear"
    >
      {error && <p className="text-danger text-center mb-3 fw-semibold">{error}</p>}
      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre</label>
        <input
          name="nombre"
          value={data.nombre}
          onChange={handleChange}
          className="form-control rounded-3"
          placeholder="Ej: React, JavaScript"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Tipo</label>
        <input
          name="tipo"
          value={data.tipo}
          onChange={handleChange}
          className="form-control rounded-3"
          placeholder="Ej: Técnica, Deportiva"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Nivel</label>
        <input
          name="nivel"
          value={data.nivel}
          onChange={handleChange}
          className="form-control rounded-3"
          placeholder="Ej: Básico, Intermedio, Avanzado"
        />
      </div>
    </ModalComponent>
  );
};

