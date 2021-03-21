// import logo from './logo.svg';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import SignIn from './components/user/SignIn';
import Register from './components/user/Register';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// rafce
// rfce
// Photo by <a href="https://unsplash.com/@altumcode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">AltumCode</a> on <a href="/s/photos/programming?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>



function App() {
  return (
    <Router>
      <div className="App">
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
            <HomePage />
          </Route>

          {/* TODO: */}
          {/* App Body for registered users */}
          {/*     Sidebar */}
          {/*     Feed */}
          {/*     Widgets */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

