import React, { useCallback, useState } from "react";

import { CertificadoContext } from './CertificadoCOntex';
import { certificadoProvider } from '../../services/certificadoServices/certificadoServices';

// Provider
export const CertificadoProvider = ({ children }) => {
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Listar todos ---
  const fetchCertificados = useCallback(async () => {
    setLoading(true);
    try {
      const data = await certificadoProvider.listarTodos();
      setCertificados(data);
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
      const data = await certificadoProvider.listarPorPerfil(perfilId);
      setCertificados(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Crear ---
  const crearCertificado = useCallback(async (perfilId, payload) => {
    setLoading(true);
    try {
      const nuevo = await certificadoProvider.crear(perfilId, payload);
      setCertificados(prev => [...prev, nuevo]);
      return nuevo;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Actualizar ---
  const actualizarCertificado = useCallback(async (id, payload) => {
    setLoading(true);
    try {
      const actualizado = await certificadoProvider.actualizar(id, payload);
      setCertificados(prev => prev.map(c => (c.id === id ? actualizado : c)));
      return actualizado;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Eliminar ---
  const eliminarCertificado = useCallback(async (id) => {
    setLoading(true);
    try {
      await certificadoProvider.eliminar(id);
      setCertificados(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CertificadoContext.Provider
      value={{
        certificados,
        loading,
        error,
        fetchCertificados,
        fetchPorPerfil,
        crearCertificado,
        actualizarCertificado,
        eliminarCertificado
      }}
    >
      {children}
    </CertificadoContext.Provider>
  );
};