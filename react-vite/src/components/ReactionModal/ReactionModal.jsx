import { addNewReactionThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

function ReactionModal({sessionUserId, postId, currMsgBoardId, classId}) {
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
        const newReaction = {
            emoji,
            user_id: sessionUserId,
            post_id: postId
        }

        await dispatch(addNewReactionThunk(newReaction, currMsgBoardId))
        socket.emit('updateMsgBoard', {room: classId})
        closeModal()
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