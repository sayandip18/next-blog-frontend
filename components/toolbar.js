import {useRouter} from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const ToolBar = () => {
    const router = useRouter();

    return(
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => window.location.href = 'https://twitter.com/sayandip999'}>Twitter</div>
            <div onClick={() => window.location.href = 'https://github.com/sayandip18'}>GitHub</div>
        </div>
    )
}