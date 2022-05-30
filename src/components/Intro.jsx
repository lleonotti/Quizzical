import React from "react";
import "./Intro.css";

function Intro(props) {
    return (
        <div className="intro-container">
            <h1 className="title">Quizzical</h1>
            <h2 className="description">Some description</h2>
            <button className="main-btn" onClick={props.startGame}>
                Start Quiz
            </button>
        </div>
    );
}

export default Intro;
