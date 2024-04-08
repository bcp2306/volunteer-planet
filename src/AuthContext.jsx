/**
 * AuthContext
 * 
 * This page is responsible for authentication management. 
 * It creates and exports a context (AuthContext) and a hook (useAuth) for accessing authentication-related data and functions throughout the website. 
 * This include the logging in/out as well as checking the user/admin status.
 * 
 * @author Kevin Osminski
 */

// Imports all the necessary libraries and hooks.
import React, { createContext, useState, useContext, useEffect } from 'react';

// Context for authentication.
const AuthContext = createContext();

// Hook that allows anybody who calls useAuth to have access to auth data and functions.
export const useAuth = () => useContext(AuthContext);

// Provides the authentication context to child components and initialise user state, handles login/out functions as well as checks for the user status.
export const AuthProvider = ({ children }) => {

  // Keeps track of the user. If null = nobody's logged in.
  const [user, setUser] = useState(null);

/**
 * Hook to check for an user in local stoarge.
 * If found, it updates the user state to reflect the authenticated status. 
 */ 

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); 
      parsedUser.isAdmin = parsedUser.admin ?? false; 
      setUser(parsedUser); 
    }
  }, []);

  // Function that handles the user login. It accepts userData, assigns admin rights, and updates user state and local storage.
  const login = (userData) => {
    const userDataWithAdminFlag = {
      ...userData,
      isAdmin: userData.admin ?? false,
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
    };

    // Update user state with new data.
    setUser(userDataWithAdminFlag); 

    // Store user data in local storage.
    localStorage.setItem('user', JSON.stringify(userDataWithAdminFlag)); 
  };

  // Function that logs out the current user. Clears user state & removes the data from local stoareeg.
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Boolean flags that quickly access the user's authentication and admin status.
  const isAuthenticated = !!user;
  const isAdmin = !!user?.isAdmin;

  // Preparing the context value with user data, authentication status, and auth functions.
  const value = { user, isAuthenticated, isAdmin, login, logout };

  // Wrapping children components with AuthContext provider to share the state and functions.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;