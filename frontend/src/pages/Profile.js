import React, { useEffect, useState } from 'react';
import "./Header.css"
import "./Profile.css"
import Header from "./Header"

const g = {
    name: "Dima Bernada",
    rating: 3.47
}

const temporary_project = [
    {
        name: "Test",
        rating: 4.5,
        count_review: 2
    },
    {
        name: "Test2",
        rating: 3.2,
        count_review: 3
    },
    {
        name: "Test2",
        rating: 3.2,
        count_review: 3
    }
]

function fetchProjectsForUser() {
    return fetch('http://localhost:5000/api/projects/user/60c7a4eb35e6652af83b85dc')
        .then(data => data.json())
}

const ViewProject = ({project}) => {
    return(
        <div className="project">
            <p className="project-text">{ project.name }</p>
            <p className="project-text">Rating: { project.rating }</p>
            <p className="project-text">Reviews: { project.reviews.length }</p>
        </div>
    )
}

const Profile = () => {
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect ( () => {
        // const getProjectsForUser = async () => {
        //     let arr = await fetchProjectsForUser()
        //     setLoading(false)
        //     setProjects(arr)
        // }
        fetchProjectsForUser()
            .then(items => {
                setProjects(items)
                // setLoading(false)
            })
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