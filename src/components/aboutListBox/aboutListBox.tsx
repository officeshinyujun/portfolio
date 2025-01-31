import styles from "./aboutListBox.module.scss"

type Props = {
    title: string;
    contents: Array<string>;
}

export default function AboutListBox({title, contents}: Props) {
    return(
        <div>
            <p className={styles.title}>@ {title}</p>
            {contents.map((item) => (
                <p className={styles.experimentText}>- {item}</p>
            ))}
        </div>
    )
}