import { useState } from "react";
import { useSelector } from "react-redux";
import StudentSearch from "../StudentSearch/StudentSearch";
import StudentSignUp from "../StudentSignUp/StudentSignUp";

function AddStudentModal({ cls }) {
    const { id: classId } = cls;
    const [formAppear, setFormAppear] = useState(false)
    const allStudents = useSelector((state) => Object.values(state.students));
    console.log("FETCH STUDENTS from store", allStudents)
    const [allStudentsState, setAllStudentsState] = useState(allStudents)

    if (!formAppear) {
        return (
            <>
                <h1>Add a Student here!</h1>
                <StudentSearch allStudents={allStudentsState} classId={classId} setAllStudentsState={setAllStudentsState} />
                <h3>{`Don't see your student?`} <button onClick={() => setFormAppear(true)}>Sign them up ahead of time to get them started!</button></h3>
            </>
        );
    } else {
        return (
            <>
                <h1>Sign up your student below using their school email and password!</h1>
                <StudentSignUp classId={classId} setAllStudentsState={setAllStudentsState}/>
            </>
        )
    }

}

export default AddStudentModal;