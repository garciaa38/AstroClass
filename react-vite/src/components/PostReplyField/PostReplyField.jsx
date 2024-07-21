import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostReplyThunk } from "../../redux/messageBoard";
import { deletePostReplyThunk } from "../../redux/messageBoard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeletionWarning from "../DeletionWarning/DeletionWarning";
import { socket } from "../../socket";
import styles from './PostReplyField.module.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

function PostReplyField({postReply, classId, currMsgBoardId, sessionUser}) {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);
    const [textField, setTextField] = useState(postReply.text_field);
    const [formErrors, setFormErrors] = useState({});

    const stringTrim = (string) => {
        if (string.trim().length === 0) {
            return false;
        } else {
            return true;
        }
    }

    const checkUserPermission = (user) => {
        if (user?.role === "student") {
            if (user?.id !== postReply?.user_id) {
                return false
            }
        }
        return true
    }

    const postUserName = () => {
        if (postReply?.user_role === "student") {
            return `${postReply?.user_first_name} ${postReply?.user_last_name}`
        } else {
            return `${postReply?.user_suffix} ${postReply?.user_last_name}`
        }
    }

    const postDate = (date) => {
        const removeWeekday = date?.split(", ")[1]
        const justDate = removeWeekday?.split(" ")

        if (justDate) {
            return justDate[1] + " " + justDate[0] + ", " + justDate[2];
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        setFormErrors({});

        if (stringTrim(textField)) {
            if (textField.length <= 0) {
                errors.editedPostReply = "Cannot send an empty reply."
            }
        } else {
            errors.editedPostReply = "Cannot send an empty reply."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const editedPostReply = {
            id: postReply.id,
            text_field: textField,
            msgBoardId: currMsgBoardId
        }

        await dispatch(editPostReplyThunk(editedPostReply))
        setIsEditing(false)
        socket.emit('updateMsgBoard', {room: classId})
    }

    const cancelEdit = () => {
        setIsEditing(false);
        setTextField(postReply.text_field);
        setFormErrors({});
    }

    // const deletePostReply = async (e) => {
    //     e.preventDefault()

    //     const deletedPostReply = {
    //         id: postReply.id,
    //         msgBoardId: currMsgBoardId
    //     }

    //     await dispatch(deletePostReplyThunk(deletedPostReply))
    //     socket.emit('updateMsgBoard', {room: classId})
    // }

    if (!isEditing) {
        return (
            <div className={styles.postReplyField}>
                <div className={styles.postReply}>
                    <div className={styles.postReplyBox}>
                        <div className={styles.postReplyInfo}>
                            <div className={styles.username}>
                                {postUserName()}
                            </div>
                            <div className={styles.postReplyDate}>
                                {postDate(postReply?.created_at)}
                            </div>
                        </div>
                        <div className={styles.postReplyText}>
                            {postReply?.text_field}
                        </div>
                    </div>
                    <div hidden={!checkUserPermission(sessionUser)} className={styles.postReplyButtons}>
                        <button hidden={!checkUserPermission(sessionUser)} onClick={() => setIsEditing(true)}><MdOutlineModeEdit /></button>
                        <div hidden={!checkUserPermission(sessionUser)}>
                            <OpenModalButton hidden={!checkUserPermission(sessionUser)} buttonText={<RiDeleteBin6Fill />} modalComponent={<DeletionWarning postId={postReply.id} msgBoardId={currMsgBoardId} classId={classId} type={'reply'}/>}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.editPostReplyFieldLayout}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <textarea
                            type='text'
                            value={textField}
                            onChange={(e) => setTextField(e.target.value)}
                            required
                            placeholder="Enter reply..."
                        />
                    </label>
                    {formErrors.editedPostReply && <p>{formErrors.editedPostReply}</p>}
                    <div className={styles.editPostReplyButtons}>
                        <button type='submit'>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostReplyField;