import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostThunk } from "../../redux/messageBoard";
import { deletePostThunk } from "../../redux/messageBoard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeletionWarning from "../DeletionWarning/DeletionWarning";
import { socket } from "../../socket";
import styles from "./PostField.module.css"
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

function PostField({post, classId, sessionUser}) {
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

    const checkUserPermission = (user) => {
        if (user?.role === "student") {
            if (user?.id !== post?.user_id) {
                return false
            }
        }
        return true
    }

    const postUserName = () => {
        if (post?.user_role === "student") {
            return `${post?.user_first_name} ${post?.user_last_name}`
        } else {
            return `${post?.user_suffix} ${post?.user_last_name}`
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
            if (textField?.length <= 0) {
                errors.editedPost = "Cannot send an empty post."
            }
            if (textField?.length >= 500) {
                errors.editedPost = "Post cannot be longer than 500 characters."
            }
        } else {
            errors.editedPost = "Cannot send an empty post."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const editedPost = {
            id: post?.id,
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
            id: post?.id,
            msgBoardId: post?.message_board_id
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
                                {postUserName()}
                            </div>
                            <div className={styles.postDate}>
                                {postDate(post.created_at)}
                            </div>
                        </div>
                        <div className={styles.postText}>
                            {post.text_field}
                        </div>
                    </div>
                    <div hidden={!checkUserPermission(sessionUser)} className={styles.postButtons}>
                        <button  hidden={!checkUserPermission(sessionUser)} onClick={() => setIsEditing(true)}><MdOutlineModeEdit /></button>
                        <div hidden={!checkUserPermission(sessionUser)}>
                            <OpenModalButton  hidden={!checkUserPermission(sessionUser)} buttonText={<RiDeleteBin6Fill/>} modalComponent={<DeletionWarning postId={post?.id} msgBoardId={post?.message_board_id} classId={classId} type={'post'}/>}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (isEditing) {
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
                    {formErrors.editedPost && <p className='error'>{formErrors.editedPost}</p>}
                    <div className={styles.editPostButtons}>
                        <button type='submit'>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostField;