import React, { useEffect, } from 'react';
import { useAuth, useProfileStudent } from '../../hooks/useAuth';

import { PerfilEstudiante } from '../../components/profileStuden/PerfilEstudiante';
import { ProfileEmptyCard } from '../../components/profileStuden/ProfileEmptyCard';
import { useNavigate } from 'react-router-dom';

export const StudentProfilePage = () => {
  const { user } = useAuth();
  const { profile, fetchProfile, loading, error } = useProfileStudent();
  
  const navigate = useNavigate();
    
  

  useEffect(() => {
    if (user?.estudianteId) fetchProfile(user.estudianteId);
  }, [user, fetchProfile]);

  const handleCreateProfile = () => {
     navigate("/dashboard/create-profile");  
  };

  if (loading) return <p className="text-center mt-5">Cargando perfil...</p>;

  if (error || !profile) {
    return (
      <ProfileEmptyCard
        message={{
          title: error ? "Ocurrió un error" : "Aún no tienes perfil",
          subtitle: error
            ? `${error}.`
            : "Para acceder a tu información académica, debes crear tu perfil de estudiante."
        }}
        buttonText="Crear Perfil"
        buttonAction={handleCreateProfile}
      />
    );
  }

  return <PerfilEstudiante 
  profile={profile} 

  />;
};
