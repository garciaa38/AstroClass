import { useState } from "react";
import { editFeedbackThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { deleteFeedbackThunk } from "../../redux/classes";
import { socket } from "../../socket";

function EditFeedback({feedback, classId, handleFeedbackDelete}) {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false);
    const [feedbackType, setFeedbackType] = useState(feedback.feedback_type);
    const [pointsLost, setPointsLost] = useState(feedback.points);
    const [formErrors, setFormErrors] = useState({});


    console.log("EDIT FEEDBACK", feedback)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = {};
        setFormErrors({});

        if (feedbackType.length > 20 || feedbackType.length < 3) {
            errors.feedbackType = "Reward Type must be between 3 and 20 characters."
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

        feedback.reward_type = feedbackType
        feedback.points = Number(pointsLost)
        socket.emit('updateClass', { room: classId })
        await dispatch(editFeedbackThunk(updatedFeedback))

        await setIsEditing(false)

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
        setFeedbackType(feedback.feedback_type)
        setPointsLost(feedback.points)
        setIsEditing(false);
    }

    if (!isEditing) {
        return (
            <div>
                <button onClick={() => setIsEditing(true)}>{feedbackType} {pointsLost}</button>
            </div>
        )
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter Feedback Type"
                            value={feedbackType}
                            onChange={(e) => setFeedbackType(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.feedbackType && <p>{formErrors.feedbackType}</p>}
                    <label>
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
                    {formErrors.pointsLost && <p>{formErrors.pointsLost}</p>}
                    <button type="submit">Save</button>
                </form>
                    <button onClick={() => deleteFeedback()}>Delete</button>
                    <button onClick={() => stopEditing()}>Cancel</button>
            </div>
        )
    }
}

export default EditFeedback;