import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReactionModal from "../ReactionModal/ReactionModal";
import { deleteReplyReactionThunk } from "../../redux/messageBoard";
import { addNewReplyReactionThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import styles from './PostReplyReaction.module.css';
import { MdAddReaction } from "react-icons/md";

function PostReplyReaction({postReplyId, post_reply_reactions, sessionUserId, currMsgBoardId, classId}) {
    const dispatch = useDispatch()

    const reactionsFilter = (reactionsArr) => {
        const emojiFilter = reactionsArr?.reduce((acc, obj) => {
            if (!acc[obj.emoji]) {
                acc[obj.emoji] = { count: 0, user_ids: [], reaction_ids: [] };
            }
            acc[obj.emoji].count += 1;
            acc[obj.emoji].user_ids.push(obj.user_id);
            acc[obj.emoji].reaction_ids.push(obj.id);
            return acc;
        }, {})

        if (emojiFilter) {
            return Object.entries(emojiFilter)
        } else {
            return [];
        }
    }

    const handleReaction = async (reactions) => {
        if (reactions[1]?.user_ids?.includes(sessionUserId)) {
            const userIdx = reactions[1]?.user_ids?.indexOf(sessionUserId);
            const reactionId = reactions[1]?.reaction_ids[userIdx]
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
        <div className={styles.reactionLayout}>
            <div className={styles.reactionList}>
                {reactionsFilter(post_reply_reactions)?.map((post_reply_reaction, index) => {
                    return (
                        <div className={styles.emojiBox} key={index}>
                            <button onClick={() => handleReaction(post_reply_reaction)}>{post_reply_reaction[0]}{post_reply_reaction[1].count}</button>
                        </div>
                    )
                })}
            </div>
            <div className={styles.addReactionButton}>
                <OpenModalButton
                    buttonText={<div className={styles.reactButton}><div>React</div><MdAddReaction /></div>}
                    modalComponent={<ReactionModal currReactions={reactionsFilter(post_reply_reactions)} sessionUserId={sessionUserId} postId={postReplyId} currMsgBoardId={currMsgBoardId} classId={classId} type="postReply"/>}
                />
            </div>
        </div>
    )
}

export default PostReplyReaction;