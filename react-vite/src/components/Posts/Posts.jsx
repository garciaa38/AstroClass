import PostReply from "../PostReply/PostReply";
import PostReaction from "../PostReaction/PostReaction";
import AddPostReplyForm from "../AddPostReplyForm/AddPostReplyForm";
import PostField from "../PostField/PostField";
import PostReplyContainer from "../PostReplyContainer/PostReplyContainer";
import styles from "./Posts.module.css";
import { useState } from "react";

function Posts({allPosts, currMsgBoard, sessionUser}) {
    const [showReplies, setShowReplies] = useState(false);
    
    return (
        <div className={styles.postList}>
            {allPosts?.map(post => {
                return (
                    <div className={styles.postArea} key={post.id}>
                        <PostField post={post} classId={currMsgBoard.class_id}/>
                        {/* <PostReaction showReplies={showReplies} setShowReplies={setShowReplies} postId={post.id} post_reactions={post.post_reactions} sessionUserId={sessionUser.id} currMsgBoardId={currMsgBoard.id} classId={currMsgBoard.class_id}/> */}
                        <PostReplyContainer post_replies={post.post_replies} classId={currMsgBoard.class_id} currMsgBoardId={currMsgBoard.id} sessionUserId={sessionUser.id} currPost={post} currMsgBoard={currMsgBoard} sessionUser={sessionUser}/>
                        {/* <div className={showReplies ? styles.showComments : styles.hideComments} >
                            <PostReply post_replies={post.post_replies} classId={currMsgBoard.class_id} currMsgBoardId={currMsgBoard.id} sessionUserId={sessionUser.id}/>
                            <AddPostReplyForm currPost={post} currMsgBoard={currMsgBoard} sessionUser={sessionUser}/>
                        </div> */}
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;