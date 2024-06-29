import { useState } from "react";
import { useDispatch } from "react-redux";
import { editStudentInfoThunk, removeStudentFromClassThunk } from "../../redux/classes";
import { useModal } from "../../context/Modal";

function EditStudentForm({student, classId}) {
    // console.log("EDIT STUDENT", student)
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const {first_name, last_name, student_class_id, id: studentId} = student;

    const [firstName, setFirstName] = useState(first_name)
    const [lastName, setLastName] = useState(last_name)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateStudent = {
            id: studentId,
            first_name: firstName,
            last_name: lastName
        }

        await dispatch(editStudentInfoThunk(updateStudent, classId ))
        closeModal()

    }

    const removeStudent = async (student_class_id) => {
        await dispatch(removeStudentFromClassThunk(student_class_id))
        closeModal()
    }

    return (
        <>
            <h2>Edit Student Information</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={firstName}
                        placeholder="Enter First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={lastName}
                        placeholder="Enter Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <button type="submit">Update Student Info</button>
            </form>
            <button onClick={() => removeStudent(student_class_id)}>Remove student from class</button>
        </>
    )
}

export default EditStudentForm;