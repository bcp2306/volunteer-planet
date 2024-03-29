import React, { useState } from 'react';

const Add = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        longitude: '',
        latitude: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData(prevState => ({
            ...prevState,
            [name]: value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const url = 'api endpoint';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            console.log('Server Response:', responseData);

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='add-container'>
            <h2>Add Volunteer Opportunity</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
                <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} required />
                <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} required />
                <button type="submit">Add Opportunity</button>
            </form>
        </div>
    );
};

export default Add;