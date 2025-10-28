import axios from "axios";

export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/proyectos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener el proyecto: " + error.message);
  }
};
