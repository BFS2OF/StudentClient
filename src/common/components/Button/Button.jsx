import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Button = ({text, icon}) => {
    return (
        <button className="btn">
            {icon && <FontAwesomeIcon icon={icon} />}
            {text}
        </button>
    )
}