import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./app.module.scss";
import headerStyles from "./components/header/header.module.scss";
import pageLineStyles from "./components/pageLine/pagesLine.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkPage from "./pages/workPage/workPage";
import MainPage from "./pages/mainPage/mainPage";
import AboutPage from "./pages/aboutPage/aboutPage";
import TechPage from "./pages/techPage/techPage";
import { Suspense } from "react";

function App() {
    const containerRef = useRef(null);
    const mainRef = useRef(null);
    const techRef = useRef(null);
    const workRef = useRef(null);
    const aboutRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false); // Suspense가 끝났는지 추적

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => {
                initializeAnimations();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoaded]);

    const initializeAnimations = () => {
        gsap.registerPlugin(ScrollTrigger);
        const pages = gsap.utils.toArray<HTMLElement>(`.${styles.page}`);

        if (!pages.length) {
            console.warn('No pages found');
            return;
        }

        const pageHeaderIn = (header: HTMLElement, page: HTMLElement, pageLine: HTMLElement) => {
            gsap.to(header, {
                height: "50px",
                fontSize: "30px",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: page,
                    start: "top center-=200",
                    end: "top top",
                    scrub: true,
                }
            });
            gsap.to(pageLine, {
                left: "50px",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: page,
                    start: "top center-=200",
                    end: "top top",
                    scrub: true,
                }
            });
        };

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
        };

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

            ScrollTrigger.create({
                trigger: pages[index + 1],
                start: "top bottom",
                onEnter: () => {
                    const header = pages[index + 1].querySelector(`.${headerStyles.headerCon}`);
                    const pageLine = pages[index + 1].querySelector(`.${pageLineStyles.line}`);
                    if (header && pageLine) {
                        pageHeaderIn(header as HTMLElement, pages[index + 1], pageLine as HTMLElement);
                    }
                }
            });
        };

        pages.forEach((page, index) => {
            if (index < pages.length - 1) {
                fadeOut(page);
                fadeIn(pages, index);
            }
        });
    };

    return (
        <Suspense fallback={<div className={styles.loadingPage}><p>Loading..</p></div>}>
            <div
                ref={containerRef}
                className={styles.container}
                onLoad={() => setIsLoaded(true)} // Suspense가 끝나면 isLoaded를 true로 설정
            >
                <div ref={mainRef} className={`${styles.page} ${styles.mainPage}`}>
                    <MainPage />
                </div>
                <div ref={aboutRef} className={`${styles.page} ${styles.aboutPage}`}>
                    <AboutPage />
                </div>
                <div ref={techRef} className={`${styles.page} ${styles.techPage}`}>
                    <TechPage />
                </div>
                <div ref={workRef} className={`${styles.page} ${styles.workPage}`}>
                    <WorkPage />
                </div>
            </div>
        </Suspense>
    );
}

export default App;
