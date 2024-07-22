import styles from './DeadLinkPage.module.css';
import { Link } from 'react-router-dom';

function DeadLinkPage() {
    return (
        <div className={styles.deadLinkLayout}>
            <h1>{"Looks like you're drifting into space."}</h1>
            <h2><Link className={styles.deadLinkLink} to="/classes">Click here</Link> to get back into orbit.</h2>
        </div>
    )
}

export default DeadLinkPage;