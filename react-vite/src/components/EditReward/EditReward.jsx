import { useState } from "react";
import { editRewardThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { deleteRewardThunk } from "../../redux/classes";
import { socket } from "../../socket";
import styles from './EditReward.module.css';

function EditReward({reward, classId, handleRewardDelete, setFormErrors}) {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false);
    const [rewardType, setRewardType] = useState(reward.reward_type);
    const [pointsEarned, setPointsEarned] = useState(reward.points);

    const stringTrim = (string) => {
        if (string.trim().length === 0) {
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        setFormErrors({});

        if (stringTrim(rewardType)) {
            if (rewardType.length > 20 || rewardType.length < 3) {
                errors.rewardType = "Reward Type must be between 3 and 20 characters."
            }
        } else {
            errors.rewardType = "Reward Type must be between 3 and 20 characters."
        }

        if (pointsEarned < 1 || pointsEarned > 10) {
            errors.pointsEarned = "Can only set between 1 and 10 points per reward."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const updatedReward = {
            id: reward.id,
            reward_type: rewardType,
            points: pointsEarned,
            classId
        }

        reward.reward_type = rewardType
        reward.points = Number(pointsEarned)
        socket.emit('updateClass', { room: classId })
        await dispatch(editRewardThunk(updatedReward))

        await setIsEditing(false)

    }

    const deleteReward = async () => {

        const clsId = {
            classId
        }

        await dispatch(deleteRewardThunk(reward.id, clsId))
        socket.emit('updateClass', { room: classId })
        await handleRewardDelete(reward)

    }

    const stopEditing = async () => {
        setRewardType(reward.reward_type)
        setPointsEarned(reward.points)
        setFormErrors({});
        setIsEditing(false);
    }

    if (!isEditing) {
        return (
            <div className={styles.editRewardButton}>
                <button onClick={() => setIsEditing(true)}>{rewardType} {pointsEarned}</button>
            </div>
        )
    } else {
        return (
            <div className={styles.editReward}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.rewardFormInput}>
                        <div>
                            <label className={styles.rewardNameInput}>
                                <input
                                    type="text"
                                    placeholder="Enter Reward Type"
                                    value={rewardType}
                                    onChange={(e) => setRewardType(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className={styles.rewardPointsInput}>
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
                        </div>
                    </div>
                    <div className={styles.rewardFormButtons}>
                        <button type="submit">Save</button>
                        <button onClick={() => deleteReward()}>Delete</button>
                        <button onClick={() => stopEditing()}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditReward;