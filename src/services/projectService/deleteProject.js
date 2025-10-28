import axios from "axios";

export const deleteProject = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`http://localhost:8080/proyectos/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el proyecto: " + error.message);
  }
};
