import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import SignOutModal from "../SignOutModal/SignOutModal";

function Classes() {
    const navigate = useNavigate()
    const sessionUser = useSelector((state) => state.session.user)

    if (sessionUser) {
        const {first_name, last_name, suffix, role} = sessionUser
    
        console.log("SESSION USER", sessionUser)
    
        if (role === 'teacher') {
            return (
                <>
                    <h1>Hey there {suffix} {last_name}.</h1>
                    <h2>You are currently signed in as a teacher!</h2>
                    <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
                </>
            )
        } else if (role === 'student') {
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