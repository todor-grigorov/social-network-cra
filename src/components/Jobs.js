import React, { useState, useEffect } from 'react';
import config from '../configs/config';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        if (loadingJobs)
            setLoadingJobs(true);

        fetch(`${config.urls.gitHubJobs}?page=1`)
            .then((res) => res.json())
            .then((jobs) => {
                setJobs(jobs.slice(0, 5));
                setLoadingJobs(false);
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="jobs">

        </div>
    )
}

export default Jobs
