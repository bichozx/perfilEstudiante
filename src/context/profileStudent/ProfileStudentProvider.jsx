// import React, { useCallback, useEffect, useState } from "react";

// import { ProfileStudentContext } from "./ProfileStudentContext";
// import { createProfileStudent } from "../../services/profileStudent/createProfileStudent";
// import { deleteProfileStudent } from "../../services/profileStudent/deleteProfileStudent";
// import { getProfileStudent } from "../../services/profileStudent/getProfileStudent";
// import { putProfileStudent } from "../../services/profileStudent/putProfileStudent";

// export const ProfileStudentProvider = ({ children }) => {
//   const [profile, setProfile] = useState(() => {
//     // ✅ Carga inicial desde localStorage (si existe)
//     const saved = localStorage.getItem("profile");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 🔁 Sincroniza cada vez que cambia el perfil
//   useEffect(() => {
//     if (profile) {
//       localStorage.setItem("profile", JSON.stringify(profile));
//     } else {
//       localStorage.removeItem("profile");
//     }
//   }, [profile]);

//   // Obtener perfil
//   const fetchProfile = useCallback(async (estudianteId) => {
    
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await getProfileStudent(estudianteId);
//       setProfile(data);
//     } catch (err) {
//       setProfile(null);
//       setError(
//         err.message.includes("Estudiante no encontrado")
//           ? "No tienes perfil creado. Debes crearlo para continuar."
//           : err.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Crear perfil
//   const createProfile = useCallback(async (data, token) => {
    
//     setLoading(true);
//     setError(null);
//     try {
//       const newProfile = await createProfileStudent(data, token);
//       setProfile(newProfile);
//       return newProfile;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Actualizar perfil
//   const updateProfile = useCallback(async (id, data, token) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const updatedProfile = await putProfileStudent(id, data, token);
//       setProfile(updatedProfile);
//       return updatedProfile;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Eliminar perfil
//   const deleteProfile = useCallback(async (id) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await deleteProfileStudent(id);
//       setProfile(null);
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const clearProfile = () => setProfile(null);

//   return (
//     <ProfileStudentContext.Provider
//       value={{
//         profile,
//         loading,
//         error,
//         fetchProfile,
//         clearProfile,
//         createProfile,
//         updateProfile,
//         deleteProfile,
//       }}
//     >
//       {children}
//     </ProfileStudentContext.Provider>
//   );
// };

import React, { useCallback, useEffect, useState } from "react";

import { ProfileStudentContext } from "./ProfileStudentContext";
import { createProfileStudent } from "../../services/profileStudent/createProfileStudent";
import { deleteProfileStudent } from "../../services/profileStudent/deleteProfileStudent";
import { getProfileStudent } from "../../services/profileStudent/getProfileStudent";
import { putProfileStudent } from "../../services/profileStudent/putProfileStudent";

export const ProfileStudentProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved ? JSON.parse(saved) : null;
  });

  const [profileId, setProfileId] = useState(() => {
    const saved = localStorage.getItem("profileId");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔁 Guarda perfil y ID en localStorage cuando cambian
  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
      if (profile.id) {
        localStorage.setItem("profileId", JSON.stringify(profile.id));
        setProfileId(profile.id);
      }
    } else {
      localStorage.removeItem("profile");
      localStorage.removeItem("profileId");
      setProfileId(null);
    }
  }, [profile]);

  // 📥 Obtener perfil desde el backend
  const fetchProfile = useCallback(async (estudianteId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfileStudent(estudianteId);
      setProfile(data);
      if (data?.id) setProfileId(data.id);
    } catch (err) {
      setProfile(null);
      setProfileId(null);
      setError(
        err.message.includes("Estudiante no encontrado")
          ? "No tienes perfil creado. Debes crearlo para continuar."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // 🆕 Crear nuevo perfil
  const createProfile = useCallback(async (data, token) => {
    setLoading(true);
    setError(null);
    try {
      const newProfile = await createProfileStudent(data, token);
      setProfile(newProfile);
      if (newProfile?.id) {
        setProfileId(newProfile.id);
        localStorage.setItem("profileId", JSON.stringify(newProfile.id));
      }
      return newProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ✏️ Actualizar perfil existente
  const updateProfile = useCallback(async (id, data, token) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProfile = await putProfileStudent(id, data, token);
      setProfile(updatedProfile);
      if (updatedProfile?.id) setProfileId(updatedProfile.id);
      return updatedProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🗑️ Eliminar perfil
  const deleteProfile = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProfileStudent(id);
      setProfile(null);
      setProfileId(null);
      localStorage.removeItem("profile");
      localStorage.removeItem("profileId");
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearProfile = () => {
    setProfile(null);
    setProfileId(null);
    localStorage.removeItem("profile");
    localStorage.removeItem("profileId");
  };

  return (
    <ProfileStudentContext.Provider
      value={{
        profile,
        profileId,
        loading,
        error,
        fetchProfile,
        createProfile,
        updateProfile,
        deleteProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileStudentContext.Provider>
  );
};

