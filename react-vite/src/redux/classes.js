export const LOAD_CLASSES = 'classes/LOAD_CLASSES'
// export const LOAD_CLASS = 'classes/LOAD_CLASS'

// ================= ACTION CREATORS =================
export const loadClasses = (classes) => ({
    type: LOAD_CLASSES,
    classes
})

// export const loadClass = (cls) => ({
//     type: LOAD_CLASS,
//     cls
// })

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
    await fetch(`/api/classes/class/${classId}/students/${studentId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    })
        .then(res => res.json())
        .catch(e => console.error(e))
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

        // case LOAD_CLASS: {
        //     return {...state, [action.class.id]: action.class};
        // }

        default:
            return state;
    }
}

export default classesReducer