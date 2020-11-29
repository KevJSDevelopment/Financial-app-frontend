export const accounts = (state=[], action) => {
    switch(action.type) {
        case "SETACCOUNTS":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const bankBalance = (state = 0.00, action) => {
    switch(action.type) {
        case "BANKBALANCE":
            return action.payload
        case "RESET":
            return 0.00
        default:
            return state
    }
}