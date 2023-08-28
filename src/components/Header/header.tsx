import styles from "./header.module.css";
import logo from "../../assets/Logo.png"

export function Header () {
    return (
        <header className={styles.header}>
            <div>
                <img src={logo} alt="to.do"/>
            </div>

        </header>
    )
}