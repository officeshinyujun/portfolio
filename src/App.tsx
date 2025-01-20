
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

        // const fadeOut = (element: HTMLElement) =>{
        //     gsap.to(element, {
        //         scale:0.5,
        //         opacity: 0.6,
        //         duration: 5000,
        //         ease: 'power1.out',
        //     })
        // }


        if (pages.length > 0) {
            pages.forEach((page) => {
                ScrollTrigger.create({
                    trigger: page,
                    start: "top top",
                    pin: true,
                    pinSpacing: false,
                    markers: true,
                });
            });

            ScrollTrigger.create({
                snap: {
                    snapTo: 1 / (pages.length - 1),
                    duration: 0.5,
                    delay: 0,
                },
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
