function ClassInfo({cls}) {
    const {class_name, students, subject, rewards} = cls

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
        
    return (
        <>
            <h1>This is {class_name}</h1>
            <h2>Here are your students:</h2>
            {sortStudents(students).map((student) => {
                return(
                    <>
                        <h3>{student.first_name} {student.last_name}</h3>
                        <h4>Points: {student.points}</h4>
                    </>
                )
            })}
        </>
    )
}

export default ClassInfo;