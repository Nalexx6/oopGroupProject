import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Header from "./Header";
import "./Sign_in.css"
import "./Push_project.css"


const Sign_up = () => {
    
    return (
    <div>
        <div className="main">
            <div className="container">
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
                        <Button className="button" variant="success" >Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Sign_up;

