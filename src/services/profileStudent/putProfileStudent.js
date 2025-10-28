import axios from "axios";

export const putProfileStudent = async (id, studentData) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.put(
      `http://localhost:8080/perfiles/${id}`, // <-- id dinámico
      studentData,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar Perfil: ${error.message}`);
  }
};
