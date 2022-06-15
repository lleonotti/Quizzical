import React from "react";
import { nanoid } from "nanoid";
import correct from "../assets/correct.png";
import fail from "../assets/failed.png";
import Option from "./Option";
import "./Question.css";

function Question(props) {
    function htmlToStr(input) {
        var he = require("he");
        return he.decode(input);
    }

    const styles = {
        backgroundColor: props.selectedAnswer != "" ? "#D6DBF5" : "#f5f7fb",
        border: props.selectedAnswer != "" ? "#f5f7fb" : "1.5px solid #4d5b9e",
    };

    const styles2 = {
        backgroundColor: props.selectedAnswer != "" ? "#red" : "#red",
        border: props.selectedAnswer != "" ? "#f5f7fb" : "1.5px solid #4d5b9e",
    };

    const buttonList = props.answers.map((option) => {
        return (
            <button
                className="question-button"
                key={nanoid()}
                style={props.selectedAnswer == option ? styles : styles2}
                value={option}
                disabled={props.disabled}
                onClick={(e) =>
                    props.handleSelectAnswer(props.id, e.target.value)
                }
            >
                {htmlToStr(option)}
            </button>
        );
    });

    return (
        <article className="question-container">
            <h2 className="question-title">{htmlToStr(props.title)}</h2>
            <div className="options-container">
                <div className="buttonList-container">{buttonList}</div>
                {props.disabled && (
                    <img
                        className="answer-icon"
                        src={props.isRight ? correct : fail}
                        alt="Correct icon or Incorrect Icon"
                    />
                )}
            </div>
        </article>
    );
}

export default Question;
