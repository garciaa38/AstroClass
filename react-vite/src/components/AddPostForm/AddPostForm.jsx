import { useState } from "react";
import { addNewPostThunk } from "../../redux/messageBoard";
import { useDispatch } from "react-redux";
import { socket } from "../../socket";
import styles from './AddPostForm.module.css';

function AddPostForm({currMsgBoard, setCurrMsgBoard, sessionUser}) {
    const dispatch = useDispatch()
    const [newPost, setNewPost] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
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

    return (
        <div className={styles.addPostForm}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        placeholder="Make an announcement to your class!"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default AddPostForm;