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

export const setStartDate = (date) => {
    return {
        type: "STARTDATE",
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

export const changeSelectedPanel = (panelNumber) => {
    return {
        type: "SETPANEL",
        payload: panelNumber
    }
}

export const setPlanView = (planInfo) => {
    return {
        type: "SETPLANVIEW",
        payload: planInfo
    }
}

export const setComparePlan = (planInfo) => {
    return {
        type: "SETCOMPARE",
        payload: planInfo
    }
}

export const setIncomeRows = (array) => {
    return {
        type: "SETINCOMEROWS",
        payload: array
    }
}

export const setExpenseRows = (array) => {
    return {
        type: "SETEXPENSEROWS",
        payload: array
    }
}

export const setIncomeCategories = (array) => {
    return {
        type: "SETINCOMECATEGORIES",
        payload: array
    }
}

export const setExpenseCategories = (array) => {
    return {
        type: "SETEXPENSECATEGORIES",
        payload: array
    }
}

export const setAccounts = (array) => {
    return {
        type: "SETACCOUNTS",
        payload: array
    }
}

export const setTransactions = (array) => {
    return {
        type: "SETTRANSACTIONS",
        payload: array
    }
}

export const setTransactionRows = (array) => {
    return {
        type: "SETTTRANSACTIONROWS",
        payload: array
    }
}

export const setBankBalance = (total) => {
    return {
        type: "BANKBALANCE",
        payload: total
    }
}

// export const setExpectedIncomesArray = (array) => {
//     return {
//         type: "INCOMESARRAY",
//         payload: array
//     }
// }

// export const setExpectedExpensesArray = (array) => {
//     return {
//         type: "EXPENSESARRAY",
//         payload: array
//     }
// }

// export const setActualIncomesArray = (array) => {
//     return {
//         type: "ACTUALINCOMES",
//         payload: array
//     }
// }

// export const setActualExpensesArray = (array) => {
//     return {
//         type: "ACTUALEXPENSES",
//         payload: array
//     }
// }

export const setDisplayLine = (bool) => {
    return {
        type: "DISPLAYLINE",
        payload: bool
    }
}

export const setIncomeKeys = (array) => {
    return {
        type: "INCOMEKEYS",
        payload: array
    }
}
export const setExpenseKeys = (array) => {
    return {
        type: "EXPENSEKEYS",
        payload: array
    }
}
export const setIncomeData = (array) => {
    return {
        type: "INCOMEDATA",
        payload: array
    }
}
export const setExpenseData = (array) => {
    return {
        type: "EXPENSEDATA",
        payload: array
    }
}
export const setIncomeLineData = (array) => {
    return {
        type: "INCOMELINEDATA",
        payload: array
    }
}
export const setExpenseLineData = (array) => {
    return {
        type: "EXPENSELINEDATA",
        payload: array
    }
}
export const setBalance = (total) => {
    return {
        type: "BALANCE",
        payload: total
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


export const setLoading = (bool) => {
    return {
        type: "LOAD",
        payload: bool
    }
}