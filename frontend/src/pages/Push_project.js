import React from 'react';
import "./Header.css"
import "./Push_project.css"
import Header from "./Header";

const Push_project = () => {
    return (
        <div>
            { Header() }
            <div className={"main"}>
                <div className={"main-content"}>
                    <div className={"main-content-left-column"}>
                        <label className={"input-label"}>Project title</label>
                        <input className={"input-data"} type="text" />

                        <label className={"input-label"}>Nick</label>
                        <input className={"input-data"} type="text" />

                        <label className={"input-label"}>Short description</label>
                        <input className={"input-data"} type="text" />

                        <div className={"add-project-button"}>
                            <p className={"add-project-text"}>Push project</p>
                        </div>
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