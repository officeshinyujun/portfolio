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
// import { motion } from "framer-motion";
import Header from "../../components/header/header.tsx";

export default function TechPage() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [opacity, setOpacity] = useState(0.8);

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
            <Header contextLink={"/sixBox_.glb"} title="stack"/>
            <div className={styles.contents}>
                <TechBox text="language">
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(0)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={jsLogo} alt="jsLogo"/>
                        {/*{hoveredIndex === 0 && (*/}
                        {/*    <motion.div*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        style={{background: "#f0db4f"}}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        리액트와 기초적인 문법등을 구사할 수 있습니다.*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(1)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={tsLogo} alt="tsLogo"/>
                        {/*{hoveredIndex === 1 && (*/}
                        {/*    <motion.div*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        style={{background: "#007acc"}}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        리액트와 기초적인 문법등을 구사할 수 있습니다.*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={cLogo} alt="cLogo"/>
                        {/*{hoveredIndex === 2 && (*/}
                        {/*    <motion.div*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        style={{background: "#004482"}}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        ps용*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(3)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={pythonLogo} alt="pythonLogo"/>
                        {/*{hoveredIndex === 3 && (*/}
                        {/*    <motion.div*/}
                        {/*        style={{background: "#ffd444"}}*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        ps용*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                </TechBox>
                <TechBox text="frameWork & library">
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(4)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={reactLogo} alt="jsLogo"/>
                        {/*{hoveredIndex === 4 && (*/}
                        {/*    <motion.div*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        style={{background: "#f0db4f"}}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        리액트와 기초적인 문법등을 구사할 수 있습니다.*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(5)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={rnLogo} alt="tsLogo"/>
                        {/*{hoveredIndex === 5 && (*/}
                        {/*    <motion.div*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        style={{background: "#007acc"}}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        리액트와 기초적인 문법등을 구사할 수 있습니다.*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(6)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={nestLogo} alt="cLogo"/>
                        {/*{hoveredIndex === 6 && (*/}
                        {/*    <motion.div*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        style={{background: "#004482"}}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        ps용*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(7)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={sassLogo} alt="pythonLogo"/>
                        {/*{hoveredIndex === 7 && (*/}
                        {/*    <motion.div*/}
                        {/*        style={{background: "#ffd444"}}*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        ps용*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                </TechBox>
                <TechBox text="other">
                    <div
                        className={styles.imageDiv}
                        onMouseEnter={() => handleMouseEnter(8)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={electronLogo} alt="pythonLogo"/>
                        {/*{hoveredIndex === 7 && (*/}
                        {/*    <motion.div*/}
                        {/*        style={{background: "#ffd444"}}*/}
                        {/*        className={styles.explanationBox}*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{duration: 0.3}}*/}
                        {/*    >*/}
                        {/*        ps용*/}
                        {/*    </motion.div>*/}
                        {/*)}*/}
                    </div>
                </TechBox>
            </div>
        </div>
    );
}
