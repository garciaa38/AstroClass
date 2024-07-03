import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import AddStudentModal from "../AddStudentModal/AddStudentModal";
import ClassInfo from "../ClassInfo/ClassInfo";
import AddClassModal from "../AddClassModal/AddClassModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassByIdThunk } from "../../redux/classes";
import Navigation from "../Navigation/Navigation";

function ClassTeacherView({sessionUser, navigate, classes}) {
    const dispatch = useDispatch()
    const {last_name, suffix} = sessionUser;
    const [currClassIdx, setCurrClassIdx] = useState(0)
    const allStudents = useSelector((state) => Object.values(state.students));
    const [allStudentsState, setAllStudentsState] = useState(allStudents)
    console.log("FETCH STUDENTS from store", allStudentsState)

    const switchClass = async (idx, classId, teacherId) => {
        await dispatch(fetchClassByIdThunk(teacherId, classId))
        await setCurrClassIdx(idx)
    }


    if (classes.length < 1) {
        return (
            <>
                <h1>You have no classes</h1>
                <OpenModalButton
                    buttonText="Add a class now to get started!"
                    modalComponent={<AddClassModal sessionUser={sessionUser} />}
                />
                <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
            </>
        )
    }

    return (
        <>
            <h1>Hey there {suffix} {last_name}.</h1>
            <h2>You are currently signed in as a teacher!</h2>
            <h3>Please select a class below:</h3>
            {classes?.map((cls, index) => {
                return (
                    <div key={cls?.id}>
                        <button onClick={() => switchClass(index, cls.id, sessionUser.id)}>{cls.class_name}</button>
                    </div>
                )
            })}
            <OpenModalButton buttonText="Add a class" modalComponent={<AddClassModal sessionUser={sessionUser} />}/>
            <Navigation sessionUser={sessionUser} cls={classes[currClassIdx]} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={sessionUser.role} allStudentsState={allStudentsState} setAllStudentsState={setAllStudentsState} allStudents={allStudents}/>
            <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
        </>
    )
}

export default ClassTeacherView;