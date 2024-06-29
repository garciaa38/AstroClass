import { useState } from "react";
import { editFeedbackThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { deleteFeedbackThunk } from "../../redux/classes";

function EditFeedback({feedback, classId, handleFeedbackDelete}) {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false);
    const [feedbackType, setFeedbackType] = useState(feedback.feedback_type);
    const [pointsLost, setPointsLost] = useState(feedback.points);

    console.log("EDIT FEEDBACK", feedback)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedFeedback = {
            id: feedback.id,
            feedback_type: feedbackType,
            points: pointsLost,
            classId
        }

        feedback.reward_type = feedbackType
        feedback.points = Number(pointsLost)

        await dispatch(editFeedbackThunk(updatedFeedback))

        await setIsEditing(false)

    }

    const deleteFeedback = async () => {

        const clsId = {
            classId
        }

        await dispatch(deleteFeedbackThunk(feedback.id, clsId))

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
                    <button type="submit">Save</button>
                </form>
                    <button onClick={() => deleteFeedback()}>Delete</button>
                    <button onClick={() => stopEditing()}>Cancel</button>
            </div>
        )
    }
}

export default EditFeedback;