import * as React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Grid, Paper, TextField, makeStyles, Typography } from '@material-ui/core';
import { auth } from '../../firebase/firebase';
import '../../css/App.css';
import { useDispatch } from "react-redux";
import userActions from "../../redux/actions/userActions";


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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const dispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();


    const onRegister = (e) => {
        e.preventDefault();

        if (!email) return;
        if (!password) return;
        if (!rePassword) return;

        auth.createUserWithEmailAndPassword(email, password)
            .then(userAuth => {
                dispatch({ type: userActions.login, payload: userAuth.user });
                setEmail("");
                setPassword("");
                setRePassword("");
                history.push("/signin");
            });
    };

    return (
        <Grid container className="register-page">
            <Grid item xs={3} className="register-container">
                <Paper container className={classes.paper}>
                    <Grid container justify="center" className={classes.gridForm}>
                        <Grid item xs={12}>
                            <form id="register-form" method="POST">
                                <Grid container spacing={2} justify="center" alignItems="flex-end" style={{ height: "100%", paddingTop: "5%" }}>
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