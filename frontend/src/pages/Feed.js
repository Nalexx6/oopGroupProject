import React, {useContext, useEffect, useState} from 'react';
import "./Feed.css"
import "./Header.css"
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {fetchAllProjects, fetchUserById} from "../services/service";
import {getAvatarFromData} from "@fractalsoftware/random-avatar-generator";


const CardGeneration = (project) => {
    let history = useHistory();

    let avatar = getAvatarFromData(project.project.user.image, "circle");
    return(

        <div className={"main-div-card"}>
            <div className={"main-div-tools"}>
                <img className="card-profile-img" src={`data:image/svg+xml;base64,${btoa(avatar)}`}/>
                    <div className={"main-div-tools"} style={{margin: "0"}}
                         onClick={() => history.push({
                             pathname : "/project",
                             state : project.project.id
                         })}>
                        <p className={"main-div-minor-text"} style={{textAlign: "left"}}>
                            {project.project.user.login} | {project.project.user.rating.toFixed(2)} | {project.title}</p>
                    </div>
                <p className={"main-div-minor-text"} style={{pointerEvents: "none"}}>
                    {project.project.rating.toFixed(2)} ★ | Reviews Count: {project.project.reviews.length}</p>
            </div>
            <div className={"main-div-tools"}>
                <div className={"card-description"}>{project.project.description}</div>
            </div>
        </div>

    )
}

const Feed = () => {
    const auth = useContext(AuthContext)
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(true)
    let history = useHistory();
        useEffect ( () => {

            const checkForAuth = async () => {
                if(auth.getUserId() == null){
                    history.push("/")
                }
            }
            const getProjectsForUser = async () => {
            const _projects = await fetchAllProjects()
            for(let i = 0;i < _projects.length; i++) {
                _projects[i].user = await fetchUserById(_projects[i].creator);
            }
            setProjects(_projects)
            setLoading(false)
            }

            checkForAuth()
            getProjectsForUser()
        },
        [auth, history]
    )

    return (
    <div>
        { Header() }
        <div className={"main-div"}>
            <div className={"main-div-tools"}>
                <p className={"main-div-major-text"}>New and Popular Code:</p>
            </div>
            <div className={"card-holder"}>
                { loading ? <div className="company-name"> </div> :
                    projects.map(
                        (p) => {
                            return <CardGeneration   project={p}/>
                        }
                    )
                }
            </div>
        </div>
    </div>
  );
}

export default Feed;