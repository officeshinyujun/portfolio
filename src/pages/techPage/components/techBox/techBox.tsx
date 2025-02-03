import styles from "./techBox.module.scss"

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
