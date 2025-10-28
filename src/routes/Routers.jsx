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
        {/* Públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Privadas */}
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
        
          
        </Route>
      </Routes>
      </section>
    </BrowserRouter>
  );
};
