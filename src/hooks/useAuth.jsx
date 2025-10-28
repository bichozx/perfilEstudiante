import { AutContext } from '../context/AutContext';
import { CertificadoContext } from '../context/certificadoContext/CertificadoCOntex';
import { HabilidadContext } from '../context/habilidadContext/HabilidadContext';
import { ProfileStudentContext } from '../context/profileStudent/ProfileStudentContext';
import { ProjectContext } from '../context/projectProfile/ProjectContext';
import { useContext } from "react";

export const useAuth = () => useContext(AutContext);

// Custom hook para usarlo más fácil
// Hook personalizado para usar el context
export const useProfileStudent = () => {
  const context = useContext(ProfileStudentContext);
  if (!context) {
    throw new Error(
      "useProfileStudent debe usarse dentro de ProfileStudentProvider"
    );
  }
  return context;
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects debe usarse dentro de un ProjectsProvider");
  }
  return context;
};

export const useCertificados = () =>{
   const context = useContext(CertificadoContext);
  if (!context) {
    throw new Error("useCertificados debe usarse dentro de un CertificadoProvider");
  }
  return context;
};

export const useHabilidad = () =>{
   const context = useContext(HabilidadContext);
  if (!context) {
    throw new Error("useHabilidad debe usarse dentro de un HabilidadProvider");
  }
  return context;
};


