import "./styles.sass";
import {useRef} from "react";

export const CodeWrapper = ({onChange}) => {

    const codeWrapper = useRef(null);

    const handleChange = (e) => {
        codeWrapper.current.childNodes.forEach((input, index) => {
            if (e.target === input && index !== 3) {
                codeWrapper.current.childNodes[index + 1].focus();
            } else if (e.target === input && index === 3) {
                let code = "";
                codeWrapper.current.childNodes.forEach(input => code += input.value);
                onChange(code);
            }

            if (e.target.value.length > 1) e.target.value = e.target.value.slice(1);
        });
    }

    return (
        <div className="code-wrapper" ref={codeWrapper}>
            {[...Array(4)].map((_, index) => <input key={index} type="number" placeholder="0" onChange={handleChange} />)}
        </div>
    )
}