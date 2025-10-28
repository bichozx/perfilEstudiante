import { Link, useLocation } from "react-router-dom";

import React from "react";
import universityBg from "../../assets/photo-1503676260728-1c00da094a0b.jpg";
import { useAuth } from "../../hooks/useAuth";

export const Sidebar = () => {
  const { logout } = useAuth();
  
  const location = useLocation();

  
  

  const menuItems = [
    { path: "/dashboard/perfil", label: "Mi Perfil", icon: "bi-person" },
    { path: "/dashboard/lista-proyectos", label: "Mis Proyectos", icon: "bi-folder2" },
    { path: "/dashboard/lista-certificados", label: "Mis Certificados", icon: "bi-award" },
    { path: "/dashboard/lista-habilidades", label: "Mis Habilidades", icon: "bi-award" },
  ];

  return (
    <>
      {/* Navbar superior visible solo en móvil */}
      <nav
        className="navbar navbar-dark bg-dark d-md-none"
        style={{
          backgroundImage: `linear-gradient(rgba(3, 4, 24, 0.9), rgba(3, 4, 24, 0.9)), url(${universityBg})`,
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
          backgroundImage: `linear-gradient(rgba(3, 4, 24, 0.9), rgba(3, 4, 24, 0.9)), url(${universityBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <div className="offcanvas-header d-flex d-md-none">
          <h5 className="offcanvas-title text-warning fw-bold">Portal Estudiantil</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column p-4">
          <div className="text-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Logo universidad"
              width="70"
              className="mb-2"
            />
            <h5 className="fw-bold text-uppercase text-warning d-none d-md-block">
              Portal Estudiantil
            </h5>
          </div>

          <ul className="nav nav-pills flex-column mb-auto">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link mb-2 fw-semibold ${
                    location.pathname === item.path
                      ? "active-link"
                      : "text-light"
                  }`}
                  data-bs-dismiss="offcanvas"
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button
              onClick={logout}
              className="btn btn-outline-light w-100 fw-semibold"
            >
              <i className="bi bi-box-arrow-right me-2"></i>Salir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
