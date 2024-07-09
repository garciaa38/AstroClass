import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { fetchAllClassesThunk } from "../../redux/classes";
import { fetchAllStudentsThunk } from "../../redux/students";
import { fetchAllStudentClassesThunk } from "../../redux/studentClasses";
import { fetchAllMsgBoardsThunk } from "../../redux/messageBoard";
import ClassTeacherView from "../ClassTeacherView/ClassTeacherView";
import ClassStudentView from "../ClassStudentView/ClassStudentView";

function Classes() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const allClasses = Object.values(useSelector((state) => state.classes))
    const allStudentClasses = Object.values(useSelector((state) => state.studentClasses))
    const [currentUser, setCurrentUser] = useState(sessionUser)

    useEffect(() => {
        dispatch(fetchAllClassesThunk(sessionUser?.id))
        dispatch(fetchAllStudentClassesThunk(sessionUser?.id))
        dispatch(fetchAllStudentsThunk())
        dispatch(fetchAllMsgBoardsThunk())
    }, [dispatch, sessionUser?.id])

    if (sessionUser) {
        console.log("ALL CLASSES", allClasses)
        console.log("ALL CLASSES STUDENT", allStudentClasses)
        if (sessionUser?.role === 'teacher') {
            return (
                <ClassTeacherView sessionUser={currentUser} navigate={navigate} classes={allClasses}/>
            )
        } else if (sessionUser?.role === 'student') {
            return (
                <ClassStudentView sessionUser={currentUser} setCurrentUser={setCurrentUser} navigate={navigate} classes={allStudentClasses}/>
            )
        } else {
            return (
                <>
                    <h1>Hey there!</h1>
                    <h2>Parent features are coming soon!</h2>
                </>
            )
        }
    } else {
        return <Navigate to="/" replace={true} />
    }
}

export default Classes;