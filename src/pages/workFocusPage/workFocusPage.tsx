import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";

type props = {
    nowPage : number,
    projectList : Array<any>
}

import React, { useEffect, useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import styles from "./workFocusPage.scss"
import WorkBox from "./components/workBox/workBox.tsx";


export default function workFocusPage({nowPage , projectList} : props) {

    const [opacity, setOpacity] = useState(0);
    const [pageWhere, setPageWhere] = useState(0);
    const [workList, setWorkList] = useState(projectList);
    const [workPanWidth, setWorkPaneWidth] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const workBoxConRef = useRef(null);
    const workPanRef = useRef(null);
    const buttonContainerRef = useRef(null);
    const afterButtonRef = useRef(null);
    const beforeButtonRef = useRef(null);
    const { scene } = useGLTF("/fresio_iphone.glb");
    const radian = Math.PI / 180;
    const sceneClone = scene.clone();

    useEffect(() => {
        const returnScroll = () => {
            if (workBoxConRef.current){
                workBoxConRef.current.scrollLeft = 0
            }
        }
        returnScroll();
        setPageWhere(0);
    }, []);

    useEffect(() => {
        const handleOpacity = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > window.innerHeight) {
                const newOpacity = Math.min((scrollPosition - window.innerHeight) / 1000, 1);
                setOpacity(newOpacity);
            } else {
                setOpacity(0);
            }
        };

        const widthSet = () => {
            setWorkPaneWidth(workBoxConRef.current ? workBoxConRef.current.offsetWidth : 0);
        };

        handleOpacity();
        widthSet();

        window.addEventListener("scroll", handleOpacity);
        window.addEventListener("resize", widthSet);

        return () => {
            window.removeEventListener("scroll", handleOpacity);
            window.removeEventListener("resize", widthSet);
        };
    }, []);

    const scrollToPosition = (targetScroll) => {
        if (isScrolling) return; // 이미 스크롤이 진행 중이라면 무시

        setIsScrolling(true); // 스크롤 진행 중으로 설정
        const scrollDuration = 500;
        const startTime = Date.now();

        const animateScroll = () => {
            const currentTime = Date.now() - startTime;
            const progress = Math.min(currentTime / scrollDuration, 1);
            workBoxConRef.current.scrollLeft = workBoxConRef.current.scrollLeft + (targetScroll - workBoxConRef.current.scrollLeft) * progress;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                setIsScrolling(false); // 스크롤 완료 후 진행 상태 해제
                if (afterButtonRef.current) {
                    afterButtonRef.current.disabled = false; // "after" 버튼 활성화
                }
                if (beforeButtonRef.current) {
                    beforeButtonRef.current.disabled = false; // "before" 버튼 활성화
                }
            }
        };

        requestAnimationFrame(animateScroll);
    };



    const afterScroll = () => {
        if (isScrolling) return; // 스크롤이 진행 중이면 추가 스크롤을 하지 않음

        if (workBoxConRef.current && workPanWidth) {
            const scrollX = workBoxConRef.current.scrollLeft;
            const maxScroll = workBoxConRef.current.scrollWidth - workBoxConRef.current.offsetWidth;

            if (scrollX < maxScroll) {
                const targetScroll = scrollX + workPanWidth;
                scrollToPosition(targetScroll);
                setPageWhere((prev) => Math.min(prev + 1, workList.length - 1));
                if (afterButtonRef.current) {
                    afterButtonRef.current.disabled = true; // "after" 버튼 비활성화
                }
            }
        }
    };

    const beforeScroll = () => {
        if (isScrolling) return; // 스크롤이 진행 중이면 추가 스크롤을 하지 않음

        if (workBoxConRef.current && workPanWidth) {
            const scrollX = workBoxConRef.current.scrollLeft;
            if (scrollX > 0) {
                const targetScroll = scrollX - workPanWidth;
                scrollToPosition(targetScroll);
                setPageWhere((prev) => Math.max(prev - 1, 0));
            }

            if (beforeButtonRef.current) {
                beforeButtonRef.current.disabled = scrollX <= 0; // 좌측 끝에 도달하면 "before" 버튼 비활성화
            }
        }
    };




    useEffect(() => {
        const setCircle = () => {
            setWorkList((prevList) =>
                prevList.map((item) =>
                    item.index === pageWhere
                        ? { ...item, status: "active" }
                        : { ...item, status: "unActive" }
                )
            );
        };
        setCircle();
    }, [pageWhere]);

    return(
        <div>
            <div
                className={styles.workFocusCon}
                ref={workBoxConRef}
            >
                {workList.map((item) => {
                    return (
                        <div className={styles.workFocusPan} ref={workPanRef} key={item.index}>
                            <WorkBox title={item.title} text={item.text} styling={item.styles}>
                                <directionalLight
                                    position={[0, 3, 16]}
                                    intensity={2}
                                    distance={2000}
                                    angle={1.2}
                                />
                                <primitive
                                    object={scene}
                                    scale={0.1}
                                    rotation={[0, 110 * radian, 80 * radian]}
                                    position={[-3, 0, -2]}
                                />
                                <primitive
                                    object={sceneClone}
                                    scale={0.1}
                                    rotation={[0, 50 * radian, 70 * radian]}
                                    position={[3, 0, -4]}
                                />
                                {/* <ThreeGrid/> */}
                            </WorkBox>

                        </div>
                    );
                })}
                <div className={styles.buttonCon} ref={buttonContainerRef}>
                    {pageWhere === 0? <div></div> : (<button onClick={beforeScroll} ref={beforeButtonRef}>
                        <div className={styles.buttonCircle}>
                            <MdOutlineKeyboardArrowLeft color="white" size={20} />
                        </div>
                    </button>)}
                    {pageWhere === 4? <div></div> : (<button onClick={afterScroll} ref={afterButtonRef}>
                        <div className={styles.buttonCircle}>
                            <MdOutlineKeyboardArrowRight color="white" size={20}/>
                        </div>
                    </button>)}
                </div>
            </div>
            <div className={styles.workList}>
                {workList.map((item) => {
                    return (
                        <div
                            className={styles.workActiveCircle}
                            key={item.index}
                        >
                            <img
                                src={item.status === "active" ? circleChoose : circleUnchoose}
                                alt={`circle-${item.index}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}