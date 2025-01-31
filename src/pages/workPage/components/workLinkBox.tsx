import styles from "./workLinkBox.module.scss"
import githubLogo from "../../../assets/image/icons8-github의.svg"

type Props = {
    workLinks: Array<string>
}

export default function WorkLinkBox({workLinks}: Props) {
    return(
        <div className={styles.container}>
            <p>-</p>
            <img src={githubLogo} height={15} width={15} alt="github"/>
            {workLinks.map((item) => (
                <a className={styles.itemP} href={item}>github</a>
            ))}
        </div>
    )
}