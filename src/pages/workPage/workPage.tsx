import styles from "./workPage.module.scss";
import {useState } from "react";
import Header from "../../components/header/header.tsx";
import PageLine from "../../components/pageLine/pageLine.tsx";
import WorkListBox from "./components/workListBox.tsx";
import WorkFocusBox from "./components/workFocusBox.tsx";


export default function WorkPage() {
    const [workList, setWorkList] = useState([
        {
            index: 0,
            title: "Fresio",
            text: "당신의 냉장고 라이프를 더욱 편리하게",
            styles : {
                background : "linear-gradient(180deg, #f4902f, #ffbe86)",
                boxShadow : "#F4902F"
            }
        },
        {
            index: 1,
            title: "DAT",
            text: "do all tetris",
            styles : {
                background : "linear-gradient(180deg, #664CCC, #8978CC)",
                boxShadow : "#664CCC"
            }
        },
        {
            index: 2,
            title: "PLOCK",
            text: "여러분의 최애가 알림을",
            styles : {
                background : "black",
                boxShadow : "#0EBF72"
            }
        },
        {
            index: 3,
            title: "workIntroduce",
            text: "레고 창작물 소개 페이지",
            className : "workIntroduce",
            styles : {
                background : "linear-gradient(180deg, #3B5AFF, #8C9EFF)",
                boxShadow : "#3B5AFF"
            }
        },
        {
            index: 4,
            title: "spark",
            text: "아이디어 보드 프로그램",
            className : "spark",
            styles: {
                background : "#131619",
                boxShadow: "#F08080"
            }
        },
    ]);

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
                    <WorkFocusBox selectedProject={selectedWork}/>
                </div>
            </div>
        </div>
    );
}
