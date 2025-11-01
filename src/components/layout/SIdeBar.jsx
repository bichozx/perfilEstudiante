import { Link, useLocation } from "react-router-dom";

import React from "react";
import universityBg from "../../assets/stock-photo-knowledge-concept-business-man-students-studying-researching-on-e-learning-for-training-and-2469762987.jpg"; // imagen nueva tipo universidad
import { useAuth } from "../../hooks/useAuth";

export const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard/perfil", label: "Mi Perfil", icon: "bi-person-circle" },
    { path: "/dashboard/lista-proyectos", label: "Mis Proyectos", icon: "bi-journal-bookmark-fill" },
    { path: "/dashboard/lista-certificados", label: "Mis Certificados", icon: "bi-mortarboard-fill" },
    { path: "/dashboard/lista-habilidades", label: "Mis Habilidades", icon: "bi-lightbulb-fill" },
  ];

  return (
    <>
      {/* Navbar superior visible solo en móvil */}
      <nav
        className="navbar navbar-dark d-md-none shadow-sm"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(3, 10, 40, 0.95), rgba(3, 10, 40, 0.85)), url(${universityBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand fw-bold text-warning">Portal Estudiantil</span>
        </div>
      </nav>

      {/* Sidebar fija en desktop / offcanvas en móvil */}
      <div
        className="offcanvas-md offcanvas-start text-bg-dark sidebar"
        id="offcanvasSidebar"
        tabIndex="-1"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(3, 10, 40, 0.95), rgba(3, 10, 40, 0.85)), url(${universityBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "2px 0 12px rgba(0,0,0,0.35)",
        }}
      >
        <div className="offcanvas-header d-flex d-md-none">
          <h5 className="offcanvas-title text-warning fw-bold">Portal Estudiantil</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body d-flex flex-column p-4">
          <div className="text-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="Logo universidad"
              width="80"
              className="mb-3"
              style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.4))" }}
            />
            <h5 className="fw-bold text-uppercase text-warning d-none d-md-block">
              Universidad Virtual
            </h5>
          </div>

          <ul className="nav nav-pills flex-column mb-auto">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link d-flex align-items-center gap-2 py-2 px-3 mb-2 fw-semibold ${
                    location.pathname === item.path
                      ? "active-link"
                      : "text-light"
                  }`}
                  data-bs-dismiss="offcanvas"
                >
                  <i className={`bi ${item.icon} fs-5`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button
              onClick={logout}
              className="btn btn-outline-light w-100 fw-semibold py-2"
              style={{ borderRadius: "12px" }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>Salir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
