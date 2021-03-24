import React from 'react';
import { useState, useEffect } from 'react';
import '../css/Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import InputOption from './InputOption';
import Post from './Post';
import { db } from '../firebase/firebase';
import firebase from 'firebase';

function Feed() {

    const [posts, setPosts,] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        db.collection("post").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        });
    }, []);

    const sendPost = (e) => {
        e.preventDefault();
        db.collection("post").add({
            name: 't.grigorov',
            description: 'just a test',
            message: input,
            photoUrl: '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput("");
    };

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form action="">
                        <input type="text" placeholder="Make a post" value={input} onChange={(e) => { setInput(e.target.value) }} />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
                    <InputOption Icon={EventNoteIcon} title="Video" color="#e7a33e" />
                    <InputOption Icon={SubscriptionsIcon} title="Event" color="#c0cbcd" />
                    <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7fc15e" />
                </div>
            </div>
            {posts.map(({ id, data: { name, description, message, photoUrl } }) => {
                return (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                    />
                )
            }
            )}
        </div>
    )
}

export default Feed
