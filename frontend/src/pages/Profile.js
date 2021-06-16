import React, { useEffect, useState, useContext } from 'react';
import "./Header.css"
import "./Profile.css"
import Header from "./Header"
import {fetchProjectsForUser, fetchUserById} from "../services/service";
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const logoutHandle = (history, auth) => {
    auth.logout();
    history.push("/")
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
    const auth = useContext(AuthContext);
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    let history = useHistory();


    useEffect (() => {
        const checkForAuth = async () => {
            if(auth.getUserId() == null){
                history.push("/")
            }
        }

        const getUser = async () => {
            const _user = await fetchUserById(auth.getUserId())
            setUser(_user)
            console.log(_user)

            const _projects = await fetchProjectsForUser(auth.getUserId())
            setProjects(_projects)
            if(_projects == null){
                setProjects([])
            }
            setLoading(false)
        }

        checkForAuth()
        getUser()
        },
        [auth, history]
    )
    return (

    <div>
        { Header() }
        <div className="main">
            <div className="main-content">
                <div className="main-content-left">
                    <div className="profile-img">
                    </div>
                    {loading ? <p>dd</p> :
                        <div>
                            <p className="profile-text">{user.login}</p>
                            <p className="profile-text">Rating: {user.rating}</p>
                        </div>
                    }
                    <button className="add-project-button" onClick={() => history.push("/push_project")}>
                        <p className="add-project-text">Add project</p>
                    </button>

                    <div className="project-button" onClick={() => logoutHandle(history, auth)}>
                            <p className="add-project-text">Log out</p>
                    </div>

                </div>
                <div className="main-content-right">
                    <div className="projects-holder">
                        { loading ? <div className="company-name"> </div> :
                            projects.map(
                                (project) => {
                                    return <ViewProject project={project}/>
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