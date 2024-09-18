import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  username: string;
};

type AuthContextType = {
  isAuthenticated: () => boolean;
  getAuthToken: () => string | null;
  getUsername: () => string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const getUsername = () => {
    return localStorage.getItem('username');
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token !== null;
  };

  const login = (token: string, user: User) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token); // Store token in local storage
    localStorage.setItem('userId', user.id); // Store username in local storage
    localStorage.setItem('username', user.username); // Store ID in local storage
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAuthToken, getUsername, login, logout }}>
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
