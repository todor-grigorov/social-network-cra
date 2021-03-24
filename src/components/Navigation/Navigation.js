import * as React from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import '../../css/Navigation.css';
// import logo from '../resources/logos/COMPUTPIXELS.png';
import logo from '../../resources/logos/a-lab.png';
import avatarPic from '../../resources/logos/ninja-avatar.png'
import NavigationOption from "./NavigationOption";
import HomeIcon from '@material-ui/icons/Home'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';



const Navigation = (props) => {


    return (
        <div className="nav">
            {/* Public Navigation */}
            {/* <Link to="/">
                <img src={logo} alt="logo" style={{ maxWidth: "7em" }} />
            </Link>
            <div className="">
                <Link className="nav-btn-only-text" to="/register">Join now</Link>
                <Link className="nav-btn-outlined" to="/signin">Sign in</Link>
            </div> */}

            {/* Private Navigation */}
            <div className="nav__left">
                <img src={logo} alt="logo" style={{ maxWidth: "7em" }} />
                <div className="nav__search">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="nav__right">
                <NavigationOption Icon={HomeIcon} title="Home" />
                <NavigationOption Icon={SupervisorAccountIcon} title="My Network" />
                <NavigationOption Icon={BusinessCenterIcon} title="Jobs" />
                <NavigationOption Icon={ChatIcon} title="Messages" />
                <NavigationOption Icon={NotificationsIcon} title="Notifications" />
                <NavigationOption avatar={avatarPic} title="My profile" />
            </div>
        </div>
    );
}

export default (Navigation)