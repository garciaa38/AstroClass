import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import EditClass from "../EditClass/EditClass";
import EditRewardsandFeedback from "../EditRewardsandFeedback/EditRewardsandFeedback";
import SignOutModal from "../SignOutModal/SignOutModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styles from "./Navigation.module.css";

function ProfileButton({ navigate, cls, currClassIdx, setCurrClassIdx, rewards, feedback }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  console.log("USER", user)

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div className={styles.settingsDropDownLayout}>
      <button onClick={toggleMenu}>
        <div className={showMenu ? styles.settingsDropDownButton : styles.settingsDropDownButtonClosed}>
          <h3>
            Class Settings&nbsp;&nbsp;
            {showMenu && <MdOutlineKeyboardArrowUp />}
            {!showMenu && <MdOutlineKeyboardArrowDown />}
          </h3>
        </div>
      </button>
      {showMenu && (
        <ul className={showMenu ? styles.settingsDropDown : styles.settingsDropDownClosed} ref={ulRef}>
            <div className={styles.settingsDropdownList}>
              <li>{`Hey there ${user.suffix} ${user.last_name}`}</li>
              <li>
                <OpenModalButton buttonText="Update Class" modalComponent={<EditClass cls={cls} currClassIdx={currClassIdx} setCurrClassIdx={setCurrClassIdx} rewards={rewards} feedback={feedback} />}/>
              </li>
              <li><OpenModalButton buttonText="Update Rewards and Feedback" modalComponent={<EditRewardsandFeedback cls={cls} rewards={rewards} feedback={feedback} />}/></li>
              <li>
                <OpenModalButton buttonText="Sign Out" modalComponent={<SignOutModal navigate={navigate} />}/>
              </li>
            </div>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
