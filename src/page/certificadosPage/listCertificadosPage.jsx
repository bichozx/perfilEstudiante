import React, { useEffect } from "react";
import { useAuth, useCertificados } from "../../hooks/useAuth";

import { CertificadoListComponent } from "../../components/certificadosComponent/CertificadosComponent";
import { Spinner } from "react-bootstrap";

export const ListCertificadosPage = () => {
  const {
    certificados,
    loading,
    error,
    fetchPorPerfil,
    eliminarCertificado,
    clearCertificado, // ✅ usamos esta función
  } = useCertificados();
    const { user} = useAuth();
    

  
  
  const perfilId = user.perfil.id
  

  useEffect(() => {
    // 🧠 Limpia los certificados cada vez que cambia el usuario
    clearCertificado();

    if (perfilId) {
      fetchPorPerfil(perfilId);
    }
  }, [perfilId, fetchPorPerfil, clearCertificado]);

  const handleDelete = async (certificado) => {
    if (window.confirm(`¿Deseas eliminar el certificado "${certificado.nombre}"?`)) {
      try {
        await eliminarCertificado(certificado.id);
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert("No se pudo eliminar el certificado");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>Error al cargar certificados: {error}</p>
      </div>
    );
  }

  if (!certificados || certificados.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <h5>No tienes certificados registrados todavía</h5>
        <p>Agrega uno nuevo desde la opción “Crear Certificado”.</p>
      </div>
    );
  }

  return (
    <CertificadoListComponent
      handleDelete={handleDelete}
      certificados={certificados}
    />
  );
};
