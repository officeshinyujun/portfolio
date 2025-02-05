import styles from "./workFocusBox.module.scss"
import testImage from "../../../assets/image/dat-profile.jpg"
import {useEffect} from "react";
import WorkLinkBox from "./workLinkBox.tsx";


type Project = {
    title: string,
    styles: {
        boxShadow: string,
    },
    image: string,
    explanation: Array<string>,
    links: Array<string>
} | null  // Add null as possible type

type Props = {
    selectedProject: Project  // Now accepts null
}
export default function WorkFocusBox({selectedProject}: Props) {
    useEffect(() => {
        const img = new Image();
        img.src = testImage;
        img.onload = () => console.log(img.naturalHeight);
    }, []);

    return (
        <div className={styles.container}>
            {!selectedProject ? (
                <span style={{fontSize: "25px"}}>
                    왼쪽의 박스를 클릭해보세요!
                </span>
            ) : (
                <div className={styles.contents} style={{border : `1px solid ${selectedProject.styles.boxShadow}`}}>
                    <p className={styles.title}>{selectedProject.title}</p>
                    <div className={styles.imageContainer}>
                        <img src={selectedProject.image} alt="test" />
                    </div>
                    <div className={styles.explanationBox}>
                        {selectedProject.explanation.map((item) => (
                            <p className={styles.explanation}>- {item}</p>
                        ))}
                        <WorkLinkBox workLinks={selectedProject.links}/>
                    </div>
                </div>
            )}

        </div>
    )
}