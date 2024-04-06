import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'AuthContext';
import MyOpportunities from './pages/MyOpportunities';
import Home from './pages/Home';
import User from './pages/User';

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