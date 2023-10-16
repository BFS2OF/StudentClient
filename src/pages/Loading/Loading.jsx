import "./styles.sass";
import {useEffect} from "react";

export const Loading = ({setState, socket}) => {

    useEffect(() => {
        const handler = (data) => {
            setState("in-game");
        }

        socket.on("QUESTION_RECEIVED", handler);

        return () => {
            socket.off("QUESTION_RECEIVED", handler);
        }
    }, []);

    return (
        <div className="loading-page">
            <div className="lds"><div /><div /><div /></div>
        </div>
    )
}