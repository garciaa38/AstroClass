import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ClassStudentView({sessionUser, navigate}) {
    const dispatch = useDispatch()
    const {first_name, last_name} = sessionUser;
    return (
        <>
            <h1>Hey there {first_name} {last_name}.</h1>
            <h2>You are currently signed in as a student!</h2>
            <h3>Please select a class below:</h3>
            <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
        </>
    )
}

export default ClassStudentView;