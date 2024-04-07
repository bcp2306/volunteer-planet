import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function View() {
  const navigate = useNavigate(); 
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // New state for selected category

  useEffect(() => {
    fetch("https://w20042922.nuwebspace.co.uk/team-project/backend/jobs")
      .then(response => response.status === 200 ? response.json() : [])
      .then(json => setJobs(json))
      .catch(err => console.log(err.message));
  }, []);

  const searchJobs = job => {
    return job.title.toLowerCase().includes(search.toLowerCase()) &&
           (category === "" || job.category === category); // Updated to filter by category
  };

  const handleSearch = event => setSearch(event.target.value);
  const handleCategoryChange = event => setCategory(event.target.value); // Handler for category change

  // list of categories 
  const uniqueCategories = [...new Set(jobs.map(job => job.category))];

  const handleApply = () => {
    const username = sessionStorage.getItem('username');
    if (!username) {
      navigate('/user'); // Redirects to login page if user isn't logged in :)
    } else {
      navigate('/apply'); // Redirects to apply page if user is logged in
    }
  };

  const jobsJSX = jobs.filter(searchJobs).map((job, i) => (
    <section key={i}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <h4>Category:</h4>
      <p>{job.category}</p>
      <button onClick={handleApply} className='viewButton'>Apply</button>
    </section>
  ));

  return (
    <>
      <h1 className='tColor'>View Volunteering Jobs</h1>
      <div className="search-and-filter">
        <input
          type="text"
          placeholder="Search Jobs..."
          value={search}
          onChange={handleSearch}
        />
        <select value={category} onChange={handleCategoryChange} className="category-filter">
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {jobsJSX}
    </>
  );
}

export default View;
