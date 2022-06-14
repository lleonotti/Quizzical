import React from "react";
import "./Intro.css";

function Intro(props) {
    function handleChange(event) {
        console.log(event);
        const { name, value, type, checked } = event.target;
        props.setApiSettings((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    return (
        <div className="intro-container">
            <h1 className="title">Quizzical</h1>
            <h2 className="description">
                Choose a category and test your Knowledge!
            </h2>
            <div className="api-form-container">
                <label htmlFor="categorySelector" className="api-form-label">
                    Category
                </label>
                <select
                    className="main-selector"
                    name="category"
                    id="categorySelector"
                    value={props.apiSettings.category}
                    onChange={handleChange}
                >
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">
                        Entertainment: Japanese Anime &amp; Manga
                    </option>
                    <option value="32">
                        Entertainment: Cartoon &amp; Animations
                    </option>{" "}
                </select>
                <label htmlFor="difficultySelector" className="api-form-label">
                    Difficulty
                </label>
                <select
                    className="main-selector"
                    name="difficulty"
                    id="difficultySelector"
                    value={props.apiSettings.difficulty}
                    onChange={handleChange}
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button className="main-btn" onClick={props.startGame}>
                Start Quiz
            </button>
        </div>
    );
}

export default Intro;
