import React, { useState, useEffect } from 'react';
import config from '../configs/config';
import '../css/Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        if (loadingJobs)
            setLoadingJobs(true);

        fetch(`${config.urls.gitHubJobs}?page=1`)
            .then((res) => res.json())
            .then((jobs) => {
                setJobs(jobs);
                setLoadingJobs(false);
            })
            .catch((err) => alert(err.message));
    };

    const calculateDate = (createdAt) => {
        let result = "";
        const jobDate = new Date(createdAt).getDate();
        const currDate = new Date().getDate();
        const daysAgo = currDate - jobDate;

        if (daysAgo === 0) {
            result = "Today";
        } else if (daysAgo === 1) {
            result = `${daysAgo} day ago`;
        } else {
            result = `${daysAgo} days ago`;
        }

        return result;
    }

    return (
        <div className="jobs">
            {jobs.map((job) => (
                <div key={job.id} className="job__details">
                    <div className="job__mainDetails">
                        <div className="job__title">{job.title}</div>
                        <div className="job__companyAndType">
                            <span>{job.company}</span> - <span>{job.type}</span>
                        </div>
                    </div>
                    <div className="job_otherDetails">
                        <span>{job.location}</span>
                        <span>{job.created_at ? calculateDate(job.created_at) : ""}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Jobs
