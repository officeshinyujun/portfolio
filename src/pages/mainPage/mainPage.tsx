import { useEffect, useRef, useState } from "react";
import styles from "./mainPage.module.scss";
import Loader from "./3dLoaders/3dLoader.tsx";
import { useGLTF, useProgress } from "@react-three/drei";

export default function MainPage() {
    const headTextRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const focusTextRef = useRef<HTMLElement>(null);
    const threeContainerRef = useRef<HTMLDivElement>(null);

    const { loaded, total, progress } = useProgress(); // 로딩 상태 확인
        const blackHole = useGLTF("/blackhole(1).glb"); // GLTF 로드

    useEffect(() => {
        if (progress < 100 || !blackHole.scene) console.log(`Progress: ${progress}%`); // 로드 진행도 확인
        let opacity = 0; // 초기 opacity
        const startTop = 900; // 초기 top 위치
        const endTop = 80; // 최종 top 위치
        const duration = 2600; // 애니메이션 지속 시간 (ms)
        const startTime = performance.now();

        const fadeInAndMove = (currentTime: number) => {
            if (headTextRef.current) {
                const elapsedTime = currentTime - startTime; // 경과 시간 계산
                const progress = Math.min(elapsedTime / duration, 1); // 0 ~ 1 사이의 진행도 계산

                // opacity와 top 값을 진행도에 따라 계산
                opacity = progress;
                const currentTop = startTop - (startTop - endTop) * progress;

                // 스타일 업데이트
                headTextRef.current.style.opacity = opacity.toString();
                headTextRef.current.style.top = `${currentTop}px`;

                if (progress < 1) {
                    requestAnimationFrame(fadeInAndMove); // 애니메이션 계속
                    if (bodyRef.current) {
                        bodyRef.current.style.overflowY = "hidden";
                        headTextRef.current.style.zIndex = "0";
                    }
                } else if (progress === 1) {
                    if (bodyRef.current && headTextRef.current) {
                        bodyRef.current.style.overflowY = "auto";
                        headTextRef.current.style.zIndex = "2";
                    }
                }
            }
        };

        requestAnimationFrame(fadeInAndMove); // 애니메이션 시작
    }, [progress, blackHole.scene]); // 로드 상태와 blackHole의 변경 감지

    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;

        if (headTextRef.current && threeContainerRef.current) {
            const newY = 60 - scrollY / 3;
            const newOp = Math.max(0, Math.min(1, 1 - scrollY / 700)); // Adjusted opacity calculation
            headTextRef.current.style.top = `${newY}px`;
            threeContainerRef.current.style.opacity = `${newOp}`;
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.headText} ref={headTextRef}>
                <p>안녕하세요, 기록하는 개발자</p>
                <span className={styles.focusText} ref={focusTextRef}>
                    신유준
                </span>
                <span> 입니다.</span>
                <p style={{fontSize:20, color:'#6a6a6a'}}>
                    선린인터넷고등학교에서 프론트엔드를 배우고 있고,<br/>
                    개발에 열정있게 임하고 있습니다.
                </p>
            </div>
            <div className={styles.threeContainer} ref={threeContainerRef}>
                <Loader model={blackHole}/>
            </div>
        </div>
    );
}