import { useState } from "react";
import { thunkLogin, thunkDemoLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import styles from "./LoginForm.module.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoTeacherLogin = async (e) => {
    e.preventDefault();

    await dispatch(
      thunkDemoLogin({
        role: 'teacher'
      })
    );
    closeModal();
  }

  const demoStudentLogin = async (e) => {
    e.preventDefault();

    await dispatch(
      thunkDemoLogin({
        role: 'student'
      })
    );
    closeModal();
  }

  return (
    <div className={styles.logInFormLayout}>
      <h1>Log In!</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.formInput}>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label className={styles.formInput}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <div className={styles.loginButton}>
          <button type="submit">Log In</button>
        </div>
      </form>
      <div className={styles.demoButtons}>
        <button onClick={demoTeacherLogin}>Demo Teacher</button>
        <button onClick={demoStudentLogin}>Demo Student</button>
      </div>
    </div>
  );
}

export default LoginFormModal;
