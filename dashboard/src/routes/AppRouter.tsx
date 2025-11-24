import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardHome from '@/pages/DashboardHome';

const AppRouter = () => {
  // TODO: Add authentication check
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<DashboardHome />} />
        {/* Add more dashboard routes here */}
      </Route>
    </Routes>
  );
};

export default AppRouter;

