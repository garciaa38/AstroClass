import Posts from "../Posts/Posts"
import { useEffect, useState } from "react"
import AddPostForm from "../AddPostForm/AddPostForm"
import { socket } from "../../socket"
import styles from './MessageBoard.module.css';

function MessageBoard({currMsgBoard, sessionUser, setCurrMsgBoard}) {
    const allPosts = currMsgBoard?.posts

    if (!currMsgBoard) {
        return <h1>This class has been deleted.</h1>
    }

    return (
        <div className={styles.messageBoardLayout}>
            <AddPostForm currMsgBoard={currMsgBoard} setCurrMsgBoard={setCurrMsgBoard} sessionUser={sessionUser}/>
            <Posts allPosts={allPosts} currMsgBoard={currMsgBoard} sessionUser={sessionUser}/>
        </div>
    )
}

export default MessageBoard;