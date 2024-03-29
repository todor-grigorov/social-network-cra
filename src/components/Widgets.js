import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import config from '../configs/config';
import '../css/Widgets.css';

const Widgets = () => {
    const [jobs, setJobs] = useState([]);
    const [quote, setQuote] = useState();
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [loadingQuote, setLoadingQuote] = useState(true);

    useEffect(() => {
        fetchJobs();
        fetchQuotes();
        const interval = setInterval(() => {
            fetchQuotes();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

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
            .catch((err) => console.log(err.message));
    };

    const fetchQuotes = () => {
        if (loadingQuote)
            setLoadingQuote(true);

        fetch(config.urls.randomProgrammingQuote)
            .then((res) => res.json())
            .then((data) => {
                setQuote(data.quote);
                setLoadingQuote(false);
            })
            .catch((err) => console.log(err.message));
    }


    return (
        <div className="widgets">
            <div className="widget">
                <div className="widgets__header">
                    <h2>Latest 5 GitHub jobs</h2>
                </div>
                <div className="widgets__body">
                    {loadingJobs ?
                        <CircularProgress style={{ margin: 10 }} />
                        :
                        jobs.length ?
                            jobs.map((job) =>
                                <Link key={job.id} className="article" to={`/jobs/:${job.id}`}>
                                    <div className="article__title">{job.title}</div>
                                    <p className="article__description">
                                        {job.location}
                                    </p>
                                </Link>
                            )
                            :
                            <p className="article__notAvailable">No Jobs Available</p>
                    }
                </div>
            </div>

            <div className="widget">
                <div className="widgets__header">
                    <h2>Quote for everyone</h2>
                </div>
                <div className="widgets__body">
                    {loadingQuote ?
                        <CircularProgress style={{ margin: 10 }} />
                        :
                        quote ?
                            <div className="quote">
                                <div className="quote__body">{`"${quote.body}"`}</div>
                                <p className="quote__author">
                                    {quote.author}
                                </p>
                            </div>
                            :
                            <p className="quote__notAvailable">Quote not available</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Widgets
