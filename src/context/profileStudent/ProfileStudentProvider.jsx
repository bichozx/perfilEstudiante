import React, { useCallback, useEffect, useState } from "react";

import { ProfileStudentContext } from "./ProfileStudentContext";
import { createProfileStudent } from "../../services/profileStudent/createProfileStudent";
import { deleteProfileStudent } from "../../services/profileStudent/deleteProfileStudent";
import { getProfileStudent } from "../../services/profileStudent/getProfileStudent";
import { putProfileStudent } from "../../services/profileStudent/putProfileStudent";

export const ProfileStudentProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    // ✅ Carga inicial desde localStorage (si existe)
    const saved = localStorage.getItem("profile");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔁 Sincroniza cada vez que cambia el perfil
  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("profile");
    }
  }, [profile]);

  // Obtener perfil
  const fetchProfile = useCallback(async (estudianteId) => {
    
    setLoading(true);
    setError(null);
    try {
      const data = await getProfileStudent(estudianteId);
      setProfile(data);
    } catch (err) {
      setProfile(null);
      setError(
        err.message.includes("Estudiante no encontrado")
          ? "No tienes perfil creado. Debes crearlo para continuar."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear perfil
  const createProfile = useCallback(async (data, token) => {
    
    setLoading(true);
    setError(null);
    try {
      const newProfile = await createProfileStudent(data, token);
      setProfile(newProfile);
      return newProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar perfil
  const updateProfile = useCallback(async (id, data, token) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProfile = await putProfileStudent(id, data, token);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar perfil
  const deleteProfile = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProfileStudent(id);
      setProfile(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearProfile = () => setProfile(null);

  return (
    <ProfileStudentContext.Provider
      value={{
        profile,
        loading,
        error,
        fetchProfile,
        clearProfile,
        createProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileStudentContext.Provider>
  );
};

