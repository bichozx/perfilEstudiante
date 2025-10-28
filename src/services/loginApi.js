import axios from 'axios';
// asegúrate que la ruta sea correcta

export const loginApi = async (correo, password) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { correo, password }; // datos del login

    const response = await axios.post(
      `http://localhost:8080/api/auth/login`,
      body,
      config
    );

    return response.data; // devuelve el token o usuario
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error.message}`);
  }
};
