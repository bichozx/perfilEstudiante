// import axios from 'axios';
// // asegúrate que la ruta sea correcta

// export const getProfileStudent = async (estudianteId) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const response = await axios.get(
//       `http://localhost:8080/perfil-estudiante/${estudianteId}`,
//       config
//     );

//     return response.data; // devuelve el token o usuario
//   } catch (error) {
//     throw new Error(`Estudiante no encontrado: ${error.message}`);
//   }
// };

import axios from 'axios';

export const getProfileStudent = async (estudianteId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(
      `http://localhost:8080/perfil-estudiante/${estudianteId}`,
      config
    );

    return response.data; // devuelve el perfil del estudiante
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Mensaje amigable si el perfil no existe
      throw new Error(
        "Aún no tienes un perfil académico creado. Por favor, completa tu perfil para acceder a esta sección."
      );
    } else {
      // Otros errores
      throw new Error(`Error al obtener el perfil: ${error.message}`);
    }
  }
};
