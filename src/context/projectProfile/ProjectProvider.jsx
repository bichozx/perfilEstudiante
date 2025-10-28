import { useCallback, useState } from 'react';

import { ProjectContext } from './ProjectContext';
import { createProject } from '../../services/projectService/createProject';
import { deleteProject } from '../../services/projectService/deleteProject';
import { getProjectById } from '../../services/projectService/getProjectById';
import { getProjects } from '../../services/projectService/getProject';
import { getProjectsByProfile } from '../../services/projectService/getProjectByProfile';
import { updateProject } from '../../services/projectService/updateProject';

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Obtener todos los proyectos
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Obtener proyectos por perfil
  const fetchProjectsByProfile = useCallback(async (perfilId) => {
    setLoading(true);
    try {
      const data = await getProjectsByProfile(perfilId);
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Obtener proyectos por Id
  const fetchProjectsById = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await getProjectById(id);
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Crear proyecto
  const addProject = useCallback(async (data, token) => {
    setLoading(true);
    try {
      const newProject = await createProject(data, token);
      setProjects((prev) => [...prev, newProject]);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const editProject = useCallback(async (projectId, payload) => {
    setLoading(true);
    try {
      const updated = await updateProject(projectId, payload);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? updated : p))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Eliminar proyecto
  const removeProject = useCallback(async (id, token) => {
    setLoading(true);
    try {
      await deleteProject(id, token);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpia tanto el proyecto individual como la lista
  const clearProject = useCallback(() => {
    setProjects([]); // ✅ limpiar lista de proyectos
    setProject(null); // ✅ limpiar proyecto seleccionado
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        loading,
        error,
        clearProject,
        fetchProjects,
        fetchProjectsByProfile,
        addProject,
        editProject,
        removeProject,
        fetchProjectsById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
