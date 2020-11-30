export const expectedIncomesArray = (state=[], action) => {
    switch(action.type){
        case "INCOMESARRAY":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const expectedExpensesArray = (state=[], action) => {
    switch(action.type){
        case "EXPENSESARRAY":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const actualIncomesArray = (state=[], action) => {
    switch(action.type){
        case "ACTUALINCOMES":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const actualExpensesArray = (state=[], action) => {
    switch(action.type){
        case "ACTUALEXPENSES":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const incomeData = (state=[], action) => {
    switch(action.type){
        case "INCOMEDATA":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const expenseData = (state=[], action) => {
    switch(action.type){
        case "EXPENSEDATA":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}