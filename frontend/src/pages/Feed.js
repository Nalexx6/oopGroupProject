import React, {useEffect, useState} from 'react';
import "./Feed.css"
import "./Header.css"
import Header from "./Header";

const temporary_project = [
    {
        user: "User1",
        name: "Test1",
        rating: 4.5,
        count_review: 2
    },
    {
        user: "User2",
        name: "Test2",
        rating: 3.2,
        count_review: 3
    },
    {
        user: "User3",
        name: "Test3",
        rating: 2.2,
        count_review: 6
    }
]

const CardGeneration = ({project}) => {
    return(
        <div className={"main-div-card"}>
            <div className={"main-div-tools"}>
                <div className={"card-profile-img"}/>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>{project.user} | {project.name}</p>
                    <p className={"main-div-text"} style={{color: "#282c34", textAlign: "right"}}>{project.rating} | {project.count_review}</p>
                </div>
                <div className={"main-div-tools"} style={{height: 150}}>
                    <p className={"main-div-text"} style={{color: "#282c34"}}>Review Count</p>
                <div className={"card-description"}/>
            </div>
        </div>
    )
}

const Feed = () => {
    // const [projects, setProjects] = useState(null)
    // const [loading, setLoading] = useState(true);
    // useEffect(
    //     () => {
    //         let arr = await getProject();
    //         setLoading(false);
    //         setProjects(arr);
    //     },
    //     []
    // )

    return (
    <div>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossOrigin="anonymous"
        />
        { Header() }
        <div className={"main-div container"}>
            <div className={"main-div-tools row"}>
                <div className={"col"}> <p className={"main-div-text"}>New and Popular Code:</p> </div>
                <div className={"col"} style={{textAlign: "right"}}> <p className={"main-div-search"}>Search</p> </div>
            </div>
            { temporary_project.map(
                (p) => {
                    return <CardGeneration project={p}/>
                }
            ) }
        </div>
    </div>
  );
}

export default Feed;