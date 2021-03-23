import React from 'react'
import { Avatar } from '@material-ui/core';
import '../css/Sidebar.css';
import background from '../resources/images/test_background.jpeg';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src={background} alt="" />
                <Avatar className="sidebar__avatar" />
                <h2>T Grigorov</h2>
                <h4>tod@abv.bg</h4>
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
            </div>
        </div>
    )
}

export default Sidebar
