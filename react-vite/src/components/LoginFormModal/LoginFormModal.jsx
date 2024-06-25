import { useState } from "react";
import { thunkLogin, thunkDemoLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

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
    <>
      <h1>Log In!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
      <button onClick={demoTeacherLogin}>Demo Teacher</button>
      <button onClick={demoStudentLogin}>Demo Student</button>
    </>
  );
}

export default LoginFormModal;
