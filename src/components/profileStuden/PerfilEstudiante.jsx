// // src/components/profileStuden/PerfilEstudiante.jsx
// import React, { useState } from "react";

// import { CreateProjectModal } from '../projects/modalProject/CreateProjectModal';
// import { DeleteProfileModal } from "./modalsProfile/DeleteProfileModal";
// import { EditProfileModal } from "./modalsProfile/EditProfileModal";
// import { useProfileStudent } from '../../hooks/useAuth';

// export const PerfilEstudiante = ({ profile, handleView }) => {
//   const [showEdit, setShowEdit] = useState(false);
//   const [showDelete, setShowDelete] = useState(false);
//   const [showProject, setShowProject] = useState(false);

//   const { deleteProfile, updateProfile } = useProfileStudent();

//   return (
//     <>
//       <div className="container py-4">
//         <div
//           className="card shadow rounded-4 p-4"
//           style={{ backgroundColor: "#f8f9fa", borderLeft: "6px solid #003366" }}
//         >
//           <div className="d-flex align-items-center mb-4">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
//               alt="Perfil"
//               className="me-3 rounded-circle"
//               width="80"
//             />
//             <div>
//               <h3
//                 className="fw-bold mb-1"
//                 style={{ color: "#003366", fontFamily: "Playfair Display, serif" }}
//               >
//                 Mi Perfil
//               </h3>
//               <p className="text-secondary mb-0" style={{ fontFamily: "Lora, serif" }}>
//                 Información personal del estudiante
//               </p>
//             </div>
//           </div>

//           <div className="row mt-3">
//             {[
//               { label: "Nombre", value: profile.nombre || "No registrado" },
//               { label: "Correo", value: profile.correo || "No registrado" },
//               { label: "Rol", value: profile.rol || "Estudiante" },
//               { label: "Estado", value: profile.estado || "Activo" },
//             ].map((item, idx) => (
//               <div className="col-md-6 mb-3" key={idx}>
//                 <strong className="text-dark">{item.label}:</strong>
//                 <p className="mb-0" style={{ fontFamily: "Source Sans Pro, sans-serif" }}>
//                   {item.value}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="d-flex mt-4">
//             <button
//               className="btn btn-sm me-2"
//               style={{
//                 backgroundColor: "#003366",
//                 color: "#fff",
//                 fontWeight: "600",
//                 borderRadius: "0.375rem",
//               }}
//               onClick={() => setShowEdit(true)}
//             >
//               <i className="fas fa-edit me-1"></i> Editar
//             </button>
//             <button
//               className="btn btn-sm me-2"
//               style={{
//                 backgroundColor: "#8B2323",
//                 color: "#fff",
//                 fontWeight: "600",
//                 borderRadius: "0.375rem",
//               }}
//               onClick={() => setShowDelete(true)}
//             >
//               <i className="fas fa-trash me-1"></i> Eliminar
//             </button>
//             <button
//               className="btn btn-sm"
//               style={{
//                 backgroundColor: "#5E2612",
//                 color: "#fff",
//                 fontWeight: "600",
//                 borderRadius: "0.375rem",
//               }}
//               onClick={() => handleView(profile)}
//             >
//               <i className="fas fa-eye me-1"></i> Ver
//             </button>
//             <button
//               className="btn btn-sm mb-2"
//               style={{
//                 backgroundColor: "#198754",
//                 color: "#fff",
//                 fontWeight: "600",
//                 borderRadius: "0.375rem",
//               }}
//               onClick={() => setShowProject(true)}
//             >
//               <i className="fas fa-plus me-1"></i> Crear Proyecto
//             </button>
//           </div>
//         </div>
//       </div>

//       <EditProfileModal
//         show={showEdit}
//         handleClose={() => setShowEdit(false)}
//         profile={profile}
//         updateProfile={updateProfile}
//       />

//       <DeleteProfileModal
//         show={showDelete}
//         handleClose={() => setShowDelete(false)}
//         handleDelete={async () => {
//           try {
//             await deleteProfile(profile.id);
//             setShowDelete(false);
//           } catch (err) {
//             console.error(err);
//             alert("Error al eliminar el perfil");
//           }
//         }}
//       />
//        {/* 🔥 Modal para crear proyecto */}
//       <CreateProjectModal
//         show={showProject}
//         handleClose={() => setShowProject(false)}
//         profile={profile}
//       />
//     </>
//   );
// };

