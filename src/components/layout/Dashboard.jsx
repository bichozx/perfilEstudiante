import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Footer } from "./Footer";
import { Sidebar } from "./SIdeBar";
import universityBg from "../../assets/1000_F_661675064_Nik1LLgveyKeqZu2ZtwH0CxHpq63NuFq.jpg";
import { useAuth } from "../../hooks/useAuth";

export const Dashboard = () => {
  const { user } = useAuth();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

  useEffect(() => {
    const handleProfileImageUpdate = () => {
      const updatedImage =
        localStorage.getItem("profileImage") ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
      setProfileImage(updatedImage);
    };

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate);
    return () => {
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate);
    };
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div
      className="d-flex flex-column flex-md-row min-vh-100"
      style={{
        backgroundImage: `url(${universityBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Poppins', sans-serif",
        backdropFilter: "blur(6px)",
      }}
    >
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1">
        {/* HEADER */}
        <header
          className="py-3 px-4 border-bottom shadow-sm d-flex justify-content-between align-items-center"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <h4 className="fw-bold text-primary mb-0">
            <i className="bi bi-mortarboard me-2 text-warning"></i>
            Portal Estudiantil
          </h4>

          <div className="d-none d-md-flex align-items-center">
            <span className="me-3 text-secondary fw-semibold">
              {user?.userName || "Estudiante"}
            </span>
            <img
              src={profileImage}
              alt="Estudiante"
              className="rounded-circle border border-2 border-warning shadow-sm"
              width="40"
              height="40"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-grow-1 d-flex justify-content-center align-items-start p-3 p-md-4">
          <div className="container-fluid">
            <div
              className="p-4 rounded-4 animate__animated animate__fadeIn shadow-lg"
              style={{
                minHeight: "75vh",
                background: "rgba(255, 255, 255, 0.45)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Outlet />

              {!user?.perfil && (
                <div className="text-center text-secondary py-5">
                  <i
                    className="bi bi-journal-bookmark-fill text-warning"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <h5 className="mt-3 fw-semibold text-primary">
                    Bienvenido al Portal Estudiantil
                  </h5>
                  <p className="text-muted">
                    Aquí podrás gestionar tu perfil, proyectos y certificados.
                  </p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3201/3201051.png"
                    alt="Estudios"
                    className="opacity-75 mt-3"
                    width="120"
                  />
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

