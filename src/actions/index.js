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

export const setCurrentBudget = (budgetId) => {
    // debugger
    return (dispatch) => {
        fetch(`http://localhost:3000/budgets/${budgetId}`)
        .then(res => res.json())
        .then(data => {
            const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
            dispatch({
                type: "VIEW",
                payload: budgetObject
            })
        })
    }
}

// export const doneLoading = () => {
//     return {
//         type: "LOAD"
//     }
// }

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

export const setDataArr = (arr) => {
    return {
        type: "ARRAY",
        payload: arr
    }
}
