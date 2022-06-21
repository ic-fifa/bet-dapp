import * as styles from './index.module.less';
export const Loading = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles['loading-border']}>
                <span className={styles['loading-text']}>loading</span>
            </div>
        </div>
    )
}