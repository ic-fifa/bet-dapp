import { Spin } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
export const Loading = () => {
    return (
        <div className={styles.wrap}>
            <Spin size="large" />
        </div>
    )
}