import * as React from "react";
import { Link } from "react-router-dom";
import '../css/Navigation.css';
import logo from '../resources/logos/COMPUTPIXELS.png';


const Navigation = (props) => {


    return (
        <div className="nav">
            <Link to="/">
                <img src={logo} alt="logo" style={{ maxWidth: "7em" }} />
            </Link>
            <div className="">
                <Link className="nav-btn-only-text" to="/register">Join now</Link>
                <Link className="nav-btn-outlined" to="/signin">Sign in</Link>
            </div>
        </div>
    );
}

export default (Navigation)