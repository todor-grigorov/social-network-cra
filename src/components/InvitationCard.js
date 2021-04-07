import React from 'react';
import '../css/InvitationCard.css';
import { Avatar, Button } from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const InvitationCard = ({ uid, displayName, headline, photoURL, acceptInvitaionHandler, rejectInvitationHandler, recieved }) => {
    return (
        <div className={recieved ? "invitationCard" : "invitationCardSent"}>
            <Avatar className="invitationCard__avatar" alt="user photo" src={photoURL || ''} >{displayName ? displayName[0].toUpperCase() : 'T'}</Avatar>
            <div className={recieved ? "invitationCard__details" : "invitationCard__details sent"}>
                <h5>{displayName || "New user"}</h5>
                <h6>{headline || "Headline goes here"}</h6>
            </div>
            {
                recieved ?
                    <div className="invitationCard__buttons">
                        <Button onClick={(e) => { acceptInvitaionHandler(e, uid) }}><CheckCircleOutlineOutlinedIcon color="primary" /></Button>
                        <Button onClick={(e) => { rejectInvitationHandler(e, uid) }}><CancelOutlinedIcon color="secondary" /></Button>
                    </div>
                    :
                    (null)
            }
        </div>
    )
}

export default InvitationCard;
