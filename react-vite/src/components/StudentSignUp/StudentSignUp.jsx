import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkStudentSignup } from "../../redux/session";
import { addStudentToClassThunk } from "../../redux/classes";

function StudentSignUp({classId}) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            return setErrors({
            confirmPassword:
                "Confirm Password field must be the same as the Password field",
            });
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
            closeModal();
        }
    };

    return (
        <>
        {errors.server && <p>{errors.server}</p>}
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
                First Name
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            </label>
            {errors.firstName && <p>{errors.firstName}</p>}
            <label>
                Last Name
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </label>
            {errors.lastName && <p>{errors.lastName}</p>}
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
            <label>
                Confirm Password
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </label>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button type="submit">Sign Up</button>
        </form>
        </>
    );

}

export default StudentSignUp;