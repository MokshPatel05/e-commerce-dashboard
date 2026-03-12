import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedExpiry = localStorage.getItem('sessionExpiry');

    if (storedUser && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      if (Date.now() < expiryTime) {
        setUser(JSON.parse(storedUser));
        setSessionExpiry(expiryTime);
      } else {
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (sessionExpiry) {
      const interval = setInterval(() => {
        if (Date.now() >= sessionExpiry) {
          logout();
          alert('Session expired. Please login again.');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sessionExpiry]);

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const userExists = users.some(u => u.email === userData.email);
    if (userExists) {
      throw new Error('User already exists with this email');
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const expiry = Date.now() + (5 * 60 * 1000);
    
    const userWithoutPassword = { name: user.name, email: user.email };
    setUser(userWithoutPassword);
    setSessionExpiry(expiry);
    
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    localStorage.setItem('sessionExpiry', expiry.toString());
  };

  const logout = () => {
    setUser(null);
    setSessionExpiry(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionExpiry');
  };

  const updateProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);

    if (userIndex === -1) {
      throw new Error('User not found. Please log out and log in again.');
    }

    users[userIndex] = { ...users[userIndex], ...updatedData };
    localStorage.setItem('users', JSON.stringify(users));

    const userWithoutPassword = { name: updatedData.name, email: updatedData.email };
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
  };

  const getTimeRemaining = () => {
    if (!sessionExpiry) return 0;
    const remaining = Math.max(0, sessionExpiry - Date.now());
    return Math.floor(remaining / 1000);
  };

  const value = {
    user,
    isLoading,
    register,
    login,
    logout,
    updateProfile,
    getTimeRemaining,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
