import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCat} from "@fortawesome/free-solid-svg-icons";
import "./styles.sass";

export const CharacterChooser = () => {
    return (
        <>
            <div className="user-icon">
                <FontAwesomeIcon icon={faCat}/>

                <div className="what-square">
                    <h2>?!</h2>
                </div>
            </div>
        </>
    );
}