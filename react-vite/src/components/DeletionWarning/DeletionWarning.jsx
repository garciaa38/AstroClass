import styles from './DeletionWarning.module.css';

function DeletionWarning() {
    return (
        <div className={styles.deleteLayout}>
            <h1>Are you sure you want to delete this?</h1>
        </div>
    )
}

export default DeletionWarning;