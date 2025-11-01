// // src/context/AuthProvider.jsx
// import React, { useState } from "react";

// import { AutContext } from './AutContext';
// import { crearEstudiante } from '../services/crearEstudiante';
// import { loginApi } from "../services/loginApi";

// export function AuthProvider({ children }) {
//    const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   });
  

//   const loginUser = async (correo, password) => {
//     const res = await loginApi(correo, password);
    
    

//     // 👇 Extrae los datos reales
//     const { token, role, userId, estudianteId, perfil } = res;
   

//     if (!token) throw new Error("No se recibió token del backend");

//     // 👇 Crea el objeto de usuario que guardaremos
//     const userData = { token, role, userId, estudianteId, perfil };

//     // 👇 Guarda en localStorage
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));

//     // 👇 Actualiza el contexto
//     setUser(userData);

//     return userData;
//   };

//   const registerStudent = async (studentData) => {
//   try {
//     const res = await crearEstudiante(studentData);
//     console.log('🚀 ~ registerStudent ~ res:', res)
    

//     // Opcionalmente, podrías guardar el usuario o token si el backend lo devuelve
//     if (res?.usuario) {
//       localStorage.setItem("user", JSON.stringify(res));
//       setUser(res);
//     }

//     return res;
//   } catch (error) {
//     console.error("❌ Error en registerStudent:", error);
//     throw error;
//   }
// };


  

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AutContext.Provider value={{isAuthenticated, user,registerStudent, loginUser, logout }}>
//       {children}
//     </AutContext.Provider>
//   );
// }

// src/context/AuthProvider.jsx
import React, { useState } from "react";

import { AutContext } from "./AutContext";
import { crearEstudiante } from "../services/crearEstudiante";
import { loginApi } from "../services/loginApi";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  // -----------------------
  // Login
  // -----------------------
  const loginUser = async (correo, password) => {
    const res = await loginApi(correo, password);
    console.log(res)
    const { token, role, userId, estudianteId, perfil, userName} = res;
    console.log('🚀 ~ loginUser ~ usuario:', userName)

    if (!token) throw new Error("No se recibió token del backend");

    const userData = { token, role, userId, estudianteId, perfil, userName };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    return userData;
  };

  // -----------------------
  // Registro de estudiante
  // -----------------------
  const registerStudent = async (studentData) => {
    try {
      const res = await crearEstudiante(studentData);
      console.log('🚀 ~ registerStudent ~ res:', res)
  

      // Normalizamos los datos del usuario antes de guardarlos
      if (res?.usuario) {
        const userData = {
          token: res.token || null,
          role: res.role || "estudiante",
          userId: res.usuario.id,
          username:res.usuario.name,
          estudianteId: res.id || null,
          perfil: res.perfil || null,
        };
        localStorage.setItem("token", userData.token || "");
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }

      return res;
    } catch (error) {
      console.error("❌ Error en registerStudent:", error);
      throw error;
    }
  };

  // -----------------------
  // Logout
  // -----------------------
  const logout = () => {
    localStorage.clear(); // limpia todo el storage
    setUser(null);
    // opcional: redirigir al login
    // window.location.href = "/login";
  };

  const isAuthenticated = !!user;

  return (
    <AutContext.Provider
      value={{ isAuthenticated, user, registerStudent, loginUser, logout }}
    >
      {children}
    </AutContext.Provider>
  );
}

