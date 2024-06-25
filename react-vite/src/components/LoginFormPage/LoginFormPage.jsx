import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./LoginForm.css";
import LoginFormModal from "../LoginFormModal";

function LoginFormPage() {
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Navigate to="/classes" replace={true} />;

  return (
    <>
      <h1>Welcome to AstroClass!</h1>
      <h2>Sign Up as a...</h2>
      <OpenModalButton
        buttonText="Teacher"
        modalComponent={<SignupFormModal role="teacher"/>}
      />
      <OpenModalButton
        buttonText="Student"
        modalComponent={<SignupFormModal role="student"/>}
      />
      <OpenModalButton
        buttonText="Parent"
        modalComponent={<SignupFormModal role="parent"/>}
      />
      <h3>Already a part of the team? Then <OpenModalButton buttonText="log back in" modalComponent={<LoginFormModal />}/> to get back to class!</h3>
    </>
  );
}

export default LoginFormPage;
