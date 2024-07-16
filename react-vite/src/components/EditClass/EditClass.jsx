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
    const [deletionWarning, setDeletionWarning] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const stringTrim = (string) => {
        if (string.trim().length === 0) {
            return false;
        } else {
            return true;
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = {};
        setFormErrors({})

        if (stringTrim(className)) {
            if (className.length > 10 || className.length <= 2) {
                errors.className = "Class Name must be between 3 and 10 characters."
            }
        } else {
            errors.className = "Class Name must be between 3 and 10 characters."
        }

        if (stringTrim(currSubject)) {
            if (currSubject.length > 20 || currSubject.length <= 2) {
                errors.subject = "Subject must be between 3 and 20 characters."
            }
        } else {
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

    if (!deletionWarning) {
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
                                {formErrors.className && <p className="error">{formErrors.className}</p>}
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
                                {formErrors.subject && <p className="error">{formErrors.subject}</p>}
                            </div>
                        </div>
                        <div className={styles.editFormButtons}>
                            <button type="submit">Update your class</button>
                            <button onClick={() => setDeletionWarning(true)}>Delete this Class</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.editClassFormDeletionWarning}>
                <h1>Are you sure you want to delete this class?</h1>
                <div className={styles.deletionWarningButtons}>
                    <button onClick={() => deleteClass(classId)}>Yes</button>
                    <button onClick={() => closeModal()}>No</button>
                </div>
            </div>
        )
    }
}

export default EditClass;