import "./styles.sass";
import {useEffect, useState} from "react";
import Background from "@/common/components/Background";
import SCAnswer from "@/pages/InGameState/components/SingleChoiceAnswer";
import YNAnswer from "@/pages/InGameState/components/YesNoAnswer";
import Question from "@/pages/InGameState/components/Question";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faClock} from "@fortawesome/free-solid-svg-icons";

export const InGameState = ({socket, setProgress, question}) => {
    const [countdown, setCountdown] = useState(-1);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);

    useEffect(() => {
        setCorrectAnswer(null);
        setUserAnswer(null);
        setCountdown(3);
    }, [question]);

    useEffect(() => {
        const handler = (data) => setCorrectAnswer(data.answer);

        socket.on("ANSWER_RECEIVED", handler);

        return () => socket.off("ANSWER_RECEIVED", handler);
    }, []);

    const submitAnswer = (answer) => {
        socket.emit("SUBMIT_ANSWER", {answer});
        setTimeout(() => {
            setUserAnswer(answer);
            setCountdown(-1);
        }, 500);
    }

    useEffect(() => {
        if (countdown === 0) {
            setProgress(0);
            return;
        }
        setProgress(100);

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return prev;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    return (
        <div className="game-page">
            {correctAnswer !== null && <div className="correct-answer">
                <div className={"countdown " + (correctAnswer === userAnswer ? "answer-correct" : "answer-wrong")}>
                    <FontAwesomeIcon icon={correctAnswer === userAnswer ? faCircleCheck : faCircleXmark}/>
                    <div className="background"></div>
                </div>
                <h2 className="correct-answer-text">
                    {correctAnswer === userAnswer ? "Korrekt!" : "Falsch! Richtig wäre " + (question.type === "SINGLE_CHOICE" ? question?.answers[correctAnswer-1] : correctAnswer ? "Ja" : "Nein")}
                </h2>
            </div>}
            {correctAnswer === null && countdown !== 0 && <div className="countdown">
                {countdown === -1 ? <FontAwesomeIcon icon={faClock} shake/> : <h1>{countdown}</h1>}
                <div className="countdown-circle"/>
                <div className="background"></div>
            </div>}
            {correctAnswer === null && countdown === 0 && <div className="game-page">
                <Question title={question.title}/>

                {question.type === "SINGLE_CHOICE" && <div className="sc-answers-container">
                    {question.answers.map((answer, index) => (
                        <SCAnswer answer={answer} key={index} index={index} onClick={submitAnswer}/>
                    ))}
                </div>}

                {question.type === "YES_NO" && <div className="yn-answers-container">
                    <YNAnswer yes onClick={submitAnswer}/>
                    <YNAnswer onClick={submitAnswer}/>
                </div>}
            </div>}
            <Background/>
        </div>
    );
}