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

  const handleRemove = async (id) => {
    if (window.confirm("Do you want to remove this opportunity?")) {
      try {
        const response = await fetch(`https://w20042922.nuwebspace.co.uk/team-project/backend/jobs/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to remove');
        setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
        alert('Opportunity removed successfully.'); 
      } catch (error) {
        console.error("Failed to remove opportunity:", error);
        alert('Failed to remove opportunity.');
      }
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