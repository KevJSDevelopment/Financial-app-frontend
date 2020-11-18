export const setBudgets = (array) => {
    return {
        type: "SET_BUDGETS",
        payload: array
    }
}

export const openNewBudget = () => {
    return {
        type: "OPEN"
    }
}

export const setNewBudgetType = (string) => {
    return {
        type: string
    }
}

export const setCurrentBudget = (budgetObject) => {
    switch(budgetObject){
        case null:
            return {
                type: "none"
            }
        default: 
            return {
                type: "VIEW",
                payload: budgetObject
            }
    }
}