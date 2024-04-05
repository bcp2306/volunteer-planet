 /**
 * MyOpportunities
 *
 * This page features the My Opportunities page, which enables the users to  remove posted volunteer opportunities (located in the jobs database).
 * The page fetch volunteer opportunites from the jobs database and list them on the main page alongside two buttons - Edit and Remove.
 * The Edit button takes the user to the Edit Opportunity (EditOpportunity.jsx) page, whereas the Remove button attempts to remove the opportunity from the database.
 * 
 * Due to CORS problems related to the POST requests, the process of removing new opportunities is a simulation...
 * ...instead of actually removing the volunteer opportunity from the database Jobs.
 *
 * @author Kevin Osminski
 */
 import '../MyOpportunities.css';
 import React, { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
 
 const MyOpportunities = () => {
   const [opportunities, setOpportunities] = useState([]);
   const navigate = useNavigate();
 
   useEffect(() => {
     const fetchOpportunities = async () => {
       try {
         const response = await fetch('https://w20042922.nuwebspace.co.uk/team-project/backend/jobs');
         if (!response.ok) throw new Error('Failed to fetch');
         const data = await response.json();
         setOpportunities(data);
       } catch (error) {
         console.error("Failed to fetch opportunities:", error);
       }
     };
 
     fetchOpportunities();
   }, []);
 
   const handleRemove = (id) => {
     if (window.confirm("Do you want to remove this opportunity?")) {
       setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
       alert('Opportunity removed successfully.');
     }
   };
 
   return (
     <div className="opportunities-container">
       <h1 className="header-title">Add New Opportunity</h1>
       <button onClick={() => navigate('/add-opportunity')} className="add-opportunity-btn">
         Add New Opportunity
       </button>
       <h1 className="opportunities-title">My Opportunities</h1>
       <ul>
         {opportunities.map(opportunity => (
           <li key={opportunity.id} className="opportunity-item">
             <h2 className="opportunity-title">{opportunity.title}</h2>
             <p className="opportunity-description">{opportunity.description}</p>
             <div className="button-group">
               <button onClick={() => navigate(`/edit-opportunity/${opportunity.id}`)}>Edit</button>
               <button className="remove-btn" onClick={() => handleRemove(opportunity.id)}>Remove</button>
             </div>
           </li>
         ))}
       </ul>
     </div>
   );
 };
 
 export default MyOpportunities;