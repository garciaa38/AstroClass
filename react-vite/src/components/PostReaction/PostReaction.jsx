function PostReaction({post_reactions}) {
    return (
        <div>
            {post_reactions.map(post_reaction => {
                return (
                <div key={post_reaction.id}>
                    <div>{post_reaction.emoji}</div>
                </div>
                )
            })}
        </div>
    )
}

export default PostReaction;