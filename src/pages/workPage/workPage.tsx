import styles from "./workPage.module.scss";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/header/header.tsx";
import { OrbitControls, useGLTF } from "@react-three/drei";
import PageLine from "../../components/pageLine/pageLine.tsx";


export default function WorkPage() {
    const [workList, setWorkList] = useState([
        {
            index: 0,
            status: "active",
            title: "Fresio",
            text: "당신의 냉장고 라이프를 더욱 편리하게",
            styles : {
                background : "linear-gradient(180deg, #f4902f, #ffbe86)",
                boxShadow : "0 0 20px #F4902F"
            }
        },
        {
            index: 1,
            status: "unActive",
            title: "DAT",
            text: "do all tetris",
            styles : {
                background : "linear-gradient(180deg, #664CCC, #8978CC);",
                boxShadow : "0 0 20px #664CCC"
            }
        },
        {
            index: 2,
            status: "unActive",
            title: "PCOSPOT",
            text: "간단한 메신저 플랫폼",
            styles : {
                background : "black",
                boxShadow : " 0 0 20px #0EBF72"
            }
        },
        {
            index: 3,
            status: "unActive",
            title: "workIntroduce",
            text: "레고 창작물 소개 페이지",
            className : "workIntroduce",
            styles : {
                background : "linear-gradient(180deg, #3B5AFF, #8C9EFF)",
                boxShadow : "0 0 20px #3B5AFF"
            }
        },
        {
            index: 4,
            status: "unActive",
            title: "spark",
            text: "아이디어 보드 프로그램",
            className : "spark",
            styles: {
                background : "#131619",
                boxShadow: "0 0 20px #F08080"
            }
        },
    ]);

    return (
        <div
            className={styles.container}
        >
            <Header title="work" />
            <PageLine/>
            {/*<div className={styles.contents}>*/}

            {/*</div>*/}
        </div>
    );
}
