const CHANGED_TIME = 'CHANGED_TIME'


const salaryState = {
    salary:{

    }
}
export const salaryReducer = (state = salaryState, action) => {
    switch (action.type) {
        case CHANGED_TIME:
            return {...state, timeInput: action.payload}
        default:
            return state
    }
}