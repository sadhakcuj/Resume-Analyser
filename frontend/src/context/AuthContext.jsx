import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getToken, logout as logoutService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = getCurrentUser();
        const storedToken = getToken();

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }

        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        logoutService();
    };

    const isAuthenticated = () => {
        return !!user && !!token;
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            loading,
            isAuthenticated
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 