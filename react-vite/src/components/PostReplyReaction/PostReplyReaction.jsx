import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReactionModal from "../ReactionModal/ReactionModal";
import { deleteReplyReactionThunk } from "../../redux/messageBoard";
import { addNewReplyReactionThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";

function PostReplyReaction({postReplyId, post_reply_reactions, sessionUserId, currMsgBoardId, classId}) {
    const dispatch = useDispatch()
    console.log("POST REPLY REACTIONS BEFORE", post_reply_reactions)

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

    console.log("POST REPLY REACTIONS AFTER", reactionsFilter(post_reply_reactions))

    const handleReaction = async (reactions) => {
        if (reactions[1].user_ids.includes(sessionUserId)) {
            const userIdx = reactions[1].user_ids.indexOf(sessionUserId);
            console.log("POST REACTIONS userId", sessionUserId)
            console.log("POST REACTIONS user index", userIdx)
            const reactionId = reactions[1].reaction_ids[userIdx]
            console.log("POST REACTIONS reaction id", reactionId)
            await dispatch(deleteReplyReactionThunk(reactionId, currMsgBoardId))
            socket.emit('updateMsgBoard', {room: classId})
        } else {
            const newReaction = {
                emoji: reactions[0],
                user_id: sessionUserId,
                post_reply_id: postReplyId
            }

            await dispatch(addNewReplyReactionThunk(newReaction, currMsgBoardId))
            socket.emit('updateMsgBoard', {room: classId})
        }

    }

    return (
        <div>
            <OpenModalButton
                buttonText="Add a reaction..."
                modalComponent={<ReactionModal sessionUserId={sessionUserId} postId={postReplyId} currMsgBoardId={currMsgBoardId} classId={classId} type="postReply"/>}
            />
            {reactionsFilter(post_reply_reactions)?.map((post_reply_reaction, index) => {
                return (
                <div key={index}>
                    <button onClick={() => handleReaction(post_reply_reaction)}>{post_reply_reaction[0]}{post_reply_reaction[1].count}</button>
                </div>
                )
            })}
        </div>
    )
}

export default PostReplyReaction;