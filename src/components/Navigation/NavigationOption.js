import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from "react-redux";
import '../../css/NavigationOption.css'

const NavigationOption = ({ Icon, title, clickHandler, avatar = false }) => {
    const user = useSelector((state => state.user));
    return (
        <div className='navOption' onClick={clickHandler}>
            {Icon && <Icon className='navOption__icon' />}
            {avatar && <Avatar className='navOption__icon' style={{ fontSize: "0.7rem" }} src={user.photoURL || ''} >{user.email[0].toUpperCase()}</Avatar>}
            <h3 className='navOption__title'>{title}</h3>
        </div>
    )
}

export default NavigationOption
