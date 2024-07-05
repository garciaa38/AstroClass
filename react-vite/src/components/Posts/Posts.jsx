import PostReply from "../PostReply/PostReply";
import PostReaction from "../PostReaction/PostReaction";
import AddPostReplyForm from "../AddPostReplyForm/AddPostReplyForm";
import PostField from "../PostField/PostField";

function Posts({allPosts, currMsgBoard, sessionUser}) {
    return (
        <div>
            {allPosts?.map(post => {
                return (
                    <div key={post.id}>
                        <PostField post={post} classId={currMsgBoard.class_id}/>
                        <PostReaction post_reactions={post.post_reactions} />
                        <AddPostReplyForm currPost={post} currMsgBoard={currMsgBoard} sessionUser={sessionUser}/>
                        <PostReply post_replies={post.post_replies} classId={currMsgBoard.class_id} currMsgBoardId={currMsgBoard.id}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;