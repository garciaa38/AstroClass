import { useState } from "react";
import { useDispatch } from "react-redux";
import { editStudentInfoThunk, removeStudentFromClassThunk } from "../../redux/classes";
import { fetchAllStudentsThunk } from "../../redux/students";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";
import styles from "./EditStudentForm.module.css";

function EditStudentForm({sessionUser, student, classId, setAllStudentsState}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const {first_name, last_name, student_class_id, id: studentId} = student;

    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);
    const [formErrors, setFormErrors] = useState({});

    const whiteSpaceCheck = (string) => {
        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) === " ") {
            return false;
            }
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        setFormErrors({});

        if (whiteSpaceCheck(firstName)) {
            if (firstName?.length <= 2 || firstName?.length > 20) {
                errors.firstName = "First Name must be between 3 and 20 characters."
            }
        } else {
            errors.firstName = "Please don't include spaces."
        }

        if (whiteSpaceCheck(lastName)) {
            if (lastName?.length <= 2 || lastName?.length > 20) {
                errors.lastName = "Last Name must be between 3 and 20 characters."
            }
        } else {
            errors.lastName = "Please don't include spaces."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const updateStudent = {
            id: studentId,
            first_name: firstName,
            last_name: lastName
        }
        closeModal()
        socket.emit('updateClass', { room: classId })
        socket.emit('updateStudentClass', { room: classId })
        socket.emit('updateStudents', { room: classId })
        await dispatch(editStudentInfoThunk(updateStudent, classId, sessionUser.id))

    }

    return (
        <div className={styles.editStudentFormLayout}>
            <div className={styles.editStudentFormTitle}>
                <h2>Edit Student Information</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label className={styles.formInput}>
                    Enter First Name
                    <input
                        type="text"
                        value={firstName}
                        placeholder="Enter First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
                <label className={styles.formInput}>
                    Enter Last Name
                    <input
                        type="text"
                        value={lastName}
                        placeholder="Enter Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
                <div className={styles.editStudentFormButtons}>
                    <button type="submit">Update Student Info</button>
                </div>
            </form>
        </div>
    )
}

export default EditStudentForm;