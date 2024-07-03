import { useState } from "react";
import { addNewPostThunk } from "../../redux/messageBoard";
import { useDispatch } from "react-redux";

function AddPostForm({currMsgBoard, setCurrMsgBoard, sessionUser}) {
    const dispatch = useDispatch()
    const [newPost, setNewPost] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ADDING POST", currMsgBoard)
        const createdPost = {
            text_field: newPost,
            user_id: sessionUser.id,
            message_board_id: currMsgBoard.id
        }

        const updatedMsgBoard = await dispatch(addNewPostThunk(createdPost))
        console.log("ADDING POST child", updatedMsgBoard)
        setNewPost("")
        await setCurrMsgBoard(updatedMsgBoard)
    }

    return (
        <div>
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