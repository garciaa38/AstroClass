import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewClassThunk } from "../../redux/classes";
import { useModal } from "../../context/Modal";
import { studentJoinClassThunk } from "../../redux/classes";
import { fetchCurrentUser } from "../../redux/session";
import { addMessageBoardThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import styles from './AddClassModal.module.css';

function AddClassModal({sessionUser, setCurrentUser, classId}) {
    const dispatch = useDispatch()
    const [className, setClassName] = useState("")
    const [subject, setSubject] = useState("")
    const [studentInviteCode, setStudentInviteCode] = useState("")
    const [formErrors, setFormErrors] = useState({});
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = {};

        if (sessionUser.role === 'teacher') {
            if (className.length > 10 || className.length <= 2) {
                errors.className = "Class Name must be between 3 and 10 characters."
            }
        }
        
        if (sessionUser.role === 'teacher') {
            if (subject.length > 20 || subject.length <= 2) {
                errors.subject = "Subject must be between 3 and 20 characters."
            }
        }   

        if (sessionUser.role === 'student') {
            if (studentInviteCode.length !== 8) {
                errors.studentInviteCode = "Invite Code MUST be 8 characters."
            }
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const newClass = {
            class_name: className,
            subject
        }

        
        const res = await dispatch(addNewClassThunk(sessionUser.id, newClass));
        console.log("ADDING CLASS", res.id)
        const newMessageBoard = {
            classId: res.id,
            permission: "teacher_only"
        }
        await dispatch(addMessageBoardThunk(newMessageBoard))
        socket.emit('updateClasses', {room: classId, type: 'add'})
        closeModal()
    }

    const joinClass = async (e) => {
        e.preventDefault()

        const inviteCode = {
            class_code: studentInviteCode
        }

        await dispatch(studentJoinClassThunk(sessionUser.id, inviteCode))
        const currentUser = await dispatch(fetchCurrentUser())
        console.log("CURRENT STUDENT after joining class", currentUser)
        await setCurrentUser(currentUser)
        socket.emit('updateClasses', {room: classId, type: 'add'})
        closeModal()

    }

    if (sessionUser.role === 'teacher') {
        return (
            <div className={styles.addClassFormLayout}>
                <h1>Add A New Class!</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.formInput}>
                        Class Name
                        <input
                            type="text"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.className && <p>{formErrors.className}</p>}
                    <label className={styles.formInput}>
                        Subject
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.subject && <p>{formErrors.subject}</p>}
                    <div className={styles.addClassButton}>
                        <button type="submit">Create Class</button>
                    </div>
                </form>
            </div>
        )
    } else if (sessionUser.role === 'student') {
        return (
            <div className={styles.joinClassFormLayout}>
                <h1>Enter class code below</h1>
                <form onSubmit={joinClass}>
                    <label>
                        <input
                            type="text"
                            placeholder="Class Code"
                            value={studentInviteCode}
                            onChange={(e) => setStudentInviteCode(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.studentInviteCode && <p>{formErrors.studentInviteCode}</p>}
                    <button type="submit">Join Class</button>
                </form>
            </div>
        )
    }
}

export default AddClassModal;