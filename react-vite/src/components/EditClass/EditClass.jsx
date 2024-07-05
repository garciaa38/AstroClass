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
            <>
                <h1>Edit your class!</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter Class Name"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.className && <p>{formErrors.className}</p>}
                    <label>
                        <input
                            type="text"
                            placeholder="Enter Class Subject"
                            value={currSubject}
                            onChange={(e) => setCurrSubject(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.subject && <p>{formErrors.subject}</p>}
                    <button type="submit">Update your class</button>
                </form>
                <button onClick={() => deleteClass(classId)}>Delete this Class</button>
                <h1>Edit Rewards</h1>
                {rewardsState?.map((reward) => {
                    return (
                        <EditReward key={reward.id} reward={reward} classId={classId} handleRewardDelete={handleRewardDelete}/>
                    )
                })}
                <button onClick={() => setAddRewardFormAppear(true)}>Add a reward</button>
    
                <h1>Edit Feedback</h1>
                {feedbackState?.map((feedback) => {
                    return (
                        <EditFeedback key={feedback.id} feedback={feedback} classId={classId} handleFeedbackDelete={handleFeedbackDelete}/>
                    )
                })}
                <button onClick={() => setAddFeedbackFormAppear(true)}>Add feedback</button>
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
    }
}

export default EditClass;