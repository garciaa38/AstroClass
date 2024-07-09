import { useState } from "react";
import { useDispatch } from "react-redux";
import { editClassThunk } from "../../redux/classes";
import { useModal } from "../../context/Modal";
import { deleteClassThunk } from "../../redux/classes";
import EditReward from "../EditReward/EditReward";
import EditFeedback from "../EditFeedback/EditFeedback";
import RewardForm from "../RewardForm/RewardForm";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import { socket } from "../../socket";
import styles from "./EditClass.module.css"

function EditClass({cls, currClassIdx, setCurrClassIdx, rewards, feedback}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const {class_name, subject, id: classId, teacher_id} = cls;

    const [className, setClassName] = useState(class_name);
    const [currSubject, setCurrSubject] = useState(subject);
    const [addRewardFormAppear, setAddRewardFormAppear] = useState(false);
    const [addFeedbackFormAppear, setAddFeedbackFormAppear] = useState(false);
    const [rewardsState, setRewardsState] = useState(rewards);
    const [feedbackState, setFeedbackState] = useState(feedback);
    const [formErrors, setFormErrors] = useState({});

    const handleRewardUpdate = (newReward) => {
        setRewardsState((prevRewards) => [...prevRewards, newReward]);
    }

    const handleFeedbackUpdate = (newFeedback) => {
        setFeedbackState((prevFeedback) => [...prevFeedback, newFeedback])
    }

    const handleRewardDelete = (reward) => {
        setRewardsState((prevRewards) => prevRewards.filter(r => r !== reward));
    }

    const handleFeedbackDelete = (feedback) => {
        setFeedbackState((prevFeedback) => prevFeedback.filter(f => f !== feedback));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const errors = {};
        setFormErrors({})

        if (className.length > 10 || className.length <= 2) {
            errors.className = "Class Name must be between 3 and 10 characters."
        }

        if (currSubject.length > 20 || currSubject.length <= 2) {
            errors.subject = "Subject must be between 3 and 20 characters."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const updatedClass = {
            class_name: className,
            subject: currSubject
        }

        await dispatch(editClassThunk(classId, updatedClass))
        socket.emit('updateClass', { room: classId })
        closeModal()
    }

    const deleteClass = async (classId) => {
        await dispatch(deleteClassThunk(classId, teacher_id))

        if (currClassIdx > 0) {
            await setCurrClassIdx(currClassIdx-1)
        }
        socket.emit('updateClasses', {room: classId, classIdx: currClassIdx, type: 'delete'})
        socket.emit('updateStudents', {room: classId})
        closeModal()
    }

    if (!addRewardFormAppear && !addFeedbackFormAppear) {
        return (
            <div className={styles.editClassFormLayout}>
                <div className={styles.editTopSection}>
                    <h1>Edit your class!</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.editFormInput}>
                            <div className={styles.editClassName}>
                                <label className={styles.formInput}>
                                    Class Name
                                    <input
                                        type="text"
                                        placeholder="Enter Class Name"
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                        required
                                    />
                                </label>
                                {formErrors.className && <p>{formErrors.className}</p>}
                            </div>
                            <div className={styles.editClassSubject}>
                                <label className={styles.formInput}>
                                    Subject
                                    <input
                                        type="text"
                                        placeholder="Enter Class Subject"
                                        value={currSubject}
                                        onChange={(e) => setCurrSubject(e.target.value)}
                                        required
                                    />
                                </label>
                                {formErrors.subject && <p>{formErrors.subject}</p>}
                            </div>
                        </div>
                        <div className={styles.editFormButtons}>
                            <button type="submit">Update your class</button>
                            <button onClick={() => deleteClass(classId)}>Delete this Class</button>
                        </div>
                    </form>
                </div>
                <div className={styles.editBottomSection}>
                    <div className={styles.editRewardsSection}>
                        <div className={styles.rewardsListTitle}>
                            <h1>Edit Rewards</h1>
                        </div>
                        <div className={styles.addRewardButton}>
                            <button onClick={() => setAddRewardFormAppear(true)}>Add a reward</button>
                        </div>
                        {rewardsState?.map((reward) => {
                            return (
                                <EditReward key={reward.id} reward={reward} classId={classId} handleRewardDelete={handleRewardDelete}/>
                            )
                        })}
                    </div>
                    <div className={styles.editFeedbackSection}>
                        <div className={styles.rewardsListTitle}>
                            <h1>Edit Feedback</h1>
                        </div>
                        <div className={styles.addRewardButton}>
                            <button onClick={() => setAddFeedbackFormAppear(true)}>Add feedback</button>
                        </div>
                        {feedbackState?.map((feedback) => {
                            return (
                                <EditFeedback key={feedback.id} feedback={feedback} classId={classId} handleFeedbackDelete={handleFeedbackDelete}/>
                            )
                        })}
                    </div>
                </div>
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
    }
}

export default EditClass;