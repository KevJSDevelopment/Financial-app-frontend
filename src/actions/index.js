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
                type: "no object"
            }
        default: 
            return {
                type: "VIEW",
                payload: budgetObject
            }
    }
}

export const isLoading = () => {
    return {
        type: "LOAD"
    }
}

export const setCategoryList = (array) => {
    switch(array.length){
        case 0:
            return {
                type: "no categories"
            }
        default:
            return {
                type: "SETLIST",
                payload: array
            }
    }   
}

export const setCategory = (string) => {
    return {
        type: "CATEGORY",
        payload: string
    }
}