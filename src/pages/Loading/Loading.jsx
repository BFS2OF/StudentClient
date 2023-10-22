import "./styles.sass";

export const Loading = ({setState, socket}) => {

    return (
        <div className="loading-page">
            <div className="lds"><div /><div /><div /></div>
        </div>
    )
}