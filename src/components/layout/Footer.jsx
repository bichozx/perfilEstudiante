import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-auto w-full">
      <div className="container mx-auto py-3 text-center">
        <p className="text-gray-600 text-sm mb-0">
          © {new Date().getFullYear()} Sistema Educativo — Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};