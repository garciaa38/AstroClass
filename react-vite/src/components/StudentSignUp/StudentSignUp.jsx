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

    const whiteSpaceCheck = (string) => {
        for (let i = 0; i < string?.length; i++) {
            if (string?.charAt(i) === " ") {
                return false;
            }
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        setFormErrors({});
        setErrors({});

        if (whiteSpaceCheck(email)) {
            if (!email.split("@")[1]?.split(".")[1]) {
                errors.email = "Please include a valid email address."
            }
        } else {
            errors.email = "Please don't include spaces."
        }

        if (whiteSpaceCheck(firstName)) {
            if (firstName?.length <= 2 || firstName?.length > 20) {
                errors.firstName = "First Name must be between 3 and 20 characters."
            }
        } else {
            errors.firstName = "Please don't include spaces."
        }

        if (whiteSpaceCheck(lastName)) {
            if (lastName?.length <= 2 || lastName?.length > 20) {
                errors.lastName = "Last Name must be between 3 and 20 characters."
            }
        } else {
            errors.lastName = "Please don't include spaces."
        }
        
        if (!whiteSpaceCheck(password)) {
            errors.password = "Please don't include spaces."
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
        
        if (!serverResponse.id) {
            const backEndErrors = {}
            backEndErrors.email = "This email already exists."
            setErrors(backEndErrors);
        } else {
            const addStudentRes = await dispatch(addStudentToClassThunk(classId, serverResponse.id))
            if (addStudentRes?.error) {
                const backEndErrors = {}
                backEndErrors.student = "Student already enrolled in class."
                setErrors(backEndErrors);
            } else {
                closeModal();
                const res = await dispatch(fetchAllStudentsThunk())
                await setAllStudentsState(res)
                socket.emit('updateClass', { room: classId })
                socket.emit('updateStudents', { room: classId })
            }
        }
    };

    return (
        <div className={styles.signUpFormLayout}>
        {errors.server && <p>{errors.server}</p>}
        {errors.student && <p className="error">{errors.student}</p>}
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
            {formErrors.email && <p className="error">{formErrors.email}</p>}
            <label className={styles.formInput}>
                First Name
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            </label>
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
            <label className={styles.formInput}>
                Last Name
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </label>
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
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
            {formErrors.password && <p className="error">{formErrors.password}</p>}
            <label className={styles.formInput}>
                Confirm Password
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </label>
            {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
            <div className={styles.studentSignUpButton}>
                <button type="submit">Sign Up</button>
            </div>
        </form>
        </div>
    );

}

export default StudentSignUp;