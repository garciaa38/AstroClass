import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import AddStudentModal from "../AddStudentModal/AddStudentModal";
import ClassInfo from "../ClassInfo/ClassInfo";
import { useState } from "react";

function ClassTeacherView({sessionUser, navigate, classes}) {
    const {last_name, suffix} = sessionUser;
    const [currClassIdx, setCurrClassIdx] = useState(0)

    

    if (classes.length < 1) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <h1>Hey there {suffix} {last_name}.</h1>
            <h2>You are currently signed in as a teacher!</h2>
            <h3>Please select a class below:</h3>
            {classes?.map((cls, index) => {
                return (
                    <div key={cls?.id}>
                        <button onClick={() => setCurrClassIdx(index)}>{cls.class_name}</button>
                    </div>
                )
            })}

            <ClassInfo cls={classes[currClassIdx]} />

            <OpenModalButton buttonText="Add a Student!" modalComponent={<AddStudentModal cls={classes[currClassIdx]}/>}/>

            <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
        </>
    )
}

export default ClassTeacherView;