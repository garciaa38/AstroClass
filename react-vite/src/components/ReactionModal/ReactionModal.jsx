import { addNewReactionThunk } from "../../redux/messageBoard";
import { addNewReplyReactionThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

function ReactionModal({sessionUserId, postId, currMsgBoardId, classId, type}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const emojis = [
        "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍",
        "😘", "😗", "😙", "😚", "🙂", "🤗", "🤩", "😏", "😺", "😸", "😹", "😻",
        "😼", "😽", "🙃", "😌", "😛", "😜",
        "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "👏", "🙌", "🙏",
        "📚", "✏️", "🖍️", "📓", "📝", "📖", "📒", "📕", "📗", "📘", "📙", "📜",
        "🖊️", "🖋️", "✒️", "📎", "📐", "📏", "📊", "📈", "📉", "🔍", "🔎", "🧮",
        "🧑‍🏫", "👩‍🏫", "👨‍🏫", "🎓", "🏫", "🚌"
    ];

    const addEmoji = async emoji => {
        
        if (type === "post") {
            const newReaction = {
                emoji,
                user_id: sessionUserId,
                post_id: postId
            }
            await dispatch(addNewReactionThunk(newReaction, currMsgBoardId))
            socket.emit('updateMsgBoard', {room: classId})
            closeModal()
        } else if (type === "postReply") {
            const newReaction = {
                emoji,
                user_id: sessionUserId,
                post_reply_id: postId
            }
            await dispatch(addNewReplyReactionThunk(newReaction, currMsgBoardId))
            socket.emit('updateMsgBoard', {room: classId})
            closeModal()
        }

    }
    
    return (
        <div>
            {emojis.map((emoji, index) => {
                return (
                    <div key={index}>
                        <button onClick={() => addEmoji(emoji)}>{emoji}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ReactionModal;