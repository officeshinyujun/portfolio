import styles from "./aboutPage.module.scss"
import Header from "../../components/header/header.tsx";
import PageLine from "../../components/pageLine/pageLine.tsx";

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <Header title={"about"}/>
            <PageLine/>
            <div className={styles.contents}>
                <p>안녕하세요, 기록하는 개발자</p>
                <span className={styles.focusText}>
                    신유준
                </span>
                <span> 입니다.</span>
                <p style={{fontSize:20, color:'#a8a8a8', marginTop:"10px"}}>
                    선린인터넷고등학교에서 프론트엔드를 배우고 있고,<br/>
                    개발에 열정있게 임하고 있습니다.
                </p>
            </div>
        </div>
    )
}