import "./styles.sass";
import {useEffect, useState} from "react";

export const LoadingBar = ({progress = 100}) => {
    const [transition, setTransition] = useState(true);

    useEffect(() => { 
        if (progress !== 100 && transition) return;
        setTransition(false);
        const timeout = setTimeout(() => setTransition(true), 10000);
        return () => clearTimeout(timeout);
    }, [progress]);

    return (
        <div className={"loading-bar" + (transition ? "" : " progress-transition-off")} style={{width: `${progress}%`}} />
    );
}