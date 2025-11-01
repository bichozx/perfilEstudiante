import React from "react";

export const Footer = () => {
  return (
    <footer
      className="mt-auto w-100 py-3 text-center text-white"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.3)",
        color: "#2c2c2c",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p className="mb-0 fw-medium">
        © {new Date().getFullYear()} <span className="text-primary">Sistema Educativo</span> — Todos los derechos reservados
      </p>
    </footer>
  );
};
