import { useState, useEffect } from "react"
import AddReward from "../AddReward/AddReward";
import AddFeedback from "../AddFeedback/AddFeedback";
import RewardForm from "../RewardForm/RewardForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRewardsThunk } from "../../redux/rewards";

function StudentInfoModal({student, classId, rewards, feedback}) {
    const dispatch = useDispatch()
    const {first_name, last_name, email, points, id: studentId} = student;
    const [addRewardFormAppear, setAddRewardFormAppear] = useState(false);
    const [addFeedbackFormAppear, setAddFeedbackFormAppear] = useState(false);
    const [editStudentInfoAppear, setEditStudentInfoAppear] = useState(false);

    if (!addRewardFormAppear && !addFeedbackFormAppear && !editStudentInfoAppear) {
        return (
            <>
                <h1>{`${first_name} ${last_name}`}</h1>
                <h2>{`Points: ${points}`}</h2>

                <AddReward first_name={first_name} rewards={rewards}/>
                <button onClick={() => setAddRewardFormAppear(true)}>Add a Reward</button>

                <AddFeedback first_name={first_name} feedback={feedback}/>
                <button onClick={() => setAddFeedbackFormAppear(true)}>Add Feedback</button>

                <button onClick={() => setEditStudentInfoAppear(true)}>{`Edit ${first_name}'s information.`}</button>
            </>
        )
    } else if (addRewardFormAppear) {
        return (
            <>
                <RewardForm classId={classId} setAddRewardFormAppear={setAddRewardFormAppear}/>
            </>
        )
    } else if (addFeedbackFormAppear) {
        return (
            <>
                Add some feedback here.
            </>
        )
    } else if (editStudentInfoAppear) {
        return (
            <>
                Edit student info here
            </>
        )
    }

}

export default StudentInfoModal;