import React, { useState } from "react";
import { useAuth, useProfileStudent } from "../../hooks/useAuth";

import { CreateProfileComponent } from "../../components/profileStuden/CreateProfileComponent";
import { createProfileStudent } from '../../services/profileStudent/createProfileStudent';

export const CreateProfilePage = () => {
  const { user, token } = useAuth();
  const { fetchProfile } = useProfileStudent();

  const [formData, setFormData] = useState({
    resumen: "",
    intereses: "",
    experiencia: "",
    programa: "",
    semestre: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = { ...formData, estudianteId: user.estudianteId  };
      await createProfileStudent(dataToSend, token);

      alert("Perfil creado correctamente");
      setFormData({
        estudianteId:"",
        resumen: "",
        intereses: "",
        experiencia: "",
        programa: "",
        semestre: "",
      });

      // Refrescar perfil en el contexto
      fetchProfile(user.estudianteId);
    } catch (error) {
      console.error(error);
      alert("Error al crear el perfil. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateProfileComponent
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      loading={loading}
    />
  );
};
