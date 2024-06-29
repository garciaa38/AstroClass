import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedbackToClassThunk } from "../../redux/classes";

function FeedbackForm({classId, setAddFeedbackFormAppear, handleFeedbackUpdate}) {
    const dispatch = useDispatch()
    const [feedbackType, setFeedbackType] = useState("");
    const [pointsLost, setPointsLost] = useState(-1);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <label>
                <input
                    type="number"
                    placeholder="points lost"
                    value={pointsLost}
                    onChange={(e) => setPointsLost(e.target.value)}
                    min="-10"
                    max="1"
                    required
                />
            </label>
            <button type="submit">Add Class Feedback</button>
        </form>
    </>
    )
}

export default FeedbackForm;