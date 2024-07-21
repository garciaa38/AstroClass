export const LOAD_STUDENT_CLASSES = 'student_classes/LOAD_STUDENT_CLASSES'
export const LOAD_STUDENT_CLASS = 'student_classes/LOAD_STUDENT_CLASS'

export const loadStudentClasses = (classes) => ({
    type: LOAD_STUDENT_CLASSES,
    classes
})

export const loadStudentClass = (cls) => ({
    type: LOAD_STUDENT_CLASS,
    cls
})

export const fetchAllStudentClassesThunk = (studentId) => async (dispatch) => {
    const res = await fetch(`/api/students/${studentId}`)
        .then(res => res.json())
        .catch(e => console.error(e))
    dispatch(loadStudentClasses(res))
}

export const fetchStudentClassById = (studentId, classId) => async (dispatch) => {
    const res = await fetch(`/api/students/${studentId}/class/${classId}`)
        .then(res => res.json())
        .catch(e => console.error("GETTING STUDENT CLASS", e))
    dispatch(loadStudentClass(res))
}

const studentClassesReducer = (state = {}, action) => {
    switch (action.type) {

        case LOAD_STUDENT_CLASSES: {
            const studentClassesState = {};
            action.classes?.forEach((cls) => {
                studentClassesState[cls.id] = cls
            })
            return studentClassesState
        }

        case LOAD_STUDENT_CLASS: {
            return {...state, [action.cls.id]: action.cls};
        }

        default:
            return state;
    }
}

export default studentClassesReducer;