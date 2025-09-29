import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import Linktree from './components/Linktree';
import { sampleProfile } from './data/sampleProfile';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/auth" />;
};

// Demo Route Component
const DemoRoute: React.FC = () => {
  return <Linktree profile={sampleProfile} />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/demo" element={<DemoRoute />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/:username" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
