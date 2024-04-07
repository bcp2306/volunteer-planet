/**
 * AddOpportunityPOST
 *
 * This code features the Add Opportunity page which was supposed to be there initially.
 * 
 * Due to CORS problems related to the POST requests, the process of adding new opportunities is now a simulation.
 * This code, however - have been left to present how I approached the topic of trying to implement a working feature of adding new volunteer opportunities.
 *
 * @author Kevin Osminski
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddOpportunity() {
    const navigate = useNavigate();
    
    // State to store form data with initial values.
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        longitude: '',
        latitude: ''
    });

    // State to store messages to the user.
    const [message, setMessage] = useState('');

    // Handler for form data changes, which updates the formData state.
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Updates formData with new values.
        setFormData({ ...formData, [name]: value }); 
    };

    // Handler used for form submission.
    const handleSubmit = async (e) => {

        // Prevents the default form submission behavior.
        e.preventDefault(); 
        try {
            const url = 'https://w20042922.nuwebspace.co.uk/team-project/backend/jobs';

            // POST request used to add a new opportunity.
            // Does not work, as the server doesn't accept the Content-Type.
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) // Converts the formData to JSON string.
            });

            // Checks if response is not ok (i.e., an error response). Throws an error with a status after.
            if (!response.ok) {
                throw new Error(`Error. Status: ${response.status}`);
            }

            const data = await response.json();
            setMessage(data.message || 'Opportunity added successfully!');

            // Resets form data to initial state.
            setFormData({
                title: '',
                description: '',
                category: '',
                longitude: '',
                latitude: ''
            });

            // Navigates to the my-opportunities page.
            navigate('/my-opportunities'); 
        } catch (error) {

             // Sets error message.
            setMessage(`Error: ${error.message}`);
        }
    };

    // User interface.
    return (
        <div>
            <h2>Add Volunteer Opportunity</h2>
            {message && <div className="message">{message}</div>} {}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddOpportunity;