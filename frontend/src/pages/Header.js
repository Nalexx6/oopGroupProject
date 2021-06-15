import React from "react";
import "./Header.css"
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div className="future-header">
            <div className="header-content">
                <div className="header-left-block">
                    <p className="company-name" style={{pointerEvents: "none"}}>CoReTool</p>
                </div>
                <div className="header-right-block">
                    <Link className="company-name" to="/feed"> Feed </Link>
                    <p className={"company-name"} style={{pointerEvents: "none"}}>|</p>
                    <Link className="company-name" to="/profile"> Profile</Link>
                    
                    <div className="header-profile-img">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header