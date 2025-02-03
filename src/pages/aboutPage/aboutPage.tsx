import styles from "./aboutPage.module.scss"
import Header from "../../components/header/header.tsx";
import PageLine from "../../components/pageLine/pageLine.tsx";
import AboutListBox from "../../components/aboutListBox/aboutListBox.tsx";
import testImage from "../../assets/image/profileImage.jpg"
import GithubImage from "../../assets/image/icons8-github의.svg"
import InstarImage from "../../assets/image/icons8-인스-타-그램.svg"
import BlogImage from "../../assets/image/icons8-google-블로그-검색.svg"

export default function AboutPage() {

    return (
        <div className={styles.container}>
            <Header title={"about"}/>
            <PageLine/>
            <div className={styles.contents}>
                <div className = {styles.profileContainer}>
                    <div>
                        <p>안녕하세요, 기록하는 개발자</p>
                        <span className={styles.focusText}>
                    신유준
                </span>
                        <span> 입니다.</span>
                        <p className={styles.profileText}>
                            선린인터넷고등학교에서 프론트엔드를 배우고 있고,<br/>
                            개발에 열정있게 임하고 있습니다.
                        </p>
                        <div className={styles.social}>
                            <a href={"https://www.instagram.com/shyj.1226/"} target="_blank">
                                <img src={InstarImage} alt="instargram" width={30}/>
                            </a>
                            <a href={"https://github.com/officeshinyujun"} target="_blank">
                                <img src={GithubImage} alt="github" width={30}/>
                            </a>
                            <a href={"https://officeshinyujun.github.io/web-study-blog/"} target="_blank">
                                <img src={BlogImage} alt="blog" width={30}/>
                            </a>
                        </div>
                    </div>
                    <img src={testImage} alt="about" width={300} height={300} className={styles.profileImage}/>
                </div>
                <div className={styles.awardContainer}>
                    <AboutListBox title={"수상 실적"} contents={["28회 앱잼 생활부문 우수상", "2024 sw 동행 해커톤 이사장상"]}/>
                    <AboutListBox title={"자격증"} contents={["정보처리기능사"]}/>
                </div>
            </div>
        </div>
    )
}