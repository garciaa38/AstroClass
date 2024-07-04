import { addPointsToStudentThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";


function AddReward({first_name, rewards, student_class_id, classId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const addPoints = async (student_class_id, rewardId, points, classId) => {
        await dispatch(addPointsToStudentThunk(student_class_id, rewardId))
        socket.emit('addPoints', {points: points, student: student_class_id, room: classId})
        console.log("SOCKET fetched")
        closeModal()
    }

    return (
            <>
                <h3>Reward {first_name}</h3>
                {rewards.map(reward => {
                    console.log('REWARD', reward)
                    return (
                        <div key={reward.id}>
                            <button onClick={() => addPoints(student_class_id, reward.id, reward.points, classId)}>{reward.reward_type} {reward.points}</button>
                        </div>
                    )
                })}
                
            </>
    )
}

export default AddReward;