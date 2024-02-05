import "./styles.sass";
import {useState} from "react";

export const SingleChoiceAnswer = ({answer, index, onClick}) => {

    const [clicked, setClicked] = useState(false);

    const click = () => {
        setClicked(true);
        onClick(index+1);
    }

    return (
        <div className={"answer" + (clicked ? " answer-clicked" : "")} onClick={() => click()}>
            <h1>{answer}</h1>
        </div>
    )
}