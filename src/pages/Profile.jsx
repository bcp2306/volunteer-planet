 /**
 * Profile page
 *
 * This page is the profile page for the user, only allowing access once the user has logged into the websitr
 * 
 * Due to CORS problems related to the PUT/POST requests, the process of deleting opportunities is simulated, furthermore these
 * opportunities are randomly generated from the jobs table due to user and jobs being seperate databases.
 *
 * @author Sean Molloy
 */
 import React, { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
 import '../Profile.css';
 import Profilepic from '../assets/Blank-Profile.png';
 
 function Profile() {
     const navigate = useNavigate();
     const username = sessionStorage.getItem('username');
     // State to store applications fetched from localStorage
     const [applications, setApplications] = useState([]);
 
     useEffect(() => {
         // Redirect to login if not logged in
         if (!username) {
             navigate('/user');
         } else {
             loadApplications();
         }
     }, [username, navigate]);
 
     const loadApplications = () => {
         const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
         setApplications(storedApplications);
     };
 
     const deleteApplication = (indexToDelete) => {
         const filteredApplications = applications.filter((_, index) => index !== indexToDelete);
         localStorage.setItem('applications', JSON.stringify(filteredApplications));
         loadApplications(); // Reload applications from localStorage
     };
 
     const addApplication = () => {
         navigate('/apply'); // Adjust this path to your actual Apply component route
     };
 
     return (
         <div className="profile-container">
             <h1>Profile</h1>
             <h2>Username: {username}</h2>
             <div className="profile-picture">
                 <img src={Profilepic} alt="Profile" />
             </div>
             <button onClick={addApplication} className="add-application-btn">Add Application</button>
             <h3>Applications Submitted:</h3>
             {applications.length > 0 ? (
                 applications.map((app, index) => (
                     <div key={index} className="application-entry">
                         <p>Job Title: {app.jobTitle}</p>
                         <p>Group Members Added: {app.groupMembers}</p>
                         <button onClick={() => deleteApplication(index)} className="delete-application-btn">Delete</button>
                     </div>
                 ))
             ) : (
                 <p>No applications submitted yet.</p>
             )}
         </div>
     );
 }
 
 export default Profile;
 
