import "./styles.sass";

export const SingleChoiceAnswer = ({answer, onClick}) => {

    return (
        <div className="answer" onClick={onClick}>
            <h1>{answer}</h1>
        </div>
    )
}