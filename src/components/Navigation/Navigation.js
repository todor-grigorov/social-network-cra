import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import '../../css/Navigation.css';
// import logo from '../resources/logos/COMPUTPIXELS.png';
import logo from '../../resources/logos/a-lab.png';
// import avatarPic from '../../resources/logos/ninja-avatar.png'
import NavigationOption from "./NavigationOption";
import HomeIcon from '@material-ui/icons/Home'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@material-ui/core";
import { auth } from '../../firebase/firebase';
// import { makeStyles } from "@material-ui/core/styles";


// const useStyles = makeStyles((theme) => ({
//     popOver: {

//     }
// }));

const Navigation = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useSelector((state => state.user));
    let history = useHistory();
    // const classes = useStyles();

    const handleCloseProfilePropsList = () => {
        setAnchorEl(null);
    };

    const renderProfilePropsList = () => (
        <Menu
            id="user-profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseProfilePropsList}
        >
            <MenuItem onClick={handleCloseProfilePropsList}>Profile</MenuItem>
            {/* <MenuItem onClick={handleCloseProfilePropsList}>My account</MenuItem> */}
            <MenuItem onClick={logout} >Logout</MenuItem>
        </Menu>
    );

    const handleProfileBtnClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logout = () => {
        auth.signOut()
            .then(() => {
                // dispatch({ type: userActions.logOut });
                history.push("/");
            });
    };

    return (
        <div className="nav">
            {user.email ?
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
                        <NavigationOption Icon={HomeIcon} title="Home" />
                        <NavigationOption Icon={SupervisorAccountIcon} title="My Network" />
                        <NavigationOption Icon={BusinessCenterIcon} title="Jobs" />
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