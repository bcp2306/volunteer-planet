 /**
 * Profile page
 *
 * This page is the apply for volunteering opportunities
 * 
 * Due to CORS problems related to the PUT/POST requests, the process of applying for opportunities is simulated, they are instead
 * stored locally to be shown on the profile page for the simulation
 *
 * @author Sean Molloy
 */
 import React, { useState, useEffect } from 'react';
import { FaUser, FaBriefcase, FaEnvelope, FaCalendarAlt, FaPen } from "react-icons/fa";
import '../Apply.css';

function Apply() {
    const [application, setApplication] = useState({
        fullName: '',
        email: '',
        dob: '',
        coverLetter: '',
        jobTitle: '',
        groupMembers: 0,
    });
    const [jobs, setJobs] = useState([]);
    const [submissionResponse, setSubmissionResponse] = useState('');

    useEffect(() => {
        fetch("https://w20042922.nuwebspace.co.uk/team-project/backend/jobs")
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplication(prevState => ({
            ...prevState,
            [name]: name === 'groupMembers' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // POST request 
        /* Simulated fetch request:
        fetch(submissionUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(application),
        })
        .then(response => response.json())
        .then(data => setSubmissionResponse(data.message))
        .catch(error => setSubmissionResponse("Error submitting application."));
        */

        // Storing application data locally
        try {
            const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
            storedApplications.push({ jobTitle: application.jobTitle, groupMembers: application.groupMembers });
            localStorage.setItem('applications', JSON.stringify(storedApplications));
            setSubmissionResponse("Application submitted successfully!");
        } catch (error) {
            console.error('Error storing application locally:', error);
            setSubmissionResponse("Failed to store application locally.");
        }
    };

    return (
        <div className='form-container'>
            <h1>Apply for a Job</h1>
            <form onSubmit={handleSubmit}>
                {/* Input fields */}
                <div className="input-box">
                    <label>Full Name</label>
                    <input type="text" name="fullName" value={application.fullName} onChange={handleChange} required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <label>Email</label>
                    <input type="email" name="email" value={application.email} onChange={handleChange} required />
                    <FaEnvelope className='icon' />
                </div>
                <div className="input-box">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={application.dob} onChange={handleChange} required />
                    <FaCalendarAlt className='icon' />
                </div>
                <div className="input-box">
                    <label>Cover Letter</label>
                    <textarea name="coverLetter" value={application.coverLetter} onChange={handleChange} required />
                    <FaPen className='icon' />
                </div>
                <div className="input-box">
                    <label>Job Title</label>
                    <select name="jobTitle" value={application.jobTitle} onChange={handleChange} required>
                        <option value="">Select a Job</option>
                        {jobs.map(job => (
                            <option key={job.id} value={job.title}>{job.title}</option>
                        ))}
                    </select>
                    <FaBriefcase className='icon' />
                </div>
                <div className="input-box">
                    <label>Group Members</label>
                    <input type="number" name="groupMembers" value={application.groupMembers} onChange={handleChange} required />
                </div>
                <div className="input-box">
                    <button type="submit">Submit Application</button>
                </div>
                {submissionResponse && <div className="response-message">{submissionResponse}</div>}
            </form>
        </div>
    );
}

export default Apply;
