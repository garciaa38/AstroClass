import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchClassByIdThunk } from "../../redux/classes";
import AddClassModal from "../AddClassModal/AddClassModal";
import ClassInfo from "../ClassInfo/ClassInfo";

function ClassStudentView({sessionUser, navigate, setCurrentUser}) {
    console.log("CURRENT STUDENT", sessionUser)
    const dispatch = useDispatch()
    const {first_name, last_name, classes} = sessionUser;
    const [currClassIdx, setCurrClassIdx] = useState(0)

    const switchClass = async (idx, classId, studentId) => {
        await dispatch(fetchClassByIdThunk(studentId, classId))
        await setCurrClassIdx(idx)
    }

    return (
        <>
            <h1>Hey there {first_name} {last_name}.</h1>
            <h2>You are currently signed in as a student!</h2>
            <h3>Please select a class below:</h3>
            {classes?.map((cls, index) => {
                return (
                    <div key={cls?.id}>
                        <button onClick={() => switchClass(index, cls.class_id, sessionUser.id)}>{cls.class_name}</button>
                    </div>
                )
            })}
            <OpenModalButton buttonText="Join a class" modalComponent={<AddClassModal sessionUser={sessionUser} setCurrentUser={setCurrentUser} />}/>

            <ClassInfo cls={classes[currClassIdx]} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={sessionUser.role} />

            <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
        </>
    )
}

export default ClassStudentView;