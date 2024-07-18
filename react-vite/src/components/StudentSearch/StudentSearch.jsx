import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addStudentToClassThunk } from "../../redux/classes";
import { fetchAllStudentsThunk } from "../../redux/students";
import { socket } from "../../socket";
import styles from "./StudentSearch.module.css";


function StudentSearch({allStudents, classId, setAllStudentsState}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({})

    const searchStudents = useMemo(() => {
        if (!name) return [];
        
        const [firstName, lastName] = name.split(" ");
        if (!firstName) return [];

        return allStudents.filter(student => {
            const { first_name, last_name } = student;
            const matchesFirstName = first_name.toLowerCase().startsWith(firstName.toLowerCase());
            const matchesLastName = lastName ? last_name.toLowerCase().startsWith(lastName.toLowerCase()) : true;
            const isInClass = student.classes.some(cls => cls.id === classId);

            return (matchesFirstName && matchesLastName) && !isInClass;
        });
    }, [name, classId, allStudents]);

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const addStudent = async student => {
        console.log("ADDING STUDENT", student)
        closeModal();
        const addStudentRes = await dispatch(addStudentToClassThunk(classId, student.id))
        if (addStudentRes?.error) {
            const backEndErrors = {};
            backEndErrors.student = "Student already enrolled in class."
            setErrors(backEndErrors);
        } else {
            await dispatch(fetchAllStudentsThunk())
            socket.emit('updateClass', { room: classId })
            socket.emit('updateStudentClass', { room: classId })
            socket.emit('updateStudents', { room: classId })
        }
    }

    return (
        <div className={styles.studentSearchLayout}>
            {errors.student && <p className="error">{errors.student}</p>}
            <form onSubmit={handleFormSubmit}>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleInputChange}
                        placeholder="Enter first and last name"
                    />
                </label>
                {name && (
                    <div className={styles.studentSearchResults}>
                        <div className={styles.studentSearchArea}>
                            <h2>Search Results</h2>
                            <ul>
                                {searchStudents.map(student => (
                                    <button key={student.id} onClick={() => addStudent(student)}>{student.first_name} {student.last_name}</button>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default StudentSearch;