import { useEffect, useRef, useState } from "react";
import styles from "./mainPage.module.scss";
import Loader from "./3dLoaders/3dLoader.tsx";
import { useGLTF, useProgress } from "@react-three/drei";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import gsap from "gsap";

export default function MainPage() {
    const headTextRef = useRef<HTMLDivElement>(null);
    const threeContainerRef = useRef<HTMLDivElement>(null);
    const guideRef = useRef<HTMLDivElement>(null);
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);

    const { progress } = useProgress(); // 로딩 상태 확인
    const blackHole = useGLTF("/blackhole(1).glb"); // GLTF 로드

    const handleAnimationEnd = () => {
        console.log("애니메이션 종료!");
        setIsAnimationFinished(true);
    };

    const guideAnimation = () => {
        gsap.fromTo(
            guideRef.current,
            {
                opacity: 0,
                transform: "translateZ(-40px)"
            },
            {
                opacity: 1,
                transform: "translateZ(0px)",
                ease: "power2.inOut",
                duration: 1.5
            }
        );
    };

    const headTextAnimation = () => {
        gsap.fromTo(headTextRef.current, {
            opacity: 0,
            transform: "translateX(-100px)",
        },{
            opacity: 1,
            transform: "translateX(80px)",
            ease: "power2.inOut",
            duration: 4
        })
    }

    useEffect(() => {
        if (isAnimationFinished && guideRef.current) {
            guideAnimation();
        }
    }, [isAnimationFinished]);

    useEffect(() => {
        headTextAnimation()
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headText} ref={headTextRef}>
                신유준의 포트폴리오에 오신걸 환영합니다.
            </div>
            <div className={styles.threeContainer} ref={threeContainerRef}>
                <Loader model={progress === 100 ? blackHole : null} onAnimateEnd={handleAnimationEnd}/>
            </div>
            <div className={styles.guideContainer} ref={guideRef}>
                <p>스크롤해 추가 정보 보기</p>
                <MdKeyboardDoubleArrowDown />
            </div>
        </div>
    );
}
