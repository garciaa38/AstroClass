import { useState, useEffect } from "react"
import AddReward from "../AddReward/AddReward";
import AddFeedback from "../AddFeedback/AddFeedback";
import RewardForm from "../RewardForm/RewardForm";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import { useDispatch } from "react-redux";
import { fetchAllRewardsThunk } from "../../redux/rewards";
import { fetchAllFeedbackThunk } from "../../redux/feedback";

function StudentInfoModal({student, classId, rewards, feedback}) {
    const dispatch = useDispatch()
    const {first_name, last_name, email, points, id: studentId, student_class_id} = student;
    const [addRewardFormAppear, setAddRewardFormAppear] = useState(false);
    const [addFeedbackFormAppear, setAddFeedbackFormAppear] = useState(false);
    const [editStudentInfoAppear, setEditStudentInfoAppear] = useState(false);
    const [rewardsState, setRewardsState] = useState(rewards);
    const [feedbackState, setFeedbackState] = useState(feedback);

    console.log("ONE STUDENT", student)

    useEffect(() => {
        dispatch(fetchAllRewardsThunk(classId))
        dispatch(fetchAllFeedbackThunk(classId))
    }, [dispatch, classId])

    const handleRewardUpdate = (newReward) => {
        setRewardsState((prevRewards) => [...prevRewards, newReward]);
    }

    const handleFeedbackUpdate = (newFeedback) => {
        setFeedbackState((prevFeedback) => [...prevFeedback, newFeedback])
    }

    console.log("CLASS REWARDS", rewardsState)

    if (!addRewardFormAppear && !addFeedbackFormAppear && !editStudentInfoAppear) {
        return (
            <>
                <h1>{`${first_name} ${last_name}`}</h1>
                <h2>{`Points: ${points}`}</h2>

                <AddReward first_name={first_name} rewards={rewardsState} student_class_id={student_class_id}/>
                <button onClick={() => setAddRewardFormAppear(true)}>Add a Reward</button>

                <AddFeedback first_name={first_name} feedback={feedbackState} student_class_id={student_class_id}/>
                <button onClick={() => setAddFeedbackFormAppear(true)}>Add Feedback</button>

                <button onClick={() => setEditStudentInfoAppear(true)}>{`Edit ${first_name}'s information.`}</button>
            </>
        )
    } else if (addRewardFormAppear) {
        return (
            <>
                <RewardForm classId={classId} setAddRewardFormAppear={setAddRewardFormAppear} handleRewardUpdate={handleRewardUpdate}/>
            </>
        )
    } else if (addFeedbackFormAppear) {
        return (
            <>
                <FeedbackForm classId={classId} setAddFeedbackFormAppear={setAddFeedbackFormAppear} handleFeedbackUpdate={handleFeedbackUpdate}/>
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