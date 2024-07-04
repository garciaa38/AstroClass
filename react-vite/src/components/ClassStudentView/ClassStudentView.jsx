import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchClassByIdThunk } from "../../redux/classes";
import { fetchAllClassesThunk } from "../../redux/classes";
import { fetchAllStudentsThunk } from "../../redux/students";
import { fetchCurrentUser } from "../../redux/session";
import { fetchAllStudentClassesThunk } from "../../redux/studentClasses";
import AddClassModal from "../AddClassModal/AddClassModal";
import ClassInfo from "../ClassInfo/ClassInfo";
import Navigation from "../Navigation/Navigation";
import { socket } from "../../socket";

function ClassStudentView({sessionUser, navigate, setCurrentUser, classes}) {
    const dispatch = useDispatch()
    const {first_name, last_name} = sessionUser;
    const [currClassIdx, setCurrClassIdx] = useState(0);
    const [prevClassIdx, setPrevClassIdx] = useState(0);
    const currClass = classes[currClassIdx];
    const prevClass = classes[prevClassIdx];
    console.log("CURRENT CLASS 1", currClass)

    useEffect(() => {
        
        socket.emit('join_room', { room: `${currClass?.id}` });
        socket.emit('leave_room', { room: `${prevClass?.id}` });

        }, [currClass?.id, prevClass?.id]);
    
        useEffect(() => {
            const fetchClass = (data) => {
                dispatch(fetchAllStudentClassesThunk(sessionUser.id))
            }

            const fetchClasses = (data) => {
                if (data['type'] === 'delete') {
                    setPrevClassIdx(currClassIdx)
                    setCurrClassIdx(0)
                }
                dispatch(fetchAllStudentClassesThunk(sessionUser.id))
            }

            const fetchStudents = () => {
                dispatch(fetchAllStudentsThunk())
            }
    
            socket.on('updateClass', (data) => fetchClass(data));
            socket.on('updateClasses', (data) => fetchClasses(data));
            socket.on('updateStudents', (data) => fetchStudents(data))
        
            return () => {
                socket.off('updateClass', fetchClass)
                socket.off('updateClasses', fetchClasses)
                socket.off('updateStudents', fetchStudents)
            };
        }, [dispatch, sessionUser.id, currClassIdx, currClass])

    const switchClass = async (idx) => {
        const prevIdx = currClassIdx
        setCurrClassIdx(idx)
        setPrevClassIdx(prevIdx)
    }

    if (classes.length < 1) {
        return (
            <>
                <h1>You have no classes</h1>
                <OpenModalButton
                    buttonText="Join a class now to get started!"
                    modalComponent={<AddClassModal sessionUser={sessionUser} />}
                />
                <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
            </>
        )
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
            <Navigation sessionUser={sessionUser} cls={currClass} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={sessionUser.role} />
            {/* <ClassInfo cls={classes[currClassIdx]} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={sessionUser.role} /> */}

            <h3>{"If you're done with class,"} you can go ahead and {<OpenModalButton buttonText="sign out" modalComponent={<SignOutModal navigate={navigate} />}/>}</h3>
        </>
    )
}

export default ClassStudentView;