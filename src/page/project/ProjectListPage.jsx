import React, { useEffect, useState } from "react";
import { useAuth, useProjects } from "../../hooks/useAuth";

import { DeleteProjectModal } from "../../components/projects/modalProject/DeleteModal";
import { EditProjectModal } from "../../components/projects/modalProject/EditProjectModal";
import { ProjectListComponent } from "../../components/projects/ProjectListComponent";
import { ViewProjectModal } from "../../components/projects/modalProject/ViewProjectModal";

export const ProjectListPage = () => {
  const {
    projects,
    fetchProjectsByProfile,
    editProject,
    removeProject,
    clearProject,
  } = useProjects();
  const { user} = useAuth();
  

  const [selectedProject, setSelectedProject] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // 🔥 Obtenemos el perfil del estudiante desde localStorage
  
  const perfilId = user.perfil.id
  
  

  useEffect(() => {
    // ✅ Limpiamos proyectos previos al cambiar de usuario
    clearProject();

    if (perfilId) {
      fetchProjectsByProfile(perfilId);
    } else {
      console.warn("No hay perfilId en localStorage");
    }
  }, [perfilId, fetchProjectsByProfile, clearProject]);

  const handleView = (project) => {
    setSelectedProject(project);
    setShowView(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowEdit(true);
  };

  const handleSaveEdit = async (projectId, payload) => {
    try {
      await editProject(projectId, payload);
      await fetchProjectsByProfile(perfilId);
    } catch (error) {
      console.error("Error al editar el proyecto:", error);
    }
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setShowDelete(true);
  };

  const handleDeleteConfirm = async (project) => {
    if (!project?.id) return;
    try {
      await removeProject(project.id);
      await fetchProjectsByProfile(perfilId);
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
    }
  };

  return (
    <div className="container mt-4">
      <ProjectListComponent
        projects={projects}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ViewProjectModal
        show={showView}
        handleClose={() => setShowView(false)}
        project={selectedProject}
      />

      <EditProjectModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        project={selectedProject}
        onSave={handleSaveEdit}
      />

      <DeleteProjectModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        onDelete={handleDeleteConfirm}
        project={selectedProject}
      />
    </div>
  );
};
