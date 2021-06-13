import React from 'react';
import "./Feed.css"

const Feed = () => {
    return (
    <div>
        <div className={"future-header"}>
            <div className={"header-content"}>
                <p className={"company-name"}>CoReTool</p>
            </div>
        </div>
        <div className={"main-div"}>
            <div className={"card"} />
            <div className={"card"} />
            <div className={"card"} />
        </div>
    </div>
  );
}

export default Feed;