import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: () => boolean;
  getAuthToken: () => string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token !== null;
  };

  const login = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token); // Store token in local storage
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAuthToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // TODO: need to understand use of useContext here
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
