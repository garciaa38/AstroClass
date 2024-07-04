import Posts from "../Posts/Posts"
import { useEffect, useState } from "react"
import AddPostForm from "../AddPostForm/AddPostForm"
import { socket } from "../../socket"

function MessageBoard({currMsgBoard, sessionUser, setCurrMsgBoard}) {
    console.log("ADDING POST parent", currMsgBoard)
    const allPosts = currMsgBoard.posts
    console.log("CURRENT CLASS POSTS", allPosts)

    useEffect(() => {
        
    })

    return (
        <div>
            <AddPostForm currMsgBoard={currMsgBoard} setCurrMsgBoard={setCurrMsgBoard} sessionUser={sessionUser}/>
            <Posts allPosts={allPosts}/>
        </div>
    )
}

export default MessageBoard;