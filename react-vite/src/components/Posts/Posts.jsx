import PostReply from "../PostReply/PostReply";
import PostReaction from "../PostReaction/PostReaction";

function Posts({allPosts}) {
    return (
        <div>
            {allPosts.map(post => {
                return (
                    <div key={post.id}>
                        <div>{post.text_field}</div>
                        <PostReaction post_reactions={post.post_reactions} />
                        <PostReply post_replies={post.post_replies} />
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;