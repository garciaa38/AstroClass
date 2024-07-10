import { useState } from "react";
import { useDispatch } from "react-redux";
import { editStudentInfoThunk, removeStudentFromClassThunk } from "../../redux/classes";
import { fetchAllStudentsThunk } from "../../redux/students";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";
import styles from "./EditStudentForm.module.css";

function EditStudentForm({student, classId, setAllStudentsState}) {
    // console.log("EDIT STUDENT", student)
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const {first_name, last_name, student_class_id, id: studentId} = student;

    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        setFormErrors({});

        if (firstName.length <= 2 || firstName.length > 20) {
            errors.firstName = "First Name must be between 3 and 20 characters."
        }

        if (lastName.length <= 2 || lastName.length > 20) {
            errors.lastName = "Last Name must be between 3 and 20 characters."
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
        socket.emit('updateClass', { room: classId })
        socket.emit('updateStudentClass', { room: classId })
        socket.emit('updateStudents', { room: classId })
        await dispatch(editStudentInfoThunk(updateStudent, classId ))
        closeModal()

    }

    const removeStudent = async (student_class_id) => {
        await dispatch(removeStudentFromClassThunk(student_class_id))
        const res = await dispatch(fetchAllStudentsThunk())
        // await setAllStudentsState(res)
        socket.emit('updateClass', { room: classId })
        socket.emit('updateClasses', { room: classId, type: 'delete' })
        socket.emit('updateStudents', { room: classId })
        closeModal()
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
                {formErrors.firstName && <p>{formErrors.firstName}</p>}
                <label className={styles.formInput}>
                    Enter Last Name
                    <input
                        type="text"
                        value={lastName}
                        placeholder="Enter Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                {formErrors.lastName && <p>{formErrors.lastName}</p>}
                <div className={styles.editStudentFormButtons}>
                    <button type="submit">Update Student Info</button>
                    <button onClick={() => removeStudent(student_class_id)}>Remove student from class</button>
                </div>
            </form>
        </div>
    )
}

export default EditStudentForm;