import React, {useState} from 'react';
import "./Header.css"
import "./Push_project.css"
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import {addProject} from "../services/service";

const handleSubmit = async (inputTitle, inputCode, history) => {
    let new_project = {
        title: inputTitle,
        code: inputCode,
        tags : [],
        creator: "60c8dcd8dbae632d8d3e11fb",
    }

    await addProject(new_project);

    history.push("/profile")
    // const _project = await fetchProject("60c7a52035e6652af83b85df");

    // _project.user = await fetchUser(project.creator);
    // _project.review_data = [_project.reviews.length]
    //
    // for(let i = 0,j = _project.reviews.length-1;i < _project.reviews.length; i++, j--) {
    //     _project.review_data[j] = await fetchReview(_project.reviews[i]);
    // }
    // setProject(_project);
    // setLoading(false)
}

const Push_project = () => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputCode, setInputCode] = useState("");

    let history = useHistory();

    return (
        <div>
            { Header() }
            <div className={"main"}>
                <div className={"main-content"}>
                    <div className={"main-content-left-column"}>
                        <div>
                            <label className={"input-label"}>Project title</label>
                            <input className={"input-data"} value={inputTitle}
                                   onChange={(event) => {setInputTitle(event.target.value)}} type="text" />
                        </div>

                            <div className={"project-button"} onClick={handleSubmit(inputTitle, inputCode, history)}>
                                <p className={"add-project-text"}>Push project</p>
                            </div>
                    </div>
                    <div className={"main-content-right-column"}>
                        <textarea className={"text-area"} value={inputCode} placeholder="Add your code here"
                                  onChange={(event) => {setInputCode(event.target.value)}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Push_project;