import { useState } from "react"

function AddFeedback({first_name, feedback }) {


    return (
        <>
                <h3>Give feedback to {first_name}</h3>
                {feedback.map(feedback => {
                    return (
                        <div key={feedback.id}>
                            <h4>{feedback.feedback_type} {feedback.points}</h4>
                        </div>
                    )
                })}
                
            </>
    )
}

export default AddFeedback;