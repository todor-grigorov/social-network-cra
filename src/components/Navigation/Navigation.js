import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import '../../css/Navigation.css';
import logo from '../../resources/logos/a-lab.png';
import NavigationOption from "./NavigationOption";
import HomeIcon from '@material-ui/icons/Home'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector } from "react-redux";
import { Card, Menu, MenuItem } from "@material-ui/core";
import { auth } from '../../firebase/firebase';


const Navigation = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((state => state.user));
    let history = useHistory();

    const handleProfilePropsList = () => {
        setShowMenu(false)
        setAnchorEl(null);
        history.push("/profile");
    };

    const handleCloseProfilePropsList = () => {
        setShowMenu(false)
        setAnchorEl(null);
    };

    const renderProfilePropsList = () => {
        return (
            showMenu && user.email && user.displayName ?
                <Menu
                    id="user-profile-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseProfilePropsList}
                >
                    <MenuItem onClick={handleProfilePropsList}>Profile</MenuItem>
                    {/* <MenuItem onClick={handleCloseProfilePropsList}>My account</MenuItem> */}
                    <MenuItem onClick={logout} >Logout</MenuItem>
                </Menu>
                :
                (null)
        );
    }

    const handleProfileBtnClick = (event) => {
        setShowMenu(true);
        setAnchorEl(event.currentTarget);
    };

    const logout = () => {
        auth.signOut()
            .then(() => {
                // dispatch({ type: userActions.logOut });
                setAnchorEl(null);
                setShowMenu(false);
                history.push("/");
            });
    };

    return (
        <div className="nav">
            {user.email && user.displayName ?
                <>
                    {/* Private Navigation */}
                    <div className="nav__left">
                        <img src={logo} alt="logo" style={{ maxWidth: "2em" }} />
                        <div className="nav__search">
                            <SearchIcon />
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div className="nav__right">
                        <Link to="/feed"><NavigationOption Icon={HomeIcon} title="Home" /></Link>
                        <NavigationOption Icon={SupervisorAccountIcon} title="My Network" />
                        <Link to="/jobs"><NavigationOption Icon={BusinessCenterIcon} title="Jobs" /></Link>
                        <NavigationOption Icon={ChatIcon} title="Messages" />
                        <NavigationOption Icon={NotificationsIcon} title="Notifications" />
                        <NavigationOption avatar={true} title="My profile" clickHandler={handleProfileBtnClick} />
                        {renderProfilePropsList()}
                    </div>
                </>
                :
                <>
                    {/* Public Navigation */}
                    <Link to="/">
                        <img src={logo} alt="logo" style={{ maxWidth: "2em" }} />
                    </Link>
                    <div className="">
                        <Link className="nav-btn-only-text" to="/register">Join now</Link>
                        <Link className="nav-btn-outlined" to="/signin">Sign in</Link>
                    </div>
                </>
            }
        </div>
    );
}

export default (Navigation)