export const budgetsReducer = (state = [], action) => {
    // debugger
    switch(action.type){
        case "ADD_BUDGETS":
            return state.push(action.payload)
        case "SET_BUDGETS":
            // debugger
            return action.payload
        default:
            return state
    }
}

export const budgetModal = (state = false, action) => {
    switch(action.type){
        case "OPEN":
            return !state
        default:
            return state
    }
}