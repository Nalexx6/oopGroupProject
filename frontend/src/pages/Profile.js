import React, { useEffect, useState } from 'react';
import "./Header.css"
import "./Profile.css"

const g = {}

const temporary_project = [
    {
        name: "Test",
        rating: 14,
        count_review: 2
    },
    {
        name: "Test2",
        rating: 15,
        count_review: 3
    }
]

const getProjectsProfile =()=>{}

const ViewProject = ({project}) => {
    return(
        <div className="project">
            <p className="project-text">{ project.name }</p>
            <p className="project-text">{ project.rating }</p>
            <p className="project-text">{ project.count_review }</p>
        </div>
    )
}

const Profile = () => {
    const [projects, setProjects] = useState(null)
    const [lodaing, setLoading] = useState(true)
    // useEffect ( () => {
    //         let arr = await getProjectsProfile()
    //         setLoading(false)
    //         setProjects(getProjectsProfile())
    //     },
    //     []
    // )
    return (

    <div>
        <div className={"future-header"}>
            <div className={"header-content"}>
                <div className={"header-left-block"}>
                    <p className={"company-name"}>CoReTool</p>
                </div>
                <div className={"header-right-block"}>
                    <p className={"company-name"}>
                        Profile
                    </p>
                    <div className={"header-profile-img"}>
                    </div>
                </div>
            </div>
        </div>
        <div className={"main"}>
            <div className={"main-content"}>
                <div className={"main-content-left"}>
                    <div className={"profile-img"}>
                    </div>
                    <p className={"profile-text"}>Name</p>
                    <p className={"profile-text"}>Rating</p>
                    <div className={"add-project-button"}>
                        <p className={"add-project-text"}>Add project</p>
                    </div>
                </div>
                <div className={"main-content-right"}>
                    <div className={"projects-holder"}>
                        { temporary_project.map(
                            (p) => {
                                return <ViewProject project={p}/>
                            }
                        ) }
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default Profile;