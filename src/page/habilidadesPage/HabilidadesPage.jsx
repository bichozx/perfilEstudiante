import React, { useEffect } from "react";
import { useHabilidad, useProfileStudent } from "../../hooks/useAuth";

import { ItemListComponent } from "../../components/utils/ItemsListComponent";

export const HabilidadesPage = () => {
  const { habilidades, fetchPorPerfil, clearHabilidad } = useHabilidad();
  const { profile } = useProfileStudent();

  console.log("🚀 ~ HabilidadesPage ~ profile:", profile);

  // ✅ Protección: si profile es null o undefined, no explota
  const perfilId = profile?.id || null;

  useEffect(() => {
    clearHabilidad();

    if (perfilId) {
      fetchPorPerfil(perfilId);
    } else {
      console.warn("⚠️ No hay perfilId disponible. El usuario no ha creado su perfil.");
    }
  }, [perfilId, fetchPorPerfil, clearHabilidad]);

  // ⚠️ Si no hay perfil, mostramos aviso amigable
  if (!perfilId) {
    return (
      <div className="container text-center mt-5">
        <h4 className="fw-bold text-primary mb-3">🚀 Aún no tienes un perfil creado</h4>
        <p className="text-muted">
          Crea primero tu perfil de estudiante para poder agregar y visualizar tus habilidades.
        </p>
      </div>
    );
  }

  return (
    <ItemListComponent
      title="Mis Habilidades"
      items={habilidades}
      fields={["Tipo", "Nivel"]}
    />
  );
};