import React, { useState } from 'react';

import { CreateCertificadoModal } from '../certificadosComponent/CreateCertificadoModal';
import { CreateHabilidadModal } from '../habilidadComponent/CreateHabilidadModal';
import { CreateProjectModal } from '../projects/modalProject/CreateProjectModal';
import { DeleteProfileModal } from './modalsProfile/DeleteProfileModal';
import { EditProfileModal } from './modalsProfile/EditProfileModal';
import { useProfileStudent } from '../../hooks/useAuth';

export const PerfilEstudiante = ({ profile, handleView }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [showHabilidad, setShowHabilidad] = useState(false);
  

  const { deleteProfile, updateProfile } = useProfileStudent();

  return (
    <>
      <div className="container py-4">
        <div
          className="card shadow-lg rounded-4 p-4"
          style={{
            backgroundColor: '#f8f9fa',
            borderLeft: '6px solid #003366',
            fontFamily: 'Source Sans Pro, sans-serif',
          }}
        >
          <div className="d-flex align-items-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
              alt="Perfil"
              className="me-3 rounded-circle border border-2 border-primary"
              width="80"
            />
            <div>
              <h3
                className="fw-bold mb-1"
                style={{
                  color: '#003366',
                  fontFamily: 'Playfair Display, serif',
                }}
              >
                Mi Perfil
              </h3>
              <p
                className="text-secondary mb-0"
                style={{ fontFamily: 'Lora, serif' }}
              >
                Información personal del estudiante
              </p>
            </div>
          </div>

          <div className="row mt-3">
            {[
              { label: 'Nombre', value: profile.nombre || 'No registrado' },
              {
                label: 'Intereses',
                value: profile.intereses || 'No registrado',
              },
              { label: 'Rol', value: profile.rol || 'Estudiante' },
              { label: 'Estado', value: profile.estado || 'Activo' },
            ].map((item, idx) => (
              <div className="col-md-6 mb-3" key={idx}>
                <strong className="text-dark">{item.label}:</strong>
                <p className="mb-0">{item.value}</p>
              </div>
            ))}
          </div>

          {/* 🔘 Botones de acciones */}
          <div className="d-flex flex-wrap gap-2 mt-4">
            <button
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(90deg, #004AAD 0%, #0074B7 100%)',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
              onClick={() => setShowEdit(true)}
            >
              <i className="fas fa-edit me-1"></i> Editar
            </button>

            <button
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(90deg, #8B2323, #B83A3A)',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
              onClick={() => setShowDelete(true)}
            >
              <i className="fas fa-trash me-1"></i> Eliminar
            </button>

            <button
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(90deg, #5E2612, #7B3F24)',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
              onClick={() => handleView(profile)}
            >
              <i className="fas fa-eye me-1"></i> Ver
            </button>

            <button
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(90deg, #198754, #28A745)',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
              }}
              onClick={() => setShowProject(true)}
            >
              <i className="fas fa-plus me-1"></i> Crear Proyecto
            </button>
            <button
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(90deg, #198754, #28A745)',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
              }}
              onClick={() => setShowCertificado(true)}
            >
              <i className="fas fa-plus me-1"></i> Crear Certificado
            </button>
            <button
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(90deg, #198754, #28A745)',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
              }}
              onClick={() => setShowHabilidad(true)}
            >
              <i className="fas fa-plus me-1"></i> Crear Habilidad
            </button>
          </div>
        </div>
      </div>

      {/* Modales */}
      <EditProfileModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        profile={profile}
        updateProfile={updateProfile}
      />

      <DeleteProfileModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        handleDelete={async () => {
          try {
            await deleteProfile(profile.id);
            setShowDelete(false);
          } catch (err) {
            console.error(err);
            alert('Error al eliminar el perfil');
          }
        }}
      />

      {/* 🔥 Modal para crear proyecto */}
      <CreateProjectModal
        show={showProject}
        handleClose={() => setShowProject(false)}
        profile={profile}
      />

      <CreateCertificadoModal
        show={showCertificado}
        handleClose={() => setShowCertificado(false)}
        perfilId={profile.id}
      />

      <CreateHabilidadModal
  show={showHabilidad}
  handleClose={() => setShowHabilidad(false)}
  perfilId={profile.id}
/>
    </>
  );
};
