import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchAllStudentClassesThunk } from "../../redux/studentClasses";
import { fetchStudentClassById } from "../../redux/studentClasses";
import AddClassModal from "../AddClassModal/AddClassModal";
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

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    const debouncedFetchClass = useCallback(debounce((data) => {
        dispatch(fetchStudentClassById(sessionUser.id, data.room));
    }, 300), [dispatch, sessionUser.id]);

    const throttledFetchClasses = useCallback(throttle((data) => {
        if (data.type === 'delete') {
            setPrevClassIdx(currClassIdx);
            setCurrClassIdx(0);
        }
        dispatch(fetchAllStudentClassesThunk(sessionUser.id));
    }, 1000), [dispatch, sessionUser.id, currClassIdx]);

    useEffect(() => {
        
        socket.emit('join_room', { room: `${currClass?.class_id}` });
        socket.emit('leave_room', { room: `${prevClass?.class_id}` });

        }, [currClass?.class_id, prevClass?.class_id]);
    
        useEffect(() => {
            // const fetchClass = (data) => {
            //     dispatch(fetchStudentClassById(sessionUser.id, data['room']))
            // }

            // const fetchClasses = (data) => {
            //     if (data['type'] === 'delete') {
            //         setPrevClassIdx(currClassIdx)
            //         setCurrClassIdx(0)
            //     }
            //     dispatch(fetchAllStudentClassesThunk(sessionUser.id))
            // }

            // const fetchStudents = () => {
            //     dispatch(fetchAllStudentsThunk())
            // }
    
            // socket.on('updateStudentClass', (data) => fetchClass(data));
            // socket.on('updateClasses', (data) => fetchClasses(data));
            // socket.on('updateStudents', (data) => fetchStudents(data))

            const handleUpdateClass = (data) => {
                debouncedFetchClass(data);
            };
    
            const handleUpdateClasses = (data) => {
                throttledFetchClasses(data);
            };
    
            socket.on('updateStudentClass', handleUpdateClass);
            socket.on('updateClasses', handleUpdateClasses);
        
            return () => {
                socket.off('updateStudentClass', handleUpdateClass);
                socket.off('updateClasses', handleUpdateClasses);

                // socket.off('updateStudentClass', fetchClass)
                // socket.off('updateClasses', fetchClasses)
                // socket.off('updateStudents', fetchStudents)
            };
        }, [dispatch, sessionUser.id, currClassIdx, currClass, debouncedFetchClass, throttledFetchClasses])

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