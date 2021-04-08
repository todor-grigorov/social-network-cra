import * as React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth, db } from '../../firebase/firebase';
import { Grid, Paper, TextField, makeStyles, Typography } from '@material-ui/core';
import '../../css/App.css';
import userActions from "../../redux/actions/userActions";
import alertActions from "../../redux/actions/alertActions";
import alertSeverities from "../../redux/enums/alertSeverities";


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
    const [emailError, setEmailError] = useState({ error: false, message: "" });
    const [passwordError, setPasswordError] = useState({ error: false, message: "" });

    const dispatch = useDispatch();
    let history = useHistory();
    const classes = useStyles();

    const onSignIn = (e) => {
        e.preventDefault();

        if (!emailValidation(email)) return;
        if (!passwordValidation(password)) return;

        auth.signInWithEmailAndPassword(email, password)
            .then(userAuth => {
                db.collection("users").doc(userAuth.user.uid.toString()).get().then(doc => {
                    if (!doc.exists) return;

                    dispatch({
                        type: userActions.login,
                        payload: {
                            ...doc.data(),
                            // displayName: userAuth.user.displayName,
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            // photoURL: userAuth.user.photoURL
                        }
                    });
                    setEmail("");
                    setPassword("");
                    history.push("/feed");
                });



            })
            .catch(err => {
                // TODO:
                // Push notification not alert
                dispatch({
                    type: alertActions.add,
                    payload: {
                        severity: alertSeverities.error,
                        message: err.message,
                    }
                })
                // alert(err.message);
            });
    };

    const emailValidation = (mail) => {
        if (!mail) {
            setEmailError({ error: true, message: "Email cannot be empty!" });
            return false;
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            setEmailError({ error: true, message: "Email is badly formatted!" });
            return false;
        } else {
            setEmailError({ error: false, message: "" });
            return true;
        }
    };

    const passwordValidation = (pass) => {
        if (!pass) {
            setPasswordError({ error: true, message: "Password cannot be empty!" });
            return false;
        } else if (pass.length < 6) {
            setPasswordError({ error: true, message: "Password must be atleast 6 characters long!" });
            return false;
        } else {
            setPasswordError({ error: false, message: "" });
            return true;
        }
    };

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
                                    error={emailError.error}
                                    helperText={emailError.message}
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
                                    error={passwordError.error}
                                    helperText={passwordError.message}
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