import React from 'react';
import "./Review.css"
import "./Header.css"
import Button from 'react-bootstrap/Button';


const Review = () => {
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
        <div className={"main-div"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"left-bar"}>
                        <Button style={{width: 40}} variant="success">^</Button>
                        <p className={"review-text"}>256</p>
                        <Button style={{width: 40}} variant="danger">v</Button>
                    </div>
                    <div className={"right-bar"}>
                        <p className={"review-text"}>Author: User | Review on: Project</p>
                        <div className={"review-text-div"}><textarea className={"text-area"} placeholder="Review"/></div>
                        <div className={"comment-div"}>
                            <input className={"input-comment"} type="text" />
                            <Button style={{textAlign: "left"}}  variant="info">Publish</Button>
                        </div>
                        <div className={"comment-div"}>
                            Comment
                        </div>
                        <div className={"comment-div"}>
                            Comment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Review;