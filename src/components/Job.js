import React, { useState, useEffect } from "react";
import config from '../configs/config';
import "../css/Job.css";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import Linkify from 'linkifyjs/react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from "react-router-dom";

const Job = () => {
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(false);

    const { jobId } = useParams();

    const fetchJob = () => {
        if (!jobId) return;

        setLoading(true);
        const url = `${config.urls.gitHubJob}${jobId.substr(1)}.json?markdown=true`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setJob(data);
                setLoading(false);
            })
            .catch((err) => alert(err.message));
    };

    useEffect(() => {
        fetchJob();
    }, []);

    return (
        loading ?
            <div className="jobs__spinner">
                <CircularProgress />
            </div>
            :
            <div className="job__container">
                <div className="job__goBack">
                    <Link to={'/jobs'}>
                        <Button
                            variant="text"
                            size="small"
                            color="primary"
                            startIcon={<KeyboardBackspaceIcon />}
                        >
                            See all positions
                    </Button>
                    </Link>
                </div>

                <div className="job">
                    <div className="job__header">
                        <p>
                            <span>{job.type}</span> / <span>{job.location}</span>
                        </p>
                        <span>{job.title}</span>
                    </div>
                    <div className="job__body">
                        <p style={{ whiteSpace: "pre-line" }}>{job.description}</p>
                        <div className="job__otherDetails">
                            <div className="job__brand">
                                <span>{job.company}</span>
                                <img src={job.company_logo} alt="" />
                                <a href={job.company_url}>{job.company_url}</a>
                            </div>
                            <div className="job__apply">
                                <span>How to apply</span>
                                <Linkify tagName="p">{job.how_to_apply}</Linkify>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Job;
