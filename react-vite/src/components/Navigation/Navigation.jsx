import styles from "./Navigation.module.css";
import ClassInfo from "../ClassInfo/ClassInfo";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddStudentModal from "../AddStudentModal/AddStudentModal";
import MessageBoard from "../MessageBoard/MessageBoard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessageBoardThunk } from "../../redux/messageBoard";

function Navigation({sessionUser, cls, currClassIdx, setCurrClassIdx, role, allStudentsState, setAllStudentsState, allStudents}) {
  const dispatch = useDispatch()
  const [view, setView] = useState("class")
  const messageBoard = Object.values(useSelector((state) => state.messageBoard))
  const [currMsgBoard, setCurrMsgBoard] = useState(messageBoard[0])
  const currentMsgBoard = messageBoard?.find(msgB => {
    if (role === 'teacher') {
      return msgB.class_id === cls.id
    } else {
      return msgB.class_id === cls.class_id
    }
  })

  useEffect(() => {
    if (role === 'student') {
      dispatch(fetchMessageBoardThunk(cls?.class_id))
    } else {
      dispatch(fetchMessageBoardThunk(cls?.id))
    }
  }, [dispatch, cls?.id, cls?.class_id, role])
  
  return (
    <div className={styles.navLayout}>
      <div className={styles.navButtons}>
        <div className={styles.navButtonsContainer}>
          <button className={view === 'class' ? styles.activeTab : ""} onClick={() => setView("class")}>Class</button>
          <button className={view === 'message-board' ? styles.activeTab : ""} onClick={() => setView("message-board")}>Message Board</button>
        </div>
      </div>
      {view === "class" &&
      <div>
      <ClassInfo sessionUser={sessionUser} cls={cls} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={role} allStudentsState={allStudents} setAllStudentsState={setAllStudentsState} />
      </div>}
      {view === "message-board" &&
      <div>
      <MessageBoard currMsgBoard={currentMsgBoard} sessionUser={sessionUser} setCurrMsgBoard={setCurrMsgBoard}/>
      </div>}
    </div>
  );
}

export default Navigation;
