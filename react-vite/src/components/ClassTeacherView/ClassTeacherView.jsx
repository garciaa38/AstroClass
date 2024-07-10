import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignOutModal from "../SignOutModal/SignOutModal";
import AddClassModal from "../AddClassModal/AddClassModal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClassesThunk, fetchClassByIdThunk } from "../../redux/classes";
import Navigation from "../Navigation/Navigation";
import { socket } from "../../socket";
import { fetchAllStudentsThunk } from "../../redux/students";
import { fetchMessageBoardThunk } from "../../redux/messageBoard";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styles from "./ClassTeacherView.module.css";

function ClassTeacherView({sessionUser, navigate, classes}) {
    const dispatch = useDispatch();
    const {last_name, suffix} = sessionUser;
    const [currClassIdx, setCurrClassIdx] = useState(0);
    const [prevClassIdx, setPrevClassIdx] = useState(0);
    const allStudents = useSelector((state) => Object.values(state.students));
    const currClass = classes[currClassIdx];
    const prevClass = classes[prevClassIdx];
    const [allStudentsState, setAllStudentsState] = useState(allStudents);
    const [sideBarOpen, setSideBarOpen] = useState(false);
    console.log("ALL STUDENTS", allStudents);

    useEffect(() => {
        
        socket.emit('join_room', { room: `${currClass?.id}` });
        socket.emit('leave_room', { room: `${prevClass?.id}` });

        }, [currClass?.id, prevClass?.id]);
    
        useEffect(() => {
            const fetchClass = (data) => {
                if (data['room'] === currClass?.id) {
                    dispatch(fetchClassByIdThunk(sessionUser.id, data.room))
                }
            }

            const fetchClasses = (data) => {
                if (data['type'] === 'delete') {
                    setPrevClassIdx(currClassIdx)
                    setCurrClassIdx(0)
                }
                dispatch(fetchAllClassesThunk(sessionUser.id))
            }

            const fetchStudents = () => {
                dispatch(fetchAllStudentsThunk())
            }

            const fetchMsgBoard = (data) => {
                if (data['room'] === currClass?.id) {
                    dispatch(fetchMessageBoardThunk(data['room']))
                }
            }
    
            socket.on('updateClass', (data) => fetchClass(data));
            socket.on('updateClasses', (data) => fetchClasses(data));
            socket.on('updateStudents', (data) => fetchStudents(data));
            socket.on('updateMsgBoard', (data) => fetchMsgBoard(data))
        
            return () => {
                socket.off('updateClass', fetchClass)
                socket.off('updateClasses', fetchClasses)
                socket.off('updateStudents', fetchStudents)
                socket.off('updateMsgBoard', fetchMsgBoard)
            };
        }, [dispatch, sessionUser.id, currClassIdx, currClass?.id])



    const switchClass = (idx) => {
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
                    buttonText="Add a class now to get started!"
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
                            <div>Class Settings</div><div className={styles.downArrow}><MdOutlineKeyboardArrowDown /></div>
                        </div>
                        <div className={styles.classList}>
                            <OpenModalButton buttonText="Add a class" modalComponent={<AddClassModal sessionUser={sessionUser} classId={currClass?.id} />}/>
                            {classes?.map((cls, index) => (
                                <div key={cls?.id}>
                                    {cls.class_name.length > 0 && <button onClick={() => switchClass(index)}>{cls.class_name}</button>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.signOutButton}>
                        <OpenModalButton buttonText="Sign Out" modalComponent={<SignOutModal navigate={navigate} />}/>
                    </div>
                </div>
            </div>
            <div className={styles.navbar}>
                <div className={styles.navbarGreeting}>
                    <div className={styles.navbarTop}>
                        <h1>Hey there {suffix} {last_name}.</h1>
                        <h2>You are currently signed in as a teacher!</h2>
                        <Navigation sessionUser={sessionUser} cls={currClass} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={sessionUser.role} allStudentsState={allStudentsState} setAllStudentsState={setAllStudentsState} allStudents={allStudents}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassTeacherView;