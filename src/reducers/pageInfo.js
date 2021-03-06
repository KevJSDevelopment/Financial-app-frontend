export const loading = (state = true, action) => {
    switch(action.type){
        case "LOAD":
            return action.payload
        case "RESET":
            return true
        default:
            return state
    }
}

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

export const selectedPanel = (state=1, action) => {
    switch(action.type) {
        case "SETPANEL":
            return action.payload
        case "RESET":
            return 1
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

export const comparePlan = (state=null, action) => {
    switch(action.type) {
        case "SETCOMPARE":
            return action.payload
        case "RESET":
            return null
        default:
            return state
    }
}

export const expenseRows = (state=[], action) => {
    switch(action.type) {
        case "SETEXPENSEROWS":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const incomeRows = (state=[], action) => {
    switch(action.type) {
        case "SETINCOMEROWS":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const displayLine = (state = true, action) => {
    switch(action.type){
        case "DISPLAYLINE":
            return action.payload
        case "RESET":
            return true
        default:
            return state
    }
}


export const incomeKeys = (state=[], action) => {
    switch(action.type) {
        case "INCOMEKEYS":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}

export const expenseKeys = (state=[], action) => {
    switch(action.type) {
        case "EXPENSEKEYS":
            return action.payload
        case "RESET":
            return []
        default:
            return state
    }
}
