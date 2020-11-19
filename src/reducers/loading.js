export const loading = (state = false, action) => {
    switch(action.type){
        case "LOAD":
            return !state
        default:
            return false
    }
}