import "./styles.sass";
import Button from "@/common/components/Button";
import {faArrowLeftRotate} from "@fortawesome/free-solid-svg-icons";

export const Ending = ({setState, onRetry}) => {
    const newGame = () => {
        setState("enter");
        onRetry();
    }
    return (
        <div className="ending">
            <div className="ending-content">
                <h1>Raum geschlossen</h1>
                <p>Danke fürs spielen!</p>
            </div>
            <div className="ending-actions">
                <Button onClick={newGame} text="Zurück zum Start" icon={faArrowLeftRotate} />
            </div>
        </div>
    );
}