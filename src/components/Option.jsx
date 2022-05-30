import React from "react";
import "./Option.css";

function Option(props) {
    return (
        <button className="option-button" value={props.value}>
            {props.value}
        </button>
    );
}

export default Option;
