import styles from "./techBox.module.scss"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import folderImage from "../../../../assets/image/folder.svg";

type Props = {
    text: string;
    children?: React.ReactNode;
}

export default function TechBox({ text, children }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>{text}</p>
            </div>
            {children}
        </div>
    );
}
