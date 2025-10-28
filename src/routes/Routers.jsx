// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// import { CreateProfilePage } from '../page/profileStudentPage/CreateProfilePage';
// import { Dashboard } from '../components/layout/Dashboard';
// import { HabilidadesPage } from '../page/habilidadesPage/HabilidadesPage';
// import { ListCertificadosPage } from '../page/certificadosPage/listCertificadosPage';
// import { LoginPage } from '../page/oathPages/LoginPage';
// import { PrivateRouters } from './privateRouter/PrivateRouter';
// import { ProjectListPage } from '../page/project/ProjectListPage';
// import { RegisterPage } from '../page/oathPages/RegisterPage';
// import { StudentProfilePage } from '../page/profileStudentPage/StudentProfilePage';

// export const Routers = () => {
//   return (
//     <BrowserRouter>
//     <section>
//       <Routes>
//         {/* Públicas */}
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />

//         {/* Privadas */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRouters>
//               <Dashboard />
//             </PrivateRouters>
//           }
//         >
//           <Route index element={<StudentProfilePage />} />
//           <Route path="perfil" element={<StudentProfilePage />} />
//           <Route path="create-profile" element={<CreateProfilePage />} />
//           <Route path="lista-proyectos" element={<ProjectListPage />} />
//           <Route path="lista-Certificados" element={<ListCertificadosPage />} />
//           <Route path="lista-habilidades" element={<HabilidadesPage />} />
//         <Route
//               path="error"
//               element={
//                 <div>
//                   <h1 className="heading">Error 404</h1>
//                 </div>
//               }
//             />
          
//         </Route>
//       </Routes>
//       </section>
//     </BrowserRouter>
//   );
// };

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CreateProfilePage } from '../page/profileStudentPage/CreateProfilePage';
import { Dashboard } from '../components/layout/Dashboard';
import { HabilidadesPage } from '../page/habilidadesPage/HabilidadesPage';
import { ListCertificadosPage } from '../page/certificadosPage/listCertificadosPage';
import { LoginPage } from '../page/oathPages/LoginPage';
import { PrivateRouters } from './privateRouter/PrivateRouter';
import { ProjectListPage } from '../page/project/ProjectListPage';
import { RegisterPage } from '../page/oathPages/RegisterPage';
import { StudentProfilePage } from '../page/profileStudentPage/StudentProfilePage';

export const Routers = () => {
  return (
    <BrowserRouter>
      <section>
        <Routes>
          
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          
          <Route
            path="/dashboard"
            element={
              <PrivateRouters>
                <Dashboard />
              </PrivateRouters>
            }
          >
            <Route index element={<StudentProfilePage />} />
            <Route path="perfil" element={<StudentProfilePage />} />
            <Route path="create-profile" element={<CreateProfilePage />} />
            <Route path="lista-proyectos" element={<ProjectListPage />} />
            <Route path="lista-Certificados" element={<ListCertificadosPage />} />
            <Route path="lista-habilidades" element={<HabilidadesPage />} />
            
           
            <Route
              path="*"
              element={
                <div>
                  <h1 className="heading">Error 404 - Página no encontrada</h1>
                  <p>La ruta que buscas no existe dentro del dashboard</p>
                </div>
              }
            />
          </Route>

          
          <Route
            path="*"
            element={
              <div>
                <h1 className="heading">Error 404</h1>
                <p>La página que buscas no existe</p>
              </div>
            }
          />
        </Routes>
      </section>
    </BrowserRouter>
  );
};