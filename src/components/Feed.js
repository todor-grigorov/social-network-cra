import React from 'react';
import { useState, useEffect } from 'react';
import '../css/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import { db, auth } from '../firebase/firebase';
import FlipMove from 'react-flip-move';

function Feed() {

    const [posts, setPosts,] = useState([]);

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot(postsSnapshot => {

            let dataPosts = [];
            // const id = postDoc.data().uid;
            db.collection("users")
                .onSnapshot((usersSnapshot) => {
                    postsSnapshot.docs.forEach(postDoc => {
                        // if (usersSnapshot.docs.length !== 1) return;
                        usersSnapshot.docs.forEach(userDoc => {
                            if (userDoc.data().uid === postDoc.data().uid) {
                                dataPosts.push({
                                    id: postDoc.id,
                                    data: postDoc.data(),
                                    userRecord: userDoc.data(),
                                });
                            }
                        })

                    });

                    if (dataPosts.length)
                        setPosts(dataPosts);
                });
        });
    }, []);

    return (
        <div className="feed">
            <CreatePost />
            <FlipMove>
                {posts.map(({ id, data: { message, photoUrl, videoUrl, type }, userRecord: { displayName, email, photoURL } }) => {
                    return (
                        <Post
                            key={id}
                            name={displayName}
                            email={email}
                            message={message}
                            photoUrl={photoUrl}
                            videoUrl={videoUrl}
                            userPhotoUrl={photoURL}
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
