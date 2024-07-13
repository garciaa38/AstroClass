import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchAllStudentClassesThunk } from "../../redux/studentClasses";
import { fetchStudentClassById } from "../../redux/studentClasses";
import AddClassModal from "../AddClassModal/AddClassModal";
import Navigation from "../Navigation/Navigation";
import ProfileButton from "../Navigation/ProfileButton";
import { socket } from "../../socket";
import { fetchMessageBoardThunk } from "../../redux/messageBoard";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./ClassStudentView.module.css";

function ClassStudentView({sessionUser, navigate, setCurrentUser, classes}) {
    const dispatch = useDispatch()
    const {first_name, last_name} = sessionUser;
    const [currClassIdx, setCurrClassIdx] = useState(0);
    const [prevClassIdx, setPrevClassIdx] = useState(0);
    const currClass = classes[currClassIdx];
    const prevClass = classes[prevClassIdx];
    const [sideBarOpen, setSideBarOpen] = useState(false);
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

    const throttledFetchMsgBoard = useCallback(throttle((data) => {
        dispatch(fetchMessageBoardThunk(data['room']))
    }))

    useEffect(() => {
        
        socket.emit('join_room', { room: `${currClass?.class_id}` });
        socket.emit('leave_room', { room: `${prevClass?.class_id}` });

        }, [currClass?.class_id, prevClass?.class_id]);
    
        useEffect(() => {
            const handleUpdateClass = (data) => {
                debouncedFetchClass(data);
            };
    
            const handleUpdateClasses = (data) => {
                throttledFetchClasses(data);
            };

            const handleUpdateMsgBoard = (data) => {
                console.log('Update msg board')
                throttledFetchMsgBoard(data)
            }
    
            socket.on('updateStudentClass', handleUpdateClass);
            socket.on('updateClasses', handleUpdateClasses);
            socket.on('updateMsgBoard', handleUpdateMsgBoard)
        
            return () => {
                socket.off('updateStudentClass', handleUpdateClass);
                socket.off('updateClasses', handleUpdateClasses);
                socket.off('updateMsgBoard', handleUpdateMsgBoard)
            };
        }, [dispatch, sessionUser.id, currClassIdx, currClass, debouncedFetchClass, throttledFetchClasses, throttledFetchMsgBoard])

    const switchClass = async (idx) => {
        const prevIdx = currClassIdx
        setCurrClassIdx(idx)
        setPrevClassIdx(prevIdx)
    }

    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen);
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
        <div className={`${styles.classLayout} ${sideBarOpen ? styles.shifted : ''}`}>
            <div className={`${styles.sideBarButton} ${sideBarOpen ? styles.shifted : ''}`}>
                <GiHamburgerMenu onClick={toggleSideBar}/>
            </div>
            <div className={sideBarOpen ? styles.sideBarOpen : styles.sideBarClosed}>
                <div className={styles.sideBarList}>
                    <div className={styles.aboveSignOut}>
                        <div className={styles.classSettings}>
                            <div className={styles.classSettingsButton}>
                                <ProfileButton role={sessionUser.role} navigate={navigate} cls={currClass} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} />
                            </div>
                        </div>
                        <div className={styles.classList}>
                            <OpenModalButton buttonText="Join a class" modalComponent={<AddClassModal sessionUser={sessionUser} setCurrentUser={setCurrentUser} studentClassId={currClass.id}/>}/>
                            {classes?.map((cls, index) => (
                                <div key={cls?.id}>
                                    <button onClick={() => switchClass(index, cls.class_id, sessionUser.id)}>{cls.class_name}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.navbar}>
                <div className={styles.navbarGreeting}>
                    <div className={styles.navbarTop}>
                        <h1>Hey there {first_name} {last_name}.</h1>
                        <h2>You are currently signed in as a student!</h2>
                        <Navigation sessionUser={sessionUser} cls={currClass} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={sessionUser.role} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassStudentView;