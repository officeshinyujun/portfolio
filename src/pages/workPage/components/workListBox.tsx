import styles from "./workListBox.module.scss";
import { useRef } from "react";
import gsap from "gsap";

type Project = {
    title: string;
    slogan: string;
    styles: {
        boxShadow: string;
    };
};

type Props = {
    project: Project;
    selectedFunction: (project: Project) => void; // 함수 타입 지정
};

export default function WorkListBox({ project, selectedFunction }: Props) {
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
            border: "1px solid #1f1f1f",
            duration: 0.7,
        });
    };

    return (
        <div
            ref={containerRef}
            className={styles.container}
            onMouseEnter={handleHoverContainer}
            onMouseLeave={handleHoverOutContainer}
            onClick={() => selectedFunction(project)} // 수정
        >
            <div>
                <p>{project.title}</p>
                <p>{project.slogan}</p>
            </div>
            <div className={styles.workImage}></div>
        </div>
    );
}
