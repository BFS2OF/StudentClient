import "./styles.sass";
import {faQrcode} from "@fortawesome/free-solid-svg-icons";
import UserIcon from "@/pages/EnterRoom/components/UserIcon";
import CodeWrapper from "@/pages/EnterRoom/components/CodeWrapper";
import {useEffect, useState} from "react";
import Button from "@/common/components/Button";

export const EnterRoom = ({setState, socket, code, name, setCode}) => {

    const [invalidCode, setInvalidCode] = useState(false);

    const updateCode = (code) => {
        setInvalidCode(false);
        setCode(code);
    }

    useEffect(() => {
        if (!code) return;

        socket.emit("CHECK_ROOM", {code: parseInt(code)}, (res) => {
            if (res) {
                setState(name === null ? "name" : "load");
            } else {
                setInvalidCode(true);
            }
        });
    }, [code]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        if (code) {
            setCode(code);
        }
    }, []);

    return (
        <div className="enter-room">

            <div className="code-input">
                <UserIcon/>

                <h1>Code eingeben</h1>

                <CodeWrapper onChange={updateCode} resetCode={invalidCode}/>

                {invalidCode && <p className="error">Dieser Code ist ungültig</p>}

                <div className="alternative">
                    <hr/>
                    <h2>oder</h2>
                    <hr/>
                </div>

                <Button text="Code scannen" icon={faQrcode}/>

            </div>

            <div className="welcome-image">
                <img src="https://placehold.it/670x560" alt="Welcome"/>
            </div>
        </div>
    )
}