
    import React, { useRef, useEffect, useState } from "react";
    import { gsap } from "gsap";
    import styles from "./app.module.scss";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import WorkPage from "./pages/workPage/workPage.tsx";
    import MainPage from "./pages/mainPage/mainPage.tsx";
    import TechPage from "./pages/techPage/techPage.tsx";

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
            const pages = gsap.utils.toArray(`.${styles.page}`);
            const mainPage = gsap.utils.toArray(`.${styles.mainPage}`);
            const techPage = gsap.utils.toArray(`.${styles.techPage}`);

            const fadeOut = (page: HTMLElement) => {
                gsap.to(page, {
                    scale: 0.6,
                    opacity: 0.3,
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

            const fadeIn = (pages: HTMLElement, index:number) => {
                gsap.from(pages[index + 1], {
                    scale: 1,
                    opacity: 0.8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: pages[index + 1],
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                });
            }


            if (pages.length > 0) {
                pages.forEach((page, index) => {
                    if (index < pages.length - 1) {
                        // 현재 페이지 fadeOut 애니메이션
                        fadeOut(page);
                        // 다음 페이지 fadeIn 애니메이션
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
                <div ref={techRef} className={`${styles.page} ${styles.techPage}`} style={{opacity: 0.8
                }}>
                    <TechPage />
                </div>
                <div ref={workRef} className={`${styles.page} ${styles.workPage}`} style={{opacity: 0.8}}>

                    <WorkPage />
                </div>
            </div>
        );
    }

    export default App;
