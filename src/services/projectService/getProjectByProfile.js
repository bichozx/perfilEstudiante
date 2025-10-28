import axios from "axios";

export const getProjectsByProfile = async (perfilId) => {
  try {
    const response = await axios.get(`http://localhost:8080/proyectos/perfil/${perfilId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los proyectos del perfil: " + error.message);
  }
};
