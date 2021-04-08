import React, { useState, useEffect } from 'react';
import '../css/EditProfile.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { db, storage, auth } from '../firebase/firebase';
import { Avatar, Button, CircularProgress, Fab, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import background from '../resources/images/default_background.jpg';
import userActions from '../redux/actions/userActions';
import alertActions from '../redux/actions/alertActions';
import alertSeverities from '../redux/enums/alertSeverities';

const EditProfile = () => {
    const user = useSelector((state => state.user));

    // const [docId, setDocId] = useState("");
    const [displayName, setDisplayName] = useState(user.displayName);
    const [headline, setHeadline] = useState(user.headline);
    const [country, setCountry] = useState(user.country);
    const [city, setCity] = useState(user.city);
    const [postalCode, setPostalCode] = useState(user.postalCode);
    const [company, setCompany] = useState(user.company);
    const [github, setGithub] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    let history = useHistory();
    const { userId } = useParams();


    const onFileChange = (e, type) => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        setLoading(true);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then(fileUrl => {
                if (type === "avatar") {
                    const currUser = auth.currentUser;
                    currUser.updateProfile({
                        photoURL: fileUrl
                    })
                        .then((res) => {
                            db.collection("users").doc(user.uid)
                                .update({
                                    photoURL: fileUrl
                                })
                                .then(() => {
                                    dispatch({
                                        type: userActions.login,
                                        payload: {
                                            ...user,
                                            photoURL: fileUrl
                                        }
                                    });
                                    setLoading(false);
                                    history.push(`/profile/edit/${user.uid}`);
                                })
                                .catch((err) => {
                                    // TODO:
                                    // Push notification not alert
                                    setLoading(false);
                                    alert(err.message);
                                });
                        })
                        .catch((err) => {
                            // TODO:
                            // Push notification not alert
                            setLoading(false);
                            alert(err.message);
                        });
                } else if (type === "background") {
                    db.collection("users").doc(user.uid)
                        .update({
                            backgroundUrl: fileUrl
                        })
                        .then(() => {
                            dispatch({
                                type: userActions.login,
                                payload: {
                                    ...user,
                                    backgroundUrl: fileUrl
                                }
                            });
                            setLoading(false);
                            history.push(`/profile/edit/${user.uid}`);
                        })
                        .catch((err) => {
                            // TODO:
                            // Push notification not alert
                            setLoading(false);
                            alert(err.message);
                        });
                }
            });
        });
    };

    const handleAvatarClick = () => {
        document.getElementById("upload-file").accept = ".png, .bmp, .jpg, .jpeg, .gif";
        document.getElementById("upload-file").click();
        document.getElementById("upload-file").onchange = (e) => onFileChange(e, "avatar");
    };

    const handleBackgroundClick = () => {
        document.getElementById("upload-file").accept = ".png, .bmp, .jpg, .jpeg, .gif";
        document.getElementById("upload-file").click();
        document.getElementById("upload-file").onchange = (e) => onFileChange(e, "background");
    };

    const handleUserDetailsSubmit = (e) => {
        e.preventDefault();

        if (!displayName) {
            setError(true);
            setErrorMessage("Full Name can't be empty");
            return;
        }
        const currUser = auth.currentUser;
        if (error) setError(false);
        if (errorMessage) setErrorMessage("");
        setLoading(true);
        currUser.updateProfile({
            displayName: displayName
        })
            .then(() => {
                db.collection("users").doc(user.uid)
                    .update({
                        displayName: displayName,
                        city: city,
                        company: company,
                        country: country,
                        headline: headline,
                        postalCode: postalCode,
                        github: github,
                    })
                    .then(() => {
                        history.push('/profile');
                        dispatch({
                            type: userActions.login,
                            payload: {
                                ...user,
                                displayName: displayName,
                                city: city,
                                company: company,
                                country: country,
                                headline: headline,
                                postalCode: postalCode,
                                github: github,
                            }
                        });
                        setLoading(false);

                        dispatch({
                            type: alertActions.add,
                            payload: {
                                severity: alertSeverities.success,
                                message: 'Edit successfull',
                            }
                        })
                    })
                    .catch((err) => {

                        setLoading(false);
                        dispatch({
                            type: alertActions.add,
                            payload: {
                                severity: alertSeverities.error,
                                message: 'Edit unsuccessfull',
                            }
                        })
                    });
            })
            .catch((err) => {
                // TODO:
                // Push notification not alert
                setLoading(false);
                alert(err.message);
            });

    }

    return (
        <>
            {
                loading ?
                    <div className="editProfile__loading">
                        <CircularProgress />
                    </div>
                    :
                    (null)
            }
            <div className="editProfile">
                <div className="editProfile__top">
                    <div className="editProfile__background">
                        {
                            user.backgroundUrl ?
                                <img src={user.backgroundUrl} alt="bacground" />
                                :
                                <img src={background} alt="bacground" />

                        }
                        <Fab onClick={handleBackgroundClick} color="primary" aria-label="edit" style={{ marginRight: "10px", marginTop: "10px", position: "absolute", right: 0 }}>
                            <EditIcon />
                        </Fab>
                    </div>
                    <div className="editProfile__avatar">
                        <Avatar className="editProfile-avatar" src={user.photoURL || ''} alt="user-avatar" >{user.email ? user.email[0].toUpperCase() : 'T'}</Avatar>
                        <Fab onClick={handleAvatarClick} color="primary" size="small" aria-label="edit" style={{ position: "absolute", left: 130, top: 30 }}>
                            <EditIcon size="small" aria-label="edit" style={{ width: 24, height: 24 }} />
                        </Fab>
                    </div>
                </div>
                <form className="editProfile__bottom">
                    <TextField
                        id="outlined-error-full-name"
                        label="Full Name"
                        defaultValue="Enter Full Name"
                        variant="outlined"
                        value={displayName}
                        error={error}
                        helperText={errorMessage}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <TextField
                        id="outlined-headline"
                        label="Headline"
                        defaultValue="Enter Headline"
                        variant="outlined"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                    />
                    <TextField
                        id="outlined-compnay"
                        label="Compnay"
                        defaultValue="Enter Compnay"
                        variant="outlined"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <TextField
                        id="outlined-country"
                        label="Country"
                        defaultValue="Enter Country"
                        variant="outlined"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <TextField
                        id="outlined-city"
                        label="City"
                        defaultValue="Enter City"
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        id="outlined-oostal-code"
                        label="Postal Code"
                        defaultValue="Enter Postal Code"
                        variant="outlined"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <TextField
                        id="outlined-oostal-code"
                        label="GitHub"
                        defaultValue="Enter GitHub"
                        variant="outlined"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                    />

                    <Button color="primary" variant="contained" onClick={handleUserDetailsSubmit}>save</Button>
                </form>
                <input id="upload-file" type="file" style={{ display: "none" }} />
            </div>
        </>
    )
}

export default EditProfile
