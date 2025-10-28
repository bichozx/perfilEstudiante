// src/context/AuthProvider.jsx
import React, { useState } from "react";

import { AutContext } from './AutContext';
import { crearEstudiante } from '../services/crearEstudiante';
import { loginApi } from "../services/loginApi";

export function AuthProvider({ children }) {
   const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  

  const loginUser = async (correo, password) => {
    const res = await loginApi(correo, password);
    
    

    // 👇 Extrae los datos reales
    const { token, role, userId, estudianteId } = res;

    if (!token) throw new Error("No se recibió token del backend");

    // 👇 Crea el objeto de usuario que guardaremos
    const userData = { token, role, userId, estudianteId };

    // 👇 Guarda en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // 👇 Actualiza el contexto
    setUser(userData);

    return userData;
  };

  const registerStudent = async (studentData) => {
  try {
    const res = await crearEstudiante(studentData);
    console.log("🚀 ~ registerStudent ~ soy la data de registro res:", res);

    // Opcionalmente, podrías guardar el usuario o token si el backend lo devuelve
    if (res?.usuario) {
      localStorage.setItem("user", JSON.stringify(res.usuario));
      setUser(res.usuario);
    }

    return res;
  } catch (error) {
    console.error("❌ Error en registerStudent:", error);
    throw error;
  }
};


  

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AutContext.Provider value={{isAuthenticated, user,registerStudent, loginUser, logout }}>
      {children}
    </AutContext.Provider>
  );
}




