"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, initialUser }) {
    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (initialUser) {
            setUser(initialUser);
        }
        setLoading(false);
    }, [initialUser]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
