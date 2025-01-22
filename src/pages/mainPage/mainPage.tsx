import { useEffect, useRef, useState } from "react";
import { ShaderMaterial } from 'three';
import {pagesProps} from "../../feature/pagesProps.tsx";
import styles from "./mainPage.module.scss";
import Loader from "./3dLoaders/3dLoader.tsx";
import { useGLTF, useProgress } from "@react-three/drei";

export default function MainPage() {
    const headTextRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const focusTextRef = useRef<HTMLElement>(null);
    const threeContainerRef = useRef<HTMLDivElement>(null);

    const { progress } = useProgress(); // 로딩 상태 확인
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

    return (
        <div className={styles.container}>
            <div className={styles.headText} ref={headTextRef}>
                신유준의 포트폴리오에 오신걸 환영합니다.
            </div>
            <div className={styles.threeContainer} ref={threeContainerRef}>
                <Loader model={blackHole}/>
            </div>
        </div>
    );
}
