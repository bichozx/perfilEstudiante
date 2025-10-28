// src/services/crearEstudiante.js
import axios from "axios";

export const createProfileStudent = async (studentData) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.post(
      "http://localhost:8080/perfiles",
      studentData,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error al crear Perfil: ${error.message}`);
  }
};
