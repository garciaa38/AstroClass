import { useState } from "react";
import StudentSearch from "../StudentSearch/StudentSearch";
import StudentSignUp from "../StudentSignUp/StudentSignUp";
import styles from "./AddStudentModal.module.css";

function AddStudentModal({ cls, setAllStudentsState, allStudents }) {
    const { id: classId } = cls;
    const [formAppear, setFormAppear] = useState(false)


    if (!formAppear) {
        return (
            <div className={styles.addStudentLayout}>
                <div className={styles.addStudentTitle}>
                    <h1>Add a Student here!</h1>
                </div>
                <div className={styles.addStudentSearch}>
                    <StudentSearch allStudents={allStudents} classId={classId} setAllStudentsState={setAllStudentsState} />
                </div>
                <div className={styles.addStudentBottom}>
                    <h3>{`Don't see your student?`} <button onClick={() => setFormAppear(true)}>Sign them up ahead of time to get them started!</button></h3>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.addStudentSignUpLayout}>
                <h1>Add a New Student</h1>
                <h4>Sign up a new student below using their school email and password.</h4>
                <StudentSignUp classId={classId} setAllStudentsState={setAllStudentsState}/>
            </div>
        )
    }

}

export default AddStudentModal;