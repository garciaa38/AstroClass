import styles from "./ClassCodeModal.module.css";

function ClassCodeModal({classCode}) {
    return (
        <div className={styles.classCodeLayout}>
            <h1>{`Enter this code to join your teacher's class!`}</h1>
            <h1 className={styles.classCode}>{`${classCode}`}</h1>
        </div>
    )
}

export default ClassCodeModal