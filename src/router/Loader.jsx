import { LinearProgress, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            width: '100%',
        },
        content: {
            width: '50%',
            textAlign: 'center',
            margin: '0 auto',
        },
    }),
);

export const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography variant="h6" gutterBottom>
                    Wait, now Loading ...
                </Typography>
                <LinearProgress color="secondary" />
            </div>
        </div>
    );
};
