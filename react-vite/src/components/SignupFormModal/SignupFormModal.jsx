import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import styles from "./SignupFormModal.module.css";

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

  const whiteSpaceCheck = (string) => {
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) === " ") {
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
      if (firstName.length <= 2 || firstName.length > 20) {
        errors.firstName = "First Name must be between 3 and 20 characters."
      }
    } else {
      errors.firstName = "Please don't include spaces."
    }

    if (whiteSpaceCheck(lastName)) {
      if (lastName.length <= 2 || lastName.length > 20) {
        errors.lastName = "Last Name must be between 3 and 20 characters."
      }
    } else {
      errors.lastName = "Please don't include spaces."
    }

    if (role === 'teacher' || role === 'parent') {
      if (whiteSpaceCheck(phoneNumber)) {
        if (phoneNumber.length <= 9) {
          errors.phoneNumber = "Please input a valid phone number."
        } else if (isNaN(Number(phoneNumber))) {
          errors.phoneNumber = "Please input a valid phone number."
        }
      } else {
        errors.phoneNumber = "Please don't include spaces."
      }
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

    
    if (serverResponse) {
      console.log("SERVER RESPONSE", serverResponse)
      const backEndErrors = {};
      backEndErrors.email = "This email already exists."
      setErrors(backEndErrors);
    } else {
      closeModal();
    }
  };

  if (role === 'parent') {
    return (
      <div className={styles.signUpFormLayout}>
        <h1>Parent Features Coming Soon!</h1>
      </div>
    )
  } else {
    return (
      <div className={styles.signUpFormLayout}>
        <h1>{signUpMessage()}</h1>
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
          {role === 'teacher' && <label className={styles.formInput}>
            Honorific
            <select className={styles.honorific} value={suffix} onChange={(e) => setSuffix(e.target.value)}>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Miss.">Miss.</option>
              <option value="Mx.">Mx.</option>
            </select>
          </label>}
          {errors.suffix && <p className="error">{errors.suffix}</p>}
          {formErrors.suffix && <p className="error">{formErrors.suffix}</p>}
          {(role === 'teacher' || role === 'parent') && <label className={styles.formInput}>
            Phone Number
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>}
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          {formErrors.phoneNumber && <p className="error">{formErrors.phoneNumber}</p>}
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
          <div className={styles.signUpButton}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupFormModal;
