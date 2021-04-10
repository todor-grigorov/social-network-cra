import React, { useState, useEffect } from "react";
import TabPanel from "./TabPanel";
import InvitationCard from "./InvitationCard";
import "../css/MyNetwork.css";
import { useSelector } from "react-redux";
import background from "../resources/images/default_background.jpg";
import { Avatar, Button, Tab, Tabs } from "@material-ui/core";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import firebase from "firebase";

const MyNetwork = () => {
    const [tab, setTab] = useState(0);
    const [connectUsers, setConnectUsers] = useState([]);
    const [recievedInvitationUsers, setRecievedInvitationUsers] = useState([]);
    const [sentInvitationUsers, setSentInvitationUsers] = useState([]);
    const [network, setNetwork] = useState([]);

    const user = useSelector((state) => state.user);

    const fetchSentInvitationUsers = () => {
        return new Promise((resolve, reject) => {
            if (!user.sentInvitations.length) resolve([]);
            let usersRef = db
                .collection("users")
                .where("uid", "in", [...user.sentInvitations]);
            usersRef
                .get()
                .then((snapshot) => {
                    resolve(snapshot.docs);
                })
                .catch((err) => reject(err));
        });
    };

    const fetchRecievedInvitationUsers = () => {
        return new Promise((resolve, reject) => {
            if (!user.recievedInvitations.length) resolve([]);
            let usersRef = db
                .collection("users")
                .where("uid", "in", [...user.recievedInvitations]);
            usersRef
                .get()
                .then((snapshot) => {
                    resolve(snapshot.docs);
                })
                .catch((err) => reject(err));
        });
    };

    const fetchConnectUsers = () => {
        return new Promise((resolve, reject) => {
            let usersRef = db
                .collection("users")
                .where("uid", "not-in", [
                    ...user.network,
                    ...user.sentInvitations,
                    ...user.recievedInvitations,
                    user.uid,
                ]);
            usersRef
                .get()
                .then((snapshot) => {
                    resolve(snapshot.docs);
                })
                .catch((err) => reject(err));
        });
    };

    const fetchNetwork = () => {
        return new Promise((resolve, reject) => {
            if (!user.network.length) resolve([]);
            let usersRef = db
                .collection("users")
                .where("uid", "in", [...user.network]);
            usersRef
                .get()
                .then((snapshot) => {
                    resolve(snapshot.docs);
                })
                .catch((err) => reject(err));
        });
    };

    const handleTabChange = (e, newValue) => {
        setTab(newValue);
    };

    const handleConnectClick = (e, recipientId) => {
        const senderRef = db.collection("users").doc(user.uid);
        const recipientRef = db.collection("users").doc(recipientId);

        senderRef
            .update({
                sentInvitations: firebase.firestore.FieldValue.arrayUnion(recipientId),
            })
            .then(() => {
                recipientRef
                    .update({
                        recievedInvitations: firebase.firestore.FieldValue.arrayUnion(
                            user.uid
                        ),
                    })
                    .catch((err) => console.log(err.message));
            })
            .catch((err) => console.log(err.message + 'handleConnectClick'));
    };

    const handleAcceptInvitation = (e, invUserId) => {
        const senderRef = db.collection("users").doc(invUserId);
        const recipientRef = db.collection("users").doc(user.uid);

        senderRef
            .update({
                sentInvitations: firebase.firestore.FieldValue.arrayRemove(user.uid),
                network: firebase.firestore.FieldValue.arrayUnion(user.uid),
            })
            .then(() => {
                recipientRef
                    .update({
                        recievedInvitations: firebase.firestore.FieldValue.arrayRemove(
                            invUserId
                        ),
                        network: firebase.firestore.FieldValue.arrayUnion(invUserId),
                    })
                    .catch((err) => console.log(err.message + 'handleAcceptInvitation'));
            })
            .catch((err) => console.log(err.message + 'handleAcceptInvitation'));
    };

    const handleRejectInvitation = (e, invUserId) => {
        const senderRef = db.collection("users").doc(invUserId);
        const recipientRef = db.collection("users").doc(user.uid);

        senderRef
            .update({
                sentInvitations: firebase.firestore.FieldValue.arrayRemove(user.uid),
            })
            .then(() => {
                recipientRef
                    .update({
                        recievedInvitations: firebase.firestore.FieldValue.arrayRemove(
                            invUserId
                        ),
                    })
                    .catch((err) => console.log(err.message + 'handleRejectInvitation'));
            })
            .catch((err) => console.log(err.message + 'handleRejectInvitation'));
    };

    useEffect(() => {
        if (user.uid) {
            fetchNetwork()
                .then((userDocs) =>
                    setNetwork(
                        userDocs.map((x) => {
                            return { id: x.id, ...x.data() };
                        })
                    )
                )
                .catch((err) => console.log(err.message + 'fetchNetwork'));

            fetchConnectUsers()
                .then((userDocs) =>
                    setConnectUsers(
                        userDocs.map((x) => {
                            return { id: x.id, ...x.data() };
                        })
                    )
                )
                .catch((err) => console.log(err.message + 'fetchConnectUsers'));

            fetchRecievedInvitationUsers()
                .then((userDocs) =>
                    setRecievedInvitationUsers(
                        userDocs.map((x) => {
                            return { id: x.id, ...x.data() };
                        })
                    )
                )
                .catch((err) => console.log(err.message + 'fetchRecievedInvitationUsers'));

            fetchSentInvitationUsers()
                .then((userDocs) =>
                    setSentInvitationUsers(
                        userDocs.map((x) => {
                            return { id: x.id, ...x.data() };
                        })
                    )
                )
                .catch((err) => console.log(err.message + 'fetchSentInvitationUsers'));
        }
    }, [user]);

    return (
        <>
            <div className="invitations">
                <h4>My Network</h4>
                {network.map((invUser) => (
                    <InvitationCard
                        recieved={false}
                        uid={invUser.uid}
                        displayName={invUser.displayName}
                        headline={invUser.headline}
                        photoURL={invUser.photoURL}
                    />
                ))}
            </div>
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
                <TabPanel value={tab} index={0} className="invitation_tabPanel">
                    {recievedInvitationUsers.map((invUser) => (
                        <InvitationCard
                            recieved={true}
                            uid={invUser.uid}
                            displayName={invUser.displayName}
                            headline={invUser.headline}
                            photoURL={invUser.photoURL}
                            acceptInvitaionHandler={handleAcceptInvitation}
                            rejectInvitationHandler={handleRejectInvitation}
                        />
                    ))}
                </TabPanel>
                <TabPanel value={tab} index={1} className="invitation_tabPanel">
                    {sentInvitationUsers.map((invUser) => (
                        <InvitationCard
                            recieved={false}
                            uid={invUser.uid}
                            displayName={invUser.displayName}
                            headline={invUser.headline}
                            photoURL={invUser.photoURL}
                        />
                    ))}
                </TabPanel>
            </div>
            <div className="myNetwork">
                <div className="myNetwork__cards">
                    {connectUsers.map((userr) => (
                        <div key={userr.uid} id={userr.uid} className="myNetwork__card">
                            {userr.backgroundUrl ? (
                                <img src={userr.backgroundUrl} alt="bacground" />
                            ) : (
                                <img src={background} alt="bacground" />
                            )}
                            <Link to={`/profile/${userr.uid}`}>
                                <Avatar
                                    className="myNetwork__avatar"
                                    alt="user photo"
                                    src={userr.photoURL || ""}
                                >
                                    {userr.email ? userr.email[0].toUpperCase() : "T"}
                                </Avatar>
                            </Link>
                            <Link to={`/profile/${userr.uid}`}>
                                <h2 className="myNetwork_name">{userr.displayName || "New user"}</h2>
                            </Link>
                            <h3>{userr.headline || "Headline goes here"}</h3>
                            <h4>{userr.email || "Add yor email"}</h4>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={(e) => handleConnectClick(e, userr.uid)}
                            >
                                connect
              </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyNetwork;
