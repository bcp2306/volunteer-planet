import React, { useState, useEffect } from 'react';
import '../Apply.css'; 

function Apply() {
   
    const [application, setApplication] = useState({
        applicationType: 'individual',
        fullName: '',
        email: '',
        dob: '',
        coverLetter: '',
        jobTitle: '', 
        groupMembers: [{ fullName: '', dob: '' }],
    });
    const [jobs, setJobs] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false); 

    
    useEffect(() => {
        fetch("https://w20042922.nuwebspace.co.uk/team-project/backend/jobs")
            .then(response => response.json())
            .then(json => setJobs(json))
            .catch(err => console.log(err));
    }, []);

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplication({ ...application, [name]: value });
    };

    
    const handleGroupMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedGroupMembers = application.groupMembers.map((member, idx) => 
            idx === index ? { ...member, [name]: value } : member
        );
        setApplication({ ...application, groupMembers: updatedGroupMembers });
    };

    
    const addGroupMember = () => {
        setApplication({
            ...application,
            groupMembers: [...application.groupMembers, { fullName: '', dob: '' }]
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(application); 
        setIsSubmitted(true); 
    };

    return (
        <>
            <h1>Apply</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Application Type:</label>
                    <select name="applicationType" value={application.applicationType} onChange={handleInputChange}>
                        <option value="individual">Individual</option>
                        <option value="group">Group</option>
                    </select>
                </div>

            
                <div>
                    <label>Job Title:</label>
                    <select name="jobTitle" value={application.jobTitle} onChange={handleInputChange}>
                        <option value="">Select a job</option>
                        {jobs.map((job, index) => (
                            <option key={index} value={job.title}>{job.title}</option>
                        ))}
                    </select>
                </div>

               
                {application.applicationType === 'group' && application.groupMembers.map((member, index) => (
                    <div key={index}>
                        <h3>Group Member {index + 1}</h3>
                        <label>Full Name:</label>
                        <input type="text" name="fullName" value={member.fullName} onChange={(e) => handleGroupMemberChange(index, e)} />
                        <label>Date of Birth:</label>
                        <input type="date" name="dob" value={member.dob} onChange={(e) => handleGroupMemberChange(index, e)} />
                    </div>
                ))}
                {application.applicationType === 'group' && (
                    <button type="button" onClick={addGroupMember}>Add Another Member</button>
                )}

                
                <div>
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={application.fullName} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={application.email} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={application.dob} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Cover Letter / Message:</label>
                    <textarea name="coverLetter" value={application.coverLetter} onChange={handleInputChange} />
                </div>

                <button type="submit">Submit Application</button>
                {isSubmitted && <div className="submission-confirmation">Application sent</div>}
            </form>
        </>
    );
}

export default Apply;
