import React from "react";
import "./Header.css"

const Header = () => {
    return(
        <div className="future-header">
            <div className="header-content">
                <div className="header-left-block">
                    <p className="company-name">CoReTool</p>
                </div>
                <div className="header-right-block">
                    <p className="company-name">
                        Feed |
                    </p>
                    <p className="company-name">
                        Profile
                    </p>
                    <div className="header-profile-img">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header