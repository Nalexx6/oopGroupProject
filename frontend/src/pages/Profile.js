import React from 'react';
import "./Header.css"
import "./Profile.css"

const Profile = () => {
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
                    <div className={"profile-img"}>
                    </div>
                    <p className={"profile-text"}>Name</p>
                    <p className={"profile-text"}>Rating</p>
                    <div className={"add-project-button"}>
                        <p className={"add-project-text"}>Add project</p>
                    </div>
                </div>
                <div className={"main-content-right-column"}>
                    <div className={"projects-holder"}>
                        <div className={"project"}>
                            <p className={"project-text"}>Project1</p>
                            <p className={"project-text"}>Rating</p>
                            <p className={"project-text"}>Count reviews</p>
                        </div>
                        <div className={"project"}>
                            <p className={"project-text"}>Project2</p>
                            <p className={"project-text"}>Rating</p>
                            <p className={"project-text"}>Count reviews</p>
                        </div>
                        <div className={"project"}>
                            <p className={"project-text"}>Project3</p>
                            <p className={"project-text"}>Rating</p>
                            <p className={"project-text"}>Count reviews</p>
                        </div>
                        <div className={"project"}>
                            <p className={"project-text"}>Project4</p>
                            <p className={"project-text"}>Rating</p>
                            <p className={"project-text"}>Count reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Profile;