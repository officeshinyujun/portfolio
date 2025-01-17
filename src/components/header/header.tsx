import styles from "../../pages/techPage/techPage.module.scss";
import {Canvas} from "@react-three/fiber";
import Head3dBox from "../head3dBox/head3dBox.tsx";

type props = {
    contextLink : string,
    title : string,
}

export default function Header({contextLink, title}: props) {
    return (
        <div className={styles.headerCon}>
            <div style={{display: "flex", alignItems: "center", gap: 12, width: "100%"}}>
                <div className={styles.headBoxContainer}>
                    <Canvas>
                        <Head3dBox context={contextLink}/>
                    </Canvas>
                </div>
                <p>{title}</p>
            </div>
            <div className={styles.line}></div>
        </div>
    )
}