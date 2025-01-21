import styles from "./techPage.module.scss";
// import { Canvas } from "@react-three/fiber";
import { useState, useRef ,useEffect} from "react";
import TechBox from "./components/techBox/techBox.tsx";
import jsLogo from "../../assets/image/logo-javascript.svg";
import cLogo from "../../assets/image/c-1.svg";
import tsLogo from "../../assets/image/typescript.svg";
import pythonLogo from "../../assets/image/python-5.svg";
import sassLogo from "../../assets/image/sass-1.svg";
import nestLogo from "../../assets/image/nestjs.svg"
import reactLogo from "../../assets/image/react-2.svg";
import rnLogo from "../../assets/image/react-native-1.svg"
import electronLogo from "../../assets/electron-svgrepo-com(1).svg"
import {pagesProps} from "../../feature/pagesProps.tsx";
import { motion } from "framer-motion";
import Header from "../../components/header/header.tsx";

export default function TechPage() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [opacity, setOpacity] = useState(0.8);
    const headerRef = useRef(null); // Header 참조 생성

    const handleMouseEnter = (index : any) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div
            className={styles.container}
        >
            <Header title="stack" ref={headerRef}/>
            <div className={styles.contents}>
                {/*.*/}
            </div>
        </div>
    );
}
