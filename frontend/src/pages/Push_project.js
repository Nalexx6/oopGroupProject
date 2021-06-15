import React from 'react';
import "./Header.css"
import "./Push_project.css"
import Header from "./Header";
import { Link } from 'react-router-dom';

const Push_project = () => {
    return (
        <div>
            { Header() }
            <div className={"main"}>
                <div className={"main-content"}>
                    <div className={"main-content-left-column"}>
                        <div>
                            <label className={"input-label"}>Project title</label>
                            <input className={"input-data"} type="text" maxLength="13" />
                        </div>

                        <Link to="/profile">
                            <div className={"project-button"}>
                                <p className={"add-project-text"}>Push project</p>
                            </div>
                        </Link>
                    </div>
                    <div className={"main-content-right-column"}>
                        <textarea className={"text-area"} placeholder="Add your code here"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Push_project;