import * as React from "react";
import { Link } from "react-router-dom";
import '../../css/App.css';


const SignIn = (props) => {


    return (
        <div className="signin-page">
            <div className="signin-container">
                <form id="signin-form" method="POST">
                    <h1>Sign in</h1>
                    <p>Your programming social network</p>
                    <div>
                        <label htmlFor="usernmae">Username</label>
                        <input id="username" type="text" name="username" placeholder="USERNAME" />
                    </div>
                    <div>
                        <label htmlFor="usernmae">Password</label>
                        <input id="password" type="password" name="password" placeholder="PASSWORD" />
                    </div>

                    <button type="submit">Sign in</button>
                </form>
            </div>
            <div>
                <span>New member? <Link to="/register" className="join-now-btn">Join now</Link></span>
            </div>
        </div>
    );
}

export default (SignIn)