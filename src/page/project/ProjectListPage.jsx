import React, { useEffect, useState } from 'react';
import { useAuth, useProfileStudent, useProjects } from '../../hooks/useAuth';

import { DeleteProjectModal } from '../../components/projects/modalProject/DeleteModal';
import { EditProjectModal } from '../../components/projects/modalProject/EditProjectModal';
import { ItemListComponent } from '../../components/utils/ItemsListComponent';
import { ViewProjectModal } from '../../components/projects/modalProject/ViewProjectModal';

export const ProjectListPage = () => {
  const {
    projects,
    fetchProjectsByProfile,
    editProject,
    removeProject,
    clearProject,
  } = useProjects();
  const { user } = useAuth();
  const { profile } = useProfileStudent();
  console.log('🚀 ~ ProjectListPage ~ profile:', profile);

  console.log('🚀 ~ ProjectListPage ~ user:', user);

  const [selectedProject, setSelectedProject] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // 🔥 Obtenemos el perfil del estudiante desde localStorage

  // ✅ Control seguro del perfilId
  const perfilId = profile?.id || null;

  useEffect(() => {
    clearProject();

    if (perfilId) {
      fetchProjectsByProfile(perfilId);
    } else {
      console.warn("No hay perfilId disponible. El usuario no ha creado su perfil.");
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
      console.error('Error al editar el proyecto:', error);
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
      console.error('Error al eliminar proyecto:', error);
    }
  };

  return (
    <div className="container mt-4">
      <ItemListComponent
        title="Mis Proyectos"
        items={projects}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        fields={['Descripción', 'Tecnologías']}
        linkField="url"
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
