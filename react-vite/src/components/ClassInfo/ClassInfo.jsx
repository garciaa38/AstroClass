import OpenModalButton from "../OpenModalButton/OpenModalButton";
import StudentInfoModal from "../StudentInfoModal/StudentInfoModal";
import AddStudentModal from "../AddStudentModal/AddStudentModal";
import EditClass from "../EditClass/EditClass";
import { useDispatch } from "react-redux";
import { fetchClassByIdThunk } from "../../redux/classes";
import styles from './ClassInfo.module.css';

function ClassInfo({sessionUser, cls, currClassIdx, setCurrClassIdx, role, allStudentsState, setAllStudentsState}) {
    const dispatch = useDispatch()
    
    if (!cls) {
        return <h1>This class has been deleted.</h1>
    }
    
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
                if (studentArr[i]?.first_name < pivot?.first_name) {
                    leftArr.push(studentArr[i])
                } else if (studentArr[i]?.first_name === pivot?.first_name) {
                    if (studentArr[i]?.last_name < pivot?.last_name) {
                        leftArr.push(studentArr[i])
                    } else if (studentArr[i]?.last_name >= pivot?.last_name) {
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
                </div>
                <div className={styles.studentList}>
                    {sortedStudents.map((student) => {
                        return(
                            <div key={student?.id}>
                                <OpenModalButton 
                                    buttonText={
                                        <div className={`${styles.student}  ${styles[student?.planet]}`}>
                                            <div className={styles.starsContainer}>
                                                {Array.from({ length: student.points }).map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.star} ${
                                                            (index + 1) % 10 === 0 ? styles.bigStar : ''
                                                        }`}
                                                        style={{
                                                            animationDelay: `${index * 0.3}s`
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                            <div>{student?.first_name} {student?.last_name}</div>
                                            <div>Points: {student?.points}</div>
                                        </div>
                                    }
                                    modalComponent={<StudentInfoModal sessionUser={sessionUser} student={student} classId={classId} rewards={rewards} feedback={feedback} allStudentsState={allStudentsState} setAllStudentsState={setAllStudentsState}/>}
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
                <div className={styles.classInfoOpener}>
                    <h1>{class_name}</h1>
                </div>
                <div className={styles.studentInfo}>
                    <div className={`${styles.student} ${styles[cls.planet]}`}>
                        <div className={styles.starsContainerStudent}>
                            {Array.from({ length: cls.points }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.starStudent} ${
                                        (index + 1) % 10 === 0 ? styles.bigStarStudent : ''
                                    }`}
                                    style={{
                                        animationDelay: `${index * 0.3}s`,
                                    }}
                                ></div>
                            ))}
                        </div>
                </div>
                <div className={styles.studentPoints}>
                    <h2>Your current class score is {cls?.points}.</h2>
                </div>
                </div>
            </div>
        )
    }

}

export default ClassInfo;