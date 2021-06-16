import React from "react";
import "./Header.css"
import { Link, useHistory } from "react-router-dom";

const Header = () => {

    let history = useHistory();


    return(
        <div className="future-header">
            <div className="header-content">
                <div className="header-left-block">
                    <p className="company-name" style={{pointerEvents: "none"}}>CoReTool</p>
                </div>
                <div className="header-right-block">
                    <div className="company-name" onClick={() => history.push("/feed")}> Feed </div>
                    <p className={"company-name"} style={{pointerEvents: "none"}}>|</p>
                    <div className="company-name" onClick={() => history.push("/profile")}> Profile</div>
                    
                    <div className="header-profile-img">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header