import axios from 'axios';
// asegúrate que la ruta sea correcta

export const getStudentById = async (estudianteId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(
      `http://localhost:8080/${estudianteId}`,
      config
    );

    return response.data; // devuelve el token o usuario
  } catch (error) {
    throw new Error(`Estudiante no encontrado: ${error.message}`);
  }
};
