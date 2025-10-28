import axios from "axios";

const API_URL = "http://localhost:8080/habilidades";

export const servicesHabilidades = {
  listarTodos: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  listarPorPerfil: async (perfilId) => {
    const response = await axios.get(`${API_URL}/perfil/${perfilId}`);
    return response.data;
  },

  crear: async (perfilId, payload) => {
    const response = await axios.post(`${API_URL}/perfil/${perfilId}`, payload);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await axios.delete(`${API_URL}/habilidades/${id}`);
    return response.data;
  }
};