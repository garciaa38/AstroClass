import PostReply from "../PostReply/PostReply";
import AddPostReplyForm from "../AddPostReplyForm/AddPostReplyForm";
import PostReaction from "../PostReaction/PostReaction";
import { useState } from "react";
import styles from "./PostReplyContainer.module.css";

function PostReplyContainer({ post_replies, classId, currMsgBoardId, sessionUserId, currPost, currMsgBoard, sessionUser }) {
    const [showReplies, setShowReplies] = useState(false);

    return(
        <div>
            <PostReaction showReplies={showReplies} setShowReplies={setShowReplies} postId={currPost.id} post_reactions={currPost.post_reactions} sessionUserId={sessionUserId} currMsgBoardId={currMsgBoardId} classId={classId} />
            <div className={showReplies ? styles.showComments : styles.hideComments}>
                <PostReply post_replies={post_replies} classId={classId} currMsgBoardId={currMsgBoardId} sessionUserId={sessionUserId} />
                <AddPostReplyForm currPost={currPost} currMsgBoard={currMsgBoard} sessionUser={sessionUser} />
            </div>
        </div>
    )
}

export default PostReplyContainer;