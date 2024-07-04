export const LOAD_STUDENTS = 'students/LOAD_STUDENTS'

// ================= ACTION CREATORS =================
export const loadStudents = (students) => ({
    type: LOAD_STUDENTS,
    students
})

// ================= THUNKS =================

export const fetchAllStudentsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/students`)
        .then(res => res.json())
        .catch(e => console.error(e))
    
    console.log("FETCH STUDENTS from redux", res)
    dispatch(loadStudents(res))
    return res
}


// ================= REDUCER =================
const studentsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_STUDENTS: {
            const studentsState = {};
            action.students.forEach((student) => {
                studentsState[student.id] = student;
            })
            return studentsState
        }

        default:
            return state;
    }
}

export default studentsReducer;