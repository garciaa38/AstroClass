import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostReplyThunk } from "../../redux/messageBoard";
import { deletePostReplyThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import styles from './PostReplyField.module.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

function PostReplyField({postReply, classId, currMsgBoardId}) {
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

    const deletePostReply = async (e) => {
        e.preventDefault()

        const deletedPostReply = {
            id: postReply.id,
            msgBoardId: currMsgBoardId
        }

        await dispatch(deletePostReplyThunk(deletedPostReply))
        socket.emit('updateMsgBoard', {room: classId})
    }

    if (!isEditing) {
        return (
            <div className={styles.postReplyField}>
                <div className={styles.postReply}>
                    <div className={styles.postReplyBox}>
                        <div className={styles.postReplyInfo}>
                            <div className={styles.username}>
                                Mr. Garcia
                            </div>
                            <div className={styles.postReplyDate}>
                                7/10/2024 10:36pm
                            </div>
                        </div>
                        <div className={styles.postReplyText}>
                            {postReply.text_field}
                        </div>
                    </div>
                    <div className={styles.postReplyButtons}>
                        <button onClick={() => setIsEditing(true)}><MdOutlineModeEdit /></button>
                        <button onClick={deletePostReply}><RiDeleteBin6Fill /></button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.postReplyFieldLayout}>
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
                    <button type='submit'>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default PostReplyField;