import PostReplyReaction from "../PostReplyReaction/PostReplyReaction";

function PostReply({post_replies}) {
    return (
        <div>
            {post_replies?.map(post_reply => {
                return (
                    <div key={post_reply.id}>
                        <div>{post_reply.text_field}</div>
                        <PostReplyReaction post_reply_reactions={post_reply.post_reply_reactions}/>
                    </div>
                )
            })}
        </div>
    )
}

export default PostReply;