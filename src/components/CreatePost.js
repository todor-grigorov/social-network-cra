import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import InputOption from './InputOption';
import { db, storage } from '../firebase/firebase';
import firebase from 'firebase';
import { useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CreatePost = () => {
    const [input, setInput] = useState("");
    const [type, setType] = useState("");
    const [fileURL, setFileURL] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const user = useSelector((state => state.user));

    const sendPost = (e) => {
        e.preventDefault();
        db.collection("post").add({
            name: user.displayName,
            description: user.email,
            message: input,
            userPhotoUrl: user.photoURL,
            type: type,
            photoUrl: type === "image" ? fileURL : "",
            videoUrl: type === "video" ? fileURL : "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput("");
        setFileURL("");
        setType("");
        setOpenDialog(false);
    };

    const onFileChange = (e, type) => {
        // console.log(e.target.files[0]);
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
    }

    const handlePhotoClick = () => {
        document.getElementById("upload-file").accept = ".png, .bmp, .jpg, .jpeg, .gif";
        document.getElementById("upload-file").click();
        document.getElementById("upload-file").onchange = (e) => onFileChange(e, "image");
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const renderDialog = () => (
        <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                    <p>Create a post</p>
                </DialogTitle>
                <IconButton aria-label="close" onClick={handleCloseDialog}>
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogContent dividers>
                <img src={fileURL} alt="post-image" />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={sendPost} color="primary">
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
                <InputOption Icon={EventNoteIcon} title="Video" color="#e7a33e" />
                <InputOption Icon={SubscriptionsIcon} title="Event" color="#c0cbcd" />
                <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7fc15e" />
                <input id="upload-file" type="file" style={{ display: "none" }} />
            </div>
            { renderDialog()}
        </div>
    )
}

export default CreatePost
