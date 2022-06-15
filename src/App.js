import React from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Intro from "./components/Intro";
import Question from "./components/Question";
import blob1 from "./assets/shape-1.png";
import blob2 from "./assets/shape-2.png";

function App() {
    const [questions, setQuestions] = React.useState([]);
    const [isGameOver, setIsGameOver] = React.useState(false);
    const [isGameStart, setIsGameStart] = React.useState(false);
    const [correctCounter, setCorrectCounter] = React.useState(0);
    const [disabled, setDisabled] = React.useState(false);
    const allQuestionsAnswered = questions.every(
        (question) => question.selectedAnswer !== ""
    );
    const [apiSettings, setApiSettings] = React.useState({
        category: 9,
        difficulty: "",
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const startGame = () => {
        setIsGameStart((oldState) => !oldState);
    };

    React.useEffect(
        function () {
            fetch(
                `https://opentdb.com/api.php?amount=5&category=${apiSettings.category}&difficulty=${apiSettings.difficulty}&type=multiple`
            )
                .then((res) => res.json())
                .then((data) =>
                    setQuestions(
                        data.results.map((obj) => {
                            return {
                                selectedAnswer: "",
                                isRight: false,
                                id: nanoid(),
                                answers: shuffleArray([
                                    ...obj.incorrect_answers,
                                    obj.correct_answer,
                                ]),
                                ...obj,
                            };
                        })
                    )
                );
        },
        [isGameStart]
    );

    React.useEffect(() => {
        if (questions.length !== 0 && allQuestionsAnswered) {
            let correctAnswers = 0;

            questions.forEach((question) => {
                if (question.correct_answer === question.selectedAnswer)
                    correctAnswers++;
            });

            setCorrectCounter(correctAnswers);
        }
    }, [questions]);

    const handleSelectAnswer = (questionId, answer) => {
        if (!isGameOver) {
            setQuestions((prevQuestionsArray) =>
                prevQuestionsArray.map((question) =>
                    question.id === questionId
                        ? { ...question, selectedAnswer: answer }
                        : question
                )
            );
        }
    };

    const handleCheckAnswer = () => {
        if (!isGameOver) {
            setQuestions((prevQuestionsArray) =>
                prevQuestionsArray.map((question) => {
                    return question.selectedAnswer === question.correct_answer
                        ? { ...question, isRight: !question.isRight }
                        : question;
                })
            );
            setDisabled((oldState) => !oldState);
        }
        setIsGameOver((oldState) => !oldState);
    };

    const handleReset = () => {
        setIsGameStart((oldState) => !oldState);
        setQuestions([]);
        setCorrectCounter(0);
        setDisabled(false);
        setIsGameOver(false);
    };

    const componentsArray = questions.map((obj) => {
        return (
            <Question
                title={obj.question}
                answers={obj.answers}
                correct={obj.correct_answer}
                wrong={obj.incorrect_answers}
                key={obj.id}
                id={obj.id}
                isRight={obj.isRight}
                selectedAnswer={obj.selectedAnswer}
                handleSelectAnswer={handleSelectAnswer}
                disabled={disabled}
            />
        );
    });

    return (
        <div className="page-container">
            <img src={blob1} className="blob-top" alt="blob-decoration"></img>
            <main
                className={isGameStart ? "main-container" : "intro-container"}
            >
                {isGameStart ? (
                    componentsArray
                ) : (
                    <Intro
                        startGame={startGame}
                        apiSettings={apiSettings}
                        setApiSettings={setApiSettings}
                    />
                )}
            </main>
            {isGameStart && (
                <section className="results-container">
                    <p className="results-text">
                        {disabled
                            ? `Você acertou ${correctCounter}/5 perguntas!`
                            : ""}
                    </p>

                    <button
                        className="main-btn"
                        onClick={() => {
                            isGameOver ? handleReset() : handleCheckAnswer();
                        }}
                    >
                        {isGameOver ? "Reset Game" : "Check answers"}
                    </button>
                </section>
            )}
            <img
                src={blob2}
                className="blob-bottom"
                alt="blob-decoration"
            ></img>

            {isGameStart ? null : (
                <footer className="footer-leo">
                    <a
                        href="https://github.com/lleonotti"
                        className="linkedin-link"
                    >
                        Developed by Leonardo Leonotti
                    </a>
                </footer>
            )}
        </div>
    );
}

export default App;
