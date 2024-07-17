import { useState } from "react";
import EditReward from "../EditReward/EditReward";
import EditFeedback from "../EditFeedback/EditFeedback";
import RewardForm from "../RewardForm/RewardForm";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import { socket } from "../../socket";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import styles from "./EditRewardsandFeedback.module.css";

function EditRewardsandFeedback ({cls, rewards, feedback}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const {class_name, subject, id: classId, teacher_id} = cls;

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

    if (!addRewardFormAppear && !addFeedbackFormAppear) {
        return (
            <div className={styles.editRewardsandFeedbackLayout}>
                <div className={styles.modalIntro}>
                    <h1>Update rewards and feedback</h1>
                    <p>{"Let your students know how awesome they're being with some reward, or let them know they need some work with some feedback."}</p>
                </div>
                <div className={styles.editBottomSection}>
                    <div className={styles.editRewardsSection}>
                        <div className={styles.rewardElements}>
                            <div className={styles.rewardsListTitle}>
                                <h2>Edit Rewards</h2>
                            </div>
                            <div className={styles.addRewardButton}>
                                <button onClick={() => setAddRewardFormAppear(true)}>Add a reward</button>
                                {formErrors.rewardType && <p className={styles.error}>{formErrors.rewardType}</p>}
                                {formErrors.pointsEarned && <p className="error">{formErrors.pointsEarned}</p>}
                            </div>
                            <div className={styles.rewardList}>
                                {rewardsState?.map((reward) => {
                                    return (
                                        <EditReward className={styles.editButton} key={reward.id} reward={reward} classId={classId} handleRewardDelete={handleRewardDelete} setFormErrors={setFormErrors}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.editFeedbackSection}>
                        <div className={styles.rewardElements}>
                            <div className={styles.feedbackListTitle}>
                                <h2>Edit Feedback</h2>
                            </div>
                            <div className={styles.addFeedbackButton}>
                                <button onClick={() => setAddFeedbackFormAppear(true)}>Add feedback</button>
                                {formErrors.feedbackType && <p className={styles.error}>{formErrors.feedbackType}</p>}
                                {formErrors.pointsLost && <p className={styles.error}>{formErrors.pointsLost}</p>}
                            </div>
                            <div className={styles.rewardList}>
                                {feedbackState?.map((feedback) => {
                                    return (
                                        <EditFeedback key={feedback.id} feedback={feedback} classId={classId} handleFeedbackDelete={handleFeedbackDelete} setFormErrors={setFormErrors}/>
                                    )
                                })}
                            </div>
                        </div>
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

export default EditRewardsandFeedback;