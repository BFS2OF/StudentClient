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

const App = () => {
    const [state, setState] = useState("enter");
    const [code, setCode] = useState(null);
    const [name, setName] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState({});

    const [progress, setProgress] = useState(100);

    useEffect(() => {
        socket.connect();

        const handler = (data) => {
            setCurrentQuestion(data.question);
            setState("in-game");
        };

        socket.on("QUESTION_RECEIVED", handler);

        return () => {
            socket.off("QUESTION_RECEIVED", handler);
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
                {state === "in-game" && <InGameState setState={setState} socket={socket} setProgress={setProgress} question={currentQuestion}/>}
            </main>
            <LoadingBar progress={progress}/>
        </>
    );
}

export default App;