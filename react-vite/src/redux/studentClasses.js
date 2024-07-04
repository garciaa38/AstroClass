export const LOAD_STUDENT_CLASSES = 'student_classes/LOAD_STUDENT CLASSES'

export const loadStudentClasses = (classes) => ({
    type: LOAD_STUDENT_CLASSES,
    classes
})

export const fetchAllStudentClassesThunk = (studentId) => async (dispatch) => {
    console.log("ALL CLASSES STUDENT id", studentId)
    const res = await fetch(`/api/students/${studentId}`)
        .then(res => res.json())
        .catch(e => console.error(e))
    console.log("ALL CLASSES STUDENT", res)
    dispatch(loadStudentClasses(res))
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

        default:
            return state;
    }
}

export default studentClassesReducer;