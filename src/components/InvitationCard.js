import React from 'react';
import '../css/InvitationCard.css';
import { Avatar, Button } from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { Link } from 'react-router-dom';

const InvitationCard = ({ uid, displayName, headline, photoURL, acceptInvitaionHandler, rejectInvitationHandler, recieved }) => {
    return (
        <div className={recieved ? "invitationCard" : "invitationCardSent"}>
            <Link to={`/profile/${uid}`}>
                <Avatar className="invitationCard__avatar" alt="user photo" src={photoURL || ''} >{displayName ? displayName[0].toUpperCase() : 'T'}</Avatar>
            </Link>
            <div className={recieved ? "invitationCard__details" : "invitationCard__details sent"}>
                <Link to={`/profile/${uid}`}>
                    <h5 className="invitationCard__details__name">{displayName || "New user"}</h5>
                </Link>
                <h6 className="invitationCard__details__headline">{headline || "Headline goes here"}</h6>
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
