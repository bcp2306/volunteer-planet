import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const MyOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
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

    fetchOpportunities();
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`https://w20042922.nuwebspace.co.uk/team-project/backend/jobs/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to remove');
      setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
    } catch (error) {
      console.error("Failed to remove opportunity:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header-title">My Opportunities</h1>
      {/* Updated button onClick to use navigate */}
      <button 
        onClick={() => navigate('/add-opportunity')} 
        className="add-opportunity-btn"
      >
        Add New Opportunity
      </button>
      <ul>
        {opportunities.map(opportunity => (
          <li key={opportunity.id} className="opportunity-item">
            <h2 className="opportunity-title">{opportunity.title}</h2>
            <p className="opportunity-description">{opportunity.description}</p>
            <div className="button-group">
              <button className="edit-btn" onClick={() => {/* edit page navigation */}}>
                Edit
              </button>
              <button className="remove-btn" onClick={() => handleRemove(opportunity.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOpportunities;
