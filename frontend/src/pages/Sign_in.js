import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Header from "./Header";
import "./Sign_in.css"
import "./Push_project.css"
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";



const Sign_in = () => {


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
                        <Link to="/profile"><Button className="button" variant="success" >Sign In</Button></Link>
                        <Link to="/sign_up"><Button className="button" variant="success" >Sign Up</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Sign_in;

