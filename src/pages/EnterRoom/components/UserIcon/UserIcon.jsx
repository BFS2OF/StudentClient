import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import "./styles.sass";

export const UserIcon = () => {
    return (
        <>
            <div className="user-icon">
                <FontAwesomeIcon icon={faUser}/>

                <div className="what-square">
                    <h2>?!</h2>
                </div>
            </div>
        </>
    );
}