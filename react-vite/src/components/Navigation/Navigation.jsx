import "./Navigation.css";
import ClassInfo from "../ClassInfo/ClassInfo";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddStudentModal from "../AddStudentModal/AddStudentModal";
import MessageBoard from "../MessageBoard/MessageBoard";
import { useState } from "react";

function Navigation({cls, currClassIdx, setCurrClassIdx, role, allStudentsState, setAllStudentsState, allStudents}) {
  const [view, setView] = useState("class")
  console.log("CURRENT CLASS", cls)
  return (
    <>
      <button onClick={() => setView("class")}>Class</button>
      <button onClick={() => setView("message-board")}>Message Board</button>
      {view === "class" &&
      <div>
      <ClassInfo cls={cls} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} role={role} allStudentsState={allStudentsState} setAllStudentsState={setAllStudentsState} />
      <OpenModalButton buttonText="Add a Student!" modalComponent={<AddStudentModal cls={cls} setAllStudentsState={setAllStudentsState} allStudents={allStudents}/>}/></div>}
      {view === "message-board" &&
      <div>
      <MessageBoard msgBoard={cls.message_board}/>
      </div>}
    </>
  );
}

export default Navigation;
