export const amount = (state = "", action) => {
    switch(action.type){
        case "AMOUNT":
            return action.payload
        case "RESET":
            return ""
        default:
            return state
    }
}

export const expDate = (state = new Date(), action) =>{
    switch(action.type){
        case "EXPDATE":
            return action.payload
        case "RESET":
            return new Date()
        default:
            return state
    }
}