import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal({role}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("Mr.");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const { closeModal } = useModal();

  const signUpMessage = () => {
    if (role === 'teacher') {
      return "Sign Up Teacher!"
    } else if (role === 'student') {
      return "Sign Up Student!"
    } else {
      return "Sign Up Parent!"
    }
  }

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

    if (role === 'teacher' || role === 'parent') {
      if (phoneNumber.length <= 9) {
        errors.phoneNumber = "Please input a valid phone number."
      } else if (isNaN(Number(phoneNumber))) {
        errors.phoneNumber = "Please input a valid phone number."
      }
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = "Confirm Password field must be the same as the Password field"
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return;
    }


    const serverResponse = await dispatch(
      thunkSignup({
        email,
        firstName,
        lastName,
        suffix,
        phoneNumber,
        password,
        role
      })
    );

    console.log("SERVER RESPONSE", serverResponse)

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>{signUpMessage()}</h1>
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
        {formErrors.email && <p>{formErrors.email}</p>}
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
        {formErrors.firstName && <p>{formErrors.firstName}</p>}
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
        {formErrors.lastName && <p>{formErrors.lastName}</p>}
        {role === 'teacher' && <label>
          Suffix
          <select value={suffix} onChange={(e) => setSuffix(e.target.value)}>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Miss.">Miss.</option>
            <option value="Mx.">Mx.</option>
          </select>
        </label>}
        {errors.suffix && <p>{errors.suffix}</p>}
        {formErrors.suffix && <p>{formErrors.suffix}</p>}
        {(role === 'teacher' || role === 'parent') && <label>
          Phone Number
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>}
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}
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
        {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
