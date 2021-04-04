import React, { useState } from 'react';
import TabPanel from './TabPanel';
import InvitationCard from './InvitationCard';
import '../css/MyNetwork.css';
import { useDispatch, useSelector } from "react-redux";
import background from '../resources/images/default_background.jpg';
import { Avatar, Button, Tab, Tabs } from '@material-ui/core';
import { Link } from "react-router-dom";

const MyNetwork = () => {
    const [tab, setTab] = useState(0);

    const user = useSelector((state => state.user));
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const invitations = [1, 2, 3, 4, 5,];

    const handleTabChange = (e, newValue) => {
        setTab(newValue);
    }

    const renderInvitationCard = () => {

        return (
            <div className="invitation__card">
                <Avatar className="myNetwork__avatar" alt="user photo" src={user.photoURL || ''} >{user.email ? user.email[0].toUpperCase() : 'T'}</Avatar>
            </div>
        );
    }

    return (
        <>
            <div className="invitations">
                <h4>Invitations</h4>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="invitation tabs"
                    style={{ marginBottom: "10px" }}
                >
                    <Tab label="Recieved" id="recieved" />
                    <Tab label="Sent" id="sent" />
                </Tabs>
                <TabPanel value={tab} index={0} className="invitation_tabPanel">{invitations.map(x => <InvitationCard />)}</TabPanel>
                <TabPanel value={tab} index={1} className="invitation_tabPanel">{invitations.map(x => <InvitationCard />)}</TabPanel>
            </div>
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
        </>
    )
}

export default MyNetwork
