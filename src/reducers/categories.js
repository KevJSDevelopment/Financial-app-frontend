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