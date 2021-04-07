import React, { useState } from 'react';
import '../css/CreatePost.css';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import InputOption from './InputOption';
import { db, storage } from '../firebase/firebase';
import firebase from 'firebase';
import { useSelector } from "react-redux";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    dialog: {
        width: 552,
        maxWidth: 552,
        maxHeight: "70%",
        height: "70%",
        marginBottom: "5%",
    }
}));

const CreatePost = () => {
    const [input, setInput] = useState("");
    const [type, setType] = useState("");
    const [fileURL, setFileURL] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const user = useSelector((state => state.user));
    let history = useHistory();
    const classes = useStyles();

    const sendPost = (e) => {
        e.preventDefault();
        db.collection("posts").add({
            uid: user.uid,
            message: input,
            type: type,
            photoUrl: type === "image" ? fileURL : "",
            videoUrl: type === "video" ? fileURL : "",
            likes: [],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then((docRef) => {
                setInput("");
                setFileURL("");
                setType("");
                setOpenDialog(false);
            })
            .catch(err => {
                // TODO:
                // Push notification not alert
                alert(err.message);
            });


    };

    const onFileChange = (e, type) => {
        setFileURL("");
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then(fileUrl => {
                setFileURL(fileUrl);
                setType(type);
                setOpenDialog(true);
            });
        });
    };

    const handlePhotoClick = () => {
        document.getElementById("upload-file").accept = ".png, .bmp, .jpg, .jpeg, .gif";
        document.getElementById("upload-file").click();
        document.getElementById("upload-file").onchange = (e) => onFileChange(e, "image");
    };

    const handleVideoClick = () => {
        document.getElementById("upload-file").accept = ".MP4, .MOV, .WMV, .FLV, .AVI, .AVCHD, .WebM, .MKV";
        document.getElementById("upload-file").click();
        document.getElementById("upload-file").onchange = (e) => onFileChange(e, "video");
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const renderDialog = () => (
        <Dialog classes={{ paperWidthSm: classes.dialog }} onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
            <div className="createPost__dialogTitle">
                <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                    <p>Create a post</p>
                </DialogTitle>
                <IconButton aria-label="close" onClick={handleCloseDialog}>
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogContent dividers className="createPost__dialogContent">
                <div className="post__header">
                    <Avatar src={user.photoURL || ''} alt="user-avatar" >{user.email ? user.email[0].toUpperCase() : ''}</Avatar>
                    <div className="post__info">
                        <h2>{user.displayName}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
                <input type="text" placeholder="What do you want to talk about?" onChange={(e) => setInput(e.target.value)} />
                {type === "image" ?
                    <img src={fileURL} alt="post-pic" />
                    :
                    type === "video" ?
                        <video src={fileURL} controls>
                            Your browser does not support the video tag.
                    </video>
                        :
                        (null)
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={sendPost} color="primary">
                    Post
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon />
                <form action="">
                    <input type="text" placeholder="Make a post" value={input} onChange={(e) => { setInput(e.target.value) }} />
                    <button onClick={sendPost} type="submit">Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" handleClick={handlePhotoClick} />
                <InputOption Icon={EventNoteIcon} title="Video" color="#e7a33e" handleClick={handleVideoClick} />
                <InputOption Icon={SubscriptionsIcon} title="Event" color="#c0cbcd" />
                <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7fc15e" />
                <input id="upload-file" type="file" style={{ display: "none" }} />
            </div>
            { renderDialog()}
        </div>
    )
}

export default CreatePost
