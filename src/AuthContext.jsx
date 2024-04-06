import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.isAdmin = parsedUser.admin ?? false;
      setUser(parsedUser);
    }
  }, []);

  const login = (userData) => {
    const userDataWithAdminFlag = {
      ...userData,
      isAdmin: userData.admin ?? false,
    };
    setUser(userDataWithAdminFlag);
    localStorage.setItem('user', JSON.stringify(userDataWithAdminFlag));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const isAuthenticated = !!user;
  const isAdmin = !!user?.isAdmin;

  const value = { user, isAuthenticated, isAdmin, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;