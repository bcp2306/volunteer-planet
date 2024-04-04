 /**
 * EditOpportunity
 *
 * This page features the Edit Opportunity page, which enable the users to edit their posted opportunities on the website.
 * 
 * Due to CORS problems related to the PUT/POST requests, the process of editing volunteer opportunities is a simulation.
 *
 * @author Kevin Osminski
 */
 import '../EditOpportunity.css';
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

    // For now, as i can't manage to set-up the connection to the DB because of unknown PUT & POST requests
    // the form simulates the process of editing the opportunity instead.
    // Will work with Brad & Sean on implementing this.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpportunity(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      alert('Opportunity updated successfully!');
      navigate('/my-opportunities');
    }, 1000); // delay
  };

  return (
    <div className="edit-container">
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