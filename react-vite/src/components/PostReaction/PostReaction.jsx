import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReactionModal from "../ReactionModal/ReactionModal";
import { deleteReactionThunk } from "../../redux/messageBoard";
import { addNewReactionThunk } from "../../redux/messageBoard";
import { socket } from "../../socket";
import styles from './PostReaction.module.css';
import { MdAddReaction } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";

function PostReaction({showReplies, setShowReplies, postId, post_reactions, sessionUserId, currMsgBoardId, classId}) {
    const dispatch = useDispatch()
    console.log("POST REACTIONS BEFORE", post_reactions)

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

    const switchReplies = () => {
        if (showReplies === true) {
            setShowReplies(false)
        } else {
            setShowReplies(true)
        }
    }

    return (
        <div className={styles.reactionLayout}>
            <div className={styles.reactionList}>
                {reactionsFilter(post_reactions)?.map((post_reaction, index) => {
                    console.log("POST REACTION", post_reaction)
                    return (
                        <div className={styles.emojiBox} key={index}>
                            <button onClick={() => handleReaction(post_reaction)}><div className={styles.emojiBoxContent}><div>{post_reaction[0]}</div><div>{post_reaction[1].count}</div></div></button>
                        </div>
                    )
                })}
            </div>
            <div className={styles.belowPostButtons}>
                <div className={styles.addReactionButton}>
                    <OpenModalButton
                        buttonText={<div className={styles.reactButton}><div>React</div><MdAddReaction /></div>}
                        modalComponent={<ReactionModal currReactions={reactionsFilter(post_reactions)} sessionUserId={sessionUserId} postId={postId} currMsgBoardId={currMsgBoardId} classId={classId} type="post"/>}
                    />
                </div>
                <div className={styles.addCommentButton}>
                    <button className={styles.commentButton} onClick={switchReplies}>Reply <FaCommentDots /></button>
                </div>
            </div>
        </div>
    )
}

export default PostReaction;