import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { Avatar, Fab } from '@material-ui/core';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from "react-router-dom";
import '../css/Profile.css';
import background from '../resources/images/default_background.jpg';

const Profile = () => {
    const [profile, setProfile] = useState({});

    const user = useSelector((state => state.user));
    const { userId } = useParams();

    useEffect(() => {
        if (userId) {
            db.collection("users").doc(userId).onSnapshot(doc => {
                setProfile({
                    ...doc.data(),
                    id: doc.id,
                }
                )
            });
        } else {
            setProfile(user);
        }

        return () => {
            setProfile({});
        }
    }, [userId]);

    return (
        <div className="profile">
            <div className="profile__top">
                {
                    profile.backgroundUrl ?
                        <img src={profile.backgroundUrl} alt="bacground" />
                        :
                        <img src={background} alt="bacground" />
                }
                <div>
                    <Avatar className="profile-avatar" src={profile.photoURL || ''} alt="user-avatar" >{profile.email ? profile.email[0].toUpperCase() : 'T'}</Avatar>
                    {
                        !userId || userId === user.uid ?
                            <Link to={`/profile/edit/${profile.uid}`}>
                                <Fab color="primary" aria-label="edit" style={{ marginRight: "10px", marginTop: "10px" }}>
                                    <EditIcon />
                                </Fab>
                            </Link>
                            :
                            (null)
                    }
                </div>
            </div>
            <div className="profile__bottom">
                <div className="profile__bottom_details">
                    <h2>{profile.displayName}</h2>
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
                        <span className="profile__github">
                            <span>GitHub:</span>
                            {
                                profile.github ?
                                    <a href={profile.github}></a>
                                    :
                                    <span className="profile__empty__detail"> Enter your GitHub Profile</span>
                            }
                        </span>
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
