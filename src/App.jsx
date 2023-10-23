import "@/common/styles/main.sass";
import "@/common/styles/fonts.sass";
import Header from "@/common/components/Header";
import EnterRoom from "@/pages/EnterRoom";
import LoadingBar from "@/common/components/LoadingBar";
import NameChooser from "@/pages/NameChooser";
import {useEffect, useState} from "react";
import {socket} from "@/common/utils/socket.js";
import Loading from "@/pages/Loading";
import InGameState from "@/pages/InGameState";
import Ending from "@/pages/Ending";

const App = () => {
    const [state, setState] = useState("enter");
    const [code, setCode] = useState(null);
    const [name, setName] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState({});

    const [progress, setProgress] = useState(100);

    useEffect(() => {
        socket.connect();
        const endHandler = () => {
            setState("ending");
            socket.disconnect();
        }
        const handler = (data) => {
            setCurrentQuestion(data.question);
            setState("in-game");
        };

        socket.on("QUESTION_RECEIVED", handler);
        socket.on("ROOM_CLOSED", endHandler);

        return () => {
            socket.off("QUESTION_RECEIVED", handler);
            socket.off("ROOM_CLOSED", endHandler);
            socket.disconnect();
        }
    }, []);

    return (
        <>
            <Header name={name}/>
            <main>
                {state === "enter" && <EnterRoom setState={setState} socket={socket} code={code} setCode={setCode}/>}
                {state === "name" && <NameChooser setState={setState} socket={socket} code={code} setNickName={setName}/>}
                {state === "load" && <Loading setState={setState} socket={socket}/>}
                {state === "in-game" && <InGameState socket={socket} setProgress={setProgress} question={currentQuestion}/>}
                {state === "ending" && <Ending setState={setState} onRetry={() => socket.connect()}/>}
            </main>
            <LoadingBar progress={progress}/>
        </>
    );
}

export default App;