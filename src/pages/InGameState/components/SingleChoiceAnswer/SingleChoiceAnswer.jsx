import "./styles.sass";
import {useState} from "react";

export const SingleChoiceAnswer = ({answer, index, onClick}) => {

    const [clicked, setClicked] = useState(false);

    const handleAnimationEnd = (event) => {
        if (event.animationName === "scaleOut") onClick(index+1);
    }

    return (
        <div className={"answer" + (clicked ? " answer-clicked" : "")} onClick={() => setClicked(true)} onAnimationEnd={handleAnimationEnd}>
            <h1>{answer}</h1>
        </div>
    )
}