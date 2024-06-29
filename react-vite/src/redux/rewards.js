export const LOAD_REWARDS = 'rewards/LOAD_REWARDS'

// ================= ACTION CREATORS =================
export const loadRewards = rewards => ({
    type: LOAD_REWARDS,
    rewards
})

// ================= THUNKS =================

export const fetchAllRewardsThunk = (classId) => async (dispatch) => {
    const res = await fetch(`/api/classes/class/${classId}/rewards`)
        .then(res => res.json())
        .catch(e => console.error(e))

        dispatch(loadRewards(res))
}

// ================= REDUCER =================
const rewardsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_REWARDS: {
            const rewardsState = {};
            action.rewards.forEach((reward) => {
                rewardsState[reward.id] = reward;
            })
            return rewardsState
        }

        default:
            return state;
    }
}

export default rewardsReducer;