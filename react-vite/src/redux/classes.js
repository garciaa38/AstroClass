export const LOAD_CLASSES = 'classes/LOAD_CLASSES'
export const LOAD_CLASS = 'classes/LOAD_CLASS'

// ================= ACTION CREATORS =================
export const loadClasses = (classes) => ({
    type: LOAD_CLASSES,
    classes
})

export const loadClass = (cls) => ({
    type: LOAD_CLASS,
    cls
})

// ================= THUNKS =================

export const fetchAllClassesThunk = (teacherId) => async (dispatch) => {
    console.log('ALL CLASSES', teacherId)
    const res = await fetch(`/api/classes/${teacherId}`)
        .then(res => res.json())
        .catch(e => console.error(e))

    console.log('ALL CLASSES', res)
    dispatch(loadClasses(res))
    
}


export const fetchClassByIdThunk = (user_id, classId) => async (dispatch) => {
    const res = await fetch(`/api/classes/${classId}/user/${user_id}`)
        .then(res => res.json())
        .catch(e => console.error(e))
    
        dispatch(loadClass(res))
        return res;
}

export const studentJoinClassThunk = (student_id, inviteCode) => async (dispatch) => {
    const res = await fetch(`/api/students/${student_id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inviteCode)
    })
        .then(res => res.json())
        .catch(e => console.error(e))

        dispatch(loadClass(res))
}

export const addNewClassThunk = (teacher_id, newClass) => async (dispatch) => {
    const res = await fetch(`/api/classes/${teacher_id}/class`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newClass)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
        dispatch(loadClass(res))
        return res
}

export const editClassThunk = (class_id, cls) => async (dispatch) => {
    const res = await fetch(`/api/classes/class/${class_id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cls)
    })
        .then(res => res.json())
        .catch(e => console.error(e))

        dispatch(loadClass(res))
}

export const deleteClassThunk = (class_id, teacher_id) => async (dispatch) => {
    await fetch(`/api/classes/class/${class_id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    dispatch(fetchAllClassesThunk(teacher_id))

}


export const addStudentToClassThunk = (classId, studentId) => async (dispatch) => {
    const res = await fetch(`/api/classes/class/${classId}/students/${studentId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    dispatch(loadClass(res))
}

export const addRewardToClassThunk = (classId, reward) => async (dispatch) => {
    const res = await fetch(`/api/classes/class/${classId}/rewards`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reward)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
        
    dispatch(loadClass(res[0]))
    return res[1]
}

export const editRewardThunk = (reward) => async (dispatch) => {
    const res = await fetch(`/api/rewards/${reward.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reward)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    dispatch(loadClass(res))
}

export const deleteRewardThunk = (rewardId, classId) => async (dispatch) => {
    const res = await fetch(`/api/rewards/${rewardId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(classId)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    console.log("DELETE REWARD REDUX", res)
    dispatch(loadClass(res[0]))
}

export const addFeedbackToClassThunk = (classId, feedback) => async (dispatch) => {
    const res = await fetch(`/api/classes/class/${classId}/feedback`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(feedback)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    dispatch(loadClass(res[0]))
    return res[1]
}

export const editFeedbackThunk = (feedback) => async (dispatch) => {
    console.log("EDITING FEEDBACK REDUX", feedback)
    const res = await fetch(`/api/feedback/${feedback.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(feedback)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
        console.log("EDITING FEEDBACK REDUX", res)
    
    dispatch(loadClass(res))
}

export const deleteFeedbackThunk = (feedbackId, classId) => async (dispatch) => {
    const res = await fetch(`/api/feedback/${feedbackId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(classId)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    console.log("DELETE FEEDBACK REDUX", res)
    dispatch(loadClass(res[0]))
}

export const addPointsToStudentThunk = (student_class_id, reward_id) => async (dispatch) => {
    const res = await fetch(`/api/students/student-class/${student_class_id}/rewards/${reward_id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    dispatch(loadClass(res))
}

export const removePointsFromStudentThunk = (student_class_id, feedback_id) => async (dispatch) => {
    const res = await fetch(`/api/students/student-class/${student_class_id}/feedback/${feedback_id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    dispatch(loadClass(res))
}

export const editStudentInfoThunk = (student, class_id) => async (dispatch) => {
    console.log("EDIT STUDENT", student)
    const res = await fetch(`/api/students/${student.id}/class/${class_id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(student)
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    dispatch(loadClass(res))
}

export const removeStudentFromClassThunk = (student_class_id) => async (dispatch) => {
    const res = await fetch(`/api/students/${student_class_id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    })
        .then(res => res.json())
        .catch(e => console.error(e))
    
    dispatch(loadClass(res))
}


// ================= REDUCER =================
const classesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CLASSES: {
            const classesState = {};
            action.classes.forEach((cls) => {
                classesState[cls.id] = cls;
            })
            return classesState
        }

        case LOAD_CLASS: {
            return {...state, [action.cls.id]: action.cls};
        }

        default:
            return state;
    }
}

export default classesReducer