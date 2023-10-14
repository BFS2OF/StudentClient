import "@/common/styles/main.sass";
import "@/common/styles/fonts.sass";
import Header from "@/common/components/Header";
import EnterRoom from "@/pages/EnterRoom";
import LoadingBar from "@/common/components/LoadingBar";
import NameChooser from "@/pages/NameChooser";
import {useState} from "react";
import {socket} from "@/common/utils/socket.js";

const App = () => {
    const [state, setState] = useState("enter");
    const [code, setCode] = useState(null);

    socket.connect();

    return (
        <>
            <Header/>
            <main>
                {state === "enter" && <EnterRoom setState={setState} socket={socket} code={code} setCode={setCode}/>}
                {state === "name" && <NameChooser setState={setState} socket={socket} code={code}/>}
            </main>
            <LoadingBar progress={100}/>
        </>
    );
}

export default App;