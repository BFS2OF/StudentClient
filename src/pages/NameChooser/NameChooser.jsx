import Button from "@/common/components/Button";
import {faGamepad} from "@fortawesome/free-solid-svg-icons";
import "./styles.sass";
import CharacterChooser from "@/pages/NameChooser/components/CharacterChooser";
import {useEffect, useRef, useState} from "react";

export const NameChooser = ({socket, setState, code, setNickName}) => {

    const [name, setName] = useState("");
    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        joinRoom();
    }

    const joinRoom = () => {
        socket.emit("JOIN_ROOM", {code: parseInt(code), name, character: "cat-1"}, (res) => {
            setState(res ? "load" : "enter");
            setNickName(name);
        });
    }

    return (
        <div className="choose-name">

            <form onSubmit={submit} className="code-input">
                <CharacterChooser/>

                <input type="text" placeholder="Nickname" value={name} onChange={(e) => setName(e.target.value)}
                       ref={nameRef}/>

                <Button text="Spielen" icon={faGamepad} onClick={joinRoom}/>
            </form>

            <div className="welcome-image">
                <img src="https://placehold.it/670x560" alt="Welcome"/>
            </div>
        </div>
    )
}