import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import AddStudentModal from "../AddStudentModal/AddStudentModal";
import ClassInfo from "../ClassInfo/ClassInfo";
import AddClassModal from "../AddClassModal/AddClassModal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassByIdThunk } from "../../redux/classes";
import Navigation from "../Navigation/Navigation";
import { socket } from "../../socket";

function ClassTeacherView({sessionUser, navigate, classes}) {
    const dispatch = useDispatch()
    const {last_name, suffix} = sessionUser;
    const [currClassIdx, setCurrClassIdx] = useState(0)
    const allStudents = useSelector((state) => Object.values(state.students));
    const [allStudentsState, setAllStudentsState] = useState(allStudents)
    console.log("FETCH STUDENTS from store", allStudentsState)

    useEffect(() => {
        // Log socket connection
        console.log("SOCKET Connecting to socket...");
        
        socket.emit('join_room', { room: `class_${classes[currClassIdx]?.id}` });
        console.log("SOCKET Joining room:", `class_${classes[currClassIdx]?.id}`);
    
        // Event listeners for socket events
        socket.on('join_room_announcement', (data) => {
            console.log('SOCKET join room announcement', data.message);
        });
    
        socket.on('receive_message', (data) => {
            console.log('SOCKET Message received:', data.message);
        });
    
        // Cleanup on component unmount
        return () => {
            socket.emit('leave_room', { room: `class_${classes[currClassIdx]?.id}` });
            console.log("SOCKET Leaving room:", `class_${classes[currClassIdx]?.id}`);
            socket.off('join_room_announcement');
            socket.off('receive_message');
        };
        }, [dispatch, classes, currClassIdx]);


    const switchClass = async (idx, classId, teacherId) => {
        // await dispatch(fetchClassByIdThunk(teacherId, classId))
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