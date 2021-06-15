import React, {useEffect, useState} from 'react';
import "./Project.css"
import "./Header.css"
import Button from 'react-bootstrap/Button';
import Header from "./Header";

import {fetchProject, fetchProjectsForUser, fetchReview, fetchUser, addReview} from "../services/service";

// const woteUpProject = ({project}) => {
//     project.rating++;
// }
//
// const woteDownProject = ({project}) => {
//     project.rating++;
// }

const handleSubmit = async (project, inputValue, setProject) => {
    let new_review = {
        content: inputValue,
        mark: 1,
        project: project.id,
        creator: project.creator,
    }
    console.log("creator:",project.creator)
    await addReview(new_review)
    const _project = await fetchProject("60c7a52035e6652af83b85df")
    setProject(_project);
}



const LeftBarGeneration = ({project, setProject}) => {
    return(
        <div className={"left-bar"}>
            <Button style={{width: 40}} variant="success" >^</Button>
            <p className={"review-text"}>{project.rating}</p>
            <Button style={{width: 40}} variant="danger" >v</Button>
        </div>
    )

}

const RightBarGeneration = ({project, setProject}) => {
    const [inputValue, setInputValue] = useState("");

    return(
        <div className={"right-bar"}>
            <p className={"review-text"}>Author: {project.user.login} | {project.title} </p>
            <div className={"review-text-div"}><textarea className={"text-area"} placeholder={project.code}/></div>
            <div className={"comment-div"}>
                 <input className={"input-comment"} value={inputValue} onChange={(event) => {setInputValue(event.target.value)}} type="text" />
                 <Button style={{textAlign: "left"}}  variant="info" onClick={() => handleSubmit(project, inputValue, setProject)} >Publish</Button>
            </div>
            {
                project.review_data.map(review =>
                    <div className={"comment-div"}>
                        {review.content}
                    </div>)
            }
        </div>
    )
}

const Project = () => {
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
        useEffect ( () => {
        const getProjectForUser = async () => {
            const _project = await fetchProject("60c7a52035e6652af83b85df")
            _project.user = await fetchUser(_project.creator);
            _project.review_data = [_project.reviews.length]
            for(let i = 0;i < _project.reviews.length; i++) {
                _project.review_data[i] = await fetchReview(_project.reviews[i]);
            }
            setProject(_project)
            setLoading(false)
        }
        getProjectForUser()
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
        <div className={"main-div"}>
            <div className={"container"}>
                { loading ?
                    <div className="row">
                        <div className={"left-bar"}/>
                        <div className={"right-bar"}>NULL</div>
                    </div>
                    :
                    <div className={"row"}>
                        <LeftBarGeneration project = {project} setProject = {setProject}/>
                        <RightBarGeneration  project = {project} setProject = {setProject}/>
                    </div>
                }
            </div>
        </div>
    </div>
  );
}

export default Project;