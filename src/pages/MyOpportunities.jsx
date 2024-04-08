 /**
 * MyOpportunities
 *
 * This page fetch volunteer opportunites from the jobs database and list them on the main page.
 * It enables the users with admin permission '1' (from users database) to remove posted volunteer opportunities (located in the jobs database).
 * Both authentication and admin status are verified before displaying any content.
 * 
 * Due to CORS problems related to the POST requests, the process of removing new opportunities is a simulation
 * [...] instead of actually removing the volunteer opportunity from the database Jobs.
 *
 * @author Kevin Osminski
 */

 // All the necessary libraries, hooks alongside navigation + authentication context.
 import React, { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useAuth } from '../AuthContext';

 // Stylesheet import.
 import '../MyOpportunities.css';

 const MyOpportunities = () => {

  // State used to hold opportunities that were fetched from the backend.
  const [opportunities, setOpportunities] = useState([]);
  
  // Navigation between routes.
  const navigate = useNavigate();

  // Hook to access authentication status and admin flag.
  const { isAuthenticated, isAdmin } = useAuth();
 
  useEffect(() => {

    // Authentication status and role logging for debugging purposes.
    console.log("Authenticated:", isAuthenticated);
    console.log("Admin:", isAdmin);

    // Redirection of non-authenticated or non-admin users.
    if (!isAuthenticated || !isAdmin) {
      navigate('/user');
      return;
    }

    // Fetching opportunities from the backend and updating the state.
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('https://w20042922.nuwebspace.co.uk/team-project/backend/jobs');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error("Failed to fetch opportunities:", error);
      }
    };
    
    // Fetch function.
    fetchOpportunities();

  // Ensures that the effect runs only when authentication status or role changes.
  }, [isAuthenticated, isAdmin, navigate])
 
  // Handler used for removing opportunities - in this scenario, simulating it.
   const handleRemove = (id) => {
     if (window.confirm("Do you want to remove this opportunity?")) {

      // Filters out the removed opportunity from the local state.
       setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
       alert('Opportunity removed successfully.');
     }
   };
 
   // Renders the list of opportunities with remove option.
   return (
    <div className="opportunities-container">
      <h1 className="header-title">Add New Opportunity</h1>
      <button onClick={() => navigate('/add-opportunity')} className="add-opportunity-btn">
        Add New Opportunity
      </button>
      <h1 className="opportunities-title">My Opportunities</h1>
      <ul>
        {opportunities.map(opportunity => (
          <li key={opportunity.id} className="opportunity-item">
            <h2 className="opportunity-title">{opportunity.title}</h2>
            <p className="opportunity-description">{opportunity.description}</p>
            <div className="button-group">
             <button className="remove-btn" onClick={() => handleRemove(opportunity.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
 export default MyOpportunities;