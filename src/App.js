import React from 'react';
import { useState, useEffect } from 'react';
// import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage';
import SignIn from './components/auth/SignIn';
import Register from './components/auth/Register';
import Jobs from './components/Jobs';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import MyNetwork from './components/MyNetwork';
import { useDispatch, useSelector } from "react-redux";

import {
  Switch,
  Route,
  useHistory,
  Redirect
} from "react-router-dom";
import { auth, db } from './firebase/firebase';
import userActions from './redux/actions/userActions';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Job from './components/Job';
import AlertBar from './components/AlertBar';
import ProtectedRoute from './router/ProtectedRoute';
import NoMatch from './components/NoMatch';
import Main from './container/Main';
import RouterSwitch from './router/RouterSwitch';

// rafce
// rfce
// Photo by <a href="https://unsplash.com/@altumcode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">AltumCode</a> on <a href="/s/photos/programming?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>


function App() {
  const [loading, setLoading] = useState(true);

  const user = useSelector((state => state.user));
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) setLoading(true);

    auth.onAuthStateChanged(userAuth => {
      if (userAuth && userAuth.displayName) {
        db.collection("users").where("uid", "==", userAuth.uid).onSnapshot(snapshot => {
          if (snapshot.docs.length !== 1) return;
          const doc = snapshot.docs[0];

          dispatch({
            type: userActions.login,
            payload: {
              ...doc.data(),
              displayName: userAuth.displayName,
              email: userAuth.email,
              uid: userAuth.uid,
              photoURL: userAuth.photoURL,
              loading: false,
            }
          });
          history.push(history.length ? history.location.pathname : "/feed");
        });

      } else {
        history.push(history.length ? history.location.pathname : "/");
        dispatch({ type: userActions.logOut });
      }
      if (loading) setLoading(false);
    });
  }, []);

  return (
    <div data-testid="app" className={user.email ? "app-authenticated" : "app"}>
      <AlertBar />
      {loading ?
        <Backdrop data-testid="main-loader" style={{ zIndex: 9999, background: "#fff" }} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
        :
        <>
          < Navigation />
          <RouterSwitch />
        </>
      }
    </div >
  );
}

export default App;

