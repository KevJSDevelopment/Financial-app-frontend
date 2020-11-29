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