import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewClassThunk } from "../../redux/classes";
import { useModal } from "../../context/Modal";
import { studentJoinClassThunk } from "../../redux/classes";
import { editPlanetThunk } from "../../redux/classes";
import { fetchCurrentUser } from "../../redux/session";
import { addMessageBoardThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import styles from './AddClassModal.module.css';

function AddClassModal({sessionUser, setCurrentUser, classId}) {
    const dispatch = useDispatch()
    const [className, setClassName] = useState("");
    const [subject, setSubject] = useState("");
    const [studentInviteCode, setStudentInviteCode] = useState("");
    const [planet, setPlanet] = useState('Any');
    const [errors, setErrors] = useState({})
    const [formErrors, setFormErrors] = useState({});
    const { closeModal } = useModal()

    const stringTrim = (string) => {
        if (string.trim().length === 0) {
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = {};
        setFormErrors({});
        setErrors({});
        
        if (sessionUser.role === 'teacher') {
            if (stringTrim(className)) {
                if (className.length > 10 || className.length <= 2) {
                    errors.className = "Class Name must be between 3 and 10 characters."
                }
            } else {
                errors.className = "Class Name must be between 3 and 10 characters."
            }
        }
        
        if (sessionUser.role === 'teacher') {
            if (stringTrim(subject)) {
                if (subject.length > 20 || subject.length <= 2) {
                    errors.subject = "Subject must be between 3 and 20 characters."
                }
            } else {
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
        closeModal()
        await dispatch(addMessageBoardThunk(newMessageBoard))
        socket.emit('updateClasses', {room: classId, type: 'add'})
        socket.emit('updateStudentClasses', {room: classId, type: 'add'})
    }

    const joinClass = async (e) => {
        e.preventDefault();
        setErrors({});
        setFormErrors({});

        const inviteCode = {
            class_code: studentInviteCode,
            planet
        }

        const serverResponse = await dispatch(studentJoinClassThunk(sessionUser.id, inviteCode))
        console.log("Are we getting SERVER RES", serverResponse)


        if (serverResponse?.error) {
            const backEndErrors = {};
            backEndErrors.studentInviteCode = serverResponse.error
            setErrors(backEndErrors)
        } else {
            closeModal()
            const currentUser = await dispatch(fetchCurrentUser())
            await setCurrentUser(currentUser)
            socket.emit('updateClasses', {room: classId, type: 'add'})
            socket.emit('updateStudentClasses', {room: classId, type: 'add'})
        }

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
                    {formErrors.className && <p className="error">{formErrors.className}</p>}
                    <label className={styles.formInput}>
                        Subject
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.subject && <p className="error">{formErrors.subject}</p>}
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
                    <label className={styles.formInput}>
                        <input
                            type="text"
                            placeholder="Class Code"
                            value={studentInviteCode}
                            onChange={(e) => setStudentInviteCode(e.target.value)}
                            required
                        />
                    </label>
                    {formErrors.studentInviteCode && <p className="error">{formErrors.studentInviteCode}</p>}
                    {errors.studentInviteCode && <p className="error">{errors.studentInviteCode}</p>}
                    <label className={styles.planetSelect}>
                        Select a planet
                        <select name="planets" id="planets" value={planet} onChange={(e) => setPlanet(e.target.value)}>
                            <option value="Any">Any</option>
                            <option value="mercury">Mercury</option>
                            <option value="venus">Venus</option>
                            <option value="earth">Earth</option>
                            <option value="mars">Mars</option>
                            <option value="jupiter">Jupiter</option>
                            <option value="saturn">Saturn</option>
                            <option value="uranus">Uranus</option>
                            <option value="neptune">Neptune</option>
                            <option value="pluto">Pluto</option>
                        </select>
                    </label>
                    <div className={styles.addClassButton}>
                        <button type="submit">Join Class</button>
                    </div>
                </form>
            </div>
        )
    
    }
}

export default AddClassModal;