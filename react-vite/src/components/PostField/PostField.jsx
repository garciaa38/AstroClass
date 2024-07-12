import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostThunk } from "../../redux/messageBoard";
import { deletePostThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import styles from "./PostField.module.css"
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

function PostField({post, classId}) {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);
    const [textField, setTextField] = useState(post.text_field);
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
                errors.editedPost = "Cannot send an empty post."
            }
        } else {
            errors.editedPost = "Cannot send an empty post."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const editedPost = {
            id: post.id,
            text_field: textField
        }

        await dispatch(editPostThunk(editedPost))
        setIsEditing(false)
        socket.emit('updateMsgBoard', {room: classId})
    }

    const cancelEdit = () => {
        setIsEditing(false)
        setTextField(post.text_field)
        setFormErrors({});
    }

    const deletePost = async (e) => {
        e.preventDefault()

        const deletedPost = {
            id: post.id,
            msgBoardId: post.message_board_id
        }

        await dispatch(deletePostThunk(deletedPost))
        socket.emit('updateMsgBoard', {room: classId})
    }

    if (!isEditing) {
        return (
            <div className={styles.postField}>
                <div className={styles.post}>
                    <div className={styles.postbox}>
                        <div className={styles.postInfo}>
                            <div className={styles.username}>
                                Mr. Garcia
                            </div>
                            <div className={styles.postDate}>
                                7/10/2024 10:36pm
                            </div>
                        </div>
                        <div className={styles.postText}>
                            {post.text_field}
                        </div>
                    </div>
                    <div className={styles.postButtons}>
                        <button onClick={() => setIsEditing(true)}><MdOutlineModeEdit /></button>
                        <button onClick={deletePost}><RiDeleteBin6Fill /></button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.postField}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <textarea
                            type='text'
                            value={textField}
                            onChange={(e) => setTextField(e.target.value)}
                            required
                            placeholder="Enter post..."
                        />
                    </label>
                    {formErrors.editedPost && <p>{formErrors.editedPost}</p>}
                    <button type='submit'>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default PostField;