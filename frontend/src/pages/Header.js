import React, {useContext, useEffect, useState} from "react";
import "./Header.css"
import { Link, useHistory } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {fetchProjectsForUser, fetchUserById} from "../services/service";
import {getAvatarFromData} from "@fractalsoftware/random-avatar-generator";

const Header = () => {
    const [avatar, setAvatar] = useState(null)


    let history = useHistory();
    const auth = useContext(AuthContext);

    useEffect (() => {
        const getUser = async () => {
            const _user = await fetchUserById(auth.getUserId())

            setAvatar(getAvatarFromData(_user.image, "circle"));
        }

        getUser()
        },
        [auth, history]
    )

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
                    
                    <img className="header-profile-img" src={`data:image/svg+xml;base64,${btoa(avatar)}`}/>
                </div>
            </div>
        </div>
    )
}
export default Header