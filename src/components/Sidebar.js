import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../css/Sidebar.css';
import background from '../resources/images/default_background.jpg';

const Sidebar = () => {
    const user = useSelector((state => state.user));

    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    )

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                {
                    user.backgroundUrl ?
                        <img src={user.backgroundUrl} alt="bacground" />
                        :
                        <img src={background} alt="bacground" />
                }
                <Link to="/profile">
                    <Avatar className="sidebar__avatar" alt="user photo" src={user.photoURL || ''} >{user.email[0].toUpperCase()}</Avatar>
                </Link>
                <Link to="/profile">
                    <h2 className="sidebar__top__name">{user.displayName || "New user"}</h2>
                </Link>
                <h4>{user.email || "Add yor email"}</h4>
            </div>
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className="sidebar__statNumber">1,096</p>
                </div>
                <div className="sidebar__stat">
                    <p>Viewes on posts</p>
                    <p className="sidebar__statNumber">2,207</p>
                </div>
            </div>

            <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem('reactjs')}
                {recentItem('devOps')}
                {recentItem('javascript')}
                {recentItem('developper')}
                {recentItem('programming')}
            </div>
        </div>
    )
}

export default Sidebar
