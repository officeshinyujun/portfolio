import styles from "./workPage.module.scss";
import {useState } from "react";
import Header from "../../components/header/header.tsx";
import PageLine from "../../components/pageLine/pageLine.tsx";
import WorkListBox from "./components/workListBox.tsx";
import WorkFocusBox from "./components/workFocusBox.tsx";
import datImage from "../../assets/image/dat.jpg"
import fresioImage from "../../assets/image/fresio.jpg"
import sparkImage from "../../assets/image/spark.jpg"
import workiImage from "../../assets/image/worki.png"


export default function WorkPage() {
    const workList = [
        {
            index: 0,
            title: "Fresio",
            slogan: "당신의 냉장고 라이프를 더욱 편리하게",
            styles : {
                boxShadow : "#F4902F"
            },
            image : fresioImage,
            explanation : ["2024년 sw 동행 해커톤 출품작입니다. 하드웨어의 프론트엔드를 만드는 역할을 담당하였습니다.", "라즈베리 파이와 react-vite를 이용하여 구현하였습니다."],
            links : ["https://github.com/our-enemy-is-samsung/fresio-hw"]
        },
        {
            index: 1,
            title: "DAT",
            slogan: "do all tetris",
            styles : {
                boxShadow : "#664CCC"
            },
            image : datImage,
            explanation:["테트리스를 더욱 편하게 하고자 하여 만들었습니다. 전체 제작 역할을 담당하였습니다.", "react로 프론트엔드를 구현하였고, 채팅 시스템과 커뮤니티 시스템도 구현하였습니다."],
            links: ["https://github.com/officeshinyujun/DAT"]
        },
        {
            index: 2,
            title: "worki",
            slogan: "레고 창작물 소개 페이지",
            className : "workIntroduce",
            styles : {
                boxShadow : "#3B5AFF"
            },
            image : workiImage,
            explanation: ["전시회에서 저의 작품을 더욱 효율적으로 전시하기 위해 만들었습니다. 전체 제작 역할을 담당하였습니다.", "react로 프론트엔드를 구현하였고, firebase로 간단한 댓글 기능도 구현하였습니다."],
            links:["https://github.com/officeshinyujun/worki"]
        },
        {
            index: 3,
            title: "spark",
            slogan: "ai 아이디어 보드",
            className : "spark",
            styles: {
                boxShadow: "#F08080"
            },
            image : sparkImage,
            explanation: ["ai 기반 브레인스토밍 플랫폼입니다.웹의 프론트엔드를 담당하였습니다.", "react-vite를 이용하여 프론트엔드를 구현하였고, liveBlocks를 사용하여 실시간 처리를 해보았습니다."],
            links: ["https://github.com/sunrint-spark/spark-frontend"]
        },
        {
            index : 4,
            title : "왼쪽의 박스를 클릭해보세요!"
        }
    ];

    const [selectedWork, setSelectedWork] = useState(null);

    const handleSelectedWork = (item: any) => {
        setSelectedWork(item);
        console.log(item);
    };

    return (
        <div className={styles.container}>
            <Header title="work" />
            <PageLine />
            <div className={styles.contents}>
                <div className={styles.workList}>
                    {workList.map((item) => (
                        <WorkListBox
                            key={item.index}
                            project={item}
                            selectedFunction={handleSelectedWork}
                        />
                    ))}
                </div>
                <div className={styles.workFocusBox}>
                    <WorkFocusBox selectedProject={selectedWork} />
                </div>
            </div>
        </div>
    );
}
