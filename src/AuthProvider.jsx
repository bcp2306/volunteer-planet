/**
 * AuthProvider
 * The main application component that wraps everything inside the AuthProvider and Router.
 *
 * This component sets up the main routes and ensuring that authentication context is provided throughout the application. 
 * It makes use of the AuthProvider to wrap the Router and its Routes, enabling any child component to have access to the authentication state and functions.
 *
 * This setup helps with the navigation within the application, making it single-page and enhancing the user experience
 * by avoiding unnecessary page reloads.
 * 
 * @author Kevin Osminski
 */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'AuthContext';
import MyOpportunities from './pages/MyOpportunities';
import Home from './pages/Home';
import User from './pages/User';

// App component that serves as the main entry point for our application.
// AuthProvider component wraps the Router to ensure all components have access to authentication context.
// Route '/' is for the Home page. When the path is '/', the Home component is rendered.
// Route '/user' is for the User page. It renders when the path is '/user'.
// Route '/my-opportunities' is for the My Opportunities page. This is where users can view and manage volunteer opportunities.

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/my-opportunities" element={<MyOpportunities />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
