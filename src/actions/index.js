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

export const setExpDate = (date) => {
    return {
        type: "EXPDATE",
        payload: date
    }
}

export const setFromDate = (date) => {
    return {
        type: "FROMDATE",
        payload: date
    }
}
export const setToDate = (date) => {
    return {
        type: "TODATE",
        payload: date
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

export const setDataArr = (arr) => {
    return {
        type: "ARRAY",
        payload: arr
    }
}

export const setAmount = (amount) => {
    return {
        type: "AMOUNT",
        payload: amount
    }
}

export const setTotal = (total) => {
    return {
        type: "TOTAL",
        payload: total
    }
}

export const setCurrentBudget = (budgetObject) => {
    // debugger
    return {
            type: "VIEW",
            payload: budgetObject
    }
}

export const changeDisplayGraph = (newState) => {
    return {
        type: "GRAPH",
        payload: newState
    }
}

export const setSimpleRows = (array) => {
    return {
        type: "SIMPLEROWS",
        payload: array
    }
}

export const setSelectedArr = (obj) => {
    return {
        type: "ADDSELECTED",
        payload: obj
    }
}

export const setCurrentUser = (user) => {
    return {
        type: "SETUSER",
        payload: user
    }
}

export const setToken = (token) => {
    return {
        type: "SETTOKEN",
        payload: token
    }
}

export const setLink = (link) => {
    return {
        type: "SETLINK",
        payload: link
    }
}

export const setTabNumber = (number) => {
    return {
        type: "SETTAB",
        payload: number
    }
}
export const resetStore = () => {
    return {
        type: "RESET"
    }
}
// //-------using thunk---------
// export const setCurrentBudget = (budgetId) => {
//     // debugger
//     return (dispatch) => {
//         fetch(`http://localhost:3000/budgets/${budgetId}`)
//         .then(res => res.json())
//         .then(data => {
//             const budgetObject = { budget: data.budget, expenseInfo: data.expenseInfo }
//             dispatch({
//                 type: "VIEW",
//                 payload: budgetObject
//             })
//         })
//     }
// }
// //---------------------------


// export const doneLoading = () => {
//     return {
//         type: "LOAD"
//     }
// }