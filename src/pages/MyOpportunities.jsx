import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate();

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

    // For now, as i can't manage to set-up the connection to the DB because of unknown POST requests
    // the form simulates the process of removing the new opportunity instead.
    // Will work with Brad & Sean on implementing this.

  const handleRemove = (id) => {
    if (window.confirm("Do you want to remove this opportunity?")) {
      setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
      alert('Opportunity removed successfully.');
    }
  };

  return (
    <div className="container">
      <h1 className="header-title">My Opportunities</h1>
      <button onClick={() => navigate('/add-opportunity')} 
        className="add-opportunity-btn">
        Add New Opportunity
      </button>
      <ul>
        {opportunities.map(opportunity => (
          <li key={opportunity.id} className="opportunity-item">
            <h2 className="opportunity-title">{opportunity.title}</h2>
            <p className="opportunity-description">{opportunity.description}</p>
            <div className="button-group">
              <button onClick={() => navigate(`/edit-opportunity/${opportunity.id}`)}>Edit</button>
              <button className="remove-btn" onClick={() => handleRemove(opportunity.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOpportunities;