import "./Navigation.css";
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

  useEffect(() => {
    dispatch(fetchMessageBoardThunk(cls?.id))
  }, [dispatch, cls?.id])
  
  return (
    <>
      <button onClick={() => setView("class")}>Class</button>
      <button onClick={() => setView("message-board")}>Message Board</button>
      {view === "class" &&
      <div>
      <ClassInfo sessionUser={sessionUser} cls={cls} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={role} allStudentsState={allStudents} setAllStudentsState={setAllStudentsState} />
      {role === 'teacher' && <OpenModalButton buttonText="Add a Student!" modalComponent={<AddStudentModal cls={cls} setAllStudentsState={setAllStudentsState} allStudents={allStudents} allStudentsState={allStudentsState}/>}/>}</div>}
      {view === "message-board" &&
      <div>
      <MessageBoard currMsgBoard={messageBoard[0]} sessionUser={sessionUser} setCurrMsgBoard={setCurrMsgBoard}/>
      </div>}
    </>
  );
}

export default Navigation;
