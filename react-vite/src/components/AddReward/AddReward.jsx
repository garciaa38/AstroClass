import { addPointsToStudentThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";


function AddReward({first_name, rewards, student_class_id, classId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    console.log("CLASS ID", classId)


    const addPoints = async (student_class_id, rewardId, classId) => {
        closeModal()
        await dispatch(addPointsToStudentThunk(student_class_id, rewardId))
        socket.emit('updateClass', { room: classId })
    }

    return (
            <>
                <h3>Reward {first_name}</h3>
                {rewards.map(reward => {
                    console.log('REWARD', reward)
                    return (
                        <div key={reward.id}>
                            <button onClick={() => addPoints(student_class_id, reward.id, classId)}>{reward.reward_type} {reward.points}</button>
                        </div>
                    )
                })}
                
            </>
    )
}

export default AddReward;