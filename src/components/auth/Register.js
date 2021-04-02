import * as React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Grid, Paper, TextField, makeStyles, Typography } from '@material-ui/core';
import { auth, db } from '../../firebase/firebase';
import '../../css/App.css';


const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        height: "100%",
    },
    gridForm: {
        width: "100%",
        height: "100%",
    }
}));

const Register = (props) => {
    const [fullName, setFullName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");


    const classes = useStyles();
    let history = useHistory();


    const onRegister = (e) => {
        e.preventDefault();

        if (!fullName) return;
        // if (!photoUrl) return; This should be optional. User can add/change picture from the User Profile page.
        if (!email) return;
        if (!password) return;
        if (!rePassword) return;

        auth.createUserWithEmailAndPassword(email, password)
            .then(userAuth => {
                userAuth.user.updateProfile({
                    displayName: fullName,
                    photoURL: photoUrl,
                }).then(() => {
                    db.collection("users").doc().set({
                        uid: userAuth.user.uid,
                        backgroundUrl: "",
                        city: "",
                        company: "",
                        country: "",
                        headline: "",
                        postalCode: "",
                        github: "",
                    })
                        .then(() => {
                            setFullName("");
                            setPhotoUrl("");
                            setEmail("");
                            setPassword("");
                            setRePassword("");
                            history.push("/signin");
                        })
                        .catch(err => {
                            // TODO:
                            // Push notification not alert
                            alert(err.message);
                        });
                });
            })
            .catch(err => {
                // TODO:
                // Push notification not alert
                alert(err.message);
            });
    };

    return (
        <Grid container className="register">
            <Grid item xs={3} className="register__container">
                <Paper container className={classes.paper}>
                    <Grid container justify="center" className={classes.gridForm}>
                        <Grid item xs={12}>
                            <form id="register__form" method="POST">
                                <Grid container spacing={2} justify="center" alignItems="flex-end" style={{ height: "100%", paddingTop: "5%" }}>
                                    <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth label="Full name" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth label="Photo URL" name="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth type="password" label="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth type="password" label="Repeat Password" name="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} style={{ alignSelf: 'center' }}>
                                        <button type="submit" onClick={onRegister}>Register</button>
                                    </Grid>
                                </Grid>

                            </form>
                        </Grid>
                        <Grid container item xs={12} justify="center" alignItems="center">
                            <Typography>Already a member? <Link to="/signin" className="join-now-btn">Sign in</Link></Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default (Register)