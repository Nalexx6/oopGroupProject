import React, {useContext, useEffect, useState} from 'react';
import "./Project.css"
import "./Header.css"
import Button from 'react-bootstrap/Button';
import Header from "./Header";

import { useHistory } from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {fetchProject, fetchReview, fetchUserById, addReview} from "../services/service";

// const voteUpProject = ({project}) => {
//     project.rating++;
// }
//
// const voteDownProject = ({project}) => {
//     project.rating++;
// }

const handleSubmit = async (project, inputValue, setProject, setLoading, auth) => {
    let new_review = {
        content: inputValue,
        mark: 1,
        project: project.id,
        creator: auth.getUserId(),
    }

    setLoading(true)
    await addReview(new_review);
    const _project = await fetchProject(project.id);

    _project.user = await fetchUserById(project.creator);
    _project.review_data = [_project.reviews.length]

    for(let i = 0,j = _project.reviews.length-1;i < _project.reviews.length; i++, j--) {
        _project.review_data[j] = await fetchReview(_project.reviews[i]);
        _project.review_data[j].user = await fetchUserById(_project.review_data[j].creator);
    }
    setProject(_project);
    setLoading(false)
}

const LeftBarGeneration = ({review, setReview}) => {
    return(
        <div className={"left-bar"}>
            <Button className={"button-up"}>^</Button>
            <p className={"mark-text"}>{review.mark}</p>
            <Button className={"button-down"}>v</Button>
            <p className={"mark-text"}>{review.user.login}</p>
        </div>
    )

}

const ProjectGeneration = ({project, setProject, setLoading}) => {
    const auth = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    console.log(project.review_data);

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
            <div className={"input-comment-div"}>
                 <textarea className={"input-comment"} value={inputValue}
                         onChange={(event) => {setInputValue(event.target.value)}} type="text"/>
                 <Button style={{textAlign: "center"}} className={"submit-button"}  variant="success"
                         onClick={() => handleSubmit(project, inputValue, setProject, setLoading, auth)} >Publish</Button>
            </div>
            {
                project.review_data.map(review =>
                    <div className={"comment-div"} key={review.id}>
                        <LeftBarGeneration review={review}/>
                        <div className={"comment-text"}>{review.content}</div>
                    </div>)
            }
        </div>
    )
}

const Project = () => {

    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)

    let history = useHistory();
        useEffect ( () => {
        const getProjectForUser = async () => {
            const _project = await fetchProject(history.location.state)
            _project.user = await fetchUserById(_project.creator);
            _project.review_data = [];
            for(let i = 0,j = _project.reviews.length-1;i < _project.reviews.length; i++, j--) {
                let review = await fetchReview(_project.reviews[i]);
                review.user = await fetchUserById(review.creator);
                _project.review_data.push(review);
            }
            setProject(_project)
            setLoading(false)
        }
        getProjectForUser()
        },
        [history]
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