import React, { useEffect, useState, useContext } from 'react';
import "./Header.css"
import "./Profile.css"
import Header from "./Header"
import Loading from "./Loading";
import {fetchProjectsForUser, fetchUserById, updateUserImg} from "../services/service";
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import {generateRandomAvatarData, getAvatarFromData} from "@fractalsoftware/random-avatar-generator";

const logoutHandle = (history, auth) => {
    auth.logout();
    history.push("/")
}

const UpdateUserImage = async (user, setAvatar) => {
    user.image = generateRandomAvatarData(16);
    setAvatar(getAvatarFromData(user.image, "circle"));
    await updateUserImg(user);

}

const ViewProject = ({project, history}) => {
    return(
            <div className="project" onClick={() => history.push({
                    pathname : "/project",
                    state : project.id
                })}>
                <p className="project-text">{ project.title }</p>
                <p className="project-text">Rating: { project.rating.toFixed(2) }</p>
                <p className="project-text">Reviews: { project.reviews.length }</p>
            </div>
    )
}

const Profile = () => {
    const auth = useContext(AuthContext);
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [avatar, setAvatar] = useState(null)
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

            const _projects = await fetchProjectsForUser(auth.getUserId())
            setProjects(_projects)
            if(_projects == null){
                setProjects([])
            }
            setAvatar(getAvatarFromData(_user.image, "circle"));
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
                    {loading ? <Loading/> :
                        <div>
                            <img className="profile-img" src={`data:image/svg+xml;base64,${btoa(avatar)}`}/>
                            <p className="profile-text">{user.login}</p>
                            <p className="profile-text">Rating: {user.rating.toFixed(2)}</p>
                        </div>
                    }
                    <div className="project-button" onClick={() => UpdateUserImage(user, setAvatar)}>
                            <p className="add-project-text">Update Avatar</p>
                    </div>

                    <div className="project-button" onClick={() => history.push("/push_project")}>
                        <p className="add-project-text">Add project</p>
                    </div>

                    <div className="project-button" onClick={() => logoutHandle(history, auth)}>
                            <p className="add-project-text">Log out</p>
                    </div>

                </div>
                <div className="main-content-right">
                    <div className="projects-holder">
                        { loading ? <div className="company-name"><Loading/></div> :
                            projects.map(
                                (project) => {
                                    return <ViewProject project={project} history={history}/>
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