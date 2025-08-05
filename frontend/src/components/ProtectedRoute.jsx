import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, token, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        // Save the attempted URL for redirecting after login
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute; 