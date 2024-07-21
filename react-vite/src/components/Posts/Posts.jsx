import PostField from "../PostField/PostField";
import PostReplyContainer from "../PostReplyContainer/PostReplyContainer";
import styles from "./Posts.module.css";

function Posts({allPosts, currMsgBoard, sessionUser}) {
    
    const sortPosts = allPosts => {
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

    const sortedPosts = sortPosts(allPosts)

    return (
        <div className={styles.postList}>
            {sortedPosts?.map(post => {
                return (
                    <div className={styles.postArea} key={post?.id}>
                        <PostField post={post} classId={currMsgBoard.class_id} sessionUser={sessionUser}/>
                        <PostReplyContainer post_replies={post.post_replies} classId={currMsgBoard.class_id} currMsgBoardId={currMsgBoard.id} sessionUserId={sessionUser.id} currPost={post} currMsgBoard={currMsgBoard} sessionUser={sessionUser}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;