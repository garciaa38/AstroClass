import { addPointsToStudentThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";
import styles from './AddReward.module.css';


function AddReward({first_name, rewards, student_class_id, classId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    console.log("CLASS ID", classId)


    const addPoints = async (student_class_id, rewardId, classId, points) => {
        closeModal()
        await dispatch(addPointsToStudentThunk(student_class_id, rewardId))
        socket.emit('updateStudentClass', { room: classId, points: points})
        socket.emit('updateClass', { room: classId, points: points })
    }

    return (
            <div className={styles.rewardGrid}>
                {rewards.map(reward => {
                    return (
                        <div key={reward.id}>
                            <button className={styles.addRewardButton} onClick={() => addPoints(student_class_id, reward.id, classId, reward.points)}>{reward.reward_type} {reward.points}</button>
                        </div>
                    )
                })}
                
            </div>
    )
}

export default AddReward;