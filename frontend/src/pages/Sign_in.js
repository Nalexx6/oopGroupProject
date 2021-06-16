import React, {useEffect, useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Header from "./Header";
import "./Sign_in.css"
import "./Push_project.css"
import { Link, useHistory } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {loginUser} from "../services/service";

const handleLogin = async (inputLogin, inputPassword, history, auth) => {
    let user =  {
        email : inputLogin,
        password : inputPassword
    }

    // useEffect ( () => {
    //     const loginUser = async () => {
    // setLoading(true)
    let loggedUser = await loginUser(user);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    console.log("logged", loggedUser.id)
    auth.login(loggedUser.id);
    console.log(auth.userId)

    history.push("/profile");
    // setLoading(false)
    //     }
    //     loginUser();
    // }, []
    // )
}

const Sign_in = () => {
    const [inputLogin, setInputLogin] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [loading, setLoading] = useState(true)

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
                            Password
                        </p>
                        <input className={"input-data"} value={inputPassword}
                                onChange={(event) => {setInputPassword(event.target.value)}} type="text" />
                        <div className="submit">
                            <Button className="button" variant="success"
                                onClick={() => handleLogin(inputLogin, inputPassword, history, auth)} >Sign In</Button>
                            <Link to="/sign_up"><Button className="button" variant="success" >Sign Up</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sign_in;
