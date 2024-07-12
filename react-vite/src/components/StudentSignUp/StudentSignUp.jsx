import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkStudentSignup } from "../../redux/session";
import { addStudentToClassThunk } from "../../redux/classes";
import { fetchAllStudentsThunk } from "../../redux/students";
import { socket } from "../../socket";
import styles from "./StudentSignUp.module.css";

function StudentSignUp({classId, setAllStudentsState}) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        setFormErrors({});

        if (!email.split("@")[1]?.split(".")[1]) {
            errors.email = "Please include a valid email address."
        }

        if (firstName.length <= 2 || firstName.length > 20) {
            errors.firstName = "First Name must be between 3 and 20 characters."
        }

        if (lastName.length <= 2 || lastName.length > 20) {
            errors.lastName = "Last Name must be between 3 and 20 characters."
        }
    
        if (password !== confirmPassword) {
            errors.confirmPassword = "Confirm Password field must be the same as the Password field"
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }
    
        const serverResponse = await dispatch(
            thunkStudentSignup({
                email,
                firstName,
                lastName,
                password,
                role: 'student'
            })
        );
    
        console.log("SERVER RESPONSE", serverResponse)
    
        if (!serverResponse.id) {
            setErrors(serverResponse);
        } else {
            await dispatch(addStudentToClassThunk(classId, serverResponse.id))
            const res = await dispatch(fetchAllStudentsThunk())
            await setAllStudentsState(res)
            socket.emit('updateClass', { room: classId })
            socket.emit('updateStudents', { room: classId })
            closeModal();
        }
    };

    return (
        <div className={styles.signUpFormLayout}>
        {errors.server && <p>{errors.server}</p>}
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
            {errors.email && <p>{errors.email}</p>}
            {formErrors.email && <p>{formErrors.email}</p>}
            <label className={styles.formInput}>
                First Name
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            </label>
            {errors.firstName && <p>{errors.firstName}</p>}
            {formErrors.firstName && <p>{formErrors.firstName}</p>}
            <label className={styles.formInput}>
                Last Name
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </label>
            {errors.lastName && <p>{errors.lastName}</p>}
            {formErrors.lastName && <p>{formErrors.lastName}</p>}
            <label className={styles.formInput}>
                Password
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
            {errors.password && <p>{errors.password}</p>}
            <label className={styles.formInput}>
                Confirm Password
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </label>
            {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
            <div className={styles.studentSignUpButton}>
                <button type="submit">Sign Up</button>
            </div>
        </form>
        </div>
    );

}

export default StudentSignUp;