import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPostReplyThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import styles from './AddPostReplyForm.module.css'

function AddPostReplyForm({currPost, currMsgBoard, sessionUser}) {
    const dispatch = useDispatch()
    const [newPostReply, setNewPostReply] = useState("");
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

        if (stringTrim(newPostReply)) {
            if (newPostReply.length <= 0) {
                errors.newPostReply = "Cannot send an empty reply."
            }

            if (newPostReply.length > 250) {
                errors.newPostReply = "Reply cannot be longer than 250 characters."
            }
        } else {
            errors.newPostReply = "Cannot send an empty reply."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const createdPostReply = {
            text_field: newPostReply,
            user_id: sessionUser.id,
            post_id: currPost.id
        }
        // currPost.post_replies.push(createdPostReply)
        dispatch(addNewPostReplyThunk(createdPostReply, currMsgBoard.id))
        setNewPostReply("")
        
        socket.emit('updateClass', {room: currMsgBoard.class_id})
        socket.emit('updateMsgBoard', {room: currMsgBoard.class_id})
    }

    return (
        <div className={styles.postReplyFormLayout}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        placeholder="reply..."
                        value={newPostReply}
                        onChange={(e) => setNewPostReply(e.target.value)}
                        required
                    />
                </label>
                {formErrors.newPostReply && <p className="error">{formErrors.newPostReply}</p>}
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default AddPostReplyForm;