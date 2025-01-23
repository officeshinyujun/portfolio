import styles from "./workListBox.module.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Project = {
    title: string;
    text: string;
    styles: {
        boxShadow: string;
    };
};

type Props = {
    project: Project;
};

export default function WorkListBox({ project }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleHoverContainer = () => {
        if (project.styles?.boxShadow) {
            gsap.to(containerRef.current, {
                scale: 1.05,
                border: `1px solid ${project.styles.boxShadow}`,
                duration: 0.7,
            });
        }
    };

    const handleHoverOutContainer = () => {
        gsap.to(containerRef.current, {
            scale: 1,
            border: "1px solid #474747",
            duration: 0.7,
        });
    };

    return (
        <div
            ref={containerRef}
            className={styles.container}
            onMouseEnter={handleHoverContainer}
            onMouseLeave={handleHoverOutContainer}
        >
            <div>
                <p>{project.title}</p>
                <p>{project.text}</p>
            </div>
            <div className={styles.workImage}></div>
        </div>
    );
}
