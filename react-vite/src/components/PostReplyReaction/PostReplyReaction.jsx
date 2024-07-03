function PostReplyReaction({post_reply_reactions}) {
    return (
        <div>
            {post_reply_reactions.map(post_reply_reaction => {
                return(
                    <div key={post_reply_reaction.id}>
                        <div>{post_reply_reaction.emoji}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default PostReplyReaction;