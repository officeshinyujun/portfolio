import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./app.module.scss";
import headerStyles from "./components/header/header.module.scss"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkPage from "./pages/workPage/workPage";
import MainPage from "./pages/mainPage/mainPage";
import TechPage from "./pages/techPage/techPage";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const mainRef = useRef(null);
    const techRef = useRef(null);
    const workRef = useRef(null);

    useEffect(() => {
        const waitFunction = () => {
            const randomNum = Math.random() * (3 - 2) + 2;
            setTimeout(() => setIsLoading(false), randomNum * 1000);
        };
        waitFunction();
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const pages = gsap.utils.toArray<HTMLElement>(`.${styles.page}`);

        const pageHeaderIn = (header: HTMLElement) => {
            gsap.to(header, {
                height: "50px",
                fontSize: "30px",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top top", // 헤더가 화면 하단에 도달하면 시작
                    end: "top bottom", // 헤더가 화면 상단에 도달하고 조금 더 스크롤될 때까지
                    scrub: true,
                }
            });
        }

        const fadeOut = (page: HTMLElement) => {
            gsap.to(page, {
                scale: 0.6,
                opacity: 0.3,
                filter: "blur(5px)",
                ease: "none",
                scrollTrigger: {
                    trigger: page,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                }
            });
        }

        const fadeIn = (pages: HTMLElement[], index: number) => {
            gsap.from(pages[index + 1], {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: pages[index + 1],
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                }
            });

            gsap.to(pages[index + 1], {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                scrollTrigger: {
                    trigger: pages[index + 1],
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                }
            });

            // 헤더 애니메이션 트리거
            ScrollTrigger.create({
                trigger: pages[index + 1],
                start: "top bottom", // 페이지가 화면 하단에 보이기 시작할 때
                onEnter: () => {
                    const header = pages[index + 1].querySelector(`.${headerStyles.headerCon}`);
                    if (header) {
                        pageHeaderIn(header as HTMLElement);
                    }
                }
            });
        }

        if (pages.length > 0) {
            pages.forEach((page, index) => {
                if (index < pages.length - 1) {
                    fadeOut(page);
                    fadeIn(pages, index);
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className={styles.container}>
            <div ref={mainRef} className={`${styles.page} ${styles.mainPage}`}>
                <MainPage />
            </div>
            <div ref={techRef} className={`${styles.page} ${styles.techPage}`}>
                <TechPage />
            </div>
            <div ref={workRef} className={`${styles.page} ${styles.workPage}`}>
                <WorkPage />
            </div>
        </div>
    );
}

export default App;