import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import styles from "./LoginFormPage.module.css";
import LoginFormModal from "../LoginFormModal";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TfiRulerPencil } from "react-icons/tfi";
import { RiParentFill } from "react-icons/ri";

function LoginFormPage() {
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Navigate to="/classes" replace={true} />;

  return (
    <div className={`${styles.loginBody} ${sessionUser ? styles.backgroundPlaying : styles.backgroundPaused}`}>
      <div className={styles.loginGreeting}>
        <div className={styles.title}>
          <h1>Welcome to AstroClass</h1>
          <h3>{`We're here to help your students reach for the stars!`}</h3>
        </div>
        <div className={styles.signUpSection}>
          <div className={styles.signUp}>
            <h2>Sign Up as a...</h2>
          </div>
          <div className={styles.buttonLayout}>
            <OpenModalButton
              className={styles.signUpButton}
              modalComponent={<SignupFormModal role="teacher"/>} 
              buttonText={
                <div className={styles.buttonContent}>
                  <div className={styles.signUpIcon}><FaChalkboardTeacher /></div>
                  <div className={styles.signUpUser}>Teacher</div>
                </div>
              }
            />
            <OpenModalButton
              className={styles.signUpButton}
              modalComponent={<SignupFormModal role="student"/>} 
              buttonText={
                <div className={styles.buttonContent}>
                  <div className={styles.signUpIcon}><TfiRulerPencil /></div>
                  <div className={styles.signUpUser}>Student</div>
                </div>
              }
            />
            <OpenModalButton
              className={styles.signUpButton}
              modalComponent={<SignupFormModal role="parent"/>} 
              buttonText={
                <div className={styles.buttonContent}>
                  <div className={styles.signUpIcon}><RiParentFill /></div>
                  <div className={styles.signUpUser}>Parent</div>
                </div>
              }
            />
          </div>
          <div className={styles.loginSection}>
            <h3>{'Already a part of the team? Then'}&nbsp;</h3>
            <OpenModalButton 
              buttonText={
                <div className={styles.loginButton}>
                  <h3>{'log back in'}</h3>
                </div>
              } 
              modalComponent={<LoginFormModal />}
            /> 
            <h3>&nbsp;to get back to class!</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
