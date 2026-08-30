import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppShell from '../components/layout/AppShell';

// Pages
import Dashboard from '../pages/Dashboard';
import Browse from '../pages/Browse';
import FileDetails from '../pages/FileDetails';
import Upload from '../pages/Upload';
import MyUploads from '../pages/MyUploads';
import Notifications from '../pages/Notifications';
import FollowedSubjects from '../pages/FollowedSubjects';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Root redirect to Dashboard */}
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />

      {/* Standalone Auth Routes (without application sidebar/topbar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main App Layout */}
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        
        {/* Public Application Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="browse" element={<Browse />} />
        <Route path="files/:fileId" element={<FileDetails />} />
        <Route path="settings" element={<Settings />} />

        {/* Protected Application Routes */}
        <Route
          path="upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-uploads"
          element={
            <ProtectedRoute>
              <MyUploads />
            </ProtectedRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="followed-subjects"
          element={
            <ProtectedRoute>
              <FollowedSubjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
    </Routes>
  );
}
