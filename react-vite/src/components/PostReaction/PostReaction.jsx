import { useDispatch } from "react-redux";
import { deleteReactionThunk } from "../../redux/messageBoard";
import { addNewReactionThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";

function PostReaction({postId, post_reactions, sessionUserId, currMsgBoardId, classId}) {
    const dispatch = useDispatch()
    console.log("POST REACTIONS BEFORE", post_reactions)

    const reactionsFilter = (reactionsArr) => {
        const emojiFilter = reactionsArr.reduce((acc, obj) => {
            if (!acc[obj.emoji]) {
                acc[obj.emoji] = { count: 0, user_ids: [], reaction_ids: [] };
            }
            acc[obj.emoji].count += 1;
            acc[obj.emoji].user_ids.push(obj.user_id);
            acc[obj.emoji].reaction_ids.push(obj.id);
            return acc;
        }, {})

        return Object.entries(emojiFilter)
    }

    console.log("POST REACTIONS AFTER", reactionsFilter(post_reactions))

    const handleReaction = async (reactions) => {
        if (reactions[1].user_ids.includes(sessionUserId)) {
            const userIdx = reactions[1].user_ids.indexOf(sessionUserId);
            console.log("POST REACTIONS userId", sessionUserId)
            console.log("POST REACTIONS user index", userIdx)
            const reactionId = reactions[1].reaction_ids[userIdx]
            console.log("POST REACTIONS reaction id", reactionId)
            await dispatch(deleteReactionThunk(reactionId, currMsgBoardId))
            socket.emit('updateMsgBoard', {room: classId})
        } else {
            const newReaction = {
                emoji: reactions[0],
                user_id: sessionUserId,
                post_id: postId
            }

            await dispatch(addNewReactionThunk(newReaction, currMsgBoardId))
            socket.emit('updateMsgBoard', {room: classId})
        }

    }

    return (
        <div>
            {reactionsFilter(post_reactions)?.map((post_reaction, index) => {
                return (
                <div key={index}>
                    <button onClick={() => handleReaction(post_reaction)}>{post_reaction[0]}{post_reaction[1].count}</button>
                </div>
                )
            })}
        </div>
    )
}

export default PostReaction;