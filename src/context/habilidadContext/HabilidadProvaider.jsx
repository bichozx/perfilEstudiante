import React, { useCallback, useState } from "react";

import { HabilidadContext } from "./HabilidadContext";
import { servicesHabilidades } from '../../services/servicesHabilidades/servicesHabilidades';

export const HabilidadProvider = ({ children }) => {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Listar todas ---
  const fetchHabilidades = useCallback(async () => {
    setLoading(true);
    try {
      const data = await servicesHabilidades.listarTodos();
      setHabilidades(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Listar por perfil ---
  const fetchPorPerfil = useCallback(async (perfilId) => {
    setLoading(true);
    try {
      const data = await servicesHabilidades.listarPorPerfil(perfilId);
      setHabilidades(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Crear habilidad ---
  const crearHabilidad = useCallback(async (perfilId, payload) => {
    setLoading(true);
    try {
      const nueva = await servicesHabilidades.crear(perfilId, payload);
      setHabilidades(prev => [...prev, nueva]);
      return nueva;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Eliminar habilidad ---
  const eliminarHabilidad = useCallback(async (id) => {
    setLoading(true);
    try {
      await servicesHabilidades.eliminar(id);
      setHabilidades(prev => prev.filter(h => h.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <HabilidadContext.Provider
      value={{
        habilidades,
        loading,
        error,
        fetchHabilidades,
        fetchPorPerfil,
        crearHabilidad,
        eliminarHabilidad
      }}
    >
      {children}
    </HabilidadContext.Provider>
  );
};
