import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewClassThunk } from "../../redux/classes";
import { useModal } from "../../context/Modal";
import { studentJoinClassThunk } from "../../redux/classes";
import { fetchCurrentUser } from "../../redux/session";
import { socket } from "../../socket";

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

        socket.emit('updateClasses', {room: classId, type: 'add'})
        await dispatch(addNewClassThunk(sessionUser.id, newClass));
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
        closeModal()

    }

    if (sessionUser.role === 'teacher') {
        return (
            <>
                <h1>Add A New Class!</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Class Name"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.className && <p>{formErrors.className}</p>}
                    <label>
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.subject && <p>{formErrors.subject}</p>}
                    <button type="submit">Create Class</button>
                </form>
            </>
        )
    } else if (sessionUser.role === 'student') {
        return (
            <>
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
            </>
        )
    }
}

export default AddClassModal;