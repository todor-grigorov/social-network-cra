import * as React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from '../../firebase/firebase';
import { Grid, Paper, TextField, makeStyles, Typography } from '@material-ui/core';
import '../../css/App.css';
import userActions from "../../redux/actions/userActions";


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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    let history = useHistory();
    const classes = useStyles();

    const onSignIn = (e) => {
        e.preventDefault();

        if (!email) return;
        if (!password) return;

        auth.signInWithEmailAndPassword(email, password)
            .then(userAuth => {
                dispatch({ type: userActions.login, payload: userAuth.user });
                setEmail("");
                setPassword("");
                history.push("/");
            });
    }

    return (
        <Grid container className="signin-page">
            <Grid item xs={2} className="signin-container">
                <Paper container className={classes.paper}>
                    <form id="signin-form" method="POST">
                        <Typography variant="h1" component="h1" >Sign in</Typography >
                        <Typography variant="h6" component="h6">Your programming social network</Typography>
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={10}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <button type="submit" onClick={onSignIn}>Sign in</button>
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