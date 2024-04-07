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

import '../AddOpportunity.css';
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
    // Handler for form input changes that updates the formData state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // For now, as i can't manage to set-up the connection to the DB because of problems with POST requests,
    // the form simulates the process of adding a new opportunity instead. 
    // File 'AddOpportunityPOST.jsx' contains my previous code.

    // Handler for form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const simulatedResponseOk = true;
            if (!simulatedResponseOk) {
                throw new Error('Simulated error: Unable to add volunteer opportunity.');
            }

            // Displays success message via alert.
            window.alert('Volunteer opportunity added successfully!');

            // Reset form data after successful submission.
            setFormData({
                title: '',
                description: '',
                category: '',
                longitude: '',
                latitude: ''
            });
            
            // Navigates to the 'My Opportunities' page upon success.
            navigate('/my-opportunities');
        } catch (error) {

            // Displays the error message via alert.
            window.alert(`Error submitting form: ${error.message}`);
        }
    };

    // Renders the form for adding new volunteer opportunities.
    return (
        <div className='add-container'>
            <h1>Add Volunteer Opportunity</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    onChange={handleChange} 
                    required 
                    value={formData.title} 
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    onChange={handleChange} 
                    required 
                    value={formData.description} 
                />
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Category" 
                    onChange={handleChange} 
                    required 
                    value={formData.category} 
                />
                <input 
                    type="text" 
                    name="longitude" 
                    placeholder="Longitude" 
                    onChange={handleChange} 
                    required 
                    value={formData.longitude} 
                />
                <input 
                    type="text" 
                    name="latitude" 
                    placeholder="Latitude" 
                    onChange={handleChange} 
                    required 
                    value={formData.latitude} 
                />
                <button type="submit" className="add-opportunity-button">Add Opportunity</button>
            </form>
        </div>
    );
};

export default Add;