import React, { useEffect, } from "react";
import { useAuth, useHabilidad } from "../../hooks/useAuth"; // 👈 Hook del contexto de habilidades

import { HabilidadesComponent } from "../../components/habilidadComponent/HabilidadesComponent";

export const HabilidadesPage = () => {
  const {
    habilidades,
    fetchPorPerfil,
   
    clearHabilidad,
  } = useHabilidad();
  const { user} = useAuth();

  

 
  const perfilId = user.perfil.id

  useEffect(() => {
    clearHabilidad();
    if (perfilId) {
      fetchPorPerfil(perfilId);
    } else {
      console.warn("⚠️ No se encontró perfilId en localStorage");
    }
  }, [perfilId, fetchPorPerfil, clearHabilidad]);


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary">Mis Habilidades</h3>
      </div>

      <HabilidadesComponent
        habilidades={habilidades}
        
      />
    </div>
  );
};
