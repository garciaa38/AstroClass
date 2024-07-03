function MessageBoard({msgBoard}) {
    console.log("CURRENT CLASS MESSAGE BOARD", msgBoard)
    const allPosts = msgBoard[0].posts
    console.log("CURRENT CLASS POSTS", allPosts)
    return (
        <div>
            {allPosts.map(post => {
                return (
                    <div key={post.id}>
                        <div>{post.text_field}</div>
                        {post.post_reactions.map(post_reaction => {
                            return (
                            <div key={post_reaction.id}>
                                <div>{post_reaction.emoji}</div>
                            </div>
                            )
                        })}
                        {post.post_replies.map(post_reply => {
                            return (
                                <div key={post_reply.id}>
                                    <div>{post_reply.text_field}</div>
                                    {post_reply.post_reply_reactions.map(post_reply_reaction => {
                                        return (
                                            <div key={post_reply_reaction.id}>
                                                <div>{post_reply_reaction.emoji}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default MessageBoard;