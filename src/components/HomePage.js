import * as React from "react";
import '../css/App.css';
import mainImage from "../resources/images/web-2389250_1280.jpg"


const HomePage = (props) => {


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <section className="section">
                <h1 className="public-headline">Welcome to your programming community</h1>
                <img className="public-main-img" src={mainImage} alt="main-pic" />
            </section>
        </div>
    );
}

export default (HomePage)