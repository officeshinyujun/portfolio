import styles from "./workFocusBox.module.scss"
import {Canvas, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import testImage from "../../../assets/image/dat-profile.jpg"
import {OrbitControls} from "@react-three/drei";
import ThreeGrid from "../../../components/threeGrid.tsx";
import { NearestFilter, LinearMipMapLinearFilter } from "three";
import fresioImage from "../../../assets/image/fresio-main.jpg"
import WorkThreeModel from "./workThreeModel.tsx";
import {useEffect} from "react";


type Project = {
    title: string,
    text: string,
    styles : {
        boxShadow: string,
        background: string,
    }
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
                <div className={styles.contents} style={{background:selectedProject.styles.background}}>
                    <div>
                        <p>{selectedProject.title}</p>
                        <p>{selectedProject.text}</p>
                    </div>
                    <div className={styles.threeContainer}>
                        <Canvas>
                            <ambientLight intensity={3}/>
                            <WorkThreeModel image={testImage} position={[10,10,-1]} width={96} height={54}/>
                            <WorkThreeModel image={testImage} position={[-10,-10,1]}/>
                            <OrbitControls />
                            <ThreeGrid/>
                        </Canvas>
                    </div>
                </div>
            )}

        </div>
    )
}