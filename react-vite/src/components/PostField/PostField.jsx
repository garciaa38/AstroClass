import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPostThunk } from "../../redux/messageBoard";
import { deletePostThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";

function PostField({post, classId}) {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);
    const [textField, setTextField] = useState(post.text_field)

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <div>
                <div>{post.text_field}</div>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={deletePost}>Delete</button>
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
                            placeholder="Enter post..."
                        />
                    </label>
                    <button type='submit'>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default PostField;