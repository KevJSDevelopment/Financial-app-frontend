export const budgetsReducer = (state = [], action) => {
    // debugger
    switch(action.type){
        case "ADD_BUDGETS":
            return state.push(action.payload)
        case "SET_BUDGETS":
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
        case "simple":
            return action.type
        case "budget":
            return action.type
        case "full":
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
            return state
    }
}

export const dataArr = (state = [], action) => {
    switch(action.type){
        case "ARRAY":
            return action.payload
        default:
            return state
    }
}

export const fromDate = (state = new Date(), action) =>{
    switch(action.type){
        case "FROMDATE":
            return action.payload
        default:
            return state
    }
}
export const toDate = (state = new Date(), action) =>{
    switch(action.type){
        case "TODATE":
            return action.payload
        default:
            return state
    }
}
export const total = (state = 0.00, action) => {
    switch(action.type){
        case "TOTAL":
            return action.payload
        default:
            return state
    }
}