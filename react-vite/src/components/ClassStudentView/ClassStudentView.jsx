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
import { FaPlus } from "react-icons/fa";
import styles from "./ClassStudentView.module.css";

function ClassStudentView({sessionUser, navigate, setCurrentUser, classes}) {
    const dispatch = useDispatch()
    const {first_name, last_name} = sessionUser;
    const [currClassIdx, setCurrClassIdx] = useState(0);
    const [prevClassIdx, setPrevClassIdx] = useState(0);
    const currClass = classes[currClassIdx];
    const prevClass = classes[prevClassIdx];
    const [sideBarOpen, setSideBarOpen] = useState(false);
    
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
            const prevIdx = currClassIdx - 1;
            setPrevClassIdx(currClassIdx);
            if (prevIdx < 0) {
                setCurrClassIdx(0);
            } else {
                setCurrClassIdx(prevIdx)
            }
        }
        dispatch(fetchAllStudentClassesThunk(sessionUser?.id));
    }, 1000), [dispatch, sessionUser?.id, currClassIdx]);

    const throttledFetchMsgBoard = useCallback(throttle((data) => {
        dispatch(fetchMessageBoardThunk(data?.room))
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
                throttledFetchMsgBoard(data)
            }
    
            socket.on('updateStudentClass', handleUpdateClass);
            socket.on('updateStudentClasses', handleUpdateClasses);
            socket.on('updateMsgBoard', handleUpdateMsgBoard)
        
            return () => {
                socket.off('updateStudentClass', handleUpdateClass);
                socket.off('updateStudentClasses', handleUpdateClasses);
                socket.off('updateMsgBoard', handleUpdateMsgBoard)
            };
        }, [dispatch, sessionUser?.id, currClassIdx, currClass, debouncedFetchClass, throttledFetchClasses, throttledFetchMsgBoard])

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
            <div className={`${styles.classLayout} ${sideBarOpen ? styles.shifted : ''}`}>
                <div className={`${styles.sideBarButton} ${sideBarOpen ? styles.shifted : ''}`}>
                    <GiHamburgerMenu onClick={toggleSideBar}/>
                </div>
                <div className={sideBarOpen ? styles.sideBarOpen : styles.sideBarClosed}>
                    <div className={styles.sideBarList}>
                        <div className={styles.aboveSignOut}>
                            <div className={styles.classSettings}>
                                <div className={styles.classSettingsButton}>
                                    <ProfileButton role={sessionUser.role} navigate={navigate} noClass={true} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.classList}>
                        <OpenModalButton buttonText={<div className={styles.addClassSection}><div className={styles.addClassTab} >Join a Class&nbsp;<div className={styles.plusSymbol}><FaPlus /></div></div> </div>} modalComponent={<AddClassModal sessionUser={sessionUser} setCurrentUser={setCurrentUser}/>}/>
                            {classes?.map((cls, index) => (
                                <div key={cls?.id}>
                                    {cls.class_name.length > 0 && <button className={currClassIdx === index ? styles.activeTab : styles.classTab} onClick={() => switchClass(index)}>{cls.class_name}</button>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.navbar}>
                    <div className={styles.navbarGreeting}>
                        <div className={styles.navbarTop}>
                            <div className={styles.greetingTop}>
                                    <div className={styles.greetingLogo}>
                                        <img src="/rocket.png"/>
                                    </div>
                                    <div className={styles.greetingMiddle}>
                                        <h1>Hey there {first_name} {last_name}!</h1>
                                        <div className={styles.greetingExplore}>
                                            <h2>{`You're currently have no classes to explore.`}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className={styles.noClassLayout}>
                        <div className={styles.noClassBox}>
                            <div className={styles.noClassMessage}>
                                <h2>
                                    {`Looks like you're solar system is empty.`}
                                </h2>
                                <OpenModalButton buttonText={<div>Join a Class to get started.</div>} modalComponent={<AddClassModal sessionUser={sessionUser} setCurrentUser={setCurrentUser} />}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    </div>
                        <div className={styles.classList}>
                            <OpenModalButton buttonText={<div className={styles.addClassSection}><div className={styles.addClassTab} >Join a Class&nbsp;<div className={styles.plusSymbol}><FaPlus /></div></div> </div>} modalComponent={<AddClassModal sessionUser={sessionUser} setCurrentUser={setCurrentUser}/>}/>
                            {classes?.map((cls, index) => (
                                <div key={cls?.id}>
                                    <button className={currClassIdx === index ? styles.activeTab : styles.classTab} onClick={() => switchClass(index, cls.class_id, sessionUser.id)}>{cls.class_name}</button>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
            <div className={styles.navbar}>
                <div className={styles.navbarGreeting}>
                    <div className={styles.navbarTop}>
                        <div className={styles.greetingTop}>
                            <div className={styles.greetingLogo}>
                                    <img src="/rocket.png"/>
                            </div>
                            <div className={styles.greetingMiddle}>
                                <h1>Hey there {first_name} {last_name}.</h1>
                                <div className={styles.greetingExplore}>
                                    <h2>{`You're currently exploring `}</h2>
                                    <h2>&nbsp;{`${currClass?.class_name}: ${currClass?.subject}`}</h2>
                                </div>
                            </div>
                        </div>
                        <Navigation sessionUser={sessionUser} cls={currClass} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={sessionUser?.role} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassStudentView;