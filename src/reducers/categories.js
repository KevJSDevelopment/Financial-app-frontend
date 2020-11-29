export const categoryList = (state = [], action) => {
    switch(action.type){
        case "SETLIST":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}
export const category = (state = "", action) => {
    switch(action.type){
        case "CATEGORY":
            return action.payload
        case "RESET":
            return ""
        default:
            return state
    }
}

export const selectedArr = (state=[], action) => {
    switch(action.type){
        case "ADDSELECTED":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const incomeCategories = (state=[], action) => {
    switch(action.type){
        case "SETINCOMECATEGORIES":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const expenseCategories = (state=[], action) => {
    switch(action.type){
        case "SETEXPENSECATEGORIES":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const transactions = (state=[], action) => {
    switch(action.type){
        case "SETTRANSACTIONS":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}