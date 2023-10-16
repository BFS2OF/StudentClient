import "./styles.sass";
import {useEffect, useState} from "react";

export const InGameState = () => {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown === 0) return;
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) clearInterval(interval);

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {countdown !== 0 && <div className="countdown-page">
                <div className="countdown">
                    <h1>{countdown}</h1>
                </div>
                <div className="countdown-circle">
                </div>
            </div>}
            {countdown === 0 && <div className="game-page">
                <div className="game">
                    <h1>ingame state</h1>
                    <p>questions WIP</p>
                </div>
            </div>}

        </>
    );
}