import React, {useEffect, useState} from 'react';
import "./Feed.css"
import "./Header.css"
import Header from "./Header";
import { Link } from 'react-router-dom';

import {fetchProjectsForUser, fetchUser} from "../services/service";


const CardGeneration = ({project}) => {
    return(

        <div className={"main-div-card"}>
            <div className={"main-div-tools"}>
                <div className={"card-profile-img"}/>
                <Link to="/project">
                    <div className={"main-div-tools"} style={{margin: "0"}}>
                        <p className={"main-div-minor-text"} style={{textAlign: "left"}}>{project.user.login} | {project.title}</p>
                    </div>
                </Link>
                <p className={"main-div-minor-text"} style={{pointerEvents: "none"}}>{project.rating} ★ | Reviews Count: {project.reviews.length}</p>
            </div>
            <div className={"main-div-tools"}>
                <div className={"card-description"}>{project.tags}</div>
            </div>
        </div>

    )
}

const Feed = () => {
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(true)
        useEffect ( () => {
        const getProjectsForUser = async () => {
            const _projects = await fetchProjectsForUser()
            for(let i = 0;i < _projects.length; i++) {
                _projects[i].user = await fetchUser(_projects[i].creator);
            }
            setProjects(_projects)
            setLoading(false)
        }

        getProjectsForUser()
        },
        []
    )

    return (
    <div>
        { Header() }
        <div className={"main-div"}>
            <div className={"main-div-tools"}>
                <p className={"main-div-major-text"}>New and Popular Code:</p>
                <p className={"main-div-search"}>Search</p>
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