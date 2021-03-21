import { Avatar } from '@material-ui/core';
import React from 'react';
import '../css/NavigationOption.css'

const NavigationOption = ({ avatar, Icon, title }) => {
    return (
        <div className='navOption'>
            {Icon && <Icon className='navOption__icon' />}
            {avatar && (
                <Avatar className='navOption__icon' src={avatar} />
            )}
            <h3 className='navOption__title'>{title}</h3>
        </div>
    )
}

export default NavigationOption
