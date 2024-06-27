function ClassInfo({cls}) {
    const {class_name, students, subject, rewards} = cls
    
    return (
        <>
            <h1>This is {class_name}</h1>
            <h2>Here are your students:</h2>
            {students.map((student) => {
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