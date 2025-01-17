import styles from "./workPage.module.scss";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/header/header.tsx";
import WorkBox from "../workFocusPage/components/workBox/workBox.tsx";
import circleChoose from "../../assets/circleChoose.svg";
import circleUnchoose from "../../assets/circleUnchoose.svg";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ThreeGrid from "../../components/threeGrid.tsx";


export default function WorkPage() {
    const [opacity, setOpacity] = useState(0);
    const [pageWhere, setPageWhere] = useState(0);
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
    const [workPanWidth, setWorkPaneWidth] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false); // Track if a scroll is in progress

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

    return (
        <div
            className={styles.container}
            style={{
                opacity: opacity,
                transition: "opacity 0.3s ease",
            }}
        >
            <Header contextLink={"/triBox_.glb"} title="work" />
            <div className={styles.contents}>

            </div>
        </div>
    );
}
