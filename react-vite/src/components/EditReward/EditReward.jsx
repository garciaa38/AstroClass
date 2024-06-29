import { useState } from "react";
import { editRewardThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { deleteRewardThunk } from "../../redux/classes";

function EditReward({reward, classId, handleRewardDelete}) {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false);
    const [rewardType, setRewardType] = useState(reward.reward_type);
    const [pointsEarned, setPointsEarned] = useState(reward.points);

    console.log("EDIT REWARD", reward)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedReward = {
            id: reward.id,
            reward_type: rewardType,
            points: pointsEarned,
            classId
        }

        reward.reward_type = rewardType
        reward.points = Number(pointsEarned)

        await dispatch(editRewardThunk(updatedReward))

        await setIsEditing(false)

    }

    const deleteReward = async () => {

        const clsId = {
            classId
        }

        await dispatch(deleteRewardThunk(reward.id, clsId))

        await handleRewardDelete(reward)

    }

    const stopEditing = async () => {
        setRewardType(reward.reward_type)
        setPointsEarned(reward.points)
        setIsEditing(false);
    }

    if (!isEditing) {
        return (
            <div>
                <button onClick={() => setIsEditing(true)}>{rewardType} {pointsEarned}</button>
            </div>
        )
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter Reward Type"
                            value={rewardType}
                            onChange={(e) => setRewardType(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder="Points Earned"
                            value={pointsEarned}
                            onChange={(e) => setPointsEarned(e.target.value)}
                            required
                            max="10"
                            min="1"
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
                    <button onClick={() => deleteReward()}>Delete</button>
                    <button onClick={() => stopEditing()}>Cancel</button>
            </div>
        )
    }
}

export default EditReward;