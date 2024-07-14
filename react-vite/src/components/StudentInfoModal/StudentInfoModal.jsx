import { useState, useEffect } from "react"
import AddReward from "../AddReward/AddReward";
import AddFeedback from "../AddFeedback/AddFeedback";
import RewardForm from "../RewardForm/RewardForm";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import EditStudentForm from "../EditStudentForm/EditStudentForm";
import { useDispatch } from "react-redux";
import { fetchAllRewardsThunk } from "../../redux/rewards";
import { fetchAllFeedbackThunk } from "../../redux/feedback";
import styles from './StudentInfoModal.module.css'

function StudentInfoModal({student, classId, rewards, feedback, allStudentsState, setAllStudentsState}) {
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
            <div className={styles.studentInfoLayout}>
                <div className={styles.studentInfoTop}>
                    <h1>{`${first_name} ${last_name}`}</h1>
                    <h2>{`Points: ${points}`}</h2>
                </div>
                <div className={styles.studentInfoMiddle}>
                    <div className={styles.rewardsSection}>
                        <div className={styles.rewardTitle}>
                            <h2>Reward {student.first_name}</h2>
                        </div>
                        <button className={styles.addRewardButton} onClick={() => setAddRewardFormAppear(true)}>Add a Reward</button>
                        <AddReward first_name={first_name} rewards={rewardsState} student_class_id={student_class_id} points={points} classId={classId}/>
                    </div>
                    <div className={styles.feedbackSection}>
                        <div className={styles.feedbackTitle}>
                            <h2>Give feedback to {student.first_name}</h2>
                        </div>
                        <button className={styles.addRewardButton} onClick={() => setAddFeedbackFormAppear(true)}>Add Feedback</button>
                        <AddFeedback first_name={first_name} feedback={feedbackState} student_class_id={student_class_id} classId={classId}/>
                    </div>
                </div>
                <button className={styles.editStudentButton} onClick={() => setEditStudentInfoAppear(true)}>{`Edit ${first_name}'s information.`}</button>
            </div>
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
                <EditStudentForm student={student} classId={classId} setAllStudentsState={setAllStudentsState}/>
            </>
        )
    }

}

export default StudentInfoModal;