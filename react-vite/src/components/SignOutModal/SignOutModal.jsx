import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useModal } from "../../context/Modal";
import styles from "./SignOutModal.module.css";

function SignOutModal({navigate}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSignOut = async (e) => {
        e.preventDefault();
        await dispatch(thunkLogout())
        navigate('/')
        // window.location.href = '/';
        closeModal();
    };

    return (
        <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle}>Sure you want to leave?</h2>
            <div className={styles.buttonContainer}>
                <button onClick={handleSignOut} className={styles.modalButton}>Yes</button>
                <button onClick={closeModal} className={`${styles.modalButton} ${styles.cancelButton}`}>No</button>
            </div>
        </div>
    );
}

export default SignOutModal;