import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export const YesNoAnswer = ({yes, onClick}) => {
    const [clicked, setClicked] = useState(false);

    const click = () => {
        setClicked(true);
        onClick(yes ? 1 : 0);
    }

    return (
        <div className={"yn-answer" + (yes ? " yn-yes" : " yn-no") + (clicked ? " yn-invisible" : "")}
             onClick={() => click()}>
            <FontAwesomeIcon icon={yes ? faCircleCheck : faCircleXmark} />
            <h1>{yes ? "Ja" : "Nein"}</h1>
        </div>
    )
}