 /**
 * AddOpportunity
 *
 * This page features the Add Opportunity page, which enable the users to add new opportunities onto the website.
 * 
 * Due to CORS problems related to the POST requests, the process of adding new opportunities is a simulation...
 * ...instead of actual addition of a volunteer opportunity into the database Jobs.
 *
 * @author Kevin Osminski
 */
import React, { useState } from 'react';

const Add = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        longitude: '',
        latitude: ''
    });
    const [message, setMessage] = useState({ type: '', content: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // For now, as i can't manage to set-up the connection to the DB because of unknown POST requests
    // the form simulates the process of adding a new opportunity instead.
    // Will work with Brad & Sean on implementing this.

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTimeout(() => {
            try {
                const simulatedResponseOk = true;

                if (!simulatedResponseOk) {
                    throw new Error(`Simulated error: Unable to add volunteer opportunity.`);
                }

                setMessage({ type: 'success', content: 'Volunteer opportunity added successfully!' });

                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    longitude: '',
                    latitude: ''
                });
            } catch (error) {
                setMessage({ type: 'error', content: `Error submitting form: ${error.message}` });
            }
        }, 2000);
    };

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
