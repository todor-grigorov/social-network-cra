import * as React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Grid, Paper, TextField, makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { auth, db } from '../../firebase/firebase';
import '../../css/App.css';
import alertActions from "../../redux/actions/alertActions";
import alertSeverities from "../../redux/enums/alertSeverities";


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
    // const [photoUrl, setPhotoUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [fullNameError, setFullNameError] = useState({ error: false, message: "" });
    const [emailError, setEmailError] = useState({ error: false, message: "" });
    const [passwordError, setPasswordError] = useState({ error: false, message: "" });
    const [rePasswordError, setRePasswordError] = useState({ error: false, message: "" });


    const dispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();


    const onRegister = (e) => {
        e.preventDefault();

        if (!fullNameValidation(fullName)) return;
        // if (!photoUrl) return; This should be optional. User can add/change picture from the User Profile page.
        if (!emailValidation(email)) return;
        if (!passwordValidation(password)) return;
        if (!rePassValidation(rePassword)) return;
        if (password !== rePassword) {
            setRePasswordError({ error: true, message: "Password must be equa to Repeat password!" });
            return;
        }



        setRePasswordError({ error: false, message: "" });
        setEmailError({ error: false, message: "" });

        auth.createUserWithEmailAndPassword(email, password)
            .then(userAuth => {
                userAuth.user.updateProfile({
                    displayName: fullName,
                    // photoURL: photoUrl,
                }).then(() => {
                    db.collection("users").doc(userAuth.user.uid.toString()).set({
                        uid: userAuth.user.uid,
                        backgroundUrl: "",
                        city: "",
                        company: "",
                        country: "",
                        headline: "",
                        postalCode: "",
                        github: "",
                        photoURL: "",
                        network: [],
                        displayName: fullName,
                        email: email,
                        sentInvitations: [],
                        recievedInvitations: [],
                    })
                        .then(() => {
                            history.push("/signin");
                            setFullName("");
                            // setPhotoUrl("");
                            setEmail("");
                            setPassword("");
                            setRePassword("");

                            dispatch({
                                type: alertActions.add,
                                payload: {
                                    severity: alertSeverities.success,
                                    message: 'User registered successfully',
                                }
                            })
                        })
                        .catch(err => {
                            console.log(err.message);
                        });
                });
            })
            .catch(err => {
                dispatch({
                    type: alertActions.add,
                    payload: {
                        severity: alertSeverities.error,
                        message: err.message,
                    }
                })
            });
    };

    const handleFullNameChange = (e) => {
        const name = e.target.value;
        setFullName(name);
        // fullNameValidation(name);
    };

    const handleEmailChange = (e) => {
        const mail = e.target.value;
        setEmail(mail);
        // emailValidation(mail);
    };

    const handlePasswordChange = (e) => {
        const pass = e.target.value;
        setPassword(pass);
        // passwordValidation(pass);
    };

    const handleRePasswordChange = (e) => {
        const rePass = e.target.value;
        setRePassword(rePass);
        // rePassValidation(rePass);
    };

    const fullNameValidation = (name) => {
        if (!name) {
            setFullNameError({ error: true, message: "Full Name cannot be empty!" });
            return false;
        } else {
            setFullNameError({ error: false, message: "" });
            return true;
        }
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

    const rePassValidation = (rePass) => {
        if (!rePass) {
            setRePasswordError({ error: true, message: "Repeat password cannot be empty!" });
            return false;
        } else if (rePass.length < 6) {
            setRePasswordError({ error: true, message: "Repeat password must be atleast 6 characters long!" });
            return false;
        } else {
            setRePasswordError({ error: false, message: "" });
            return true;
        }
    };

    return (
        <Grid container className="register">
            <Grid item xs={12} md={6} xl={3} className="register__container">
                <Paper container className={classes.paper}>
                    <Grid container justify="center" className={classes.gridForm}>
                        <Grid item xs={12}>
                            <form id="register__form" method="POST">
                                <Grid container spacing={2} justify="center" alignItems="flex-end" style={{ height: "100%", paddingTop: "5%" }}>
                                    <Grid item xs={10}>
                                        <TextField error={fullNameError.error} helperText={fullNameError.message} variant="outlined" fullWidth label="Full name" name="fullName" value={fullName} onChange={handleFullNameChange} />
                                    </Grid>
                                    {/* <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth label="Photo URL" name="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                                    </Grid> */}
                                    <Grid item xs={10}>
                                        <TextField error={emailError.error} helperText={emailError.message} variant="outlined" fullWidth label="Email" name="email" value={email} onChange={handleEmailChange} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField error={passwordError.error} helperText={passwordError.message} variant="outlined" fullWidth type="password" label="Password" name="password" value={password} onChange={handlePasswordChange} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField error={rePasswordError.error} helperText={rePasswordError.message} variant="outlined" fullWidth type="password" label="Repeat Password" name="rePassword" value={rePassword} onChange={handleRePasswordChange} />
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