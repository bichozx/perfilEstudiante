import React, { useEffect, useState } from "react";

import { CreateHabilidadModal } from "../../components/habilidadComponent/CreateHabilidadModal";
import { HabilidadProvider } from "../../context/habilidadContext/HabilidadProvaider";
import { HabilidadesComponent } from "../../components/habilidadComponent/HabilidadesComponent";
import { useAuth } from "../../hooks/useAuth";
import { useHabilidad } from "../../hooks/useAuth";

export const HabilidadesPage = () => {
  const { profile } = useAuth(); // Obtenemos el perfil del usuario
  console.log('🚀 ~ HabilidadesPage ~ profile:', profile)
  const perfilId = profile?.id;

  return (
    <HabilidadProvider>
      {perfilId ? <HabilidadesPageInner perfilId={perfilId} /> : <p>Cargando perfil...</p>}
    </HabilidadProvider>
  );
};

const HabilidadesPageInner = ({ perfilId }) => {
  const { fetchHabilidades } = useHabilidad(); // Listar todas las habilidades
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchHabilidades(); // Listamos todas las habilidades al cargar
  }, [fetchHabilidades]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary">Mis Habilidades</h3>
        <button
          className="btn btn-success"
          onClick={() => setShowCreate(true)}
        >
          + Crear Habilidad
        </button>
      </div>

      <HabilidadesComponent perfilId={perfilId} />

      <CreateHabilidadModal
        show={showCreate}
        handleClose={() => setShowCreate(false)}
        perfilId={perfilId}
      />
    </div>
  );
};
