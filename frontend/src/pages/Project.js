import React, {useEffect, useState} from 'react';
import "./Project.css"
import "./Header.css"
import Button from 'react-bootstrap/Button';
import Header from "./Header";

import {fetchProject, fetchReview, fetchUserById, addReview} from "../services/service";

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

    _project.user = await fetchUserById(project.creator);
    _project.review_data = [_project.reviews.length]

    for(let i = 0,j = _project.reviews.length-1;i < _project.reviews.length; i++, j--) {
        _project.review_data[j] = await fetchReview(_project.reviews[i]);
    }
    setProject(_project);
    setLoading(false)
}


const ProjectGeneration = ({project, setProject, setLoading}) => {
    const [inputValue, setInputValue] = useState("");

    return(
        <div className={"right-bar"}>
            <div className={"main-div-tools"}>
                <p className={"review-text"}>{project.title} </p>
                <p className={"review-rating"} >Rating: {project.rating} ★</p>
            </div>
            <div className={"review-text-div"}><div className={"code-area"}/> {project.code} </div>
            <div className={"main-div-tools"}>
                <p className={"review-text"} style={{marginBottom: "30px", width: "900px"}}>Author: {project.user.login}</p>
                <div className={"rate-div"}>
                    <select className={"rate-select"}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                    </select>
                    <Button  className="review-rate-button" variant="success">Rate</Button>
                </div>
            </div>
            <div className={"comment-div"}>
                 <textarea className={"input-comment"} value={inputValue} onChange={(event) => {setInputValue(event.target.value)}} type="text" />
                 {/*<Button style={{textAlign: "left"}}  variant="info" onClick={() => handleSubmit(project, inputValue, setProject, setLoading)} >Publish</Button>*/}
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
            _project.user = await fetchUserById(_project.creator);
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
            { loading ?
                <div className={"main-div-wrapper"}>
                    <div className={"right-bar"}/>
                </div>
                :
                <div className={"main-div-wrapper"}>
                    <ProjectGeneration  project = {project} setProject = {setProject} setLoading = {setLoading}/>
                </div>
            }
        </div>
    </div>
  );
}

export default Project;