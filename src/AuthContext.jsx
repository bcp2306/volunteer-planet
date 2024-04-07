/**
 * AuthContext
 * 
 * This component is responsible for authentication management. 
 * It creates and exports a context (AuthContext) and a hook (useAuth) for accessing authentication-related data and functions throughout the website. 
 * 
 * 
 * @author Kevin Osminski
 */
import React, { createContext, useState, useContext, useEffect } from 'react';

// Creation of a context for authentication. This will be used to provide the authentication state throughout the application.
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  // State to keep track of the current user. Null when no user is logged in.
  const [user, setUser] = useState(null);

  // Checks for a user in local storage.
  // If a user is found, it updates the state to reflect the user's authenticated status.
  useEffect(() => {
    // Retrieve user data from local storage.
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      // Parse the user data from string to object.
      const parsedUser = JSON.parse(storedUser); 
      // Ensure isAdmin attribute exists.
      parsedUser.isAdmin = parsedUser.admin ?? false; 
      // Update state with the authenticated user.
      setUser(parsedUser); 
    }
  }, []);

  // Function to handle user login. It accepts userData, assigns admin rights, and updates user state and local storage.
  const login = (userData) => {
    const userDataWithAdminFlag = {
      ...userData,
      isAdmin: userData.admin ?? false,
    };
    // Update user state with new data.
    setUser(userDataWithAdminFlag); 
    // Store user data in local storage.
    localStorage.setItem('user', JSON.stringify(userDataWithAdminFlag)); 
  };

  // Function to handle user logout. Clears user state and removes user data from local storage.
  const logout = () => {
    // Reset user state to null, indicating no user is logged in.
    setUser(null); 
    // Remove user data from local storage to complete logout.
    localStorage.removeItem('user'); 
  };
  
  // States for easy access to common authentication checks.
  // Boolean value that indicates if the user is authenticated
  const isAuthenticated = !!user; 
  // Boolean value that indicates if the authenticated user is an admin.
  const isAdmin = !!user?.isAdmin; 

  // The context value, including the user state, authentication checks, and auth functions, to be provided to children.
  const value = { user, isAuthenticated, isAdmin, login, logout };

  // Return statement to provide the authentication context to child components.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;