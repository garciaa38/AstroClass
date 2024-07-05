export const LOAD_MSGBOARD = 'message_board/LOAD_MSGBOARD'

// ================= ACTION CREATORS =================
export const loadMsgBoard = (msgBoard) => ({
    type: LOAD_MSGBOARD,
    msgBoard
})

// ================= THUNKS =================
export const fetchMessageBoardThunk = (msgBoardId) => async (dispatch) => {
    const res = await fetch(`/api/message-boards/${msgBoardId}`)
        .then(res => res.json())
        .catch(e => console.error(e))

        dispatch(loadMsgBoard(res))
        // return [res]
}

export const addMessageBoardThunk = (newMsgBoard) => async (dispatch) => {
    const res = await fetch(`/api/message-boards/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newMsgBoard)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    console.log("ADDING MSG BOARD", res)
    dispatch(loadMsgBoard(res))
}

export const addNewPostThunk = (newPost) => async (dispatch) => {
    const res = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPost)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    console.log("ADDING POST", res)
    await dispatch(fetchMessageBoardThunk(res.message_board_id))
}

export const addNewPostReplyThunk = (newPostReply, message_board_id) => async (dispatch) => {
    const res = await fetch(`/api/post-replies/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPostReply)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    await dispatch(fetchMessageBoardThunk(message_board_id))
}
// ================= REDUCER =================
const msgBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_MSGBOARD: {
            return {[action.msgBoard.id]: action.msgBoard}
        }
        
        default:
            return state;
    }
}

export default msgBoardReducer;