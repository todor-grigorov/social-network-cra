import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { Avatar, Fab } from '@material-ui/core';
import { useSelector } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import '../css/Profile.css';
import background from '../resources/images/test_background.jpeg';

const Profile = () => {
    const [profile, setProfile] = useState({});

    const user = useSelector((state => state.user));

    useEffect(() => {
        db.collection("users").where("uid", "==", user.uid).onSnapshot(snapshot => {
            // snapshot.docs.map(doc => console.log(doc.data()))
            if (snapshot.docs.length !== 1) return;
            const doc = snapshot.docs[0];
            setProfile({
                ...doc.data(),
                id: doc.id,
            }
            )
        });

        return () => {
            setProfile({});
        }
    }, []);

    return (
        <div className="profile">
            <div className="profile__top">
                <img src={background} alt="bacground" />
                <div>
                    <Avatar className="profile-avatar" src={user.photoURL || ''} alt="user-avatar" >{user.displayName[0].toUpperCase()}</Avatar>
                    <Fab color="primary" aria-label="edit" style={{ marginRight: "10px", marginTop: "10px" }}>
                        <EditIcon />
                    </Fab>
                </div>
            </div>
            <div className="profile__bottom">
                <div className="profile__bottom_details">
                    <h2>{user.displayName}</h2>
                    {
                        profile.headline ?
                            <h4>{profile.headline}</h4>
                            :
                            <h4 style={{ color: "gray" }}>Add a Headline of your choice, so your friends can see it</h4>
                    }
                    <p>
                        {
                            profile.country ?
                                <span>{profile.country} /</span>
                                :
                                <span className="profile__empty__detail">Add your Country /</span>
                        }
                        {
                            profile.city ?
                                <span> {profile.city} /</span>
                                :
                                <span className="profile__empty__detail"> Add your City /</span>
                        }
                        {
                            profile.postalCode ?
                                <span> {profile.postalCode}</span>
                                :
                                <span className="profile__empty__detail"> Your postal code here</span>
                        }
                    </p>
                </div>
                {
                    profile.company ?
                        <div className="profile__bottom_compnay">
                            {profile.company}
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
