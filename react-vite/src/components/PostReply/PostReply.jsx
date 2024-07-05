import PostReplyReaction from "../PostReplyReaction/PostReplyReaction";
import PostReplyField from "../PostReplyField/PostReplyField";

function PostReply({post_replies, classId, currMsgBoardId}) {
    return (
        <div>
            {post_replies?.map(post_reply => {
                return (
                    <div key={post_reply.id}>
                        <PostReplyField postReply={post_reply} classId={classId} currMsgBoardId={currMsgBoardId} />
                        <PostReplyReaction post_reply_reactions={post_reply.post_reply_reactions}/>
                    </div>
                )
            })}
        </div>
    )
}

export default PostReply;