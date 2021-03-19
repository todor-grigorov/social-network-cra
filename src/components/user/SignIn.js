import * as React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, TextField, makeStyles, Typography } from '@material-ui/core';
import '../../css/App.css';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        width: "100%",
        height: "100%",
    }
}));

const SignIn = (props) => {
    const classes = useStyles();

    return (
        <Grid container className="signin-page">
            <Grid item xs={2} className="signin-container">
                <Paper container className={classes.paper}>
                    <form id="signin-form" method="POST">
                        <Typography variant="h1" component="h1" >Sign in</Typography >
                        <Typography variant="h6" component="h6">Your programming social network</Typography>
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={10}>
                                <TextField variant="outlined" fullWidth label="Username" name="username" />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField variant="outlined" fullWidth type="password" label="Password" name="password" />
                            </Grid>
                        </Grid>

                        <button type="submit">Sign in</button>
                    </form>
                </Paper>
            </Grid>
            <div>
                <span>New member? <Link to="/register" className="join-now-btn">Join now</Link></span>
            </div>
        </Grid>
    );
}

export default (SignIn)