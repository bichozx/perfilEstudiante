import React, { useState } from "react";
import { useAuth, useProfileStudent } from "../../hooks/useAuth";

import { CreateProfileComponent } from "../../components/profileStuden/CreateProfileComponent";
import ToastMessage from "../../components/utils/Toast"; // asegúrate de importar la ruta correcta

export const CreateProfilePage = () => {
  const { user } = useAuth();
  const { createProfile } = useProfileStudent();

  const [formData, setFormData] = useState({
    resumen: "",
    intereses: "",
    experiencia: "",
    programa: "",
    semestre: "",
  });

  

  const [loading, setLoading] = useState(false);

  // Estados del toast
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        estudianteId: user?.estudianteId || user?.userId,
      };

      const newProfile = await createProfile(dataToSend, user.token);

      if (newProfile) {
        setToast({
          show: true,
          message: "✅ Perfil creado correctamente",
          type: "success",
        });
        setFormData({
          resumen: "",
          intereses: "",
          experiencia: "",
          programa: "",
          semestre: "",
        });
      }
    } catch (error) {
      console.error("❌ Error al crear perfil:", error);
      setToast({
        show: true,
        message: "❌ Error al crear el perfil. Intenta nuevamente.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CreateProfileComponent
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        loading={loading}
      />

      {/* Toast flotante */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <ToastMessage
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      </div>
    </>
  );
};


