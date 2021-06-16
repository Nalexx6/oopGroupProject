import React, {useEffect, useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../context/AuthContext';
import "./Sign_in.css"
import "./Push_project.css"
import { useHistory, Link} from 'react-router-dom';
import { signUpUser } from '../services/service';
import { generateRandomAvatarData } from "@fractalsoftware/random-avatar-generator";

const handleSignUp = async (inputLogin, inputEmail, inputPassword, validation, auth, history,
                            setInputLogin, setInputEmail, setInputPassword, setValidation) => {
    let user = {
        login: inputLogin,
        email: inputEmail,
        password: inputPassword,
        image: generateRandomAvatarData(16)
    }

    let loggedUser = await signUpUser(user);



    if(loggedUser != null) {
        auth.login(loggedUser.id);
        history.push("/profile");
    } else {
        setInputLogin("");
        setInputEmail("");
        setInputPassword("");
        setValidation("There is user with same login")
    }
}


const Sign_up = () => {
    const [inputLogin, setInputLogin] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [validation, setValidation] = useState("")

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
                    
                    <p className="validation">{validation}</p>

                    <div className="submit">
                        <Link  to="/"><Button className="button">Back</Button></Link>
                        <Button className="button" variant="success" onClick={() => 
                                    handleSignUp(inputLogin, inputEmail, inputPassword, validation, auth, history,
                                                setInputLogin, setInputEmail, setInputPassword, setValidation)}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Sign_up;

