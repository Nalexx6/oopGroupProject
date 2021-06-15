import './App.css';

import Feed from "./pages/Feed"
import Profile from "./pages/Profile"
import Push_project from "./pages/Push_project"
import Project from "./pages/Project";
import Sign_in from "./pages/Sign_in"
import Sign_up from './pages/Sign_up';

import AuthContext from './context/AuthContext'
function App() {
  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Sign_up/>
    </AuthContext.Provider>
  );
}

export default App;
