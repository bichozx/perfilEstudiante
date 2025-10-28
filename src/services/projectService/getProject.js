import axios from "axios";

export const getProjects = async () => {
  try {
    const response = await axios.get("http://localhost:8080/proyectos");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los proyectos: " + error.message);
  }
};
