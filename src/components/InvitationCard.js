import React from 'react';
import '../css/InvitationCard.css';
import { Avatar, Button } from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const InvitationCard = ({ displayName, headline, acceptInvitaionHandler, rejectInvitationHandler }) => {
    return (
        <div className="invitationCard">
            {/* <Avatar className="invitationCard__avatar" alt="user photo" src={user.photoURL || ''} >{user.email ? user.email[0].toUpperCase() : 'T'}</Avatar> */}
            <Avatar className="invitationCard__avatar" alt="user photo">{'T'}</Avatar>
            <div className="invitationCard__details">
                <h5>{displayName || "New user"}</h5>
                <h6>{headline || "Headline goes here"}</h6>
            </div>
            <div className="invitationCard__buttons">
                <Button onClick={acceptInvitaionHandler}><CheckCircleOutlineOutlinedIcon color="primary" /></Button>
                <Button onClick={rejectInvitationHandler}><CancelOutlinedIcon color="secondary" /></Button>
            </div>
        </div>
    )
}

export default InvitationCard;
