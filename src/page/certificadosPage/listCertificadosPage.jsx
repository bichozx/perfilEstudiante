import React, { useEffect } from "react";
import { useCertificados, useProfileStudent } from "../../hooks/useAuth";

import { ItemListComponent } from "../../components/utils/ItemsListComponent";
import { Spinner } from "react-bootstrap";

export const ListCertificadosPage = () => {
  const {
    certificados,
    loading,
    error,
    fetchPorPerfil,
    eliminarCertificado,
    clearCertificado,
  } = useCertificados();

  const { profile } = useProfileStudent();

  console.log("🚀 ~ ListCertificadosPage ~ profile:", profile);

  // ✅ Previene error cuando profile es null
  const perfilId = profile?.id || null;

  useEffect(() => {
    clearCertificado();

    if (perfilId) {
      fetchPorPerfil(perfilId);
    } else {
      console.warn("⚠️ No hay perfilId disponible. El usuario no ha creado su perfil.");
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

  // ⚠️ Si no existe perfil, mostramos un mensaje informativo
  if (!perfilId) {
    return (
      <div className="container text-center mt-5">
        <h4 className="fw-bold text-primary mb-3">🎓 Aún no tienes un perfil creado</h4>
        <p className="text-muted">
          Crea primero tu perfil de estudiante para poder registrar y visualizar tus certificados.
        </p>
      </div>
    );
  }

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
    <ItemListComponent
      title="Mis Certificados"
      items={certificados}
      fields={["Fecha", "institucion"]}
      linkField="urlArchivo"
      onDelete={handleDelete}
    />
  );
};
