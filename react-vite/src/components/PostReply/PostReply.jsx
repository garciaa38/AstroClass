import PostReplyReaction from "../PostReplyReaction/PostReplyReaction";
import PostReplyField from "../PostReplyField/PostReplyField";
import styles from './PostReply.module.css'

function PostReply({post_replies, classId, currMsgBoardId, sessionUserId}) {
    return (
        <div className={styles.postReplyList}>
            {post_replies?.map(post_reply => {
                return (
                    <div key={post_reply.id}>
                        <PostReplyField postReply={post_reply} classId={classId} currMsgBoardId={currMsgBoardId} />
                        <PostReplyReaction postReplyId={post_reply.id} post_reply_reactions={post_reply.post_reply_reactions} sessionUserId={sessionUserId} currMsgBoardId={currMsgBoardId} classId={classId}/>
                    </div>
                )
            })}
        </div>
    )
}

export default PostReply;