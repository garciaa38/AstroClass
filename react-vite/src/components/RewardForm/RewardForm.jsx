import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRewardToClassThunk } from "../../redux/classes";
import { socket } from "../../socket";
import styles from './RewardForm.module.css'

function RewardForm({classId, setAddRewardFormAppear, handleRewardUpdate}) {
    const dispatch = useDispatch()
    const [rewardType, setRewardType] = useState("");
    const [pointsEarned, setPointsEarned] = useState(1);
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        setFormErrors({});

        if (rewardType.length > 20 || rewardType.length < 3) {
            errors.rewardType = "Reward Type must be between 3 and 20 characters."
        }

        if (pointsEarned < 1 || pointsEarned > 10) {
            errors.pointsEarned = "Can only set between 1 and 10 points per reward."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const newReward = {
            reward_type: rewardType,
            points: pointsEarned
        }

        const serverResponse = await dispatch(addRewardToClassThunk(classId, newReward))
        socket.emit('updateClass', { room: classId })
        handleRewardUpdate(serverResponse)

        setAddRewardFormAppear(false);
    }

    return (
        <div className={styles.addRewardField}>
            <div className={styles.addRewardForm}>
                <h1>Add a reward here.</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.addRewardInput}>
                        <label>
                            <input
                                type="text"
                                value={rewardType}
                                placeholder="Type of Reward"
                                onChange={(e) => setRewardType(e.target.value)}
                                required
                            />
                        </label>
                        {formErrors.rewardType && <p>{formErrors.rewardType}</p>}
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
                        {formErrors.pointsEarned && <p>{formErrors.pointsEarned}</p>}
                    </div>
                    <div className={styles.addRewardButtons}>
                        <button type="submit">Add Class Reward</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RewardForm;