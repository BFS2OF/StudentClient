import "./styles.sass";

export const LoadingBar = ({progress = 100}) => {
    return (
        <div className="loading-bar" style={{width: `${progress}%`}} />
    );
}