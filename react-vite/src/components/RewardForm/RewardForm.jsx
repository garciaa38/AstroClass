import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRewardToClassThunk } from "../../redux/classes";

function RewardForm({classId, setAddRewardFormAppear, handleRewardUpdate}) {
    const dispatch = useDispatch()
    const [rewardType, setRewardType] = useState("");
    const [pointsEarned, setPointsEarned] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReward = {
            reward_type: rewardType,
            points: pointsEarned
        }

        const serverResponse = await dispatch(addRewardToClassThunk(classId, newReward))

        handleRewardUpdate(serverResponse)

        setAddRewardFormAppear(false);
    }

    return (
        <>
        <h1>Add a reward here.</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    value={rewardType}
                    placeholder="Type of Reward"
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
                    min="1"
                    max="10"
                    required
                />
            </label>
            <button type="submit">Add Class Reward</button>
        </form>
    </>
    )
}

export default RewardForm;