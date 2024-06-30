import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedbackToClassThunk } from "../../redux/classes";

function FeedbackForm({classId, setAddFeedbackFormAppear, handleFeedbackUpdate}) {
    const dispatch = useDispatch()
    const [feedbackType, setFeedbackType] = useState("");
    const [pointsLost, setPointsLost] = useState(-1);
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        const newFeedback = {
            feedback_type: feedbackType,
            points: pointsLost
        }

        const serverResponse = await dispatch(addFeedbackToClassThunk(classId, newFeedback))

        handleFeedbackUpdate(serverResponse)

        setAddFeedbackFormAppear(false);
    }

    return (
        <>
        <h1>Add feedback here.</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    value={feedbackType}
                    placeholder="Type of Feedback"
                    onChange={(e) => setFeedbackType(e.target.value)}
                    required
                />
            </label>
            {formErrors.feedbackType && <p>{formErrors.feedbackType}</p>}
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
            {formErrors.pointsLost && <p>{formErrors.pointsLost}</p>}
            <button type="submit">Add Class Feedback</button>
        </form>
    </>
    )
}

export default FeedbackForm;