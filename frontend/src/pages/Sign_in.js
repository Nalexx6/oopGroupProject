import React, {useEffect, useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Header from "./Header";
import "./Sign_in.css"
import "./Push_project.css"
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { loginUser } from '../services/service';


const Sign_in = () => {
    const auth = useContext(AuthContext);

    const handleSubmit = async () => {
        let user = await loginUser({ password: "tesssst1", email: "nikita@test.com"});
        auth.login(user.id)
    }
    return (
    <div>
        <div className="main1">
            <div className="container1">
                <div className="inside-container">
                    <p className="text">
                        Login
                    </p>
                    <input className={"input-data"} type="text" />
                    <p className="text">
                        Password
                    </p>
                    <input className={"input-data"} type="text" />
                    <div className="submit">
                        <Link to="/profile"><Button className="button" variant="success" onClick={handleSubmit}>Sign In</Button></Link>
                        <Link to="/sign_up"><Button className="button" variant="success" >Sign Up</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Sign_in;

