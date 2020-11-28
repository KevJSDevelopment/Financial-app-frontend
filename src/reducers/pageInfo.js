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

export const tabNumber = (state=1, action) => {
    switch(action.type) {
        case "SETTAB":
            return action.payload
        case "RESET":
            return 1
        default:
            return state
    }
}

export const selectedPanel = (state=0, action) => {
    switch(action.type) {
        case "SETPANEL":
            return action.payload
        case "RESET":
            return 0
        default:
            return state
    }
}

export const planView = (state=null, action) => {
    switch(action.type) {
        case "SETPLANVIEW":
            return action.payload
        case "RESET":
            return null
        default:
            return state
    }
}