import OpenModalButton from "../OpenModalButton/OpenModalButton";
import StudentInfoModal from "../StudentInfoModal/StudentInfoModal";
import EditClass from "../EditClass/EditClass";

function ClassInfo({cls, currClassIdx, setCurrClassIdx, role}) {
    const {class_name, students, id: classId, rewards, feedback} = cls;

    console.log("CLASS", cls)

    console.log("ALL STUDENTS", students)

    const sortStudents = studentArr => {
        if (studentArr.length <= 1) {
            return studentArr;
        }

        let pivot = studentArr[0];
        let leftArr = [];
        let rightArr = [];

        for (let i = 1; i < studentArr.length; i++) {
            if (studentArr[i].first_name < pivot.first_name) {
                leftArr.push(studentArr[i])
            } else if (studentArr[i].first_name === pivot.first_name) {
                if (studentArr[i].last_name < pivot.last_name) {
                    leftArr.push(studentArr[i])
                } else if (studentArr[i].last_name >= pivot.last_name) {
                    rightArr.push(studentArr[i])
                }
            } else {
                rightArr.push(studentArr[i])
            }
        }

        return [...sortStudents(leftArr), pivot, ...sortStudents(rightArr)]
    }

    if (role === 'teacher') {
        return (
            <>
                <h1>This is {class_name}</h1>
                <OpenModalButton 
                    buttonText="Class Settings"
                    modalComponent={<EditClass cls={cls} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} rewards={rewards} feedback={feedback}/>}
                />
                <h2>Here are your students:</h2>
                {sortStudents(students).map((student) => {
                    return(
                        <div key={student.id}>
                            <OpenModalButton 
                                buttonText={`${student.first_name} ${student.last_name} Points: ${student.points}`}
                                modalComponent={<StudentInfoModal student={student} classId={classId} rewards={rewards} feedback={feedback}/>}
                            />
                        </div>
                    )
                })}
            </>
        )
    } else if (role === 'student') {
        return (
            <>
                <h1>This is {class_name}</h1>
                <h2>Your current class score is {cls.points}.</h2>
            </>
        )
    }

}

export default ClassInfo;