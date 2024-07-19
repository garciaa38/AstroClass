import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedbackToClassThunk } from "../../redux/classes";
import { socket } from "../../socket";
import styles from './FeedbackForm.module.css'

function FeedbackForm({classId, setAddFeedbackFormAppear, handleFeedbackUpdate}) {
    const dispatch = useDispatch()
    const [feedbackType, setFeedbackType] = useState("");
    const [pointsLost, setPointsLost] = useState(-1);
    const [formErrors, setFormErrors] = useState({});
    const [errors, setErrors] = useState({});

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
        setErrors({});

        if (stringTrim(feedbackType)) {
            if (feedbackType.length > 20 || feedbackType.length < 3) {
                errors.feedbackType = "Feedback Type must be between 3 and 20 characters."
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

        const newFeedback = {
            feedback_type: feedbackType,
            points: pointsLost
        }

        const serverResponse = await dispatch(addFeedbackToClassThunk(classId, newFeedback))
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
            handleFeedbackUpdate(serverResponse)
            setAddFeedbackFormAppear(false);
        }
        
    }

    return (
        <div className={styles.addRewardField}>
            <div className={styles.addRewardForm}>
                <h1>Add feedback here.</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.addRewardInput}>
                        <div className={styles.formInput}>
                            <label>
                                <input
                                    type="text"
                                    value={feedbackType}
                                    placeholder="Type of Feedback"
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    required
                                />
                            </label>
                            {formErrors.feedbackType && <p className="error">{formErrors.feedbackType}</p>}
                            {errors.feedbackType && <p className="error">{errors.feedbackType}</p>}
                        </div>
                        <label>
                            <input
                                type="number"
                                placeholder="points lost"
                                value={pointsLost}
                                onChange={(e) => setPointsLost(e.target.value)}
                                min="-10"
                                max="-1"
                                required
                            />
                        </label>
                        {formErrors.pointsLost && <p className="error">{formErrors.pointsLost}</p>}
                        {errors.pointsLost && <p className="error">{errors.pointsLost}</p>}
                    </div>
                    <div className={styles.addRewardButtons}>
                        <button type="submit">Add Class Feedback</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FeedbackForm;