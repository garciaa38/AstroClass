import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addStudentToClassThunk } from "../../redux/classes";

function StudentSearch({allStudents, classId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [name, setName] = useState("");

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
        await dispatch(addStudentToClassThunk(classId, student.id))
        closeModal();
    }

    return (
        <>
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
                    <div>
                        <h2>Search Results:</h2>
                        <ul>
                            {searchStudents.map(student => (
                                <button key={student.id} onClick={() => addStudent(student)}>{student.first_name} {student.last_name}</button>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </>
    )
}

export default StudentSearch;