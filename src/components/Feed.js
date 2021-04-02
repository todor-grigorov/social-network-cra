import React from 'react';
import { useState, useEffect } from 'react';
import '../css/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import { db } from '../firebase/firebase';
import FlipMove from 'react-flip-move';

function Feed() {

    const [posts, setPosts,] = useState([]);

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

    return (
        <div className="feed">
            <CreatePost />
            <FlipMove>
                {posts.map(({ id, data: { name, description, message, photoUrl, userPhotoUrl, videoUrl, type } }) => {
                    return (
                        <Post
                            key={id}
                            name={name}
                            description={description}
                            message={message}
                            photoUrl={photoUrl}
                            videoUrl={videoUrl}
                            userPhotoUrl={userPhotoUrl}
                            type={type}
                        />
                    )
                }
                )}
            </FlipMove>
        </div>
    )
}

export default Feed
