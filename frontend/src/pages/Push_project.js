import React, {useContext, useState} from 'react';
import "./Header.css"
import "./Push_project.css"
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import {addProject} from "../services/service";
import {AuthContext} from "../context/AuthContext";

const handleSubmit = async (inputTitle, inputCode, history, auth) => {
    let new_project = {
        title: inputTitle,
        code: inputCode,
        tags : [],
        creator: auth.getUserId(),
    }

    await addProject(new_project);
    history.push("/profile")
}

const Push_project = () => {
    const auth = useContext(AuthContext);
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

                            <button className={"project-button"}
                                onClick={() => handleSubmit(inputTitle, inputCode, history, auth)}>
                                <p className={"add-project-text"}>Push project</p>
                            </button>
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