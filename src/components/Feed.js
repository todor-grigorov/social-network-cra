import React from 'react';
import { useState, useEffect } from 'react';
import '../css/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import { useSelector } from "react-redux";
import { db, auth } from '../firebase/firebase';
import FlipMove from 'react-flip-move';
import firebase from "firebase";


function Feed() {

    const [posts, setPosts] = useState([]);

    const user = useSelector((state) => state.user);

    const handleLike = (e, postId) => {
        if (!postId) return;
        const postRef = db.collection('posts').doc(postId);
        postRef.get()
            .then(doc => {
                const data = doc.data();

                if (data.likes.includes(user.uid)) {
                    postRef.update({
                        likes: firebase.firestore.FieldValue.arrayRemove(user.uid)
                    })
                        .catch((err) => alert(err.message));
                } else {
                    postRef.update({
                        likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
                    })
                        .catch((err) => alert(err.message));
                }
            });


    };

    const fetchUsers = (uids = []) => {
        return new Promise((resolve, reject) => {
            const promises = [];
            uids.forEach(uid => {
                promises.push(db.collection("users").doc(uid).get());
            });

            Promise.all(promises).then(users => {
                resolve(users);
            })
                .catch(err => reject(err));
        })
    };

    useEffect(() => {
        const fetchPopulatedPosts = async () => {

            db.collection("posts").orderBy("timestamp", "desc").onSnapshot(async (postsSnapshot) => {
                try {
                    const uniqueUIDs = [...new Set(postsSnapshot.docs.map(x => x.data().uid))];
                    const users = await fetchUsers(uniqueUIDs);
                    let dataPosts = [];

                    postsSnapshot.docs.forEach(post => {
                        users.forEach(user => {
                            if (user.data().uid === post.data().uid) {
                                dataPosts.push({
                                    id: post.id,
                                    data: post.data(),
                                    userRecord: user.data(),
                                });
                            }
                        })
                    })


                    if (dataPosts.length)
                        setPosts(dataPosts);

                } catch (err) {
                    // TODO:
                    // Push notification not alert
                    alert(err.message);
                }
            });

        }

        fetchPopulatedPosts();
    }, []);


    return (
        <div className="feed">
            <CreatePost />
            <FlipMove>
                {posts.map(({ id, data: { message, photoUrl, videoUrl, type, likes }, userRecord: { displayName, email, photoURL } }) => {
                    return (
                        <Post
                            key={id}
                            id={id}
                            uid={user.uid}
                            name={displayName}
                            email={email}
                            message={message}
                            photoUrl={photoUrl}
                            videoUrl={videoUrl}
                            userPhotoUrl={photoURL}
                            type={type}
                            likes={likes}
                            handleLike={handleLike}
                        />
                    )
                }
                )}
            </FlipMove>
        </div>
    )
}

export default Feed
