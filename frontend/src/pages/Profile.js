import React, { useEffect, useState } from 'react';
import "./Header.css"
import "./Profile.css"
import Header from "./Header"
import {fetchProjectsForUser} from "../services/service";
import { Link } from 'react-router-dom';

const g = {
    name: "Dima Bernada",
    rating: 3.47
}

const ViewProject = ({project}) => {
    return(
        <Link to="/project">
            <div className="project">
                <p className="project-text">{ project.title }</p>
                <p className="project-text">Rating: { project.rating }</p>
                <p className="project-text">Reviews: { project.reviews.length }</p>
            </div>
        </Link>
    )
}

const Profile = () => {
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect ( () => {
        const getProjectsForUser = async () => {
            const _projects = await fetchProjectsForUser()
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
        <div className="main">
            <div className="main-content">
                <div className="main-content-left">
                    <div className="profile-img">
                    </div>
                    <p className="profile-text">{ g.name }</p>
                    <p className="profile-text">Rating: { g.rating }</p>
                    <Link to="/push_project" >
                        <div className="add-project-button">
                            <p className="add-project-text">Add project</p>
                        </div>
                    </Link>
                    <Link to="/" >
                        <div className="project-button">
                                <p className="add-project-text">Log out</p>
                        </div>
                    </Link>
                </div>
                <div className="main-content-right">
                    <div className="projects-holder">
                        { loading ? <div className="company-name"> Null </div> :
                            projects.map(
                                (p) => {
                                    return <ViewProject project={p}/>
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default Profile;