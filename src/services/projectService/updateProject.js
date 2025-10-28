import axios from "axios";

export const updateProject = async (id, payload) => {
  try {
    // ⚡ Traer token del localStorage (o donde lo guardes)
    const token = localStorage.getItem("token");

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // ← aquí agregamos el token
      } 
    };

    const response = await axios.put(
      `http://localhost:8080/proyectos/update/${id}`, 
      payload, 
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el proyecto: " + error.message);
  }
};
