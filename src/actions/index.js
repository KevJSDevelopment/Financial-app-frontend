export const setBudgets = (array) => {
    return {
        type: "SET_BUDGETS",
        payload: array
    }
}

export const openBudgetModal = () => {
    return {
        type: "OPEN"
    }
}