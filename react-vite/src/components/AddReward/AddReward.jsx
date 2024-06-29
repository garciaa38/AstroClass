import { addPointsToStudentThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


function AddReward({first_name, rewards, student_class_id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()


    const addPoints = async (student_class_id, rewardId) => {
        await dispatch(addPointsToStudentThunk(student_class_id, rewardId))
        closeModal()
    }

    return (
            <>
                <h3>Reward {first_name}</h3>
                {rewards.map(reward => {
                    return (
                        <div key={reward.id}>
                            <button onClick={() => addPoints(student_class_id, reward.id)}>{reward.reward_type} {reward.points}</button>
                        </div>
                    )
                })}
                
            </>
    )
}

export default AddReward;