import React from 'react';
import { useState, useEffect } from 'react';
// import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage';
import SignIn from './components/user/SignIn';
import Register from './components/user/Register';
import { useDispatch, useSelector } from "react-redux";

import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import { auth } from './firebase/firebase';
import userActions from './redux/actions/userActions';
import { Backdrop, CircularProgress } from '@material-ui/core';

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
      if (userAuth) {
        dispatch({
          type: userActions.login,
          payload: {
            displayName: userAuth.displayName,
            email: userAuth.email,
            uid: userAuth.uid,
            photoURL: userAuth.photoURL
          }
        });
        history.push("/feed");
      } else {
        history.push("/");
        dispatch({ type: userActions.logOut });
      }
      if (loading) setLoading(false);
    });
  }, []);

  return (
    <div className={user.email ? "app-authenticated" : "app"}>
      {loading ?
        <Backdrop style={{ zIndex: 9999, background: "#fff" }} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
        :
        <>
          {/* TODO: */}
          {/* Render public or private Nav according to user credentials */}
          < Navigation />
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/feed">
              { /* TODO: */}
              {/* App Body for registered users */}
              <div className="app__body">
                <Sidebar />
                <Feed />
              </div>
              {/*     Widgets */}
            </Route>
            <Route path="/" >
              <HomePage />
            </Route>
          </Switch>
        </>
      }
    </div>
  );
}

export default App;

