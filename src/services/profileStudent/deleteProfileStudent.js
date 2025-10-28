import axios from "axios";

export const deleteProfileStudent = async (id) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.delete(
      `http://localhost:8080/perfiles/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar Perfil: ${error.message}`);
  }
};
