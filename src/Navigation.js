import * as React from "react";
import './css/navigation.css';
import logo from './resources/logos/COMPUTPIXELS.png';


const Navigation = (props) => {


    return (
        <div className="nav">
            <div className="">
                <img src={logo} alt="logo" style={{ maxWidth: "7em" }} />
            </div>
            <div className="">
                <a className="nav-btn-only-text" href="">Join now</a>
                <a className="nav-btn-outlined" href="">Sign in</a>
            </div>
        </div>
    );
}

export default (Navigation)