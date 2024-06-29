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