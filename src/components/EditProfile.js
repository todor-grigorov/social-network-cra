import React, { useState, useEffect } from 'react';
import '../css/EditProfile.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { db, storage, auth } from '../firebase/firebase';
import { Avatar, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import background from '../resources/images/default_background.jpg';
import userActions from '../redux/actions/userActions';

const EditProfile = () => {
    const [docId, setDocId] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state => state.user));
    const { userId } = useParams();

    useEffect(() => {
        if (user.uid !== userId) return;
        db.collection("users").where("uid", "==", user.uid).onSnapshot(snapshot => {
            if (snapshot.docs.length !== 1) return;
            const doc = snapshot.docs[0];
            setDocId(doc.id);

        });

        return () => {
            setDocId("");
        }
    }, [user]);

    const onFileChange = (e, type) => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then(fileUrl => {
                if (type === "avatar") {
                    const currUser = auth.currentUser;
                    currUser.updateProfile({
                        photoURL: fileUrl
                    })
                        .then((res) => {
                            dispatch({
                                type: userActions.login,
                                payload: {
                                    ...user,
                                    photoURL: fileUrl
                                }
                            });
                        })
                        .catch((err) => {
                            // TODO:
                            // Push notification not alert
                            alert(err.message);
                        });
                } else if (type === "background") {
                    db.collection("users").doc(docId)
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
                        })
                        .catch((err) => {
                            // TODO:
                            // Push notification not alert
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


    return (
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
                    <Avatar className="editProfile-avatar" src={user.photoURL || ''} alt="user-avatar" >{user.displayName[0].toUpperCase()}</Avatar>
                    <Fab onClick={handleAvatarClick} color="primary" size="small" aria-label="edit" style={{ position: "absolute", left: 75 }}>
                        <EditIcon size="small" aria-label="edit" style={{ width: 24, height: 24 }} />
                    </Fab>
                </div>
            </div>
            <input id="upload-file" type="file" style={{ display: "none" }} />
        </div>
    )
}

export default EditProfile
