import React, {useContext, useEffect, useState} from 'react';
import "./Feed.css"
import "./Header.css"
import Header from "./Header";
import Loading from "./Loading";
import { useHistory } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {fetchAllProjects, fetchUserById} from "../services/service";
import {getAvatarFromData} from "@fractalsoftware/random-avatar-generator";


const CardGeneration = (project) => {
    let history = useHistory();
    let avatar = getAvatarFromData(project.project.user.image, "circle");
    return(

        <div className={"main-div-card"}
            onClick={() => history.push({
                 pathname : "/project",
                 state : project.project.id
             })}>
            <div className={"main-div-tools"}>
                <img className="card-profile-img" src={`data:image/svg+xml;base64,${btoa(avatar)}`}/>
                    <div className={"main-div-tools"} style={{margin: "0"}}>
                        <p className={"main-div-minor-text"} style={{textAlign: "left"}}>
                            {project.project.user.login} | {project.project.user.rating.toFixed(2)} | {project.project.title}</p>
                    </div>
                <p className={"main-div-minor-text"} style={{pointerEvents: "none"}}>
                    {project.project.rating.toFixed(2)} ★ | Reviews Count: {project.project.reviews.length}</p>
            </div>
            <div className={"main-div-tools"}>
                <div className={"card-description"}>{project.project.description}</div>
            </div>
        </div>

    )
}

const ProjectsPageGeneration = ({projects, page}) =>{
    let _projects = []

    for(let i = projects.length - 5*(page - 1) - 1; i > projects.length- 1 - 5*page && i >= 0; i--)
        _projects[i] = projects[i];

    return  (_projects.map((p) => {
            return <CardGeneration project={p}/>
        }
    ).reverse())
}

const PagesBarGeneration = ({projects, page, setPage, history}) => {
    let j = 0;
    let i = projects.length/5;
    let result = [];

    for(; i > 0; i--, j++){
        result[j] = j+1;
    }

    return(

        <div className={"main-div-page"} ><span style={{color: "chocolate"}} className={"main-div-page-text"}>(</span>
            {
                 result.map((res)=> {
                     if(res === page){
                         return <span style={{color: "wheat"}} className={"main-div-page-text"}
                            onClick={() => {
                                setPage(res)
                            }}>
                            {res}
                        </span>
                     }
                     else return (<span style={{color: "chocolate"}} className={"main-div-page-text"}
                        onClick={() => {
                            setPage(res)
                        }}>
                        {res}
                    </span>)
                })
            }<span style={{color: "chocolate"}} className={"main-div-page-text"}>)</span>
        </div>
    )
}

const Feed = () => {
    const auth = useContext(AuthContext)
    const [projects, setProjects] = useState(null)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    let history = useHistory();
        useEffect ( () => {

            const checkForAuth = async () => {
                if(auth.getUserId() == null){
                    history.push("/")
                }
            }
            const getProjectsForUser = async () => {
            const _projects = await fetchAllProjects()
            for(let i = 0;i < _projects.length; i++) {
                _projects[i].user = await fetchUserById(_projects[i].creator);
            }
            setProjects(_projects)
            setLoading(false)
            }

            checkForAuth()
            getProjectsForUser()
        },
        [auth, history]
    )

    return (
    <div>
        { Header() }
        <div className={"main-div"}>
            <div className={"main-div-tools"}>
                <p className={"main-div-major-text"}>New and Popular Code:</p>
            </div>
            <div className={"card-holder"}>
                {  loading ? <div className="company-name"><Loading/></div> :
                    <ProjectsPageGeneration projects={projects} page={page}/>
                }

            </div>
            { loading ? <div className="company-name"> </div> :
                    <PagesBarGeneration   projects={projects} page={page} setPage = {setPage} history = {history} />
            }
        </div>
    </div>
  );
}

export default Feed;