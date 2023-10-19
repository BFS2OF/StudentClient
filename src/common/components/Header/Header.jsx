import "./styles.sass";
import BS2Image from "@/common/images/bs2ab.png";
import Button from "@/common/components/Button";

export const Header = ({name}) => {
    return (
        <header className="header">
            <div className="logo">
                <img src={BS2Image} alt="BS2" />
                <h1 className="logo-text">Fragenportal</h1>
            </div>

            <Button text={name ? name : "MTLM Product"} />
        </header>
    )
}