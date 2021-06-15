import React, { useEffect, useState } from 'react';
import "./Header.css"
import "./Profile.css"
import Header from "./Header"
import {fetchProjectsForUser} from "../services/service";

const g = {
    name: "Dima Bernada",
    rating: 3.47
}

// const temporary_project = [
//     {
//         name: "Test",
//         rating: 4.5,
//         count_review: 2
//     },
//     {
//         name: "Test2",
//         rating: 3.2,
//         count_review: 3
//     },
//     {
//         name: "Test2",
//         rating: 3.2,
//         count_review: 3
//     }
// ]

const ViewProject = ({project}) => {
    return(
        <div className="project">
            <p className="project-text">{ project.title }</p>
            <p className="project-text">Rating: { project.rating }</p>
            <p className="project-text">Reviews: { project.reviews.length }</p>
        </div>
    )
}

const Profile = () => {
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect ( () => {
        const getProjectsForUser = async () => {
            const arr = await fetchProjectsForUser()
            setProjects(arr)
            setLoading(false)
        }
        //
        getProjectsForUser()
        // fetchProjectsForUser()
        //     .then(items => {
        //         setProjects(items)
        //
        //         // setLoading(false)
        //     })
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
                    <div className="add-project-button">
                        <p className="add-project-text">Add project</p>
                    </div>
                </div>
                <div className="main-content-right">
                    <div className="projects-holder">
                        { loading ? <div className="company-name"> </div> :
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