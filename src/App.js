import React from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Intro from "./components/Intro";
import Blob from "./components/Blob";
import Question from "./components/Question";

function App() {
    const [questions, setQuestions] = React.useState([]);
    const [isGameOver, setIsGameOver] = React.useState(false);
    const [isGameStart, setIsGameStart] = React.useState(false);
    const [correctCounter, setCorrectCounter] = React.useState(0);
    const [disabled, setDisabled] = React.useState(false);
    const [reset, setReset] = React.useState(false);

    const allQuestionsAnswered = questions.every(
        (question) => question.selectedAnswer !== ""
    );

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const startGame = () => {
        setIsGameStart((oldState) => !oldState);
    };

    React.useEffect(function () {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((res) => res.json())
            .then((data) =>
                setQuestions(
                    data.results.map((obj) => {
                        return {
                            selectedAnswer: "",
                            isRight: false,
                            id: nanoid(),
                            answers: [
                                ...obj.incorrect_answers,
                                obj.correct_answer,
                            ],
                            ...obj,
                        };
                    })
                )
            );
        // setQuestions((oldArray) => shuffleArray(oldArray));
    }, []);

    React.useEffect(() => {
        if (questions.length !== 0 && allQuestionsAnswered) {
            let correctAnswers = 0;

            questions.forEach((question) => {
                if (question.correct_answer === question.selectedAnswer)
                    correctAnswers++;
            });

            setCorrectCounter(correctAnswers);
            // setCheckAnswerBtn(true);
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

    const handleIsRight = () => {
        let counter = 0;
        questions.forEach((element) => (element.isRight ? (counter += 1) : 0));
        setCorrectCounter((oldValue) => oldValue + counter);
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
        <>
            <Blob />
            <main className="main-container">
                {isGameStart ? (
                    componentsArray
                ) : (
                    <Intro startGame={startGame} />
                )}
            </main>
            {isGameStart && (
                <section className="results-container">
                    <p className="results-text">
                        {disabled
                            ? `Você acertou ${correctCounter}/5 perguntas!`
                            : ""}
                    </p>
                    {isGameOver ? (
                        <button className="main-btn" onClick={setReset(true)}>
                            {"Reset Game"}
                        </button>
                    ) : (
                        <button
                            className="main-btn"
                            onClick={handleCheckAnswer}
                        >
                            {"Check answers"}
                        </button>
                    )}
                </section>
            )}
        </>
    );
}

export default App;
