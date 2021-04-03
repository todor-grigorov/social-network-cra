import React from 'react';
import '../css/MyNetwork.css';
import { useDispatch, useSelector } from "react-redux";
import background from '../resources/images/default_background.jpg';
import { Avatar, Button } from '@material-ui/core';

const MyNetwork = () => {

    const user = useSelector((state => state.user));
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    return (
        <div className="myNetwork">
            <div className="myNetwork__cards">
                {
                    cards.map(card => (
                        <div className="myNetwork__card">
                            {
                                user.backgroundUrl ?
                                    <img src={user.backgroundUrl} alt="bacground" />
                                    :
                                    <img src={background} alt="bacground" />
                            }
                            <Avatar className="myNetwork__avatar" alt="user photo" src={user.photoURL || ''} >{user.email ? user.email[0].toUpperCase() : 'T'}</Avatar>
                            <h2>{user.displayName || "New user"}</h2>
                            <h3>{user.headline || "Headline goes here"}</h3>
                            <h4>{user.email || "Add yor email"}</h4>
                            <Button variant="outlined" color="primary">connect</Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyNetwork
