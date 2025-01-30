import styles from "./workFocusBox.module.scss"

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
    return (
        <div className={styles.container}>
            {!selectedProject ? (
                <span style={{fontSize: "25px"}}>
                    왼쪽의 박스를 클릭해보세요!
                </span>
            ) : (
                <div className={styles.contents} style={{background:selectedProject.styles.background}}>
                    <p>{selectedProject.title}</p>
                    <p>{selectedProject.text}</p>
                </div>
            )}

        </div>
    )
}