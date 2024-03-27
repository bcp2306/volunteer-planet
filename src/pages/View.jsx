import React, { useState, useEffect } from 'react';

/*
const volunteeringJobs = [
  { id: 1, title: 'Beach Cleanup' },
  { id: 2, title: 'Community Tutoring' },
  { id: 3, title: 'Library Assistance' },
  { id: 4, title: 'Community Tutoring' },
  { id: 5, title: 'Animal Shelter Assistant' },
  { id: 6, title: 'Festival Support' },
  { id: 7, title: 'Enviromental Research assistant'},
  { id: 8, title: 'Youth Sports Coach'},
  { id: 9, title: 'Community Clean-up'},
  { id: 10, title: 'Dog walker'},
];
*/

function View() {

  const [jobs, setJobs] = useState([])
    const [search, setSearch] = useState("")

    useEffect(
        () => {
            fetch("https://w20042922.nuwebspace.co.uk/team-project/backend/jobs")
            .then(response => {
                
               return (response.status === 200) ? response.json() : []
                
            })
            .then(json => {setJobs(json)})
            .catch( err => { console.log(err.message) })
        },[]
    )

    const searchJobs = (job) => job.title.toLowerCase().includes(search.toLowerCase())

    const jobsJSX = jobs.filter(searchJobs).map(
        (job, i) => <section key={i} >
                    <h2>{job.title}</h2>
                    <p>{job.description}</p>
                    <h4>Category:</h4>
                    <p>{job.category}</p>
                     </section>
        
    )

    const handleSearch = (event) => {setSearch(event.target.value)}

    return (
        <>
            <h1>View Volunteering Jobs</h1>
                <input 
                type="text"
                placeholder="Search Jobs..."
                value={search} 
                onChange={handleSearch}
                />
            {jobsJSX}
        </>
    )

  /*
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = volunteeringJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="view-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="content">
        <h1>View Volunteering Jobs</h1>
        <ul className="job-list">
          {filteredJobs.map(job => (
            <li key={job.id}>{job.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  */
}

export default View;