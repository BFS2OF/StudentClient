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

    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <>
            <Header/>
            <main>
                {state === "enter" && <EnterRoom setState={setState} socket={socket} code={code} setCode={setCode}/>}
                {state === "name" && <NameChooser setState={setState} socket={socket} code={code}/>}
                {state === "load" && <Loading setState={setState} socket={socket}/>}
                {state === "in-game" && <InGameState setState={setState} socket={socket}/>}
            </main>
            <LoadingBar progress={100}/>
        </>
    );
}

export default App;