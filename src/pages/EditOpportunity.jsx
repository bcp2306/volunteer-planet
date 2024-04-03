import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditOpportunity = () => {
  const [opportunity, setOpportunity] = useState({
    title: '',
    description: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOpportunityDetails = async () => {
      try {
        const response = await fetch(`https://w20042922.nuwebspace.co.uk/team-project/backend/jobs/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setOpportunity({ title: data.title, description: data.description });
      } catch (error) {
        console.error("Failed to fetch opportunity details:", error);
      }
    };

    fetchOpportunityDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpportunity(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://w20042922.nuwebspace.co.uk/team-project/backend/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opportunity)
      });
      if (!response.ok) throw new Error('Failed to update');
      navigate('/');
    } catch (error) {
      console.error("Failed to update opportunity:", error);
    }
  };

  return (
    <div>
      <h2>Edit Volunteer Opportunity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={opportunity.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={opportunity.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Opportunity</button>
      </form>
    </div>
  );
};

export default EditOpportunity;