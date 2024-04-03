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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'https://w20042922.nuwebspace.co.uk/team-project/backend/jobs';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
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
    };

    return (
        <div className='add-container'>
            <h1 className='tColor'>Add Volunteer Opportunity</h1>
            {}
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