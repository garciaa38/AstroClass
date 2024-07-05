import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPostReplyThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";

function AddPostReplyForm({currPost, currMsgBoard, sessionUser}) {
    const dispatch = useDispatch()
    const [newPostReply, setNewPostReply] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdPostReply = {
            text_field: newPostReply,
            user_id: sessionUser.id,
            post_id: currPost.id
        }
        currPost.post_replies.push(createdPostReply)
        dispatch(addNewPostReplyThunk(createdPostReply, currMsgBoard.id))
        setNewPostReply("")
        
        socket.emit('updateClass', {room: currMsgBoard.class_id})
        socket.emit('updateMsgBoard', {room: currMsgBoard.class_id})
    }

    return (
        <div>
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
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default AddPostReplyForm;