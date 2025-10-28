import * as yup from 'yup';

import { LoginComponent } from '../../components/oauthComponent/LoginComponent';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

// Validación con Yup
const schema = yup.object({
  correo: yup
    .string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

export const LoginPage = () => {
  const { loginUser } = useAuth();
  
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
    

  const onSubmit = async (data) => {
    try {
      await loginUser(data.correo, data.password);
     
      
      setToast({
        show: true,
        message: 'Inicio de sesión exitoso',
        type: 'success',
      });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setToast({
        show: true,
        message: 'Credenciales incorrectas o error del servidor', err,
        type: 'error',
      });
    }
  };
  return (
    <>
      <LoginComponent
        toast={toast}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </>
  );
};
