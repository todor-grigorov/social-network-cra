import * as React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, TextField, makeStyles, Typography } from '@material-ui/core';
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
    const classes = useStyles();

    return (
        <Grid container className="register-page">
            <Grid item xs={3} className="register-container">
                <Paper container className={classes.paper}>
                    <Grid container justify="center" className={classes.gridForm}>
                        <Grid item xs={12}>
                            <form id="register-form" method="POST">
                                <Grid container spacing={2} justify="center" alignItems="flex-end" style={{ height: "100%", paddingTop: "5%" }}>
                                    <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth label="Username" name="username" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth type="password" label="Password" name="password" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField variant="outlined" fullWidth type="password" label="Repeat Password" name="rePassword" />
                                    </Grid>
                                    <Grid item xs={12} style={{ alignSelf: 'center' }}>
                                        <button type="submit">Register</button>
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