// export const loading = (state = true, action) => {
//     switch(action.type){
//         case "LOAD":
//             return false
//         default:
//             return state
//     }
// }

export const displayGraph = (state = false, action) => {
    switch(action.type){
        case "GRAPH":
            return action.payload
        case "RESET":
            return false
        default:
            return state
    }
}