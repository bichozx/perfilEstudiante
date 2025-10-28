import { Navigate, Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import React from 'react';
import { Sidebar } from './SIdeBar';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1">
        <main className="flex-grow-1 d-flex justify-content-center align-items-start p-3 p-md-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
