// import logo from './logo.svg';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import SignIn from './components/user/SignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/" >
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
