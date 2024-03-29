import React, { useState, useEffect } from 'react';

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
                    <button className='viewButton'>Apply</button>
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
}

export default View;