import React, {useEffect, useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../context/AuthContext';
import "./Sign_in.css"
import "./Push_project.css"
import { useHistory } from 'react-router-dom';
import { signUpUser } from '../services/service';
import { generateRandomAvatarData } from "@fractalsoftware/random-avatar-generator";

const handleSignUp = async (inputLogin, inputEmail, inputPassword, auth, history,
                            setInputLogin, setInputEmail, setInputPassword) => {
    let user = {
        login: inputLogin,
        email: inputEmail,
        password: inputPassword,
        image: generateRandomAvatarData(8)
    }

    let loggedUser = await signUpUser(user);



    if(loggedUser != null) {
        auth.login(loggedUser.id);
        history.push("/profile");
    } else {
        setInputLogin("");
        setInputEmail("");
        setInputPassword("");
    }
}


const Sign_up = () => {
    const [inputLogin, setInputLogin] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const auth = useContext(AuthContext);
    let history = useHistory();

    return (
    <div>
        <div className="main1">
            <div className="container1">
                <div className="inside-container">
                    <p className="text">
                        Login
                    </p>
                    <input className={"input-data"} value={inputLogin}
                            onChange={(event) => {setInputLogin(event.target.value)}} type="text" />
                    <p className="text">
                        Email
                    </p>
                    <input className={"input-data"} value={inputEmail}
                            onChange={(event) => {setInputEmail(event.target.value)}} type="text" />
                    <p className="text">
                        Password
                    </p>
                    <input className={"input-data"} value={inputPassword}
                            onChange={(event) => {setInputPassword(event.target.value)}} type="text" />

                    <div className="submit">
                        <Button className="button" variant="success" onClick={() => 
                                    handleSignUp(inputLogin, inputEmail, inputPassword, auth, history,
                                                setInputLogin, setInputEmail, setInputPassword)}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Sign_up;

