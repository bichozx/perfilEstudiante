import axios from "axios";

export const createProject = async (data, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post("http://localhost:8080/proyectos", data, config);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el proyecto: " + error.message);
  }
};
