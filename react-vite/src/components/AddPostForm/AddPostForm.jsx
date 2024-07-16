import { useState } from "react";
import { addNewPostThunk } from "../../redux/messageBoard";
import { useDispatch } from "react-redux";
import { socket } from "../../socket";
import styles from './AddPostForm.module.css';

function AddPostForm({currMsgBoard, setCurrMsgBoard, sessionUser}) {
    const dispatch = useDispatch();
    const [newPost, setNewPost] = useState("");
    const [addingPost, setAddingPost] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    console.log("CURR MESSAGE BOARD", currMsgBoard.posts.length)

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

        if (stringTrim(newPost)) {
            if (newPost.length <= 0) {
                errors.newPost = "Cannot send an empty post."
            }
        } else {
            errors.newPost = "Cannot send an empty post."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return;
        }

        const createdPost = {
            text_field: newPost,
            user_id: sessionUser.id,
            message_board_id: currMsgBoard.id
        }
        currMsgBoard.posts.push(createdPost)
        dispatch(addNewPostThunk(createdPost))
        setNewPost("")
        
        socket.emit('updateClass', {room: currMsgBoard.class_id})
        socket.emit('updateMsgBoard', {room: currMsgBoard.class_id})
    }

    const expandPostFeature = () => {
        if (addingPost) {
            setAddingPost(false)
        } else {
            setAddingPost(true)
        }
    }

    return (
        <div className={styles.addPostLayout}>
            <div className={styles.addPostButtonLayout} onClick={expandPostFeature}>
                Click here to make an announcement to the class!
            </div>
            <div 
                className={addingPost ? styles.addPostFormLayout : styles.addPostFormLayoutOff}
            >
                <form 
                    onSubmit={handleSubmit} 
                    className={addingPost ? styles.addPostForm : styles.addPostFormOff}
                >
                    <label>
                        <textarea
                            className={addingPost ? styles.addPostTextArea : styles.addPostTextAreaOff}
                            type="text"
                            placeholder="Make an announcement to the class!"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                        />
                    </label>
                    {formErrors.newPost && <p className="error">{formErrors.newPost}</p>}
                    <div className={addingPost ? styles.postFormButtons : styles.postFormButtonsOff}>
                        <button type="submit">Send</button>
                        <button onClick={expandPostFeature}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPostForm;