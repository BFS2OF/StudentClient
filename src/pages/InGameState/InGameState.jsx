import "./styles.sass";
import {useEffect, useState} from "react";
import Background from "@/common/components/Background";
import SCAnswer from "@/pages/InGameState/components/SingleChoiceAnswer";
import Question from "@/pages/InGameState/components/Question";

export const InGameState = ({socket, setState, setProgress}) => {
    const [countdown, setCountdown] = useState(3);

    const question = {
        title: "Wann wurde die erste Version von Minecraft veröffentlicht?",
        type: "SINGLE_CHOICE",
        answers: ["2009", "2010", "2011", "Gute Frage"],
        correctAnswer: 1
    }

    useEffect(() => {
        if (countdown === 0) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev === 0) clearInterval(interval);

                    return prev - 10;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
        setProgress(100);

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) clearInterval(interval);

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    return (
        <div className="game-page">
            {countdown !== 0 && <div className="countdown-page">
                <div className="countdown">
                    <h1>{countdown}</h1>
                    <div className="countdown-circle" />
                    <div className="background"></div>
                </div>
            </div>}
            {countdown === 0 && <div className="game-page">
                <Question title={question.title} />

                <div className="answers-container">
                    {question.answers.map((answer, index) => (
                        <SCAnswer answer={answer} key={index} onClick={() => setCountdown(5000)} />
                    ))}
                </div>
            </div>}
            <Background />
        </div>
    );
}