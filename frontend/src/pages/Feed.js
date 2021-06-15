import React, {useEffect, useState} from 'react';
import "./Feed.css"
import "./Header.css"
import Header from "./Header";

import {fetchProjectsForUser, fetchUser} from "../services/service";


const CardGeneration = ({project}) => {
    return(
        <div className={"main-div-card"}>
            <div className={"main-div-tools"}>
                <div className={"card-profile-img"}/>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>{project.user.login} | {project.title}</p>
                    <p className={"main-div-text"} style={{color: "#282c34", textAlign: "right"}}>{project.rating} | {project.reviews.length}</p>
                </div>
                <div className={"main-div-tools"} style={{height: 150}}>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>Review Count</p>
                <div className={"card-description"}/>
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
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossOrigin="anonymous"
        />
        { Header() }
        <div className={"main-div container"}>
            <div className={"main-div-tools row"}>
                <div className={"col"}> <p className={"main-div-text"}>New and Popular Code:</p> </div>
                <div className={"col"} style={{textAlign: "right"}}> <p className={"main-div-search"}>Search</p> </div>
            </div>
            { loading ? <div className="company-name"> </div> :
                projects.map(
                    (p) => {
                        return <CardGeneration   project={p}/>
                    }
                )
            }
        </div>
    </div>
  );
}

export default Feed;