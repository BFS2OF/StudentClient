import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Button = ({text, icon, onClick}) => {
    return (
        <button className="btn" onClick={onClick}>
            {icon && <FontAwesomeIcon icon={icon} />}
            {text}
        </button>
    )
}