import React, { useState, useEffect } from 'react';
import config from '../configs/config';
import '../css/Jobs.css';
import { Button, CircularProgress } from '@material-ui/core';
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [page, setPage] = useState(1);

    const fetchJobs = () => {
        if (!loadingJobs)
            setLoadingJobs(true);

        fetch(`${config.urls.gitHubJobs}?page=${page}`)
            .then((res) => res.json())
            .then((jobs) => {
                setJobs(jobs);
                setLoadingJobs(false);
            })
            .catch((err) => console.log(err.message));
    };

    const calculateDate = (createdAt) => {
        let result = "";
        const jobDate = new Date(createdAt);
        const currDate = new Date();
        // const daysAgo = currDate - jobDate;
        const difference = currDate.getTime() - jobDate.getTime();
        const days = Math.ceil(difference / (1000 * 3600 * 24));

        if (days === 0) {
            result = "Today";
        } else if (days === 1) {
            result = `${days} day ago`;
        } else {
            result = `${days} days ago`;
        }

        return result;
    };

    useEffect(() => {
        fetchJobs();
    }, [page]);

    return (
        <div className="jobs__container">
            <div className="jobs">
                {loadingJobs ?
                    <div className="jobs__spinner">
                        <CircularProgress />
                    </div>
                    :
                    jobs.map((job) => (
                        <Link key={job.id} to={`/jobs/:${job.id}`}>
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
                        </Link>
                    ))
                }

                <div className="jobs__pagination">
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={page <= 1 ? true : false}
                        startIcon={<KeyboardArrowLeftIcon />}
                        onClick={() => setPage(page - 1 >= 0 ? page - 1 : 0)}
                    >
                        Prev
                        </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        endIcon={<KeyboardArrowRightIcon />}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                        </Button>
                </div>
            </div>
        </div>
    )
}

export default Jobs
