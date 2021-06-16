import './App.css';

import Feed from "./pages/Feed"
import Profile from "./pages/Profile"
import Push_project from "./pages/Push_project"
import Project from "./pages/Project";
import Sign_in from "./pages/Sign_in"
import Sign_up from './pages/Sign_up';
import {AuthContext} from './context/AuthContext';
import {useAuth} from "./hooks/auth-hook";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const { login, logout, getUserId } = useAuth();
  return (
    <AuthContext.Provider
        value={{
          getUserId: getUserId,
          login: login,
          logout: logout
        }}
    >
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
    </AuthContext.Provider>
  );
}

export default App;
