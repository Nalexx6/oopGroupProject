import React from 'react';
import "./Feed.css"
import "./Header.css"

const Feed = () => {
    return (
    <div>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossOrigin="anonymous"
        />
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
        <div className={"main-div container"}>
            <div className={"main-div-tools row"}>
                <div className={"col"}> <p className={"main-div-text"}>New and Popular Code:</p> </div>
                <div className={"col"} style={{textAlign: "right"}}> <p className={"main-div-search"}>Search</p> </div>
            </div>
            <div className={"main-div-card"}>
                <div className={"main-div-tools"}>
                    <div className={"card-profile-img"}/>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>User | Project</p>
                    <p className={"main-div-text"} style={{color: "#282c34", textAlign: "right"}}>Rating | Views</p>
                </div>
                <div className={"main-div-tools"} style={{height: 150}}>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>Review Count</p>
                    <div className={"card-description"}/>
                </div>
            </div>
            <div className={"main-div-card"}>
                <div className={"main-div-tools"}>
                    <div className={"card-profile-img"}/>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>User | Project</p>
                    <p className={"main-div-text"} style={{color: "#282c34", textAlign: "right"}}>Rating | Views</p>
                </div>
                <div className={"main-div-tools"} style={{height: 150}}>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>Review Count</p>
                    <div className={"card-description"}/>
                </div>
            </div>
            <div className={"main-div-card"}>
                <div className={"main-div-tools"}>
                    <div className={"card-profile-img"}/>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>User | Project</p>
                    <p className={"main-div-text"} style={{color: "#282c34", textAlign: "right"}}>Rating | Views</p>
                </div>
                <div className={"main-div-tools"} style={{height: 150}}>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>Review Count</p>
                    <div className={"card-description"}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Feed;