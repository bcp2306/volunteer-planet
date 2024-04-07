/**
 * AddOpportunity
 *
 * This code features the Add Opportunity page, which enables the users to add new opportunities onto the website.
 * 
 * Due to CORS problems related to the POST requests, the process of adding new opportunities is a simulation...
 * ...instead of actual addition of a volunteer opportunity into the database Jobs.
 *
 * @author Kevin Osminski
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();

        // State to manage the form data.
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            category: '',
            longitude: '',
            latitude: ''
        });

        // State to manage submission message, whether it is success or error.
        const [message, setMessage] = useState({ type: '', content: '' });
        
        // Handler used for form input changes, which updates the formData state.
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                // Copy the existing state.
                ...prevState,
                // Update the changed value.
                [name]: value
            }));
        };

    // For now, as i can't manage to set-up the connection to the DB because of problems with POST requests,
    // the form simulates the process of adding a new opportunity instead. 
    // File 'AddOpportunityPOST.jsx' contains my previous code.

    
    // Handler used for submission. 
    // Prevents default submission behavior and simulates operations with a delay.

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTimeout(() => {
            try {
                const simulatedResponseOk = true;
                if (!simulatedResponseOk) {
                    throw new Error(`Simulated error: Unable to add volunteer opportunity.`);
                }

                // Success message.
                setMessage({ type: 'success', content: 'Volunteer opportunity added successfully!' });

                // Resets the form data after the submission.
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    longitude: '',
                    latitude: ''
                });
                
                // Navigate to the 'My Opportunities' page when successful.
                navigate('/my-opportunities'); 
            } catch (error) {
                // Display error message if unsuccessful.
                setMessage({ type: 'error', content: `Error submitting form: ${error.message}` });
            }
            // Delay of 1.5-second for simulation.
        }, 1500);
    };

    // Renders the final form to add new volunteer opportunities.
    return (
    <div className='add-container'>
        <h1>Add Volunteer Opportunity</h1>
        {message.content && (
        <div className={`message ${message.type}`}>
            {message.content}
            </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChange} required value={formData.title} />
                <textarea name="description" placeholder="Description" onChange={handleChange} required value={formData.description} />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} required value={formData.category} />
                <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} required value={formData.longitude} />
                <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} required value={formData.latitude} />
                <button type="submit">Add Opportunity</button>
            </form>
        </div>
    );
};

export default Add;
