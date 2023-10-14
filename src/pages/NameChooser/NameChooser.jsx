import Button from "@/common/components/Button";
import {faGamepad} from "@fortawesome/free-solid-svg-icons";
import "./styles.sass";
import CharacterChooser from "@/pages/NameChooser/components/CharacterChooser";
import {useState} from "react";

export const NameChooser = ({socket, setState, code}) => {

    const [name, setName] = useState("");

    const joinRoom = () => {
        socket.emit("JOIN_ROOM", {code: parseInt(code), name, character: "cat-1"}, (res) => {
            setState(res ? "load" : "enter");
        });
    }

    return (
        <div className="choose-name">

            <div className="code-input">
                <CharacterChooser />

                <input type="text" placeholder="Nickname" value={name} onChange={(e) => setName(e.target.value)} />

                <Button text="Spielen" icon={faGamepad} onClick={joinRoom} />
            </div>

            <div className="welcome-image">
                <img src="https://placehold.it/670x560" alt="Welcome" />
            </div>
        </div>
    )
}