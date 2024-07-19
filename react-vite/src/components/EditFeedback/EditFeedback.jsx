import { useState } from "react";
import { editFeedbackThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { deleteFeedbackThunk } from "../../redux/classes";
import { socket } from "../../socket";
import styles from './EditFeedback.module.css';

function EditFeedback({feedback, classId, handleFeedbackDelete, setFormErrors, setErrors}) {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false);
    const [feedbackType, setFeedbackType] = useState(feedback.feedback_type);
    const [pointsLost, setPointsLost] = useState(feedback.points);


    console.log("EDIT FEEDBACK", feedback)

    const stringTrim = (string) => {
        if (string.trim().length === 0) {
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = {};
        setFormErrors({});
        setErrors({});

        if (stringTrim(feedbackType)) {
            if (feedbackType.length > 20 || feedbackType.length < 3) {
                errors.feedbackType = "Reward Type must be between 3 and 20 characters."
            }
        } else {
            errors.feedbackType = "Feedback Type must be between 3 and 20 characters."
        }

        if (pointsLost >= 0 || pointsLost < -10) {
            errors.pointsLost = "Can only set between -1 and -10 points per feedback."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const updatedFeedback = {
            id: feedback.id,
            feedback_type: feedbackType,
            points: pointsLost,
            classId
        }

        const serverResponse = await dispatch(editFeedbackThunk(updatedFeedback))
        
        if (serverResponse?.error) {
            if (serverResponse?.error === 'Cannot have more than one of the same feedback type.') {
                const backEndErrors = {};
                backEndErrors.feedbackType = serverResponse?.error;
                setErrors(backEndErrors);
            } else {
                const backEndErrors = {};
                backEndErrors.pointsLost = serverResponse?.error;
                setErrors(backEndErrors);
            }
        } else {
            socket.emit('updateClass', { room: classId })
            feedback.reward_type = feedbackType
            feedback.points = Number(pointsLost)
            await setIsEditing(false)
        }

    }

    const deleteFeedback = async () => {

        const clsId = {
            classId
        }

        await dispatch(deleteFeedbackThunk(feedback.id, clsId))
        socket.emit('updateClass', { room: classId })
        await handleFeedbackDelete(feedback)

    }

    const stopEditing = async () => {
        setFeedbackType(feedback.feedback_type);
        setPointsLost(feedback.points);
        setFormErrors({});
        setIsEditing(false);
    }

    if (!isEditing) {
        return (
            <div className={styles.editRewardButton}>
                <button onClick={() => setIsEditing(true)}>{feedbackType} {pointsLost}</button>
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
                                    placeholder="Enter Feedback Type"
                                    value={feedbackType}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className={styles.rewardPointsInput}>
                                <input
                                    type="number"
                                    placeholder="Points Lost"
                                    value={pointsLost}
                                    onChange={(e) => setPointsLost(e.target.value)}
                                    required
                                    max="-1"
                                    min="-10"
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.rewardFormButtons}>
                        <button type="submit">Save</button>
                        <button onClick={() => deleteFeedback()}>Delete</button>
                        <button onClick={() => stopEditing()}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditFeedback;