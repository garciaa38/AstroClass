export const LOAD_FEEDBACK = 'rewards/LOAD_FEEDBACK'

// ================= ACTION CREATORS =================
export const loadFeedback = feedback => ({
    type: LOAD_FEEDBACK,
    feedback
})

// ================= THUNKS =================

export const fetchAllFeedbackThunk = (classId) => async (dispatch) => {
    const res = await fetch(`/api/classes/class/${classId}/feedback`)
        .then(res => res.json())
        .catch(e => console.error(e))

        dispatch(loadFeedback(res))
}

// ================= REDUCER =================
const feedbackReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_FEEDBACK: {
            const feedbackState = {};
            action.feedback.forEach((feedback) => {
                feedbackState[feedback.id] = feedback;
            })
            return feedbackState
        }

        default:
            return state;
    }
}

export default feedbackReducer;