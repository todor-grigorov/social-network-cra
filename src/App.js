import React from 'react';
import { useState } from 'react';
// import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage';
import SignIn from './components/user/SignIn';
import Register from './components/user/Register';
import { useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';

// rafce
// rfce
// Photo by <a href="https://unsplash.com/@altumcode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">AltumCode</a> on <a href="/s/photos/programming?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>


function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state => state.user));
  return (
    <Router>
      <div className={user.email ? "app-authenticated" : "app"}>
        {/* TODO: */}
        {/* Render public or private Nav according to user credentials */}
        <Navigation />
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" >
            {user.email ?
              /* TODO: */
              /* App Body for registered users */
              <div className="app__body">
                <Sidebar />
                <Feed />
              </div>
              /*     Widgets */
              :
              <HomePage />
            }
          </Route>


        </Switch>
      </div>
    </Router>
  );
}

export default App;

