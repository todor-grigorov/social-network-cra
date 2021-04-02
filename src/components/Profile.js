import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { Avatar, Fab } from '@material-ui/core';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import '../css/Profile.css';
import background from '../resources/images/default_background.jpg';

const Profile = () => {
    // const [profile, setProfile] = useState({});

    const user = useSelector((state => state.user));

    // useEffect(() => {
    //     db.collection("users").where("uid", "==", user.uid).onSnapshot(snapshot => {
    //         // snapshot.docs.map(doc => console.log(doc.data()))
    //         if (snapshot.docs.length !== 1) return;
    //         const doc = snapshot.docs[0];
    //         setProfile({
    //             ...doc.data(),
    //             id: doc.id,
    //         }
    //         )
    //     });

    //     return () => {
    //         setProfile({});
    //     }
    // }, []);

    return (
        <div className="profile">
            <div className="profile__top">
                {
                    user.backgroundUrl ?
                        <img src={user.backgroundUrl} alt="bacground" />
                        :
                        <img src={background} alt="bacground" />
                }
                <div>
                    <Avatar className="profile-avatar" src={user.photoURL || ''} alt="user-avatar" >{user.email ? user.email[0].toUpperCase() : 'T'}</Avatar>
                    <Link to={`/profile/edit/${user.uid}`}>
                        <Fab color="primary" aria-label="edit" style={{ marginRight: "10px", marginTop: "10px" }}>
                            <EditIcon />
                        </Fab>
                    </Link>
                </div>
            </div>
            <div className="profile__bottom">
                <div className="profile__bottom_details">
                    <h2>{user.displayName}</h2>
                    {
                        user.headline ?
                            <h4>{user.headline}</h4>
                            :
                            <h4 style={{ color: "gray" }}>Add a Headline of your choice, so your friends can see it</h4>
                    }
                    <p>
                        {
                            user.country ?
                                <span>{user.country} /</span>
                                :
                                <span className="profile__empty__detail">Add your Country /</span>
                        }
                        {
                            user.city ?
                                <span> {user.city} /</span>
                                :
                                <span className="profile__empty__detail"> Add your City /</span>
                        }
                        {
                            user.postalCode ?
                                <span> {user.postalCode}</span>
                                :
                                <span className="profile__empty__detail"> Your postal code here</span>
                        }
                    </p>
                </div>
                {
                    user.company ?
                        <div className="profile__bottom_compnay">
                            {user.company}
                        </div>
                        :
                        <div className="profile__bottom_compnay" style={{ color: "gray", fontSize: "0.9rem" }}>
                            Add Your Company Name
                        </div>
                }
            </div>
        </div>
    )
}

export default Profile
