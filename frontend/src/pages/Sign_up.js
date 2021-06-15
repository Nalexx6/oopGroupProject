import React, {useEffect, useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../context/AuthContext';
import Header from "./Header";
import "./Sign_in.css"
import "./Push_project.css"
import { Link } from 'react-router-dom';


const Sign_up = () => {
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
                        Email
                    </p>
                    <input className={"input-data"} type="text" />
                    <p className="text">
                        Password
                    </p>
                    <input className={"input-data"} type="text" />
                    <div className="submit">
                        <Link to="/"><Button className="button" variant="success" >Sign Up</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Sign_up;

