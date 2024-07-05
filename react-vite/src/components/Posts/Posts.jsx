import PostReply from "../PostReply/PostReply";
import PostReaction from "../PostReaction/PostReaction";
import AddPostReplyForm from "../AddPostReplyForm/AddPostReplyForm";

function Posts({allPosts, currMsgBoard, sessionUser}) {
    return (
        <div>
            {allPosts?.map(post => {
                return (
                    <div key={post.id}>
                        <div>{post.text_field}</div>
                        <PostReaction post_reactions={post.post_reactions} />
                        <AddPostReplyForm currPost={post} currMsgBoard={currMsgBoard} sessionUser={sessionUser}/>
                        <PostReply post_replies={post.post_replies} />
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;