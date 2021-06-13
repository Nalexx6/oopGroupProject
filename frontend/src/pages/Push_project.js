import React from 'react';
import "./Header.css"
import "./Push_project.css"

const Push_project = () => {
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
                    <div className={"main-content-left-column"}>
                        <label className={"input-label"}>Project title</label>
                        <input className={"input-data"} type="text" />

                        <label className={"input-label"}>Nick</label>
                        <input className={"input-data"} type="text" />

                        <label className={"input-label"}>Label</label>
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