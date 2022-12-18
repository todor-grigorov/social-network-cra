import { Button } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import '../css/App.css';
// import mainImage from "../resources/images/web-2389250_1280.jpg";
// import mainImage from "../resources/images/thisisengineering2.jpg";
// import mainImage from "../resources/images/code.jpg";


const HomePage = () => {
    return (
        <div data-testid="home-page" className="home__container">
            <div className="home__text">
                <h1 className="public-headline">Welcome to your programming community</h1>
                <div className="home__introduction">
                    <h2>Here you will find your fellow programmers and share your passion for programming</h2>
                </div>
                <div className="home__buttons">
                    <Link to="/register">
                        <Button variant="contained" color="primary" size="large">join now</Button>
                    </Link>
                    <Link to="/signin">
                        <Button variant="contained" color="primary" size="large">sign in</Button>
                    </Link>
                </div>
            </div>
            {/* <section className="section">
                <img className="public-main-img" src={mainImage} alt="main-pic" />
            </section> */}
        </div>
    );
}

export default (HomePage)