import { removePointsFromStudentThunk } from "../../redux/classes";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function AddFeedback({first_name, feedback, student_class_id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const removePoints = async (student_class_id, rewardId) => {
        await dispatch(removePointsFromStudentThunk(student_class_id, rewardId))
        closeModal()
    }

    return (
        <>
                <h3>Give feedback to {first_name}</h3>
                {feedback.map(feedback => {
                    return (
                        <div key={feedback.id}>
                            <button onClick={() => removePoints(student_class_id, feedback.id)}>{feedback.feedback_type} {feedback.points}</button>
                        </div>
                    )
                })}
                
            </>
    )
}

export default AddFeedback;