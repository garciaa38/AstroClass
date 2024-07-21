import PostReplyReaction from "../PostReplyReaction/PostReplyReaction";
import PostReplyField from "../PostReplyField/PostReplyField";
import styles from './PostReply.module.css'

function PostReply({post_replies, classId, currMsgBoardId, sessionUserId, sessionUser}) {
    
    const sortPosts = allPosts => {
        if (allPosts) {
            if (allPosts?.length <= 1) {
                return allPosts;
            }
    
            let pivot = allPosts[0];
            let leftArr = [];
            let rightArr = [];
    
            for (let i = 1; i < allPosts?.length; i++) {
                if (allPosts[i]?.created_at > pivot?.created_at) {
                    leftArr.push(allPosts[i])
                } else {
                    rightArr.push(allPosts[i])
                }
            }
    
            return [...sortPosts(leftArr), pivot, ...sortPosts(rightArr)]
        }
    }

    const sortedPosts = sortPosts(post_replies)
    
    return (
        <div className={styles.postReplyList}>
            {sortedPosts?.map(post_reply => {
                return (
                    <div className={styles.postReply} key={post_reply.id}>
                        <PostReplyField postReply={post_reply} classId={classId} currMsgBoardId={currMsgBoardId} sessionUser={sessionUser} />
                        <PostReplyReaction postReplyId={post_reply?.id} post_reply_reactions={post_reply?.post_reply_reactions} sessionUserId={sessionUserId} currMsgBoardId={currMsgBoardId} classId={classId}/>
                    </div>
                )
            })}
        </div>
    )
}

export default PostReply;