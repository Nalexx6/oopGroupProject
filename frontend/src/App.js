import './App.css';

import Feed from "./pages/Feed"
import Profile from "./pages/Profile"
import Push_project from "./pages/Push_project"
import Project from "./pages/Project";
import Sign_in from "./pages/Sign_in"
import Sign_up from './pages/Sign_up';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <Sign_in />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/project">
            <Project />
          </Route>
          <Route path="/feed">
            <Feed />
          </Route>
          <Route path="/sign_up">
            <Sign_up />
          </Route>
          <Route path="/push_project">
            <Push_project />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
