import styles from "./techPage.module.scss";
// import { Canvas } from "@react-three/fiber";
import { useState, useRef } from "react";
import TechBox from "./components/techBox/techBox.tsx";
import jsLogo from "../../assets/image/logo-javascript.svg";
import cLogo from "../../assets/image/c-1.svg";
import tsLogo from "../../assets/image/typescript.svg";
import pythonLogo from "../../assets/image/python-5.svg";
import sassLogo from "../../assets/image/sass-1.svg";
import nestLogo from "../../assets/image/nestjs.svg";
import reactLogo from "../../assets/image/react-2.svg";
import reactNativeLogo from "../../assets/image/react-native-1.svg";
import electronLogo from "../../assets/electron-svgrepo-com(1).svg";
import threeLogo from "../../assets/Threejs-logo.svg";
import nodeJsLogo from "../../assets/nodejs-icon.svg"
import { pagesProps } from "../../feature/pagesProps.tsx";
import { motion } from "framer-motion";
import Header from "../../components/header/header.tsx";
import PageLine from "../../components/pageLine/pageLine.tsx";

export default function TechPage() {
    const headerRef = useRef(null); // Header 참조 생성

    const stack = [
        {
            category: "frontend",
            technologies: {
                react: { name: "리액트 컴포넌트를 재사용 가능하게 설계할 수 있고, 또한 zustand를 사용해 전역 상태 관리를 해본 경험이 있습니다.", logo: reactLogo },
                reactNative: { name: "리액트 네이티브의 스택 개념과 expo를 사용해본 적이 있습니다.", logo: reactNativeLogo },
                sass: { name: "sass의 프로그래밍적 성격을 활용하여 Inheritance, extend 등을 사용해본 적이 있습니다.", logo: sassLogo },
                electron: { name: "Electron으로 컴퓨터에서 돌아가는 앱을 만들어본 경험이 있습니다.", logo: electronLogo },
                threeJs: { name: "threejs의 scene, camera, light, texture의 대한 개념들과, r3f를 사용한 웹 게임 프로젝트를 해본 적이 있습니다.", logo: threeLogo },
            },
        },
        {
            category: "backend",
            technologies: {
                nodeJS: { name: "nodeJS와 express를 활용한 restAPI 구축을 해보았습니다.", logo: nodeJsLogo },
            },
        },
        {
            category: "etc",
            technologies: {
                ts: { name: "Union type, Generics type 등을 알고 이를 사용할줄 압니다.", logo: tsLogo },
                python: { name: "Python과 pip를 사용하여 ai 모델을 사용해본 경험이 있습니다.", logo: pythonLogo },
            },
        },
    ];


    return (
        <div className={styles.container}>
            <Header title="stack" ref={headerRef} />
            <PageLine />
            <div className={styles.contents}>
                {stack.map((group, groupIndex) => (
                    <TechBox text={group.category} key={groupIndex}>
                        {Object.entries(group.technologies).map(([key, value]) => (
                            <div
                                className={styles.stackBox}
                                key={key}
                            >
                                <div className={styles.stackHead}>
                                    <img src={value.logo} alt={`${value.name} Logo`} width={20} height={20} />
                                    <p>{key}</p>
                                </div>
                                <span>{value.name}</span>
                            </div>
                        ))}
                    </TechBox>
                ))}
            </div>
        </div>
    );
}
