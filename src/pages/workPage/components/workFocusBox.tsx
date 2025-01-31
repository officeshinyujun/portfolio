import styles from "./workFocusBox.module.scss"
import {Canvas, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import testImage from "../../../assets/image/dat-profile.jpg"
import {OrbitControls} from "@react-three/drei";
import ThreeGrid from "../../../components/threeGrid.tsx";
import { NearestFilter, LinearMipMapLinearFilter } from "three";
import fresioImage from "../../../assets/image/asdfasdfasdfasdf.png"
import {useEffect} from "react";
import AboutListBox from "../../../components/aboutListBox/aboutListBox.tsx";
import WorkLinkBox from "./workLinkBox.tsx";


type Project = {
    title: string,
    styles : {
        boxShadow: string,
    },
    image : any,
    explanation: Array<string>,
    links: Array<string>
}

type Props = {
    selectedProject: Project
}

export default function WorkFocusBox({selectedProject}: Props) {
    const testMap = useLoader(TextureLoader, testImage);
    testMap.magFilter = NearestFilter; // 확대 시 선명하게
    testMap.minFilter = LinearMipMapLinearFilter; // 축소 시 품질 유지
    const fresioMap = useLoader(TextureLoader,fresioImage);

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