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

export const newBudget = (state = false, action) => {
    switch(action.type){
        case "OPEN":
            return !state
        default:
            return state
    }
}

export const newBudgetType = (state = "", action) => {
    switch(action.type){
        case "budget":
            return action.type
        case "fullPlan":
            return action.type
        default:
            return ""
    }
}

export const currentBudget = (state = null, action) => {
    switch(action.type){
        case "VIEW":
            return action.payload
        default:
            return null
    }
}