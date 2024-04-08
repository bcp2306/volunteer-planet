/**
 * AddOpportunity
 *
 * This code features the Add Opportunity page, which enables the users to add new opportunities onto the website.
 * 
 * Due to CORS problems related to the POST requests, the process of adding new opportunities is a simulation 
 * [...] instead of actual addition of a volunteer opportunity into the database Jobs.
 *
 * @author Kevin Osminski
 */

// All the necessary libraries, hooks and routing functionality.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Stylesheet import.
import '../AddOpportunity.css';

const Add = () => {
    
    // Navigation between the routes.
    const navigate = useNavigate();

    // State used for both holding and managing the input values from the form.
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        longitude: '',
        latitude: ''
    });

    // Handling of any changes in relation to the form input & updates the formData with the new value.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /** 
     * Handles the event of submitting the form.
     * At the moment, it only simulates the process of adding a new opportunity due to CORS issues with actual POST requests.
     * Ideally, this would involve sending a POST request to a backend API to add the opportunity to a database.
     * I've tried to do that within the 'AddOpportunityPOST.jsx' file available within the same folder.
     */

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // Simulation of successful POST request.
            const simulatedResponseOk = true;
            if (!simulatedResponseOk) {
                throw new Error('Unable to add volunteer opportunity.');
            }

            // Displays success message via alert.
            window.alert('Volunteer opportunity added successfully!');

            // Resets form data after successful submission.
            setFormData({
                title: '',
                description: '',
                category: '',
                longitude: '',
                latitude: ''
            });
            
            // Navigates to the 'My Opportunities' page when successful.
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