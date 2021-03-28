import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import config from '../configs/config';
import '../css/Widgets.css';

const Widgets = () => {
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        // const url = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';
        if (loadingJobs)
            setLoadingJobs(true);

        fetch(config.urls.gitHubJobs)
            .then((res) => res.json())
            .then((jobs) => {
                setJobs(jobs.slice(0, 5));
                setLoadingJobs(false);
            })
            .catch((err) => alert(err.message));
    };


    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>Latest 5 GitHub jobs</h2>
            </div>
            <div className="widgets__body">
                {loadingJobs ?
                    <CircularProgress style={{ margin: 10 }} />
                    :
                    jobs.length ?
                        jobs.map((job) =>
                            <a className="article" href={job.url} target="_blank" rel="noreferrer">
                                <div className="article__title">{job.title}</div>
                                <p className="article__description">
                                    {job.location}
                                </p>
                            </a>
                        )
                        :
                        <p className="article__notAvailable">No Jobs Available</p>
                }
            </div>
        </div>
    )
}

export default Widgets
