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
        return [res]
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
    const updMsgBoard = await dispatch(fetchMessageBoardThunk(res.message_board_id))
    console.log("ADDING POST", updMsgBoard)
    return updMsgBoard

}
// ================= REDUCER =================
const msgBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_MSGBOARD: {
            console.log("CURRENT MSG BOARD redux", {[action.msgBoard.id]: action.msgBoard})
            return {[action.msgBoard.id]: action.msgBoard}
        }
        
        default:
            return state;
    }
}

export default msgBoardReducer;