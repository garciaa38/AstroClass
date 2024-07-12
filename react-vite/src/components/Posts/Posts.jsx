import PostField from "../PostField/PostField";
import PostReplyContainer from "../PostReplyContainer/PostReplyContainer";
import styles from "./Posts.module.css";

function Posts({allPosts, currMsgBoard, sessionUser}) {
    
    return (
        <div className={styles.postList}>
            {allPosts?.map(post => {
                return (
                    <div className={styles.postArea} key={post.id}>
                        <PostField post={post} classId={currMsgBoard.class_id}/>
                        <PostReplyContainer post_replies={post.post_replies} classId={currMsgBoard.class_id} currMsgBoardId={currMsgBoard.id} sessionUserId={sessionUser.id} currPost={post} currMsgBoard={currMsgBoard} sessionUser={sessionUser}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;