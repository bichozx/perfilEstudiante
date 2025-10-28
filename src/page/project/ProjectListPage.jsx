import React, { useEffect, useState } from "react";

import { DeleteProjectModal } from '../../components/projects/modalProject/DeleteModal';
import { EditProjectModal } from "../../components/projects/modalProject/EditProjectModal";
import { ProjectListComponent } from "../../components/projects/ProjectListComponent";
import { ViewProjectModal } from "../../components/projects/modalProject/ViewProjectModal";
import { useProjects } from "../../hooks/useAuth";

export const ProjectListPage = () => {
  const { projects, fetchProjects, editProject, removeProject  } = useProjects();

  const [selectedProject, setSelectedProject] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleView = (project) => {
    setSelectedProject(project);
    setShowView(true);
  };

  const handleDeleteClick = (project) => {
   console.log('🚀 ~ handleDeleteClick ~ project:', project)
  setSelectedProject(project);
  setShowDelete(true);
};


const handleDeleteConfirm = async (project) => {
  if (!project?.id) return;
  try {
    console.log("Eliminar proyecto:", project.id);
    await removeProject(project.id);  // llama al hook con id
    await fetchProjects();
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
  }
};


  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowEdit(true);
  };

  // ✅ Guardar cambios correctamente
 const handleSaveEdit = async (projectId, payload) => {
  try {
    await editProject(projectId, payload);
    await fetchProjects();
  } catch (error) {
    console.error("Error al editar el proyecto:", error);
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

      {/* Modal para ver */}
      <ViewProjectModal
        show={showView}
        handleClose={() => setShowView(false)}
        project={selectedProject}
      />

      {/* Modal para editar */}
      <EditProjectModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        project={selectedProject}
        onSave={handleSaveEdit}
      />

      {/* Modal para eliminar */}
<DeleteProjectModal
   show={showDelete}
  handleClose={() => setShowDelete(false)}
  onDelete={handleDeleteConfirm}
  project={selectedProject}
/>
    </div>
  );
};
