import OpenModalButton from "../OpenModalButton/OpenModalButton";
import StudentInfoModal from "../StudentInfoModal/StudentInfoModal";
import AddStudentModal from "../AddStudentModal/AddStudentModal";
import EditClass from "../EditClass/EditClass";
import { useDispatch } from "react-redux";
import { fetchClassByIdThunk } from "../../redux/classes";
import styles from './ClassInfo.module.css';

function ClassInfo({sessionUser, cls, currClassIdx, setCurrClassIdx, role, allStudentsState, setAllStudentsState}) {
    const dispatch = useDispatch()
    const {class_name, students, id: classId, rewards, feedback} = cls;

    if (role === 'teacher') {
        const sortStudents = studentArr => {
            if (studentArr?.length <= 1) {
                return studentArr;
            }
            
            let pivot = studentArr[0];
            let leftArr = [];
            let rightArr = [];
            
            for (let i = 1; i < studentArr?.length; i++) {
                if (studentArr[i]?.first_name < pivot.first_name) {
                    leftArr.push(studentArr[i])
                } else if (studentArr[i]?.first_name === pivot.first_name) {
                    if (studentArr[i]?.last_name < pivot.last_name) {
                        leftArr.push(studentArr[i])
                    } else if (studentArr[i]?.last_name >= pivot.last_name) {
                        rightArr.push(studentArr[i])
                    }
                } else {
                    rightArr.push(studentArr[i])
                }
            }
            
            return [...sortStudents(leftArr), pivot, ...sortStudents(rightArr)]
        }
        const sortedStudents = sortStudents(students)
        return (
            <div className={styles.classInfoLayout}>
                <div className={styles.classInfoOpener}>
                    <h1>{class_name}</h1>
                    <OpenModalButton 
                        buttonText="Class Settings"
                        modalComponent={<EditClass cls={cls} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} rewards={rewards} feedback={feedback}/>}
                    />
                </div>
                <div className={styles.studentList}>
                    {sortedStudents.map((student) => {
                        return(
                            <div key={student?.id}>
                                <OpenModalButton 
                                    buttonText={
                                        <div className={styles.student}>
                                            <div>{student?.first_name} {student?.last_name}</div>
                                            <div>Points: {student?.points}</div>
                                        </div>
                                    }
                                    modalComponent={<StudentInfoModal student={student} classId={classId} rewards={rewards} feedback={feedback} allStudentsState={allStudentsState} setAllStudentsState={setAllStudentsState}/>}
                                />
                            </div>
                        )
                    })}
                    <OpenModalButton buttonText={<div className={styles.student}>Add a Student</div>} modalComponent={<AddStudentModal cls={cls} setAllStudentsState={setAllStudentsState} allStudents={allStudentsState}/>}/>
                </div>
            </div>
        )
    } else if (role === 'student') {
        return (
            <div className={styles.classInfoLayout}>
                <div className={styles.studentInfo}>
                    <h1>This is {class_name}</h1>
                    <h2>Your current class score is {cls.points}.</h2>
                </div>
            </div>
        )
    }

}

export default ClassInfo;