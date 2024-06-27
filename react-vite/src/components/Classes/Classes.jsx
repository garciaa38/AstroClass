import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { fetchAllClassesThunk } from "../../redux/classes";
import { fetchAllStudentsThunk } from "../../redux/students";
import SignOutModal from "../SignOutModal/SignOutModal";
import ClassTeacherView from "../ClassTeacherView/ClassTeacherView";

function Classes() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const allClasses = Object.values(useSelector((state) => state.classes))
    useEffect(() => {
        dispatch(fetchAllClassesThunk(sessionUser?.id))
        dispatch(fetchAllStudentsThunk())
    }, [dispatch, sessionUser?.id])

    if (sessionUser) {
        console.log("ALL CLASSES", allClasses)
        if (sessionUser?.role === 'teacher') {
            return (
                <ClassTeacherView sessionUser={sessionUser} navigate={navigate} classes={allClasses}/>
            )
        } else if (sessionUser?.role === 'student') {
            return (
                <>
                    <h1>Hey there {first_name} {last_name}.</h1>
                    <h2>You are currently signed in as a student!</h2>
                    <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
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