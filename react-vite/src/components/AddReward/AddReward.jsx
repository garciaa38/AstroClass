import { useState } from "react"

function AddReward({first_name, rewards }) {


    return (
        <>
                <h3>Reward {first_name}</h3>
                {rewards.map(reward => {
                    return (
                        <div key={reward.id}>
                            <h4>{reward.reward_type} {reward.points}</h4>
                        </div>
                    )
                })}
                
            </>
    )
}

export default AddReward;