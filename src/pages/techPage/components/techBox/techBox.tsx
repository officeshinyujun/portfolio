import styles from "./techBox.module.scss"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import folderImage from "../../../../assets/image/folder.svg";

type Props = {
    text: string;
    children?: React.ReactNode;
}

export default function TechBox({ text, children }: Props) {
    const [blockOpen, setBlockOpen] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => setBlockOpen(prev => !prev)}>
                    <img src={folderImage} alt="folder" />
                </button>
                <p>{text}</p>
            </div>

            <AnimatePresence>
                {blockOpen && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}  // Initial state
                        animate={{ opacity: 1, height: "auto" }} // Animate to full height and visible
                        exit={{ opacity: 0, height: 0 }} // Animate back to hidden
                        transition={{ duration: 0.3 }} // Duration of the transition
                        className={styles.languageBox}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
