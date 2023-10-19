import "./styles.sass";

export const Question = ({title}) => (
    <div className="question-container">
        <div className="question-circle" />
        <div className="question">
            <h1>{title}</h1>
        </div>
    </div>
)