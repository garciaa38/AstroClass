import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostReplyThunk } from "../../redux/messageBoard";
import { deletePostReplyThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";

function PostReplyField({postReply, classId, currMsgBoardId}) {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);
    const [textField, setTextField] = useState(postReply.text_field)

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        setIsEditing(false)
        setTextField(postReply.text_field)
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
            <div>
                <div>{postReply.text_field}</div>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={deletePostReply}>Delete</button>
            </div>
        )
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            value={textField}
                            onChange={(e) => setTextField(e.target.value)}
                            required
                            placeholder="Enter reply..."
                        />
                    </label>
                    <button type='submit'>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default PostReplyField;