import { removePointsFromStudentThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";
import styles from "./AddFeedback.module.css";

function AddFeedback({first_name, feedback, student_class_id, classId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const removePoints = async (student_class_id, rewardId, classId) => {
        closeModal()
        await dispatch(removePointsFromStudentThunk(student_class_id, rewardId))
        socket.emit('updateClass', { room: classId})
    }

    return (
            <div className={styles.rewardGrid}>
                {feedback.map(feedback => {
                    return (
                        <div key={feedback.id}>
                            <button className={styles.addRewardButton} onClick={() => removePoints(student_class_id, feedback.id, classId)}>{feedback.feedback_type} {feedback.points}</button>
                        </div>
                    )
                })}
                
            </div>
    )
}

export default AddFeedback;