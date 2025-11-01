import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CreateProfilePage } from "../page/profileStudentPage/CreateProfilePage";
import { Dashboard } from "../components/layout/Dashboard";
import { HabilidadesPage } from "../page/habilidadesPage/HabilidadesPage";
import { ListCertificadosPage } from "../page/certificadosPage/listCertificadosPage";
import { LoginPage } from "../page/oathPages/LoginPage";
import { PrivateRouters } from "./privateRouter/PrivateRouter";
import { ProjectListPage } from "../page/project/ProjectListPage";
import { RegisterPage } from "../page/oathPages/RegisterPage";
import { StudentProfilePage } from "../page/profileStudentPage/StudentProfilePage";

export const Routers = () => {
  return (
    <BrowserRouter>
      <section>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas privadas */}
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
            <Route path="lista-certificados" element={<ListCertificadosPage />} />
            <Route path="lista-habilidades" element={<HabilidadesPage />} />
          </Route>

          {/* ❌ Página de error 404 global */}
          <Route
            path="*"
            element={
              <div
                className="d-flex flex-column justify-content-center align-items-center vh-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  fontFamily: "'Poppins', sans-serif",
                  color: "#333",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                <i
                  className="bi bi-exclamation-triangle text-warning"
                  style={{ fontSize: "4rem", marginBottom: "1rem" }}
                ></i>
                <h1 className="fw-bold text-danger mb-3">Error 404</h1>
                <p className="fs-5 text-secondary mb-4">
                  La ruta que buscas no existe dentro del dashboard.
                </p>
                <a
                  href="/dashboard"
                  className="btn btn-warning text-white fw-semibold px-4 py-2 rounded-pill shadow-sm"
                >
                  <i className="bi bi-house-door me-2"></i> Volver al inicio
                </a>
              </div>
            }
          />
        </Routes>
      </section>
    </BrowserRouter>
  );
};
