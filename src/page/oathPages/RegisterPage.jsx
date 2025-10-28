// src/pages/oauthPages/RegisterPage.jsx
import * as yup from "yup";

import React, { useState } from "react";

import { RegisterComponent } from "../../components/oauthComponent/RegisterComponent";
import Spinner from '../../components/utils/Spinner';
import ToastMessage from "../../components/utils/Toast";
import { useAuth } from '../../hooks/useAuth';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";

// 👈 importante

// ✅ Esquema de validación
const schema = yup.object({
  programa: yup.string().required("El programa es obligatorio"),
  semestre: yup.string().required("El semestre es obligatorio"),
  promedio: yup.number().min(0).max(5).required("El promedio es obligatorio"),
  fechaNacimiento: yup.date().required("La fecha de nacimiento es obligatoria"),
  nombre: yup.string().required("El nombre es obligatorio"),
  correo: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

export const RegisterPage = () => {
  const { registerStudent } = useAuth(); // 👈 accede al contexto
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
 const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Estructuramos el objeto según el backend
      const studentData = {
        programa: data.programa,
        semestre: data.semestre,
        promedio: data.promedio,
        fechaNacimiento: data.fechaNacimiento,
        usuario: {
          nombre: data.nombre,
          correo: data.correo,
          password: data.password,
          rol: "Estudiante",
          estado: "Activo",
        },
      };

      await registerStudent(studentData);

      setToast({ show: true, message: "Registro exitoso", type: "success" });
      reset();
      // opcional: redirigir a login o dashboard
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setToast({
        show: true,
        message: "Error al registrar. Intenta nuevamente.", err,
        type: "error",
      });
    }
  };

  return (
    <>
      {isSubmitting ? ( // 👈 mientras se envía el formulario, muestra el Spinner
        <Spinner/>
      ) : (
        <RegisterComponent
          toast={toast}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          ToastMessage={ToastMessage}
        />
      )}
       {toast.show && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </>
  );
};
