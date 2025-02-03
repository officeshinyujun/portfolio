import styles from "./header.module.scss";
import { forwardRef } from 'react';

type props = {
    title: string
}

const Header = forwardRef<HTMLDivElement, props>(({ title }, ref) => {
    return (
        <div className={styles.headerCon} ref={ref}>
            <p>{title}</p>
        </div>
    )
});

export default Header;