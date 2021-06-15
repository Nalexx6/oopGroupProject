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

const handleSubmit = async (project, inputValue, setProject, setLoading) => {
    let new_review = {
        content: inputValue,
        mark: 1,
        project: project.id,
        creator: "60c8dcd8dbae632d8d3e11fb",
    }

    setLoading(true)
    await addReview(new_review);
    const _project = await fetchProject("60c7a52035e6652af83b85df");

    _project.user = await fetchUser(project.creator);
    _project.review_data = [_project.reviews.length]

    for(let i = 0,j = _project.reviews.length-1;i < _project.reviews.length; i++, j--) {
        _project.review_data[j] = await fetchReview(_project.reviews[i]);
    }
    setProject(_project);
    setLoading(false)
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

const RightBarGeneration = ({project, setProject, setLoading}) => {
    const [inputValue, setInputValue] = useState("");

    return(
        <div className={"right-bar"}>
            <p className={"review-text"}>Author: {project.user.login} | {project.title} </p>
            <div className={"review-text-div"}><textarea className={"text-area"} placeholder={project.code}/></div>
            <div className={"comment-div"}>
                 <input className={"input-comment"} value={inputValue} onChange={(event) => {setInputValue(event.target.value)}} type="text" />
                 <Button style={{textAlign: "left"}}  variant="info" onClick={() => handleSubmit(project, inputValue, setProject, setLoading)} >Publish</Button>
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
            for(let i = 0,j = _project.reviews.length-1;i < _project.reviews.length; i++, j--) {
                _project.review_data[j] = await fetchReview(_project.reviews[i]);
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
                        <RightBarGeneration  project = {project} setProject = {setProject} setLoading = {setLoading}/>
                    </div>
                }
            </div>
        </div>
    </div>
  );
}

export default Project;