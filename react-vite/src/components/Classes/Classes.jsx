import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { fetchAllClassesThunk } from "../../redux/classes";
import { fetchAllStudentsThunk } from "../../redux/students";
import SignOutModal from "../SignOutModal/SignOutModal";
import ClassTeacherView from "../ClassTeacherView/ClassTeacherView";
import ClassStudentView from "../ClassStudentView/ClassStudentView";

function Classes() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const allClasses = Object.values(useSelector((state) => state.classes))
    const [currentUser, setCurrentUser] = useState(sessionUser)
    useEffect(() => {
        dispatch(fetchAllClassesThunk(sessionUser?.id))
        dispatch(fetchAllStudentsThunk())
    }, [dispatch, sessionUser?.id])

    if (sessionUser) {
        console.log("ALL CLASSES", allClasses)
        if (sessionUser?.role === 'teacher') {
            return (
                <ClassTeacherView sessionUser={currentUser} navigate={navigate} classes={allClasses}/>
            )
        } else if (sessionUser?.role === 'student') {
            return (
                <>
                    <ClassStudentView sessionUser={currentUser} setCurrentUser={setCurrentUser} navigate={navigate} />
                </>
            )
        } else {
            return (
                <>
                    <h1>Hey there {first_name} {last_name}.</h1>
                    <h2>You are currently signed in as a parent!</h2>
                </>
            )
        }
    } else {
        return <Navigate to="/" replace={true} />
    }
}

export default Classes;